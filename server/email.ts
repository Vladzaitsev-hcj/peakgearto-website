import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';

// Initialize Brevo API
const transactionalEmailsApi = new TransactionalEmailsApi();
transactionalEmailsApi.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - Peak Gear TO</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 40px auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background-color: #2E5E4E; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 40px; }
          .button { display: inline-block; background-color: #FF9F1C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-radius: 0 0 8px 8px; }
          .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; color: #856404; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Peak Gear TO</h1>
            <p>Password Reset Request</p>
          </div>
          <div class="content">
            <h2>Reset Your Password</h2>
            <p>Hello,</p>
            <p>We received a request to reset the password for your Peak Gear TO account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset My Password</a>
            </div>
            
            <div class="warning">
              <strong>Important:</strong> This link will expire in 1 hour for security reasons.
            </div>
            
            <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            
            <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #2E5E4E;">${resetUrl}</p>
            
            <p>Best regards,<br>The Peak Gear TO Team</p>
          </div>
          <div class="footer">
            <p>Peak Gear TO - Premium Outdoor Equipment Rentals</p>
            <p>Greater Toronto Area | <a href="https://peakgearto-website.onrender.com" style="color: #2E5E4E;">Visit Our Website</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
    Peak Gear TO - Password Reset Request

    Hello,

    We received a request to reset the password for your Peak Gear TO account.

    To reset your password, please visit this link:
    ${resetUrl}

    This link will expire in 1 hour for security reasons.

    If you didn't request a password reset, you can safely ignore this email.

    Best regards,
    The Peak Gear TO Team

    Peak Gear TO - Premium Outdoor Equipment Rentals
    Greater Toronto Area
    Website: https://peakgearto-website.onrender.com
    `;

    const result = await transactionalEmailsApi.sendTransacEmail({
      to: [{ email: to }],
      subject: "Reset Your Password - Peak Gear TO",
      htmlContent,
      textContent,
      sender: { 
        email: "peakgearto_norep@outlook.com", 
        name: "Peak Gear TO" 
      }
    });

    console.log('Password reset email sent successfully:', result.body?.messageId);
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}

export async function sendWelcomeEmail(to: string, firstName: string): Promise<void> {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Peak Gear TO!</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 40px auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background-color: #2E5E4E; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 40px; }
          .button { display: inline-block; background-color: #FF9F1C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Peak Gear TO</h1>
            <p>Welcome to the Adventure!</p>
          </div>
          <div class="content">
            <h2>Welcome, ${firstName}!</h2>
            <p>Thank you for joining Peak Gear TO, your premier destination for outdoor equipment rentals in the Greater Toronto Area.</p>
            
            <p>You're now ready to:</p>
            <ul>
              <li>Browse our premium selection of roof boxes and bike carriers</li>
              <li>Book equipment for your next adventure</li>
              <li>Enjoy convenient delivery and pickup options</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="https://peakgearto-website.onrender.com/products" class="button">Start Exploring</a>
            </div>
            
            <p>If you have any questions, don't hesitate to reach out to our team.</p>
            
            <p>Happy adventuring!<br>The Peak Gear TO Team</p>
          </div>
          <div class="footer">
            <p>Peak Gear TO - Premium Outdoor Equipment Rentals</p>
            <p>Greater Toronto Area | <a href="https://peakgearto-website.onrender.com" style="color: #2E5E4E;">Visit Our Website</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await transactionalEmailsApi.sendTransacEmail({
      to: [{ email: to }],
      subject: "Welcome to Peak Gear TO!",
      htmlContent,
      sender: { 
        email: "peakgearto_norep@outlook.com", 
        name: "Peak Gear TO" 
      }
    });

    console.log('Welcome email sent successfully:', result.body?.messageId);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't throw error for welcome email as it's not critical
  }
}