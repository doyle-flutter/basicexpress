const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test',{ useUnifiedTopology: true, useNewUrlParser: true } )
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));
// pro : mongodb://<userid>:<password>@<database>:<port>/<db-name>

module.exports = mongoose;
