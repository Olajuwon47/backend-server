  const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const { hash } = require('bcrypt-nodejs');
const cors = require('cors')
const app = express();
app.use(express.json());
const database ={
    users:[
       {
        id:'123',
        name:'jay',
        email:'jay@gmail.com',
        password:'ola9!56&%',
        entries:0,
        joined: new Date()
       }, 
       {
        id:'45',
        name:'lola',
        email:'lola@gmail.com',
        password:'6$la!56&%',
        entries:0,
        joined: new Date()
       }, 
       {
        id:'39',
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
app.use(cors())
app.get('/',(_req, res)=>{
    res.send(database.users);
})
app.post('/signin',(req, res)=>{
/*bcrypt.compare("hj!987&%",'$2a$10$.x1eL/c.vUkA5ZvLaluWRuK1Z2feivTSZAIKnOkYeX8N0bKAjE8WS',
 function(_err, res) {
    // res == true
    console.log('first guess', res)
});
bcrypt.compare("veggies",'$2a$10$.x1eL/c.vUkA5ZvLaluWRuK1Z2feivTSZAIKnOkYeX8N0bKAjE8WS' , function(_err, res) {
    // res = false
    console.log('second guess', res)
});*/
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    res.json('success');
}else {
    res.status(400).json('error loggging in');
}
})

app.post('/signup',(req, res)=>{
    const {email, name, password} =req.body;
   bcrypt.hash(password, null, null, function(_err, hash) {
        // Store hash in your password DB.
        console.log(hash);
    });
    database.users.push({
        id:'39',
        name:name,
        email:email,
        password:password,
        entries:0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-2])
})

app.get('/profile/:id',(req, res)=> {
    const { id }= req.params;
    let found = false;
    database.users.map(user => { //forEach
        if(user.id === id){
         found = true;   
        return res.json(user);
}
    })
    if (!found){
    res.status(404).json('not found');
}
})
app.post('/image',(req, res)=> {
    const { id }= req.body;
    let found = false;
    database.users.map(user => { //forEach
        if(user.id === id){
         found = true; 
       user.entries++    
        return res.json(user.entries);
}
    })
    if (!found){
    res.status(404).json('not found');
}
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