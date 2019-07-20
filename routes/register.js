const errors = require('restify-errors');
const Register = require('../models/Register');
const functions = require('../functions/helpers');

module.exports = server => {

    server.get('/ping', (req, res, next) => {
        res.send({
            msg: 'pong'
        });
        next();
    });

    server.post('/register', async (req, res, next) => {

        //Check For JSON

        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const {
            serverurl,
            servername,
            username,
            password
        } = req.body;

        var loginData = await functions.login(serverurl, username, password);

        if (loginData.status == 'true') {

            var headers = loginData.headers;
            const _id = Math.floor(100000 + Math.random() * 900000);

            const serverinfo = {
                "serverurl": serverurl,
                "servername": servername
            }

            const register = new Register({
                _id,
                serverinfo,
                headers
            });

            register.save()
            .then()
            .catch(err => {
                console.log(err);
                return next(new errors.NotFoundError("Cannot Save Data in Database"));

            });
    
            res.send({
                code: _id,
                expiry: 5,
                status: true
            });

            next();

        } else {
            return next(new errors.UnauthorizedError("Authorisation failed"));
        }

    });

}