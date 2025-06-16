import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Create a transporter using Porkbun email hosting settings
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.porkbun.com', // Porkbun SMTP server
    port: 587, // Commonly used port for secure SMTP
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'dlovan@axentra.agency', // Your Porkbun email address
      pass: env.EMAIL_PASSWORD, // Get password from environment variable
    },
  });
};

export async function POST({ request }) {
  try {
    // Get form data from request
    const { name, email, message } = await request.json();
    
    // Validate inputs
    if (!name || !email || !message) {
      return json({ success: false, error: 'All fields are required' }, { status: 400 });
    }
    
    const transporter = createTransporter();
    
    // 1. Configure email options for notification to site owner
    const notificationEmailOptions = {
      from: 'Website Contact <dlovan@axentra.agency>',
      to: 'dlovan@axentra.agency',
      subject: `New inquiry from website: ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New inquiry from website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    // 2. Configure confirmation email to the user
    const confirmationEmailOptions = {
      from: 'Axentra <dlovan@axentra.agency>',
      to: email,
      subject: 'Thank you for your inquiry | Axentra',
      text: `Hi ${name},\n\nThank you for your inquiry to Axentra. We have received your message and will contact you within 24 hours.\n\nBest regards,\nAxentra Team`,
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Thank you for your inquiry</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; color: #1f2937;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; border: 1px solid #f97316; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
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
                                <td align="center" style="color: #f97316; font-size: 24px; font-weight: bold;">
                                  Thank you for your inquiry, ${name}!
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
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                        <tr>
                          <td style="padding: 30px; color: #1f2937; font-size: 16px; line-height: 24px;">
                            <p>We have received your message and appreciate you contacting us.</p>
                            
                            <p>Our team will review your inquiry and get back to you <span style="color: #f97316; font-weight: bold;">within 24 hours</span>.</p>
                            
                            <p>If you have urgent questions in the meantime, feel free to reply to this email.</p>
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td align="center" style="padding: 20px 0 0 0;">
                                  <table border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td align="center" style="border-radius: 30px; background: linear-gradient(to right, #f97316, #ea580c); padding: 12px 24px;">
                                        <a href="https://axentra.agency" style="color: #ffffff; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px;">Visit our website</a>
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
                          <td align="center" style="padding: 20px 0; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; line-height: 21px;">
                            <p>Best regards,<br/>Axentra Team</p>
                            <p>© ${new Date().getFullYear()} Axentra AB. All rights reserved.</p>
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
    return json({ success: true, message: 'Your message has been sent!' });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return json(
      { success: false, error: 'An error occurred while sending the message. Please try again later.' }, 
      { status: 500 }
    );
  }
} 