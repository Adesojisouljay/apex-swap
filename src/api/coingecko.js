import axios from "axios";


const url = "https://api.coingecko.com/api/v3"

export const getMarketChartData = async (coinId) => {
  return await axios.get(`${url}/coins/${coinId}/market_chart?vs_currency=usd&days=7`)
    .then(data => data)
}

export const getMarketData = async () => {
    // const dataUrl = "/coins/markets?vs_currency=usd&ids=hive%2C%20hive_dollar%2C%20tether%2C%20bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false"
return await axios.get(`${url}/coins/markets?vs_currency=usd&ids=hive%2C%20hive_dollar%2C%20tether&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    .then(data => data.data)
}

export const getSingleCoinData = async (coinId) => {
    const dataUrl = `/coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    return await axios.get(`${url}${dataUrl}`)
    .then(data => data.data)
}

