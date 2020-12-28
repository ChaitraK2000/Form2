const express = require('express');
const app = express(); 
const server = require("http").Server(app) ;
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const url= "mongodb+srv://Chaitra:yallamma@cluster0.tj9mf.mongodb.net/formdata?retryWrites=true&w=majority"
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const formSchema = new mongoose.Schema(
    {
    data: Object
    },
    {collection: "form"}
    ); 
const Form = mongoose.model("Form", formSchema);

const formData = (bodyData)=>{
    Form ({data:bodyData}).save((err) => {
        if(err) {
            throw err;
        }
    });
};
const urlencodedParser = bodyParser.urlencoded({ extended: false });
                                                                                                                                
app.set("view engine", "ejs"); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
app.get("/", (req, res)=>{  
    res.render("index"); 
});    
app.get("/Thanks",(req,res)=>{
    res.render("Thanks");
});
app.post("/",urlencodedParser, (req,res)=>{
    formData(req.body);
    res.redirect("/Thanks");
});

server.listen(3030);