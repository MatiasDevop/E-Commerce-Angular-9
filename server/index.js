const app = require('./config/express');
const config = require('./config/config');

// initialize mongo
require('./config/mongoose');
// listen to the port 
app.listen(config.port, () =>{
    console.log(`server started on port ${config.port} (${config.env})`);
});