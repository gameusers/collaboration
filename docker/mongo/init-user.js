// db.auth('root', 'password');

// const adminDB = db.getSiblingDB('admin');

// // use admin;

// adminDB.createUser({
//     user: 'root',
//     pwd: 'password',
//     roles: ['root']
// });

// adminDB.getUsers();


const dbAdmin = db.getSiblingDB('admin');

dbAdmin.createUser({
    user: 'root',
    pwd: 'password',
    roles: [{
        role: 'root',
        db: 'admin'
    }]
});


const dbGameUsers = db.getSiblingDB('gameusers');

dbGameUsers.createUser({
    user: 'gameusers',
    pwd: 'password',
    roles: [{
        role: 'dbOwner',
        db: 'gameusers'
    }]
});