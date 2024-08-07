 const handleSignup=(req, res, db, bcrypt)=>{
    const {email, name, password} =req.body;
    if(!email|| !name|| !password){
      return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
              .returning('*')
              .insert({
                // If you are using knex.js version 1.0.0 or higher this now returns an array of objects. Therefore, the code goes from:
            // loginEmail[0] --> this used to return the email
            // TO
            // loginEmail[0].email --> this now returns the email
                  email: loginEmail[0],
                  name: name,
                  joined: new Date()
              })
          .then( user=> {
          res.json(user[0]);
  /* bcrypt.hash(password, null, null, function(_err, hash) {
         Store hash in your password DB.
        console.log(hash);
    });
    database.users.push({
        id:'39',
        name:name,
        email:email,
        password:password,
        entries:0,
        joined: new Date()
    })*/
   // res.json(database.users[database.users.length-2])
})
.then(trx.commit)
.catch(trx.rollback)
})
   .catch(err => res.status(400).json('unable to signup' ))
})
}
module.exports={
    handleSignup:handleSignup
    };