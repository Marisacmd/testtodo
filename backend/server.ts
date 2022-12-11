const express = require('express');
const app = express();
const jsonParser = express.json();

const cors = require('cors');
app.use(cors());

app.post("/message", function(req, res) {

    const data = "Express response from server";
    res.send(data);
});

app.listen(4001);
