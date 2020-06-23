var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var fs = require("fs");
let middleware = require('./middleware');

var app = express();
var cors = require('cors');
var jsonParser = bodyParser.json();

app.use(cors());
app.use(cookieParser());

app.get("/api/comps", function(req, res){

    var content = fs.readFileSync("comps.json", "utf8");
    var comps = JSON.parse(content);
    
    res.status(200).send(comps);
});

//get comp by id
app.get("/api/comps/:id", function(req, res){
      
    var id = req.params.id; //get id
    var content = fs.readFileSync("comps.json", "utf8");
    var comps = JSON.parse(content);
    var comp = null;

    //searsch comp by id
    for(var i=0; i<comps.length; i++){
        if(comps[i].id==id){
            comp = comps[i];
            break;
        }
    }

    //send comp
    if(comp){
        res.send(comp);
    }
    else{ 
        res.sendStatus(404);
    }
});

//add comp
app.post("/api/comps", jsonParser, middleware.checkToken, function (req, res) {

    if(!req.body) 
        return res.sendStatus(400);
    
    var comp = {mark: req.body.mark, model: req.body.model, year: req.body.year};
     
    var data = fs.readFileSync("comps.json", "utf8");
    var comps = JSON.parse(data);
     
    //search max id
    var id = Math.max.apply(Math,comps.map(function(o){return o.id;}))
    //inc it
    comp.id = id+1;
    //add comp
    comps.push(comp);
    var data = JSON.stringify(comps);
    //rewrite file
    fs.writeFileSync("comps.json", data);
    res.send(comp);
});

//delete by id
app.delete("/api/comps/:id", function(req, res){
      
    var id = req.params.id;
    var data = fs.readFileSync("comps.json", "utf8");
    var comps = JSON.parse(data);
    var index = -1;

    //search comp index
    for(var i=0; i<comps.length; i++){
        if(comps[i].id==id){
            index=i;
            break;
        }
    }

    if(index > -1){
        //delete comp 
        var comp = comps.splice(index, 1)[0];//deleted element
        var data = JSON.stringify(comps);
        fs.writeFileSync("comps.json", data);
        //send deleted comp
        res.send(comp);
    }
    else{
        res.status(404).send();
    }
});

//modify comp
app.put("/api/comps", jsonParser, middleware.checkToken, function(req, res){
      
    if(!req.body) 
        return res.sendStatus(400);
     
    var compId = req.body.id;     
    var data = fs.readFileSync("comps.json", "utf8");
    var comps = JSON.parse(data);
    var comp;
    console.log(compId);

    for(var i=0; i<comps.length; i++){
        if(comps[i].id==compId){
            comp = comps[i];
            break;
        }
    }
    //modify data
    if(comp){
        comp.mark = req.body.mark;
        comp.model = req.body.model;
        comp.year = req.body.year;
        var data = JSON.stringify(comps);
        fs.writeFileSync("comps.json", data);
        res.status(200).send();
    }
    else{
        res.status(404).send(comp);
    }
});


//authorization
app.post("/api/authorize", jsonParser, function (req, res) {
    if(!req.body) 
        return res.sendStatus(400);
     
    var login = req.body.login;
    var password = req.body.password;
     
    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
     
    var searchResult = users.filter(user => (user.login === login));
    if (searchResult.length > 0){
        if (searchResult[0].password === password){
            var uToken = middleware.createToken(searchResult[0].login);
            console.log("User "+login+" sign in");
            res.setHeader("Set-Cookie",`jwt=${uToken}`);
            res.status(200).send(JSON.stringify({nick : searchResult[0].nick, token : uToken}));
        }else{
            console.log("wrong password for "+login)
            return res.sendStatus(401);
        }
    }
    else{
        console.log("User not found(404)");
        return res.sendStatus(404);//conflict
    }
});

//register user
app.post("/api/register", jsonParser, function (req, res) {
    if(!req.body) 
        return res.sendStatus(400);
     
    var newUser = {nick: req.body.name, login: req.body.login, password: req.body.password};
     
    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
     
    //add book
    if (users.filter(user => (user.login === newUser.login)).length == 0){
        var uToken = middleware.createToken(newUser.login);

        console.log("User "+newUser.login+" was register");
        users.push(newUser);
        var data = JSON.stringify(users);
        //rewrite file
        fs.writeFileSync("users.json", data);
        res.setHeader("Set-Cookie",`jwt=${uToken}`);
        res.status(200).send({nick : newUser.name, token : uToken});
    }
    else{
        console.log("Register error(409)");
        return res.sendStatus(409);//conflict
    }
});




app.listen(3003, function(){
    console.log("Server started...");
});