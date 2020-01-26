const mongoose = require('mongoose');
const routes = require('./routes');
const express = require('express'); const app = express();
const dotenv = require('dotenv'); dotenv.config();
const cors = require('cors')
const port = process.env.PORT || 3333;

app.use(cors())
app.listen(port, () => console.log(`Server running on port ${port}`))
app.use(express.json());
app.use(routes);

/* Database Connection */
const dbOptions = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

mongoose.connect(process.env.DBURL, dbOptions)
    .then(() => console.log('Mongodb connected!'))
    .catch(() => console.log('Database connection error!'))
