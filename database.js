
//jshint esversion:6
//"use strict";
// database.js
function connectDB() {
  const mongoose = require('mongoose');
  const url = "mongodb://localhost:27017";
  mongoose.connect("mongodb://localhost:27017/dailyPostDB",
        {useNewUrlParser: true, useUnifiedTopology: true});
  const dailyPostSchema = new mongoose.Schema (
    { title: {
      type:String,
      required:[true,"No name provided"]
      },
      content:{
        type:String,
        min:1,
        max:1000
      }
    }
  );
  const Post = mongoose.model('dailyPost', dailyPostSchema,'dailyposts');
  console.log('connectDB');
};

function disconnectDB() {
  mongoose.connection.close();
};

function addToDB(newPost) {
  //connectDB();
  const mongoose = require('mongoose');
  var options =  {useNewUrlParser: true, useUnifiedTopology: true}
  mongoose.connect("mongodb://localhost:27017/dailyPostDB",
        options);
   dailyPostSchema1 = new mongoose.Schema (
    { title: {
      type:String,
      required:[true,"No name provided"]
      },
      content:{
        type:String,
        min:1,
        max:300
      }
    });

  var Dailypost = mongoose.model("Dailypost", dailyPostSchema1,'dailyposts');
  newpost = new Dailypost({title: newPost.title,content: newPost.content});
  newpost.save().then(() => console.log('new post added '));

  //post.save(function (err) {
  //  if (err) { return handleError(err);
  //  }  else {
  //    console.log("post added");
  //    mongoose.connection.close();
  //   }
  //});
  //post.save().then(() => console.log('post added to DB '));
 //mongoose.connection.close();

 //mongoose.connection.close(function () {
//    console.log('Mongoose disconnected on app termination');
//    process.exit(0);
//  });
return 0;
};

function getOneFromDB(key) {
  console.log('getOneFromDB');
  getOneFromDB = 0;
  return getOneFromDB;
};

function getAllFromDB() {
  console.log('getAllFromDB');
  const mongoose = require('mongoose');
  mongoose.connect("mongodb://localhost:27017/dailyPostDB",
        {useNewUrlParser: true, useUnifiedTopology: true});
   dailyPostSchema = new mongoose.Schema (
    { title: {
      type:String,
      required:[true,"No name provided"]
      },
      content:{
        type:String,
        min:1,
        max:300
      }
    }
  );
 var allpost = mongoose.model("Dailypost", dailyPostSchema,'dailyposts');
 allpost.find(function(err,oldPost){
   if ( err ){
     console.log(err);
     mongoose.connection.close();
   }
   else {
     //console.log(oldPost);
     oldPost.forEach(function(post){
     console.log(post.title);
     console.log(post.content);
     })
   }
 });
 mongoose.connection.close();
  getAllFromDB=0;
  return getAllFromDB;
};
module.exports = { addToDB,getOneFromDB,getAllFromDB };
