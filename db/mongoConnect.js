const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://moody:moody123@cluster0.gp2nf.mongodb.net/pet_me', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongo connected");
  // we're connected!
});

module.exports = db;
