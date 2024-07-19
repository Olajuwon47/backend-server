const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('knex');
const signup=require('./controller/signup.js');
const signin=require('./controller/signin.js');
const profile= require('./controller/profile.js');
const image= require('./controller/image.js');
const db = knex({
  client: 'pg',
connection: {
  connectionString: process.env.DATABASE_URL,
  ssl:{rejectUnauthorized:false},
  host:process.env.DATABASE_HOST,
  port: 5432,
  user:process.env.DATABASE_USER ,
  password: process.env.DATABASE_PW,
  database: process.env.DATABASE_DB,
},
userParams: {
  userParam1: '451',
},
});
/*db.select('*').from('users').then(data =>{
   console.log(data);
});*/

const app = express();
app.use(express.json());
/*const database ={
    users:[
       {
        id:'11',
        name:'jay',
        email:'jay@gmail.com',
        password:'ola9!56&%',
        entries:0,
        joined: new Date()
       }, 
       {
        id:'12',
        name:'lola',
        email:'lola@gmail.com',
        password:'6$la!56&%',
        entries:0,
        joined: new Date()
       }, 
       {
        id:'13',
        name:'duppy',
        email:'duppy@gmail.com',
        password:'hj!987&%',
        entries:0,
        joined: new Date()
       }, 
    ],
    login:[
        {
            id:'980',
            hash:'',
            email:'lola@gmail.com'
        }
    ]
}*/ 
app.use(bodyParser.json());
app.use(cors());
app.get('/',(_req, res)=>{
   /* try {
        const data = await knex('tableName').where('condition', req.params.condition);
        res.send(data);
      } catch (error) {
        res.status(500).send(error.message);
      }*/
    res.send('It is working!!')})
app.post('/signin',signin.handleSignin (db, bcrypt ))
app.post('/signup',(req, res)=>{ signup.handleSignup (req, res, db, bcrypt )})
app.get('/profile/:id',(req, res)=> {profile.handleProfileGet(req, res, db)})
app.put('/image',(req, res)=> {image.handleImage(req, res, db)})
app.post('/imageurl',(req, res)=> {image.handleApicall(req, res, db)})
//bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
//});

/*// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/
app.listen(process.env.port|| 3000, ()=> {
    console.log('app is running on port ${process.env.port}')
});

/*
-->res = this is working
-->signin = post= sucess/fail
-->signup = post= user
-->profile/userid = get= user
-->image = put= user
 */