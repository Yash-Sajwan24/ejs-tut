const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

let task = ["wake up early", "go to gym"];
let worklist = ["study", "make notes"];

app.get('/', function(req, res){
    let date = new Date();
    const options = {
        weekday: 'long',    
        day: 'numeric', 
        month: 'long', 
    }
    let val = date.toLocaleDateString('en-US', options) ;   

    res.render('list', {dayToday: val, itemAdded: task});
})

app.post('/', function(req, res){
    if(req.body.submitbutton === "Work"){
        worklist.push(req.body.task);
        res.redirect('/work');
    }
    else{
        task.push(req.body.task);
        res.redirect('/');
    }
})

app.get('/work', function(req, res){
    let val = "Work List";
    res.render('list', {dayToday:val, itemAdded: worklist });
    
})


app.listen(process.env.PORT || 3000, function(){
    console.log("the server is running on port 3000");
})