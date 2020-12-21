// import the packages
const express = require('express')
const bcrypt = require('bcrypt')
const alert = require('alert')
const app = express()

// users basic alocation
var users =[]

var login = false
var user_name = 'Desconhecido'
// recognizes ejs
app.set('view-engine', 'ejs')

app.use(express.urlencoded({ extendend: false }))

function logout (){
  login = false
  console.log(login)
  console.log('Clicked')
}

// make a get request and render  first page
app.get('/',  (req,res) => {
  if (login === false){
    res.render('index.ejs', {frase: 'Opss... Restricted area. Login or register yourself to start!', login: login})
  }
  else{
    res.render('index.ejs', {frase: 'Welcome '+user_name+'!', login: login, logout: logout})
  }
})

// make a get request and render register page
app.get('/register',  (req, res) => {
  res.render('register.ejs')
})

// make a get request and render login page
app.get('/login', (req, res) => {
  res.render('login.ejs')
})

// get peoples register information in a secure way
app.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10) //hash password, so it can be stored in safety
  users.push({
    first_name: req.body.fname,
    last_name: req.body.lname,
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword
  })
  res.redirect('/login')
})

// route HTTP POST request to login page
app.post('/login', async (req, res) => {
  var user_valido = false
  for (elem of users){
    if(elem['username'] === req.body.username){
      user_valido = true
      const valid_password = await bcrypt.compare(req.body.password, elem['password']) // check if the passwords match
      if(!valid_password){
        alert('Senha incorreta')
        res.redirect('/login')
      }
      else{
        login = true
        user_name = elem['first_name']+' '+elem['last_name']
        res.redirect('/')
      }
      break;
    }
  }
  if (user_valido === false){
    alert('Usuário inexistente')
    res.redirect('/login')
  }
})

// start server
app.listen(3000)
