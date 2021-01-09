const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/api/rates', (req, res) => {
    const {base, currency} = req.query;
    if (!base) res.status(400).json({
        error: "`base` query parameter string has no value"
    })
    else if (!currency) res.status(400).json({
        error: "`currency` query parameter string has no value"
    })
    else {
        let url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`
        https.get(url, result => {
            let data = ""
            result.on("data", d => {
                data += d
            })
            result.on("end", () => {
                data = JSON.parse(data)
                if (data.error) {
                    res.status(400).json(data)
                    console.log(data)
                }
                else {
                    res.status(200).json(data)
                }
            })
        })
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));