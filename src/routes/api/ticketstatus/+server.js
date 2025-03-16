import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '$env/static/private';


// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === '465',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

/**
 * Sends an email notification to the user when their ticket status changes
 */
export async function POST({ request }) {
  try {
    const { ticketId, newStatus, statusLabel, userEmail, ticketTitle } = await request.json();
    
    if (!ticketId || !newStatus || !userEmail || !ticketTitle) {
      return json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }
    
    // Send email notification
    await sendStatusChangeEmail(userEmail, ticketTitle, statusLabel, ticketId);
    
    return json({ success: true, message: 'Email notification sent successfully' });
  } catch (error) {
    console.error('Error sending status change email:', error);
    return json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * Helper function to send the status change email
 */
async function sendStatusChangeEmail(userEmail, ticketTitle, statusLabel, ticketId) {
  // Email content
  const mailOptions = {
    from: `"Axentra Support" <${SMTP_USER}>`,
    to: userEmail,
    subject: `Status uppdaterad för ärende: ${ticketTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="background-color: #4f46e5; padding: 20px; text-align: center; color: white; border-radius: 5px 5px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Ärendestatus uppdaterad</h1>
        </div>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 5px 5px; border: 1px solid #e5e7eb; border-top: none;">
          <p>Hej,</p>
          <p>Statusen för ditt ärende har uppdaterats:</p>
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 5px; padding: 15px; margin: 15px 0;">
            <p><strong>Ärende:</strong> ${ticketTitle}</p>
            <p><strong>Ny status:</strong> ${statusLabel}</p>
          </div>
          <p>Du kan se mer information och svara på ärendet genom att logga in på din kundportal.</p>
          <p>Med vänliga hälsningar,<br>Axentra Support</p>
        </div>
        <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
          <p>Detta är ett automatiskt meddelande, vänligen svara inte på detta mail.</p>
        </div>
      </div>
    `
  };
  
  // Send the email
  return transporter.sendMail(mailOptions);
}
