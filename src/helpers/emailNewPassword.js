import nodemailer from 'nodemailer';

const emailNewPassword = async (data) => {
    // Transporter
    let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "c7996675630a8d",
            pass: "e049f264f053f3"
        }
    });

    const { email, name, token } = data;

    // Configuracion del email
    const info = await transporter.sendMail({
        from: '"Storybaz" <storybaz@company.com>',
        to: email,
        subject: 'Reestablece tu password en Storybaz',
        text: 'Reestablece tu password en Storybaz',
        html: `
            <div style="max-width=600px; margin: 0 auto;">
                <p>Hola ${name} solicitaste reestablecer tu contraseña en Storybaz.</p>
                <p style="font-weight: bold;">Para reestablecerla haz click en el siguiente enlace:</p>
                <a href="http://127.0.0.1:8000/api/users/forgot-password/${token}" style="display:inline-block; margin: 10px 0; padding: 10px 20px; background-color: #7AA874; color: white; font-weight:bold">Reestablecer password</a>
                <p>Si no solicitaste este cambio, puede ignorar el mensaje.</p>
                <img src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" width="500" height="500" alt="storybaz"/>
            </div>
        `
    });

    console.log('Mensaje enviado: %s', info.messageId);
};

export default emailNewPassword;