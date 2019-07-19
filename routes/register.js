const errors = require('restify-errors');
const axios = require('axios');
const Register = require('../models/Register')


const login = async (serverurl, username, password) =>
    await axios
    .post(`${ serverurl }/api/v1/login`, {
        user: username,
        password: password,
    })
    .then((res) => res.data)
    .then((res) => {
        //console.log(res);

        return {
            status: 'true',
            headers: {
                "X-Auth-Token": res.data.authToken,
                "X-User-Id": res.data.userId
            }
        };

    })
    .catch((err) => {
        //console.log(err);
        return {
            status: 'false',
        }
    });

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

        var loginData = await login(serverurl, username, password);

        if (loginData.status == 'true') {

            var headers = loginData.headers;
            const _id = Math.floor(100000 + Math.random() * 900000);

            const register = new Register({
                _id,
                serverurl,
                servername,
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