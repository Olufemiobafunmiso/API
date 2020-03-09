const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const connectDB = require('./DB/connection');
// const {MongoClient} = require('mongodb');

const app = express();
app.use(morgan("dev"));

// Passport Config
require('./config/passport')(passport);
connectDB();
// DB Config
// const db = require('./config/keys').mongoURI;

// const uri = "mongodb+srv://new-user_31:<password>@nodeapi-n5ww8.mongodb.net/test?retryWrites=true&w=majority";
// const connectDB = async () => {
//   await mongoose.connect(URI, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
//   });
//   console.log('db connected..!');
// };


// const uri = "mongodb+srv://new-user_31:<password>@nodeapi-n5ww8.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })



// mongoose.connect("mongodb+srv://olufemi_31:olufemi_31@nodeapi-n5ww8.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});

// mongoose.connect("mongodb+srv://olufemi_31:olufemi_31@nodeapi-n5ww8.mongodb.net/test?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });


// mongoose.connect('mongodb+srv://dbUser:DBUSER@cluster0-a0sl0.mongodb.net/test?retryWrites=true&w=majority', {
//   useNewUrlParser: true
// })
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('connected to database'))


// const client = new MongoClient(uri);


// async function main(){
//   /**
//    * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//    * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//    */
//   const uri ="mongodb+srv://olufemi:olufemi@myclusterview-sj2k8.mongodb.net/test?retryWrites=true&w=majority";


//   const client = new MongoClient(uri);

//   try {
//       // Connect to the MongoDB cluster
//       await client.connect();

//       // Make the appropriate DB calls
//       await  listDatabases(client);

//   } catch (e) {
//       console.error(e);
//   } finally {
//       await client.close();
//   }
// }


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://olufemi_31:olufemi_31@nodeapi-n5ww8.mongodb.net/test?retryWrites=true&w=majority";
// MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
//   if(err) {
//        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//   }
//   console.log('Connected...');
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });




// main().catch(console.error);
// // EJS
// app.use(expressLayouts);
// app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Express body parser
// app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));