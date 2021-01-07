const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var compression = require('compression')
const path = require('path');

app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: "1000mb",
    parameterLimit: 1000000000000000000
}));
app.use(bodyParser.json({ limit: '1000mb' }));
app.use('/api', require('./routes'));
app.use(express.static('views'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
})
const port = process.env.PORT || 5000
app.listen(port, console.log(`Node App running at ${port}`));