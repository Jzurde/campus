export function getTransporter() {
    if (process.env.MAIL_USER && process.env.MAIL_PASS) {
        const username = process.env.MAIL_USER
        const password = process.env.MAIL_PASS
        if (process.env.MAIL_SERVICE) {
            return {
                contactFormValid: true,
                transporter: {
                    service: process.env.MAIL_SERVICE,
                    auth: {
                        user: username,
                        pass: password,
                    }
                }
            }
        }
        else if (process.env.MAIL_HOST && process.env.MAIL_PORT) {
            return {
                contactFormValid: true,
                transporter: {
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    secure: (process.env.MAIL_SECURE == "true") ? true : false,
                    auth: {
                        user: username,
                        pass: password,
                    }
                }
            }
        }
    }
    return {
        contactFormValid: false,
        transporter: {}
    }
}

export function getIfContactFormValid() {
    const transporter = getTransporter()
    const isContactFormValid = transporter.contactFormValid

    return isContactFormValid
}