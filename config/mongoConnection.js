const MongoClient = require("mongodb").MongoClient;

const settings = {
	mongoConfig: {
		serverUrl: "mongodb://localhost:27017/",
		database: "bookview"
	}
};

const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

// let connectDb = () => {
// 	if (!_connection) {
// 		_connection = MongoClient.connect(fullMongoUrl,{ useNewUrlParser: true })
// 			.then(db => {
// 				return db;
// 			});
// 	}

// 	return _connection;
// };

//module.exports = connectDb;
module.exports = async () => {
	if (!_connection) {
	  _connection = await MongoClient.connect(mongoConfig.serverUrl);
	  _db = await _connection.db(mongoConfig.database);
	}
  
	return _db;
  };