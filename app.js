const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const express = require('express');
const flash = require('connect-flash');
const pageRoute = require('./routes/pageRoutes');
const courseRoutes = require('./routes/courseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const methodOverride = require('method-override');
const app = express();

//Connect DB
mongoose
  .connect('mongodb+srv://dbUser:ex.dbUserPassword@cluster0.jdbe7.mongodb.net/?retryWrites=true&w=majority&appName=smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  });

//Template Engine
app.set('view engine', 'ejs');

//GLOBAL VARIABLE
global.userIN = null;
//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
  }),
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  }),
);
//Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);

const port = process.env.PORT || 5000 ;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
