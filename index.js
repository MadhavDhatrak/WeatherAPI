import express from "express"
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port =3000;

const yourAPIKey="8acbf286717be320b9da2b212a258e69";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));

 app.set('view engine', 'ejs');
 
app.get("/",(req,res)=>{
   res.render("index",{ content:"waiting for a data..." ,show:false});
});

app.post("/track", async (req, res) => {
   try {
     const city1= req.body.city; 
     const result = await axios.get("https://api.openweathermap.org/data/2.5/weather",{
      params: {
         q:city1,
         appid: yourAPIKey,
       },
     });
     
     const data = result.data;
     console.log(data);
     res.render("index", { data ,show:true });
   } catch (error) {
      res.render("index",{ content:"city not found",show:true });
   }
 });
 
 app.post("/next",(req,res)=>{
     res.redirect("/");
 });
 

app.listen(port,(req,res)=>{
    console.log(`server is runnung on ${port}`);
});





















