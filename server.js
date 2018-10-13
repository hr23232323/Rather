var port = 8080;
var session = require('client-sessions');
var moment = require('moment');

const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var validator = require('validator');
const functions = require('./functions.js')
 

// initialize our express app
const app = express();

//a4-database
MongoClient.connect(`mongodb://admin:a4-database@ds117423.mlab.com:17423/a4-database`, (err, client) => {
  if (err) return console.log(err)
  db = client.db('a4-database')
  app.listen(process.env.PORT || port, () => {
    console.log('Server is up and running on port number ' + port);
});
})




app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    cookieName: 'session',
    secret: 'this_is_a_random_string',
    duration: 30 * 60 * 1000, // 30 minutes
    activeDuration: 10 * 60 * 1000, // 10 minutes
    httpOnly: true,
    secure: true,
    ephemeral: true
}));

// Display webapages
app.get('/', (req, res) => {
    if(req.session.user === undefined){
        console.log('no session active')
        res.sendFile(__dirname + '/public/index.html') 
    } else {
        console.log('session active!')
        res.redirect('/login')
    }

})

app.get('/logout', (req, res) => {
    req.session.reset();
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/login', (req, res) => {
    if(req.session.user === undefined){
        console.log('no session active')
        res.sendFile(__dirname + '/public/index.html') 
    } else {
        res.sendFile(__dirname + '/public/home.html')
        //console.log(req.session.user)
    }
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html')
})

app.get('/public/js/scripts.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/scripts.js')
})

app.get('/public/js/scripts2.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/scripts2.js')
})

app.get('/public/js/scripts3.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/scripts3.js')
})

app.get('/public/js/error-scripts.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/error-scripts.js')
})

app.get('/public/js/error-scripts2.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/error-scripts2.js')
})

app.get('/public/js/scroll-entrance.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/scroll-entrance.js')
})

app.get('/public/css/style.css', (req, res) => {
    res.sendFile(__dirname + '/public/css/style.css')
})

app.get('/bulma', (req, res) => {
    res.redirect('https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css')
})

app.get('/public/css/style_general.css', (req, res) => {
    res.sendFile(__dirname + '/public/css/style_general.css')
})

app.get('/harshrana.com', (req, res) => {
    res.redirect('https://www.harshrana.com')
})

app.get('/vote/:id', (req, res) =>{
    res.sendFile(__dirname + '/public/vote.html')
})

app.get('/questionData/:id', (req, res) => { 
    console.log('asked for Question Data!')
    questionId = req.params.id
    db.collection('posts').findOne({ "_id":ObjectId(questionId)}, function(err, post) {
        if (err) return console.log(err)
        console.log(post)
        if(post.voted.includes(req.session.user.username)){
            console.log('already voted :/')
            post.allowedToVote = false
        } else{
            console.log('Good to vote!')
            post.allowedToVote = true
        }
        //res.send()
        res.end(JSON.stringify(post))
    })
})

app.get('/dataApp', (req, res) => { 
    //console.log('asked for data!')
    
    db.collection('posts').find().sort({date: -1}).toArray(function(err, docs) {

        docs = docs.slice(0, 15);
        res.end(JSON.stringify(docs))
    })
})

app.get('/userData', (req, res) => { 
    res.end(req.session.user.username)
})

// User Authentication
// Create new user
app.post('/newUser', (req, res) => {
    if(req.body.username && req.body.password && req.body.email){
        req.body.username = req.body.username.toLowerCase();
        // Data validation
        if(functions.checkUsername(req.body.username) && functions.checkPassword(req.body.password) && functions.checkEmail(req.body.email)){
            db.collection('users').findOne({ username:req.body.username}, function(err, user) {
                if(user === null){
                    db.collection('users').save(req.body, (err, result) => {
                        if (err) return console.log(err)

                        console.log('saved to database')
                        res.redirect('/')
                    })
                } else {
                    res.status(409).send({ error: "Username already taken" });
                    res.end();
                }
            })
            
        } else{
            // One of the three inputs was bad
            console.log('something is up')
        }
    } else {
        console.log("Bad input")
        res.redirect('/')
    }
});

// Login user
app.post('/login', (req, res) =>{
    if(req.body.username && req.body.password){
        req.body.username = req.body.username.toLowerCase();
        db.collection('users').findOne({ username:req.body.username}, function(err, user) {
            if(user === null){
                // Username wrong
                res.status(401).send({ error: "Wrong username/password" });
                res.end();
            } else if (user.username === req.body.username && user.password === req.body.password){
                // User found and credentials are correct
                console.log("found user!!")
                req.session.user = user;
                res.redirect('/login')
            } else {
                // User found but password wrong
                res.status(401).send({ error: "Wrong username/password" });
                res.end();
            }
        })
    } else{
        // Form data invalid
        console.log("Invalid data");
        res.redirect('/')
    }
})

// New Post
app.post('/newPost', (req, res) =>{
    if(req.body.question && req.body.answer1 && req.body.answer2 && req.body.answer){
        var post = new Object;
        let now = moment();
        var formatted = now.format('YYYY-MM-DD HH:mm:ss');
        post.date = formatted;
        post.username = req.session.user.username;
        post.question = req.body.question;
        post.answer1 = req.body.answer1;
        post.answer2 = req.body.answer2;
        if(req.body.answer == 'answer1'){
            post.vote1 = 2;
            post.vote2 = 1
        } else{
            post.vote1 = 1;
            post.vote2 = 2;
        }
        post.voted = new Array()
        post.voted.push(req.session.user.username)
        
        db.collection('posts').save(post, (err, result) => {
                        if (err) return console.log(err)

                        console.log('post saved to database')
                        res.redirect('/login')
                    })
    } else{
        console.log('fill all inputs')
        res.redirect('/login')
    }
})

// New Post
app.post('/upvote', (req, res) =>{
    
    if(req.body.answer){
        console.log(req.body.voted)
        if(req.body.answer == 'answer1'){
            db.collection('posts').updateOne({ "_id":ObjectId(questionId)}, {
                $inc:{
                    vote1: 1
                }
            })
        } else {
            db.collection('posts').updateOne({ "_id":ObjectId(questionId)},{
             
             $inc:{
                    vote2: 1
                  }
             })
                        }
            db.collection('posts').updateOne({ "_id":ObjectId(questionId)},{
                $push:{voted: req.session.user.username}
            })
             res.redirect('/login')
        
    } else{
        console.log('fill all inputs')
        res.redirect('/login')
    }
})


