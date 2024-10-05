'use strict';
let express = require('express');
let app = express();
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.post("/sendOrder", (req, res) => {
    let orders = req.body;
    let totalPrice = 0;
    let recipt = {};
    for (let i in orders) {
        let price = Math.floor(5 + 100 * Math.random());
        totalPrice += price;
        let oddd = { name: orders[i].name, price: price };
        recipt[i] = oddd;
    }
    res.json(recipt);
});
app.listen(1337);