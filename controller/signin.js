const handleSignin=(db, bcrypt )=>(req, res)=>{
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
    .catch(_err =>res.status(400).json('error loggging in'));
    }
    module.exports={
        handleSignin:handleSignin
        };