const express = require('express');
const app = express(); // powers the app
const path = require('path'); // path
const exphbs = require('express-handlebars'); // handling handlebars
const mongoose = require('mongoose'); // ODM(object document mapper)
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cms', { useNewUrlParser: true } ).then((db)=>{
    console.log('Mongo Connected!!');
}).catch(error=>console.log(error)); // making connection to your database






const {select} = require('./helpers/handle-helpers');
// Middleware
// set static files
app.use(express.static(path.join(__dirname,'public'))); // generate static files

// Set view engine
app.engine("handlebars",exphbs({defaultLayout:'home', helpers:{select:select}}));
app.set('view engine', 'handlebars');

// upload Middleware
app.use(upload());

// body Parser
app.use(bodyParser.urlencoded({
    extended :true,
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// 
// Load Urls/Routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts'); // posts.js
    app.use('/', home); // home urls
    app.use('/admin', admin); // admin urls
    app.use('/admin/posts', posts); // posts url
app.listen(8000, ()=>{
    console.log(`
    Starting App..
    Listening on port 8000
    `)
});  