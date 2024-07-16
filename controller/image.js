 const handleImage=(req, res, db)=> {
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
db('users').where('id', '=', id) 
.increment('entries', 1)
.returning('entries')
.then(entries => {
  // If you are using knex.js version 1.0.0 or higher this now returns an array of objects. Therefore, the code goes from:
  // entries[0] --> this used to return the entries
  // TO
  // entries[0].entries --> this now returns the entries
  res.json(entries[0]);
})
.catch(err => res.status(400).json('unable to get entries'))
}
module.exports={
    handleImage
    };