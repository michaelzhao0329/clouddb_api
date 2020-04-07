//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require('mongoose');

const date=require(__dirname + "/date.js")
const day = date.getDate();
//const day = date.getWeekDay();
var posts=[];
var post={};

//const dbf=require(__dirname + "/database.js")

mongoose.connect("mongodb+srv://mizhao:Test123@cluster0-4ifyo.mongodb.net/blogDB?retryWrites=true&w=majority",
            {useNewUrlParser: true, useUnifiedTopology: true });
const postSchema = {
             title: String,
             content: String
            };

const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "After worked as database developer so many year, I am intersting in Web Development and NonSQL database like Mongo DB";
const aboutContent   = "This is my personal blog created by HTML/CSS,node js...Javascript and Mongo clouding db etc.";
const contactContent = "You can reach me via my code  https://github.com/michaelzhao0329/clouddb_app   https://github.com/michaelzhao0329/weather_api  https://github.com/michaelzhao0329/clouddb_app2";
const composeContent = ""

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(express.static(__dirname + '/public'));
app.use("/styles",  express.static(__dirname + '/public/css'));
app.use("/scripts", express.static(__dirname + '/public/javascripts'));
app.use("/images",  express.static(__dirname + '/public/images'));

app.get('/', function (req, res) {
    let posts = [];
    Post.find({}, function(err, posts){
       res.render("home", {date:day,
         homeStartingContent: homeStartingContent,
         allPosts: posts
       });
     })
    //res.render("home",{date:day,homeStartingContent:homeStartingContent,allPosts:posts});
});

app.post("/",function(req,res){
   post = {
    title:req.body.newTitle,
    content:req.body.newPost
  };
  //console.log(post);

  if ( req.body.list === "compose") {
    const post_1 = new Post ({
      title:req.body.newTitle,
      content:req.body.newPost
    });
    post_1.save()
    posts.push(post);
    res.redirect("/");
  } else {
    posts.push(post);
    res.redirect("/");
  }
});

app.get('/contact', function (req, res) {
    res.render("contact",{date: day,contactContent:contactContent});
});

app.get('/about', function (req, res) {
    res.render("about",{date: day,aboutContent:aboutContent});
});

app.get('/compose', function (req, res) {
    res.render("compose",{date: day,pageName: "compose",composeContent:composeContent});
});

//app.get(decodeURI('/posts/:postName'), function (req, res) {
app.get("/posts/:postId", function(req, res){
  //console.log(req.params.postName);
  //const requestTitle = _.lowerCase(_.kebabCase(req.params.postName));
  const requestedPostId = req.params.postId;

  //posts.forEach(function(element){
  //  const storedTitle = _.lowerCase(_.kebabCase(element.title));
  //  const storedPost = [];
  //  if ( requestTitle === storedTitle ) {
  //      console.log("title matched:" + requestTitle + ":" + storedTitle);
  //      storedPost.push(element);
  //      res.render("post",{date: day,storedPost: storedPost});
  //    } else {
  //      console.log("title not matched:" + requestTitle + ":" + storedTitle);
  //      //res.redirect("/");
  //    }
  //})
  Post.findOne({_id: requestedPostId}, function(err, post){
    const storedPost = [];
    storedPost.push({title: post.title,
    content: post.content
    });
    res.render("post",{date: day,storedPost: storedPost});
  });
//  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
