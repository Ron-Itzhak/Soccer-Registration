var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// my imports  
const routesUrls = require('./routes/routes');
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv')
var session = require('express-session')

dotenv.config()


//connect to Database with mongoose
mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log("DataBase Connected"))
app.use(express.json())
app.use(cors())
app.use(session({secret:process.env.DATABASE_SECRET,resave:false,saveUninitialized:true}));
app.use('/',routesUrls);
//changed from false to true
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//session 



const rules = require('./models/rules')
app.get('/rules',(req,res)=>{

    console.log(rules);
    res.send(rules);
});

/////////////
//heroko upload video https://www.youtube.com/watch?v=xwovj4-eM3Y
var testAPIRouter = require('./routes/testAPI');
app.use("/testAPI",testAPIRouter);
app.use(express.static(path.join(__dirname, '/../client/build')));
//app.use(express.static(path.join(__dirname, 'public')));

//dosnet work 
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname+'/../client/src/index.js'));
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));


app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
