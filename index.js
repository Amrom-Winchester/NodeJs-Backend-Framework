let serve = require('./main/serve.js')
const bodyParser = require("body-parser");
var path = require("path");
let fs=require('fs');
const app = serve()

app.get('/', (req, res) => {
    res.writeHead(200)
    res.write('Response from second matching route');
    res.send('hello world');

    res.end();
});

app.post('/post',(req,res) => {
    console.log(req.socket.address().family);
    console.log(req.socket.address().address);
    console.log(req.connection.remoteAddress); 
    console.log(req.ip); 
    // req.ip || req.connection.remoteAddress || 'null'
    res.writeHead(200, {'Content-Type': 'text/plain', 'Link': 'rel="shortcut icon" href="#"'} );
    res.write('Data from post :)');
    res.end();
})


app.get('/html',(req,res)=>{
    res.sendFile("./index2.html");
})




app.listen(3000, () => console.log('Example app listening on port 3000!'))