/**
 * Module dependencies.
 */
var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , fs = require('fs');
var app = express();
var db;
var cloudant;
var fileToUpload;
var dbCredentials = {
    dbName: 'my_sample_db'
};
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));
// development only
//if ('development' == app.get('env')) {
//    app.use(errorHandler());
//}
//
//function getDBCredentialsUrl(jsonData) {
//    var vcapServices = JSON.parse(jsonData);
//    // Pattern match to find the first instance of a Cloudant service in
//    // VCAP_SERVICES. If you know your service key, you can access the
//    // service credentials directly by using the vcapServices object.
//    for (var vcapService in vcapServices) {
//        if (vcapService.match(/cloudant/i)) {
//            return vcapServices[vcapService][0].credentials.url;
//        }
//    }
//}
//function initDBConnection() {
//    //When running on Bluemix, this variable will be set to a json object
//    //containing all the service credentials of all the bound services
//    if (process.env.VCAP_SERVICES) {
//        dbCredentials.url = getDBCredentialsUrl(process.env.VCAP_SERVICES);
//    }
//    else {
//        dbCredentials.url = getDBCredentialsUrl(fs.readFileSync("vcap-local.json", "utf-8"));
//    }
//    cloudant = require('cloudant')(dbCredentials.url);
//    // check if DB exists if not create
//    cloudant.db.create(dbCredentials.dbName, function (err, res) {
//        if (err) {
//            console.log('Could not create new db: ' + dbCredentials.dbName + ', it might already exist.');
//        }
//    });
//    db = cloudant.use(dbCredentials.dbName);
//}
//initDBConnection();
var json;
var keys;
app.get('/', routes.index);

app.get('/api/translate/google', function (request, response) {
    var text = request.query.text;
    const translate = require('google-translate-api');
    translate(text, {
        from: 'en'
        , to: 'pt'
    }).then(res => {
        console.log('google translated it: ' + res.text);
        response.write(res.text);
        response.end();
    }).catch(err => {
        console.error(err);
    });
});

var watson = require('watson-developer-cloud');

app.get('/api/translate', function (request, response) {
    var text= request.query.text;
        
    
    var language_translator = watson.language_translator({
        username: 'eed94fbd-be77-4b74-b28e-93c4776218a1'
        , password: 'MZVhj6wqwjRS'
        ,url: 'https://gateway.watsonplatform.net/language-translator/api'
        , version: 'v2'
    });
    language_translator.translate({
        text: text
        , source: 'en'
        , target: 'pt'
    }, function (err, translation) {
        if (err) console.log(err)
        else{

            response.write(translation['translations'][0]['translation']);
            response.end();
        }
    });
});
//function translate(text){
//    const translate = require('google-translate-api');
//    translate(text, {
//                        from: 'en'
//                        , to: 'pt'
//                    }).then(res => {
//                        console.log('google translated it: '+res.text);
//                    }).catch(err => {
//                        console.error(err);
//                    });
//}
http.createServer(app).listen(app.get('port'), '0.0.0.0', function () {
    console.log('Express server listening on port ' + app.get('port'));
});