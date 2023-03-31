const express = require("express");
const app = express();
const port = 3000;
const date = require(__dirname + "/date.js");
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// Set that all templates are located in `/views` directory. Not required as it is the views directory by default
// app.set('views', __dirname + '/views');

// Set template engine and default file extension to ejs
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    let day = date.getDate();

    // var currentDay = today.getDay();
    // var day = "";

    // if (currentDay === 6 || currentDay === 0) {
    //     day = "weekend";
    // } else {
    //     day = "weekday";
    // }

    // switch(currentDay) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    //     default:
    //         console.log("Error - current day is equal to: " + currentDay);
    // }

    // render will look inside the 'views' folder and look for the specified filename with a .ejs extension
    res.render("list", {listTitle: day, newListItems: items});
})

app.post("/", function(req, res){
    var item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }



})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", function(req, res){
    res.render("about");
})

app.listen(port, function(){
    console.log("Server is running on port 3000");
})