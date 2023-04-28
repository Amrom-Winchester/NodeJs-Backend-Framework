var setPrototypeOf = require('setprototypeof')

exports.init = function(app) {
    return function serveInit(req,res, next) {
        setPrototypeOf(res, app.response);
        next();
    }
};