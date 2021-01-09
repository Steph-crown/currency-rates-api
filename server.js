const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

app.get('/api/rates', (req, res) => {
    const {base, currency} = req.query;
    if (!base) res.status(400).json({
        error: "`base` query parameter is not defined or has no value"
    })
    else if (!currency) res.status(400).json({
        error: "`currency` query parameter is not defined or has no value"
    })
    else {
        let url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`
        https.get(url, response => {
            let result = ""
            response.on("data", d => {
                result += d
            })
            response.on("end", () => {
                result = JSON.parse(result)
                if (result.error) {
                    res.status(400).json(result)
                }
                else {
                    res.status(200).json({result})
                }
            })
        })
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));