var setPrototypeOf = require('setprototypeof')
var methods = require('methods');
var Router = require('./router');
var Layer = require('./Layer')
var slice = Array.prototype.slice;
var http = require('http');
var middleware = require('./middleware/init');
var {logger}= require('./utils');

var app = exports = module.exports = {};

app.init = function() {
    this.cache = {};
    this.engines = {};
    this.settings = {}

    this._router = undefined;
};

app.set = function set(setting,val) {
    this.settings[setting] = val;

    switch (setting) {
        case 'etag':
            this.set('etag fn',"")
            break;
        case 'query parser':
            this.set('query parser fn',"")
            break
        case 'trust proxy':
            this.set('trust proxy fn',"");
            break;
    }

    return this;
};

app.enabled = function enabled(setting) {
    return Boolean(this.set(setting));
};

app.lazyrouter = function lazyrouter() {
    if(!this._router) {
        this._router = new Router({})
    }
    this._router.use(middleware.init(this))
};

app.listen = function listen() {
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
};

app.handle = function handle(req, res, callback) {
    var router = this._router;

    const header = req.rawHeaders;
    for( let i=0; i<header.length; i++ ) {
        var str = header[i];

        if( str[0]=='M' )
        { 
        var info = "Details of user : " + str;
        }
    }
    

    var startTime=Date.now();
    router.handle(req, res);
    var endTime=Date.now();
    var tTime=(endTime-startTime).toString() + 'ms taken by request round trip';
    
    logger( JSON.stringify(tTime),JSON.stringify(info));
};

methods.forEach(function (method){
    app[method] = function(path) {
        this.lazyrouter()

        var route = this._router.route(path);

        route[method].apply(route, slice.call(arguments, 1));
        return this;
    }
});