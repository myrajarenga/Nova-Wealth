import Lead from '../../models/Lead';
import nodemailer from 'nodemailer';

export const onRequestPost = async (context) => {
  const { request, env } = context;

  try {
    const { name, email, phone, subject, message, source } = await request.json();

    const lead = await Lead.create({
      name,
      email,
      phone,
      subject,
      message,
      source,
    });

    if (lead) {
      if (env.EMAIL_USER && env.EMAIL_PASS) {
         try {
           const transporter = nodemailer.createTransport({
             service: 'gmail', 
             auth: {
               user: env.EMAIL_USER,
               pass: env.EMAIL_PASS
             }
           });

           await transporter.sendMail({
             from: env.EMAIL_USER,
             to: 'info@novawealth.com',
             subject: `New Website Lead: ${name} (${source})`,
             text: `
                 You have a new submission from the Nova Wealth Website.
                 
                 Source: ${source}
                 Name: ${name}
                 Email: ${email}
                 Phone: ${phone}
                 Subject: ${subject || 'N/A'}
                 Message: ${message || 'N/A'}
                 
                 This lead has been saved to the database.
             `
           });
         } catch (error) {
           console.error('Error sending email:', error);
         }
      }

      return new Response(JSON.stringify(lead), { status: 201 });
    } else {
      return new Response(JSON.stringify({ message: 'Invalid lead data' }), { status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
