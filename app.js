const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let items = ["buy food", "take food", "eat food"]
let workItems = []

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js")
const mongoose = require("mongoose")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true})

app.set('view engine', 'ejs');

const itemSchema = {
    name: String
}
const Item = mongoose.model("Item", itemSchema)

const item1 = new Item({
    name: "Welcome to the todolist"
})
const item2 = new Item({
    name: "Hit the + button to add to your list"
})
const item3 = new Item({
    name: "<-- Hit this to delete and item"
})
const defaultItems = [item1, item2, item3]



app.get("/", function(req, res) {

    Item.find({}, function(err, foundItems){
        if(foundItems.length === 0){
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                } else{
                    console.log("success")
                }
            })
            res.redirect("/")
        } else{
            res.render("list", { listTitle: "Today", newListItems: foundItems})

        }


        // return foundItems
    })
    
    let day = date.getDate()
    // let day = date.getDay()

    // How to format a js date
    // var currentDay = today.getDay()
    // var day = ""
    // if (currentDay === 6 || currentDay === 0) {
    //     day = "weekend"
    // } else {
    //     day = days[currentDay]
    // }
    // res.render("list", { listTitle: "Today", newListItems: foundItems})
})
app.post("/", function(req, res) {
    const itemName = req.body.newItem;

    const item = new Item({
        name: itemName
    })
    item.save()
    res.redirect("/")

    // if(req.body.list == "Work"){
    //     workItems.push(item)
    //     res.redirect("/work")
    // } else{
    //     items.push(item)
    //     res.redirect("/")
    // }
    // console.log(req.body.list)


    
    // items.push(item)
    // res.redirect("/")
})

app.post("/delete", function(req, res){
     

})

// app.post("/work", function(req, res) {
//     let item = req.body.newItem
   
//     workItems.push(item)
//     res.redirect("/work")

// })
app.get("/work", function(req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems })

})

app.get("/about", function(req, res){
    res.render("about")
})

// ejs checks in a file called views so you will need to create it 

app.listen(3000, function() {
    console.log("server is up and running");
})
