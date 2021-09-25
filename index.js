import { stockSymbolList } from './config/stockSymbolList'
import getData from './src/getData'
import path from 'path'
import dotenv from 'dotenv'
import createReport from './src/createReport'
import sendEmail from './src/sendEmail'

dotenv.config({ path: path.join(__dirname, '.env') })

const dailyDividendYieldReport = async () => {
    const dividendYieldList = await getData(stockSymbolList)
    console.log(' file: index.js ~ line 6 dailyDividendYieldReport ~ DividendYieldList', dividendYieldList)

    const report = createReport(dividendYieldList)
    console.log(' file: index.js ~ line 14 dailyDividendYieldReport ~ report ', report)

    sendEmail(report)
}

dailyDividendYieldReport()