module.exports = Route;
var methods = require('methods');
var flatten = require('array-flatten');
var Layer = require('./Layer')

function Route(path) {
    this.path = path;
    this.stack = [];

    this.methods = {}
}

Route.prototype.dispatch = function dispatch(req,res,done) {

};

methods.forEach(function(method){
    Route.prototype[method] = function(){
        const array = Array.prototype.slice.call(arguments);
        var handles = array.flat();
        for (var i = 0; i < handles.length; i++) {
            var handle = handles[i];

            if (typeof handle !== 'function') {
                var type = toString.call(handle);
                var msg = 'Route.' + method + '() requires a callback function but got a ' + type
                throw new Error(msg);
            }

            var layer = Layer('/', {}, handle);
            layer.method = method;

            this.methods[method] = true;
            this.stack.push(layer);

            // console.log(this.stack);

            // console.log(layer);
        }

        return this;
    };
});