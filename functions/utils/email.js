
export const sendEmail = async (to, subject, html, env) => {
  // Check if we have a Resend API Key
  const RESEND_API_KEY = env.RESEND_API_KEY ? env.RESEND_API_KEY.trim() : null;

  if (RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Nova Wealth <onboarding@resend.dev>', // You should verify a domain in Resend for production
          to: [to],
          subject: subject,
          html: html
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        console.error('Resend API Error:', data);
        throw new Error(data.message || 'Failed to send email via Resend');
      }
      
      console.log('Email sent via Resend:', data.id);
      return { success: true, id: data.id };
    } catch (error) {
      console.error('Email Send Error:', error);
      return { success: false, error: error.message };
    }
  }

  // FALLBACK: Log to console if no API key (Development mode)
  console.log('=================================================');
  console.log('EMAIL SIMULATION (No RESEND_API_KEY provided)');
  console.log(`TO: ${to}`);
  console.log(`SUBJECT: ${subject}`);
  console.log('CONTENT:', html);
  console.log('=================================================');
  
  return { success: true, simulated: true };
};
