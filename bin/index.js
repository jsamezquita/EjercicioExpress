const ws = require("../wslib.js");
const Joi = require("joi");
const express = require("express");
const http = require("http");
const app = express();

app.use(express.json());

var server = http.createServer(app);
let clients = [
    {id: 1,name:"Nestle"},
    {id: 2,name:"Demen"},
    {id: 3,name:"Basuco"}
]

app.get("/chat/api/messages", (req,res)=>{
    res.send(ws.messages);
});
app.get("/chat/api/messages/:param", (req,res)=>{
    res.send(ws.messages.find((c)=> c.ts === parseInt(req.param.ts)));
});
app.post("/chat/api/messages",(req,res)=>{
    const schema=Joi.object({
        message: Joi.string().min(5).required(),
        author: Joi.string().pattern(new RegExp("(\w.+\s).+")).required(),
        ts: Joi.number().required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        console.log(error);
        return res.status(400).send(error);
    }
    const message = {
        message: req.body.message,
        author: req.body.author,
        ts: Date.now(),
    };
    ws.messages.push(message);
    res.send(message);
})
app.put("/chat/api/messages/:param",(req,res)=>{

    const schema=Joi.object({
        message: Joi.string().min(5).required(),
        author: Joi.string().pattern(new RegExp("(\w.+\s).+")).required(),
        ts: Joi.number().required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        console.log(error);
        return res.status(400).send(error);
    }
    const message = {
        message: req.body.message,
        author: req.body.author,
        ts: Date.now(),
    };
    let index = messages.indexOf((c)=> c.ts === parseInt(req.param.ts));
    ws.messages[index] = message;
    res.send(message);
})
app.listen(3000, ()=>{
    console.log("Listening on port 3000")
});
//
ws.wsConnection;