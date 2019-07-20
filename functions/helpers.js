const axios = require('axios');

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

module.exports.login = login;