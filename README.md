# currency-rates-api

**currency-rates-api is a free service for current and historical foreign exchange rates
published by the European Central Bank. Also makes use of the [Exchange Rates API](https://exchangeratesapi.io)**

## Usage

Get the latest currency rates in the following format/schema:

```js
{
    "results": {
        "base": "",
        "date": "",
        "rates": {
        }
    }
}
```

> GET ```/api/rates?base=CZK&currency=EUR,GBP,USD```

* **base**: the home currency rates to be quoted against (i.e. `CZK`)

* **currency**: the specific exchange rates based on a comma-separated symbols parameter (i.e. `EUR,GBP,USD`).


Upon a successful API response, transform the fetched payload into an object containing the following keys:

* **_results_**: JSON object containing the results from the API

* **_base_**: the requested home rate from the request URL query strings

* **_date_**: the current date 

* **_rates_**: An Object containing the requested currency in the request URL query strings

A successful response for the above request should return the following schema (of course with a more up-to-date values)

```jsx
{
    "results": {
        "base": "CZK",
        "date": "2020-11-17",
        "rates": {
            "EUR": 0.0377244605,
            "GBP": 0.033795458,
            "USD": 0.044824204
        }
    } 
}
```
