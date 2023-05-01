var mixin = require('merge-descriptors');
var proto = require("./app")
var http = require('http');
var fs = require('fs');

exports = module.exports = createApplication;

function createApplication() {
    let app = function(req,res,next) {
        app.handle(req,res,next)
    };

    mixin(app,proto,false);

    var req = Object.create(http.IncomingMessage.prototype);
    var res = Object.create(http.ServerResponse.prototype)

    res.send = function (body) {
        if(typeof body === 'object') {
            this.json(body)
        }
        else if(typeof body === 'string') {
            // this.setHeader('Content-Type', 'text/plain');
            this.end(body,'utf8');
        }
        return this;
    }

    res.sendFile=function (body){
        this.setHeader("Content-Type", "text/html");
        //here is the code required
        fs.readFile(body, (err,fileContent) =>
        {
          this.res.end(fileContent);
        });
    }

    res.json = function (body) {
        this.setHeader('Content-Type', 'application/json');
        return this.send(JSON.stringify(body))
    }

    app.request = Object.create(req,{
        app : {
            configurable: true, enumerable: true, writable: true, value: app
        }
    });

    app.response = Object.create(res,{
        app : {
            configurable: true, enumerable: true, writable: true, value: app
        }
    });

    app.init();
    return app;
}

exports.application = proto;