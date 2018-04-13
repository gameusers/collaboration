// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');


// ---------------------------------------------
//   Require: Model
// ---------------------------------------------

const ModelUsers = require('./schemas/users');



// --------------------------------------------------
//   Routing
// --------------------------------------------------

module.exports = db => {
  
  const router = express.Router();


  router.get('/', (req, res) => {
    
    ModelUsers.find({}, (err, obj) => {
      
      console.log(`obj = ${obj}`);
      console.log(`err = ${err}`);
      
      if (err) {
        res.json({ "Error" : true, "Message" : "Error executing MySQL query" });
      }
      
      res.json ({ "Error" : false, "Message" : "Success", "obj2" : obj });
      
    });
    
  });



  // router.get('/', (req, res) => {
  //   return ModelUsers.find({}, (err, obj) => {
      
  //     console.log(`obj = ${obj}`);
  //     console.log(`err = ${err}`);
      
  //     let returnObj = {"Error" : false, "Message" : "Success", "Users" : 'AAA'};
      
  //     if (err) {
  //       returnObj = {"Error" : true, "Message" : "Error executing MySQL query"};
  //     }
      
  //     return returnObj;
      
  //   });
  // });


  

  // const wrapAsync = handler => (req, res) => handler(req)
  //   .then(result => res.json(result))
  //   .catch(error => res.status(500).json({ error: error.message }));

  // router.get('/', wrapAsync(async (req) => {
    
  //   let returnObj = {'test': 'first'};
    
  //   ModelUsers.find({}, (err, obj) => {
      
  //     console.log(`obj = ${obj}`);
  //     console.log(`err = ${err}`);
      
  //     if (err) {
  //       returnObj = {"Error" : true, "Message" : "Error executing MySQL query"};
  //     } else {
  //       returnObj = {"Error" : false, "Message" : "Success", "obj" : obj};
  //     }
      
  //   });
    
  //   return returnObj;
    
  // }));

  // router.get('/', wrapAsync(async function(req) {
    
  //   let returnObj = {'test': 'first'};
    
  //   ModelUsers.find({}, (err, obj) => {
      
  //     console.log(`obj = ${obj}`);
  //     console.log(`err = ${err}`);
      
  //     if (err) {
  //       returnObj = {"Error" : true, "Message" : "Error executing MySQL query"};
  //     } else {
  //       returnObj = {"Error" : false, "Message" : "Success", "obj" : obj};
  //     }
      
  //   });
    
  //   return returnObj;
    
  // }));

  // router.post('/', wrapAsync(async function(req) {
  //   const book = new BookType(req.body)
  //   await db.collection('Book').insertOne(book)
  //   return { book }
  // }))

  // router.delete('/:id', wrapAsync(async function(req) {
  //   const { result } = await db.collection('Book').deleteOne({
  //     _id: Archetype.to(req.params.id, ObjectId)
  //   })
  //   return { result }
  // }))

  return router;
  
};