const express = require('express');
const cors = require('cors');
const server = express();

const port = process.env.PORT || 3000;

server.use(cors());

server.use('/dist', express.static(__dirname + '/dist/wtp-ui'));

server.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

server.listen(port, () => {
    console.log("Listening on: http://localhost:" + port );
});
