import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // or 'STARTTLS'  
    auth: {
        user: process.env.GMAIL_USER as string,
        pass: process.env.GMAIL_PASS as string,
    },
});

export const sendWelcomeEmail = async (email: string) => {
    const mailOptions = {
        from: process.env.GMAIL_USER as string,
        to: email,
        subject: "Welcome to our app!",
        text: "Thanks for registering!",
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
