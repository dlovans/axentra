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
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Tack för din förfrågan</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f8f9fa;
              border-radius: 8px;
              padding: 30px;
              border-top: 4px solid #8B5CF6;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-weight: bold;
              font-size: 24px;
              color: #8B5CF6;
              margin-bottom: 10px;
            }
            h1 {
              color: #333;
              font-size: 22px;
              margin-bottom: 20px;
            }
            .content {
              background-color: white;
              padding: 25px;
              border-radius: 6px;
              margin-bottom: 25px;
              border: 1px solid #e9ecef;
            }
            .footer {
              text-align: center;
              font-size: 14px;
              color: #6c757d;
            }
            .highlight {
              color: #8B5CF6;
              font-weight: bold;
            }
            .button {
              display: inline-block;
              background: linear-gradient(to right, #8B5CF6, #D946EF);
              color: white;
              padding: 10px 20px;
              border-radius: 30px;
              text-decoration: none;
              font-weight: bold;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Axentra</div>
            </div>
            
            <h1>Tack för din förfrågan, ${name}!</h1>
            
            <div class="content">
              <p>Vi har mottagit ditt meddelande och uppskattar att du kontaktar oss.</p>
              
              <p>Vårt team kommer att granska din förfrågan och återkomma till dig <span class="highlight">inom 24 timmar</span>.</p>
              
              <p>Om du har brådskande frågor under tiden är du välkommen att svara på detta e-postmeddelande.</p>
              
              <center>
                <a href="https://axentra.agency" class="button">Besök vår webbplats</a>
              </center>
            </div>
            
            <div class="footer">
              <p>Med vänliga hälsningar,<br>Axentra Team</p>
              <p>© ${new Date().getFullYear()} Axentra AB. Alla rättigheter förbehållna.</p>
            </div>
          </div>
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