const errors = require('restify-errors');
const Register = require('../models/Register');

module.exports = server => {


    server.get('/user/data', async (req, res, next) => {

        try {

            //Check For JSON

            if (!req.is('application/json')) {
                return next(new errors.InvalidContentError("Expects 'application/json'"));
            }

            var qcode = JSON.parse(req.body).qcode;

            const data = await Register.findOne({_id: qcode});

            res.send({
                data:data,
                status: true
            });

            next();


        } catch {
            return next(new errors.NotFoundError("No Record Found"));
        }

    });



}