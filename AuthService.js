var buffer = require('buffer');

class AuthService{

    login(creds, callback){
        var me = this,
            username = creds.username,
            password = creds.password;
        
        //encoding username and password - that's what git requires
        var buff = new buffer.Buffer(username + ":" + password);
        var encodedAuth = buff.toString('base64');

        //http request - promise base
        fetch('https://api.github.com/user', {
            headers:{
                'Authorization' : 'Basic ' + encodedAuth
            }
        })
        .then((response) => {
            if(response != null && response.status >= 200 && response.status < 300){
                return response; //success
            }

            throw {
                badCredentials: response.status == 401,
                unknownError: response.status != 401
            }
        })
        .then((response )=> {
            return response.json();
        })
        .then((results)=> {
            return callback({success: true});
        })
        .catch((err) => {
            return callback(err);
        });

    }
}

module.exports = new AuthService();