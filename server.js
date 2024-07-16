const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const { hash } = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('knex');
const { user } = require('pg/lib/defaults');
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5533,
    user: 'postgres',
    password: '',
    database: 'face-detection',
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
const database ={
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
} 
app.use(bodyParser.json());
app.use(cors());
app.get('/', async(_req, res)=>{
   /* try {
        const data = await knex('tableName').where('condition', req.params.condition);
        res.send(data);
      } catch (error) {
        res.status(500).send(error.message);
      }*/
    res.send(database.users);
})
app.post('/signin',(req, res)=>{
/*bcrypt.compare("hj!987&%",'$2a$10$.x1eL/c.vUkA5ZvLaluWRuK1Z2feivTSZAIKnOkYeX8N0bKAjE8WS',
 function(_err, res) {
    // res == true
    console.log('first guess', res)
});
bcrypt.compare("veggies",'$2a$10$.x1eL/c.vUkA5ZvLaluWR  uK1Z2feivTSZAIKnOkYeX8N0bKAjE8WS' , function(_err, res) {
    // res = false
    console.log('second guess', res)
});*/
db.select('email','hash').from('login')
.where('email', '=', req.body.email)
.then(data=>{
    const isValid =bcrypt.compareSync(req.body.password, data[0].hash);
if (isValid){
    return db.select('*').from('users')
    .where('email', '=', req.body.email)
    .then(user=>{
    res.status(user[0])
})
   /* if (req.body.email === database.users[0].email && req.body.password === dat\\abase.users[0].password){
    res.json('success');
}else {*/
.catch(_err =>res.status(400).json('unable to get user'))
}else {
 res.status(400).json('error loggging in');
} 
})
.catch(_err =>res.status(400).json('unable to get user'));
})

app.post('/signup', signup.handleSignup)

app.get('/profile/:id',(req, res)=> {
    const { id }= req.params;
    /*database.users.forEach(user => { //forEach
        if(user.id === id){
         found = true;   
        return res.json(user);
}
    })*/
db.select('*').from('users').where({ id })
.then(user =>{
    //console.log(user)
    if (user.length) {
        res.json(user[0])
}else{
    res.status(400).json('not found')
}
})
   .catch(err => res.status(400).json('error getting user'))
})
app.put('/image',(req, res)=> {
    const { id }= req.body;
  /*  let found = false;
    database.users.forEach(user => { //forEach
        if(user.id === id){
         found = true; 
       user.entries++    
        return res.json(user.entries);
}
    })
    if (!found){
    res.status(404).json('not found');
}*/
db.where('id', '=', id) 
.increment('entries', 1)
.returning('entries')
.then(entries => {
  // If you are using knex.js version 1.0.0 or higher this now returns an array of objects. Therefore, the code goes from:
  // entries[0] --> this used to return the entries
  // TO
  // entries[0].entries --> this now returns the entries
  res.json(entries[0].entries);
})
.catch(err => res.status(400).json('unable to get entries'))
})
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
app.listen(3000, ()=> {
    console.log('app is running on a port 3000')
});

/*
-->res = this is working
-->signin = post= sucess/fail
-->signup = post= user
-->profile/userid = get= user
-->image = put= user
 */