let serve = require('./main/serve.js')
const bodyParser = require("body-parser");
var path = require("path");
const app = serve()

// current hours

// current minutes

// app.get('/', (req, res,next) => {
//     console.log("foo", next)
//     next()
// }, (req, res, next) => {
//     console.log("bar")
//     next()
// });

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(serve.static("public"));



app.get('/', (req, res) => {
    res.writeHead(200)
    res.write('Response from second matching route');
    res.send('hello world');
    res.end();
});

let count =0;
// const time=()=>{
    
// }
app.post('/post',(req,res) => {
    res.writeHead(200)
    res.write('Data from post :)');
    // console.log(app);
//     const dateObject = new Date();

//     let hours = dateObject.getHours();
// let minutes = dateObject.getMinutes();
// let seconds = dateObject.getSeconds();

    // console.log(`${count}................${hours}:${minutes}:${seconds}`);
    // count++;
    const header = req.rawHeaders;
    for( let i=0; i<header.length; i++ ) {
        var str = header[i];

        if( str[0]=='M' ) console.log(str);
    }
    
    res.end();
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))