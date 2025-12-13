import Lead from '../../models/Lead.js';
import { connectDB } from '../../utils/db.js';
import { sendEmail } from '../../utils/email.js';

export const onRequestPost = async (context) => {
  const { request, env } = context;

  try {
    // Connect to DB
    if (env.MONGO_URI) {
      const dbPromise = connectDB(env.MONGO_URI);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timed out')), 15000)
      );
      await Promise.race([dbPromise, timeoutPromise]);
    }

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
      const emailSubject = `New Website Lead: ${name} (${source})`;
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New submission from the Nova Wealth Website</h2>
          <p><strong>Source:</strong> ${source}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message || 'N/A'}</p>
          <p>This lead has been saved to the database.</p>
        </div>
      `;

      try {
        await sendEmail('info@novawealth.com', emailSubject, emailHtml, env);
      } catch (error) {
        console.error('Error sending email:', error);
      }

      return new Response(JSON.stringify(lead), { status: 201 });
    } else {
      return new Response(JSON.stringify({ message: 'Invalid lead data' }), { status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
