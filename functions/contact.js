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
    const { name, email, subject, message } = JSON.parse(event.body);
    
    // Prepare email content
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // Violeta's email
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Send confirmation email to the sender
    const confirmationMail = {
      from: `"Violeta Hasani" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for your message',
      html: `
        <h3>Thank you for contacting me!</h3>
        <p>Dear ${name},</p>
        <p>I appreciate your message. I will review it and get back to you as soon as possible.</p>
        <p>Best regards,<br>Violeta Hasani<br>Legal Researcher & Academic</p>
      `
    };
    
    await transporter.sendMail(confirmationMail);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Your message has been sent successfully!' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Failed to send email. Please try again later.' })
    };
  }
};