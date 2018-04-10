// --------------------------------------------------
//   Import
// --------------------------------------------------

require('dotenv').config();

const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

// const logger = require('./lib/logger');
const log = require('./lib/error_logger');

const helmet = require('helmet');
const csrf = require('csurf');
// const cors = require('cors');

const moment = require('moment-timezone');


// --------------------------------------------------
//   定数
// --------------------------------------------------

const twitterConfigObj = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL
};


// --------------------------------------------------
//   タイムゾーン設定
// --------------------------------------------------

moment.tz.setDefault("Asia/Tokyo");






// --------------------------------------------------
//   Model
// --------------------------------------------------

const ModelUsers = require('./schema/users');
const ModelGames = require('./schema/games');


// --------------------------------------------------
//   Middleware Settings
// --------------------------------------------------

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'nPv8ip9MYiNcxBJwmgwHW9pqAOksyE87',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    db: 'sessions',
    ttl: 14 * 24 * 60 * 60,
    // cookie: {
    //   secure: true
    // }
  }),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/image', express.static(path.join(__dirname, 'image')));

app.use(helmet());

const csrfProtection = csrf();







// --------------------------------------------------
//   Database
// --------------------------------------------------

// mongoose.connect('mongodb://192.168.99.100:27017/test');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connected!');
});




// --------------------------------------------------
//   View
// --------------------------------------------------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// --------------------------------------------------
//   Page: Index
// --------------------------------------------------

app.get('/', (req, res, next) => {
  
  // logger.warn(req.session.user);

  ModelUsers.find({}, (err, dataArr) => {
    console.log(dataArr);
    if (err) throw err;
    
    return res.render('index', {
      usersArr: dataArr,
      user: req.session && req.session.user ? req.session.user : null,
      moment: moment
    });
    
  });

  // ModelGames.find({}, (err, dataArr) => {
  //   if (err) throw err;
  //   return res.render('index', { gameDataArr: dataArr });
  // });

});


// --------------------------------------------------
//   Page: Login
//   
//   Passport 解説サイト
//   http://knimon-software.github.io/www.passportjs.org/guide/
//   http://www.passportjs.org/docs/
// --------------------------------------------------

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/oauth/twitter');
  }
}


// --------------------------------------------------
//   Page: Login / Twitter
// --------------------------------------------------

// ストラテジーの設定
passport.use(new TwitterStrategy(twitterConfigObj,
  (token, tokenSecret, profile, done) => {
    
    ModelUsers.findOne({ twitterProfileId: profile.id }, (err, user) => {
      
      if (err) {
        
        return done(err);
        
      } else if (!user) {
        
        const _user = {
          username: profile.displayName,
          twitterProfileId: profile.id,
          imagePath: profile.photos[0].value
        };
        
        const instanceModelUsers = new ModelUsers(_user);
        
        instanceModelUsers.save((err)=>{
          if(err) throw err;
          return done(null, instanceModelUsers);
        });
        
      } else {
        
        return done(null, user);
        
      }
      
    });
  }
));

app.get('/oauth/twitter', passport.authenticate('twitter'));

app.get('/oauth/twitter/callback', passport.authenticate('twitter'),
  (req, res, next) => {

    ModelUsers.findOne({ _id: req.session.passport.user }, (err, user) => {
      
      // エラーが起こった場合、セッションがない場合は認証ページにリダイレクトする
      if (err || !req.session) return res.redirect('/oauth/twitter');
      
      // セッションに保存
      req.session.user = {
        username: user.username,
        imagePath: user.imagePath
      };
      
      // ログインに成功した場合はトップページにリダイレクト
      return res.redirect('/');
      
    });
  }
);


// --------------------------------------------------
//   Page: Login / ID & Password
// --------------------------------------------------

app.get('/login', (req, res, next) => {
  return res.render('login');
});

// ストラテジーの設定
passport.use(new LocalStrategy(
  
  // 検証用コールバックを設定する
  (username, password, done) => {
    ModelUsers.findOne({ username: username }, (err, user) => {
      
      if (err) {
        return done(err);
      }
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      return done(null, user);
      
    });
  }
));

app.post('/login',

  passport.authenticate('local', {
    failureRedirect: '/login', // 失敗したときの遷移先
    failureFlash: true, // 失敗したときにフラッシュメッセージを表示
    session: true, // セッションを有効にするかどうか
  }),
  
  // 認証に成功すると、この関数が呼び出される。
  // 認証されたユーザーは `req.user` に含まれている。
  (req, res) => {
    ModelUsers.findOne({ _id: req.session.passport.user }, (err, user) => {
      
      console.log('ログインに成功しました');
      console.log('req.user = ' + req.user);
      console.log('req.session.passport.user = ' + req.session.passport.user);
      console.log(`err = ${err}`);
      
      // エラーが存在する、またはセッションがない場合はログインページにリダイレクト
      if (err || !req.session) {
        return res.redirect('/login');
      }

      // セッションに保存
      req.session.user = {
          username: user.username,
          imagePath: user.imagePath
      };
      
      // トップページにリダイレクト
      return res.redirect('/');
      
    });
  },
  
  
);

// _idをシリアライズしてセッションに埋め込む
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// シリアライズされた_idをデシリアライズしてユーザーを特定する
passport.deserializeUser((id, done) => {
  ModelUsers.findOne({ _id: id }, (err, user) => {
    done(err, user);
  });
});



// --------------------------------------------------
//   Page: Logout
// --------------------------------------------------

app.get('/logout', (req, res, next) => {
  req.logout();
  delete req.session.user;
  return res.redirect('/');
});




// --------------------------------------------------
//   Page: Signin サムネイル画像をアップロードする
// --------------------------------------------------

app.get('/signin', (req, res, next) => {
  return res.render('signin');
});

app.post('/signin', fileUpload(), (req, res, next) => {

  const image = req.files.image;
  
  image.mv(`./image/${image.name}`, (err) => {
    
    if (err) throw err;
    
    const instanceModelUsers = new ModelUsers({
      username: req.body.username,
      password: req.body.password,
      imagePath: `/image/${image.name}`
    });
    
    instanceModelUsers.save((err2) => {
      if (err2) throw err2;
      return res.redirect('/');
    });
    
  });
  
});


// --------------------------------------------------
//   Page: Update
// --------------------------------------------------

app.get('/update', csrfProtection, (req, res, next) => {
  res.render('update', {
    csrf: req.csrfToken(),
  });
});

app.post('/update', checkAuth, fileUpload(), csrfProtection, (req, res, next) => {

  if (req.files && req.files.image) {
    
    const image = req.files.image;

    image.mv(`./image/${image.name}`, (err) => {

      if (err) throw err;

      const instanceModelGames = new ModelGames({
        name: req.body.name,
        score: req.body.score,
        imagePath: req.session.user.imagePath,
        twitterImagePath: `/image/${image.name}`,
      });

      instanceModelGames.save((err2) => {
        if (err2) throw err2;
        return res.redirect('/');
      });

    });

  } else {

    const instanceModelGames = new ModelGames({
      name: req.body.name,
      score: req.body.score,
      imagePath: req.session.user.imagePath,
    });

    instanceModelGames.save((err) => {
      if (err) throw err;
      return res.redirect('/');
    });

  }

});



// --------------------------------------------------
//   Page: テスト
// --------------------------------------------------

// app.get('/test', (req, res, next) => {
//   throw new Error('error');
// });

// app.get('/test', (req, res, next) => {
//   return next(new Error('error'));
// });


// --------------------------------------------------
//   Page: CORS
// --------------------------------------------------
// origin: 'https://df44294c8853471b8ddd609c09af06f3.vfs.cloud9.us-west-2.amazonaws.com',
// const corsOptions = {
//   origin: 'https://gameusers.org',
//   methods: 'GET, POST'
// }

// app.get('/products/:id', cors(corsOptions), (req, res, next) => {
//   res.json({
//     msg: 'This is CORS-enabled for a whitelited domain.'
//   })
// });


// --------------------------------------------------
//   Page: 404
// --------------------------------------------------

app.use((req, res, next) => {
  
  const err = new Error('Not Found');
  err.status = 404;

  return res.render('error', {
    status: err.status,
  });
  
});


// --------------------------------------------------
//   Error 処理
// --------------------------------------------------

app.use((err, req, res, next) => {
  
  log.error(err);

  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403);
  } else {
    res.status(err.status || 500);
  }

  return res.render('error', {
    message: err.message,
    status: err.status || 500,
  });
  
});


// --------------------------------------------------
//   Server
// --------------------------------------------------

const server = http.createServer(app);

server.listen('8080');
