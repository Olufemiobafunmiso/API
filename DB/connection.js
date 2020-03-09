const mongoose = require('mongoose');

const URI ="mongodb+srv://new-user_31:new-user_31@nodeapi-n5ww8.mongodb.net/test?retryWrites=true&w=majority";
;

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;