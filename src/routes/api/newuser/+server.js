import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { cert } from 'firebase-admin/app';
import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import axentraadmin from '../../../../axentraadmin.json';
import { 
  SMTP_HOST, 
  SMTP_PORT, 
  SMTP_USER, 
  SMTP_PASS, 
  FROM_EMAIL
} from '$env/static/private';

// Initialize Firebase Admin if not already initialized
let app;
try {
  // Check if admin app is already initialized
  const apps = getApps();
  if (apps.length > 0) {
    // Find the admin app if it exists
    const adminApp = apps.find(a => a.name === 'admin');
    if (adminApp) {
      app = adminApp;
      console.log('Using existing Firebase Admin app');
    } else {
      // Initialize with a specific name to identify it later
      app = initializeApp({
        credential: cert(axentraadmin)
      }, 'admin');
      console.log('Firebase Admin initialized with service account credentials');
    }
  } else {
    // No apps initialized yet, create the first one
    app = initializeApp({
      credential: cert(axentraadmin)
    }, 'admin');
    console.log('Firebase Admin initialized with service account credentials');
  }
} catch (e) {
  console.error('Error initializing Firebase Admin:', e);
  throw new Error(`Failed to initialize Firebase Admin: ${e.message}`);
}

const auth = getAuth(app);
const db = getFirestore(app);

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT),
  secure: false, // false for 587, true for 465
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

/**
 * POST endpoint to create a new user
 * Expects JSON body with: email, name, role, companyName
 * Password is always set to '000000' and a reset link is sent
 */
export async function POST({ request }) {
  try {
    // Parse request body
    const { email, name, role, companyName } = await request.json();
    
    // Validate required fields
    if (!email || !name || !role) {
      return json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }
    
    // Validate role
    if (role !== 'admin' && role !== 'user') {
      return json({ 
        success: false, 
        error: 'Role must be either "admin" or "user"' 
      }, { status: 400 });
    }
    
    // Validate company name for users
    if (role === 'user' && !companyName) {
      return json({ 
        success: false, 
        error: 'Company name is required for users' 
      }, { status: 400 });
    }
    
    // Create the user in Firebase Auth with default password
    const userRecord = await auth.createUser({
      email,
      password: '000000', // Default password
      displayName: name,
      emailVerified: false
    });
    
    // Generate password reset link
    const resetLink = await auth.generatePasswordResetLink(email);
    
    // Prepare user data for Firestore
    const userData = {
      email,
      name,
      role,
      companyName: role === 'user' ? companyName : '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Create user document in Firestore
    await db.collection('users').doc(userRecord.uid).set(userData);
    
    // Send password reset email
    const mailOptions = {
      from: `Axentra <${FROM_EMAIL}>`,
      to: email,
      subject: 'Välkommen till Supportportalen - Ange ditt lösenord',
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Välkommen till Supportportalen</title>
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
                                  <!-- Styled Axentra text instead of logo image -->
                                  <h1 style="font-size: 32px; font-weight: bold; margin: 0; color: white;">
                                    <span style="background-image: linear-gradient(to right, #22d3ee, #3b82f6, #14b8a6); -webkit-background-clip: text; background-clip: text; color: transparent;">Axentra</span>
                                  </h1>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style="color: #38bdf8; font-size: 24px; font-weight: bold;">
                                  Välkommen till Supportportalen, ${name}!
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
                            <p>Ditt konto har skapats framgångsrikt.</p>
                            
                            <p>Klicka på knappen nedan för att ange ditt lösenord:</p>
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td align="center" style="padding: 20px 0;">
                                  <table border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td align="center" style="border-radius: 30px; background: linear-gradient(to right, #0ea5e9, #0284c7); padding: 12px 24px;">
                                        <a href="${resetLink}" style="color: #ffffff; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px;">Ange lösenord</a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            
                            <p>Om knappen inte fungerar kan du kopiera och klistra in denna länk i din webbläsare:</p>
                            <p style="word-break: break-all; color: #38bdf8; background-color: #1e293b; padding: 10px; border-radius: 4px; font-size: 14px;">${resetLink}</p>
                            
                            <p>Denna länk upphör att gälla om 1 timme av säkerhetsskäl.</p>
                            <p>Om du inte har begärt detta konto, vänligen ignorera detta e-postmeddelande.</p>
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
                            <p>Detta är ett automatiskt e-postmeddelande, vänligen svara inte.</p>
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
    
    await transporter.sendMail(mailOptions);
    
    // Return success response
    return json({
      success: true,
      userId: userRecord.uid,
      message: 'User created successfully and password reset email sent'
    });
    
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/email-already-exists') {
      return json({ 
        success: false, 
        error: 'Email already in use' 
      }, { status: 400 });
    }
    
    if (error.code === 'auth/invalid-password') {
      return json({ 
        success: false, 
        error: 'Invalid password format' 
      }, { status: 400 });
    }
    
    // Generic error response
    return json({ 
      success: false, 
      error: 'Failed to create user', 
      details: error.message 
    }, { status: 500 });
  }
}