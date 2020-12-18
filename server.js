// import the packages
const express = require('express')
const bcrypt = require('bcrypt')
const app = express()

var users =[]

app.set('view-engine', 'ejs')

// make a get request and render page
app.get('/', function (req,res) {
  res.render('index.ejs', {name: 'Laura'})
})

// make a get request and render page
app.get('/register', function (req, res){
  res.render('register.ejs')
})

// make a get request and render page
app.get('/login', function (req, res){
  res.render('login.ejs')
})

app.post('/login', async function(req, res){
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      first_name: req.body.fname
      last_name: req.body.last_name
      email: req.body.email
      username: req.body.username
      password: hashedPassword
    })
    res.redirect('/login')
  } catch{
    res.redirect('/register')
  }
  console.log(users)
})

// route HTTP POST request to login page
app.post('/login', function (req, res){

})

// start server
app.listen(3000)
