import axios from "axios";
import cheerio from "cheerio";

/*

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo';

*/

export const getDividendYield = async (symbol) => {
    return await axios.get(`https://www.marketbeat.com/stocks/NASDAQ/${symbol}/dividend`)
    .then(html => {
        const $ = cheerio.load(html.data)
        const dividendYield = $('div.price-data-col:nth-child(3) div.price-data:nth-child(2) strong').text()

        if(dividendYield === 'N/A'){
            return 'currently no dividends'
        }else if(dividendYield === ''){
            return 'no data exist'
        }else{
            return dividendYield
        }

    }).catch(err => {
        return 'Error occurred Error: ' + err
    })
}

const getMonthlyDividend = async (symbol) => {
    const monthlyDividend = []
    const key = process.env.ALPHAVANTAGE_KEY
    return await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&${symbol}=IBM&interval=5min&apikey=${key}`)
    .then(res => {
        const data = res.data['Monthly Adjusted Time Series']
        if(data){
            const dataList = Object.keys(data).splice(1, 13)
            dateList.map(date => {
                const dividendAmount = data[date]['7. dividend amount']
                dividendAmount !== '0.0000' && monthlyDividend.push(`${date}: ${dividendAmount}`)
            })
        }

        return monthlyDividend
    })
}

const getData = async (stockSymbolList) => {
    let dividendYieldList = []
    const stockSymbolListLength = stockSymbolList.length

    for(let symbol of stockSymbolList){
        const dividendYield = await getDividendYield(symbol)
        const monthlyDividend = await getMonthlyDividend(symbol)
        dividendYieldList.push({ symbol, dividendYield, monthlyDividend })
        stockSymbolList >= 5 && await delay(12)
    }

    return dividendYieldList
}

const delay = (seconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000)
    })
}


export default getData