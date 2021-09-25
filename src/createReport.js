const createReport = (dividendYieldList) => {
    let html = `<h1>Daily Dividend Yield Report</h1>`

    dividendYieldList.map(data => {
        const { symbol, dividendYield, monthlyDividend } = data
        html += `<div><strong>${symbol}</strong>: ${dividendYield}</div>`;

        monthlyDividend.map(dividend => {
            html += `<div>${dividend}</div>`
        })
    })

    return html
}

export default createReport