const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Model
const db = require("./app/models");

const app = express();

//alamat yang diperbolehkan mengakases
let whiteList = [
    'http://localhost:8081',
    'http://localhost:8080'
];

let corsOption = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by cors'));
        }
    }
};


app.use(cors(corsOption));

//parse request application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//sysn database
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({
        message: "welcom to API"
    });
});

//memanggil file post.route agar dijalankan
require("./app/routes/post.routes")(app);


//set port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
