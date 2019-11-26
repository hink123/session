var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

// shortcut to mongoose.connection object
var db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to: ${process.env.DATABASE_URL}`);
});