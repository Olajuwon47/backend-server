(req, res)=>{
    const {email, name, password} =req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(async loginEmail => {
        const user = await trx('users')
              .returning('*')
              .insert({
                  email: loginEmail[0],
                  name: name,
                  joined: new Date()
              });
          res.json(user[0]);
  /* bcrypt.hash(password, null, null, function(_err, hash) {
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
    })*/
   // res.json(database.users[database.users.length-2])
})
.then(trx.commit)
.catch(trx.rollback)
})
   .catch(err => res.status(400).json('unable to signup' ))
})