// --------------------------------------------------
//   Require
// --------------------------------------------------

import React from 'react';
// const mongoose = require('mongoose');

// const ModelUsers = require('../schemas/users');



// --------------------------------------------------
//   Database
// --------------------------------------------------
  
// mongoose.connect('mongodb://127.0.0.1:27017/test');

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('MongoDB connected!');
// });


// ModelUsers.find({}, (err, dataArr) => {
//   console.log(dataArr);
//   if (err) throw err;
// });


export default class extends React.Component {
  
  static async getInitialProps ({ req }) {
    // if (req) {
    //   // If `req` is defined, we're rendering on the server and should use
    //   // MongoDB directly. You could also use the REST API, but that's slow
    //   // and inelegant.
    //   const { db } = req
    //   // // Note that `db` above comes from express middleware
    //   // const list = await db.collection('Book').find().sort({ createdAt: -1 })
    //   //   .toArray()
    //   // return { list }
      
    //   ModelUsers.find({}, (err, dataArr) => {
    //     console.log(dataArr);
    //     if (err) throw err;
    //   });
    // }
    

    // Otherwise, we're rendering on the client and need to use the API
    // const { list } = await superagent.get('http://localhost:3000/api')
    //   .then(res => res.body)
    // return { list }
    
    return { test: 'b' };
  }

  render() {
    return (
      <div>
        <p>b.jsx</p>
      </div>
    );
  }
}

// const Component = () => (
//   <div>
//     <p>b.jsx</p>
//   </div>
// );

// export default Component;