import axios from "axios";

const sendEmail = async (report) => {

    const today =  new Date()

    const postData = {
        personalizations: [
            {
                to: [{ email: 'xectler2@kakao.com', name: 'sangmin' }],
                subject: `Daily Dividend Yield Report[${today.toLocaleDateString()}]`,
            },
        ],
        content: [{ type: 'text/html', value: report }],
        from: { email: 'xectler@gmail.com', name: 'sangmin' },
    }

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${process.env.SENDGRID_KEY}`,
            'content-type': 'application/json',
        },
    }

    return await axios.post('https://api.sendgrid.com/v3/mail/send', postData, axiosConfig)
    .then(response => {
        const { status, statusText } = response
        console.log(`send e-mail status: ${status}, statusText: ${statusText}`)
    })
    .catch(err => {
        console.log(err)
    })

}

export default sendEmail
