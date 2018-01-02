require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');

const app  = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());


app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
});
