import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import { getEnvVar } from '$lib/server/env';

// Create a transporter using Porkbun email hosting settings
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.porkbun.com', // Porkbun SMTP server
    port: 587, // Commonly used port for secure SMTP
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'dlovan@axentra.agency', // Your Porkbun email address
      pass: getEnvVar('EMAIL_PASSWORD'), // Get password from environment variable
    },
  });
};

export async function POST({ request }) {
  try {
    // Get form data from request
    const { name, email, message } = await request.json();
    
    // Validate inputs
    if (!name || !email || !message) {
      return json({ success: false, error: 'Alla fält måste fyllas i' }, { status: 400 });
    }
    
    const transporter = createTransporter();
    
    // 1. Configure email options for notification to site owner
    const notificationEmailOptions = {
      from: 'Website Contact <dlovan@axentra.agency>',
      to: 'dlovan@axentra.agency',
      subject: `Ny förfrågan från webbplatsen: ${name}`,
      replyTo: email,
      text: `Namn: ${name}\nE-post: ${email}\n\nMeddelande:\n${message}`,
      html: `
        <h2>Ny förfrågan från webbplatsen</h2>
        <p><strong>Namn:</strong> ${name}</p>
        <p><strong>E-post:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Meddelande:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    // 2. Configure confirmation email to the user
    const confirmationEmailOptions = {
      from: 'Axentra <dlovan@axentra.agency>',
      to: email,
      subject: 'Tack för din förfrågan | Axentra',
      text: `Hej ${name},\n\nTack för din förfrågan till Axentra. Vi har mottagit ditt meddelande och kommer att kontakta dig inom 24 timmar.\n\nMed vänliga hälsningar,\nAxentra Team`,
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Tack för din förfrågan</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #0f172a; color: #e2e8f0;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f172a;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #1e293b; border-radius: 12px; border: 1px solid #38bdf8; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td align="center" style="padding: 30px 30px 20px 30px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" style="padding-bottom: 20px;">
                                  <!-- Logo -->
                                  <img src="https://i.ibb.co/Qj1bBYF/axentra-logo.png" alt="Axentra" width="120" style="display: block;" />
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style="color: #38bdf8; font-size: 24px; font-weight: bold;">
                                  Tack för din förfrågan, ${name}!
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td align="center" style="padding: 0 30px 30px 30px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #273549; border-radius: 8px; border: 1px solid #334155;">
                        <tr>
                          <td style="padding: 30px; color: #e2e8f0; font-size: 16px; line-height: 24px;">
                            <p>Vi har mottagit ditt meddelande och uppskattar att du kontaktar oss.</p>
                            
                            <p>Vårt team kommer att granska din förfrågan och återkomma till dig <span style="color: #38bdf8; font-weight: bold;">inom 24 timmar</span>.</p>
                            
                            <p>Om du har brådskande frågor under tiden är du välkommen att svara på detta e-postmeddelande.</p>
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td align="center" style="padding: 20px 0 0 0;">
                                  <table border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td align="center" style="border-radius: 30px; background: linear-gradient(to right, #0ea5e9, #0284c7); padding: 12px 24px;">
                                        <a href="https://axentra.agency" style="color: #ffffff; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px;">Besök vår webbplats</a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td align="center" style="padding: 0 30px 30px 30px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" style="padding: 20px 0; border-top: 1px solid #334155; color: #94a3b8; font-size: 14px; line-height: 21px;">
                            <p>Med vänliga hälsningar,<br/>Axentra Team</p>
                            <p>© ${new Date().getFullYear()} Axentra AB. Alla rättigheter förbehållna.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };
    
    // Send both emails
    await Promise.all([
      transporter.sendMail(notificationEmailOptions),
      transporter.sendMail(confirmationEmailOptions)
    ]);
    
    // Return success response
    return json({ success: true, message: 'Ditt meddelande har skickats!' });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return json(
      { success: false, error: 'Ett fel uppstod när meddelandet skulle skickas. Försök igen senare.' }, 
      { status: 500 }
    );
  }
} 