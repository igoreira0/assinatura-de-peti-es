const mongoose = require('mongoose');

mongoose.connect(process.env['MONGODB_URI_CONNECTION'], {dbName: process.env['PETICOES_DB']});
mongoose.Promise = global.Promise;

module.exports = mongoose;