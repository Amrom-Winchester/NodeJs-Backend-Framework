var fs=require('fs');
var os=require('os');

const logger = (rtrip,info)=>{
    if(rtrip.length < 1 || info.length < 2) return;
    else{
    var currentdate = new Date(); 
    var datetime = "[" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "]";
    fs.appendFile('log.txt',datetime+os.EOL+info+os.EOL+rtrip+os.EOL,(err)=>{
        if(err) throw err;
    })  } 
};

module.exports={logger};