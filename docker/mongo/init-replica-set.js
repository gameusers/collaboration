rs.initiate({
    _id : "rs0",
    members: [
        { _id: 0, host: "mongo1:27017" },
        { _id: 1, host: "mongo2:27017" },
        { _id: 2, host: "mongo3:27017" },
    ]
});

// rs.status();

// conf = rs.conf()
// conf.members[0].priority = 2
// conf.members[1].priority = 1
// conf.members[2].priority = 1
// rs.reconfig(conf)

// db.getSiblingDB('admin');
// use admin;

// db.createUser({
//     user: 'root',
//     pwd: 'password',
//     roles: ['root']
// });