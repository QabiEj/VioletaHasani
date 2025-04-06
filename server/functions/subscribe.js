const nodemailer = require('nodemailer');

// Configure Nodemailer with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email } = JSON.parse(event.body);
    
    // Prepare email content
    const mailOptions = {
      from: `"Newsletter Subscription" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Violeta's email
      subject: 'New Newsletter Subscription',
      html: `
        <h3>New Newsletter Subscription</h3>
        <p><strong>Email:</strong> ${email}</p>
      `
    };
    
    // Send notification email to Violeta
    await transporter.sendMail(mailOptions);
    
    // Send confirmation email to subscriber
    const confirmationMail = {
      from: `"Violeta Hasani" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Subscription Confirmation',
      html: `
        <h3>Thank you for subscribing!</h3>
        <p>You have successfully subscribed to receive updates on my latest research and publications.</p>
        <p>Best regards,<br>Violeta Hasani<br>Legal Researcher & Academic</p>
      `
    };
    
    await transporter.sendMail(confirmationMail);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'You have successfully subscribed!' })
    };
  } catch (error) {
    console.error('Error processing subscription:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Failed to subscribe. Please try again later.' })
    };
  }
};