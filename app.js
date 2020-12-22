const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require('mongoose');



const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB" , {useNewUrlParser:true});


const itemsSchema={
  name:String
};

const Item=mongoose.model("Item",itemsSchema);

const item1 = new Item({
  name:"Welcome your. to list"
});

const item2 = new Item({
  name:"Hit the bottom to add your list"
});

const item3 = new Item({
  name:"Hit the delete an item"
});

app.get("/", function(req, res) {

  Item.find({},function(err,foundItems){

    if(foundItems.length===0){
      Item.insertMany(defaultItems,function(err){
      if (err){
        console.log(err)

      }else{
        console.log("SAVED>>>>>>")
      }
    });
    res.redirect("/");
    }else{
      res.render("list", {listTitle: "Today" ,newListItems: foundItems});

    }
  
  });

  
});

const defaultItems= [item1,item2,item3];

// Item.insertMany(defaultItems,function(err){
//   if (err){
//     console.log(err)

//   }else{
//     console.log("SAVED>>>>>>")
//   }
// })

app.post("/",function(req,res){

  const item = req.body.newItem;
 
  

});
app.get("/work", function(req,res){
  res.render("list",{listTitle:"Work List",newListItems:workItems});
});



app.get("/about", function(req,res){
  res.render("about")
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
