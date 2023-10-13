// require('dotenv').config();
const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT ||3000
const router = require('./routers')

// const { PORT = 3000 } = process.env;
// const endpointV1 = require ('./routes/endpointV1');

app.use(express.json({strict : false}));
app.use('/api/v1', router);

app.listen(PORT, () =>
    console.log('Server is running at PORT ', PORT));