const { request } = require("express");
const express = require("express");
const app = express();
const port = 3000;
const request1 = require('request')

const {initializeApp , cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./ServiceAccountKey.json");
                   

initializeApp({
    credential: cert(serviceAccount)
})
const math=
{
  add:function(a,b)
  {
    return a+b;
  }
}
const db = getFirestore(); 
app.set('view engine','ejs');


app.get("/",(req,res)=>{
    res.render('home')
});

app.get("/register",(req,res)=>{
    res.render('register')
 });

 app.get("/signin",(req,res)=>{
    const user = req.query.Fname;
    const pass = req.query.pwwd;
    db.collection('todo').where('Name','==',user).where('passWord','==',pass).get().then((docs)=>{
        if(docs.size>0){
            res.render("home1")
        }
        else{
            res.render("loginfail");
        }
    });

 });


 

 app.get('/signup',function(req,res) {
    console.log(req.query.MailId)
    console.log(req.query.FFname);
    
   db.collection('todo').add({
        email:req.query.MailId,
        Name:req.query.FFname,
        passWord:req.query.pwd
    })
    .then(()=>{
        res.send("Signup successfully")
    });
});

 
app.get("/home1",function(req,res){
    res.render("home1");
  });
  app.get("/vegetable",function(req,res){
    res.render("vegetable");
  });
  
  app.get("/flower",function(req,res){
    res.render("flower");
  });
  app.get("/fruits",function(req,res){
    res.render("fruits");
  })
  app.get("/bonsai",function(req,res){
    res.render("bonsai");
  })
  app.get("/homedecor",function(req,res){
    res.render("homedecor");
  })
  app.get("/contact",function(req,res){
    res.render("contact");
  })
  app.get("/about",function(req,res){
    res.render("about");
  })
  
  const arr=[];
  const costs=[];
  var amount=0;
  app.get("/addedToCart",(req,res)=>{
    const val=req.query.item;
    var c=req.query.cost;
    costs.push(c);
    c=eval(c.slice(0,c.length-2));
    console.log(c);
    amount=math.add(amount,c);
    arr.push(val);
    
  });
  app.get("/cart",(req,res)=>{
    if(typeof(arr) != "undefined"){
      db.collection("cart").add({
        Cart : arr,
        Costs : costs,
        TotalCost : amount,
      }).then(()=>{
        res.render("cart",{booksData : arr, amount : amount, costs : costs});
      });
    }
  });

 


app.listen(port ,() =>{
    console.log("example app running $(port)")
});
