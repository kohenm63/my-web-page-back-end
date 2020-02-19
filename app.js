//jshint esversion: 6
const express = require('express');
const bodyParser = require ('body-parser');
const request = require ('request');
 require('dotenv/config');

//mailchimp members requirements(array of objects):
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName,   
            }
        }]
    };
    

    var jsonData = JSON.stringify(data);
    var options = {
      url: process.env.URL,
      method: "POST",
      headers: {
        Authorization: process.env.API,
      },
      body: jsonData
    };

    request(options, function (error, response, body) {
if (error) {
    res.sendFile(__dirname + "/failure.html") 
    
} else {
  if (response.statusCode===200){
        res.sendFile(__dirname + "/success.html");
  }  else{
      res.sendFile(__dirname + "/failure.html");
  }
}

    });

});



//redirect to home route if signing up failes

app.post("/failure", function (req, res) {
   res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log ("server is running on port 3000 ");
} );






