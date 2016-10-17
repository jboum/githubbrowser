//var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');

var encoding = require('NativeModules').Encoding; //NativeModules holds on the obj c interfaces that you exported using RCTExportModule 

const authKey = 'auth';
const userKey = "user";

class AuthService{

    getAuthInfo(callback) {
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {
            if(err) return callback(err);

            if(!val) return callback();

            var zippedObj = _.zipObject([val[0][0], val[1][0]], [val[0][1], val[1][1]]);

            if(!zippedObj[authKey] || !zippedObj[userKey]){
                return callback();
            }

            var authInfo = {
                header: {
                    Authorization: 'Basic' + zippedObj[authKey]
                }, 
                user: JSON.parse(zippedObj[userKey])
            }

            return callback(null, authInfo);
        });
    }

    login(creds, callback){
        var me = this,
            username = creds.username,
            password = creds.password;
        
        //encoding username and password - that's what git requires
        var authStr = username + ":" + password;
        encoding.base64Encode(authStr, (encodedAuth)=> {
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
            AsyncStorage.multiSet([
                [authKey, encodedAuth],
                [userKey, JSON.stringify(results)]  //need to stringify data in AsyncStorage

            ], (err) => {
                if(err) throw err;

                return callback({success: true});
            });
            
        })
        .catch((err) => {
            return callback(err);
        });
        });
        // var buff = new buffer.Buffer(username + ":" + password);
        // var encodedAuth = buff.toString('base64');

        

    }
}

module.exports = new AuthService();