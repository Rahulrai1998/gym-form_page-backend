const express = require("express");
const fs = require("fs")
const path = require("path");
const app = express();
const port = 80;

app.use('/static',express.static('static'));
app.use(express.urlencoded())
app.set('view engine','pug');
app.set('views',path.join(__dirname , 'views'));

//end-points
app.get('/',(req,res)=>{
    res.status(200).render('index.pug' , {'title':'pug is awesome','content':'This is paragraph'});

});

app.post('/',(req,res)=>{
    let formInfo = req.body;
    let name = formInfo.name;
    let age = formInfo.age;
    let gender = formInfo.gender;
    let address = formInfo.address;
    let more = formInfo.more;
    let textToWrite = `Hi , Myself ${name} and I am ${age} 
    years old . I am a ${gender} . My address is ${address}
    . ${more}.`
    fs.writeFileSync('myself.text',textToWrite);
    let read = fs.readFileSync('myself.text','utf-8');
    console.log(read);
    const params = {'message':'Your form has been subnitted successfully'}
    res.status(200).render('index.pug',params)
})
app.listen(port,()=> {
    console.log(`Server running at ${port}`);
  });
  