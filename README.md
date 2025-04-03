### Step 1: Set Up Your Development Environment

1. **Install Visual Studio Code**: If you haven't already, download and install [Visual Studio Code](https://code.visualstudio.com/).

2. **Install Node.js**: Download and install [Node.js](https://nodejs.org/) if you plan to use JavaScript for the backend. This will also install npm (Node Package Manager).

3. **Install Git**: If you want to use version control, install [Git](https://git-scm.com/).

### Step 2: Create a New Workspace

1. **Open Visual Studio Code**.
2. **Create a New Folder**: Create a new folder for your project, e.g., `FriendPortfolio`.
3. **Open the Folder in VS Code**: Go to `File` > `Open Folder...` and select the folder you just created.

### Step 3: Initialize the Project

1. **Open the Terminal**: In VS Code, open the terminal by going to `View` > `Terminal`.
2. **Initialize a New Node.js Project**: Run the following command to create a `package.json` file:
   ```bash
   npm init -y
   ```

### Step 4: Install Required Packages

You will need several packages for your project:

1. **Express**: For creating the server.
2. **Nodemailer**: For sending email notifications.
3. **Stripe**: For handling payments (or any other payment gateway you prefer).
4. **Body-parser**: To parse incoming request bodies.

Run the following command to install these packages:
```bash
npm install express nodemailer stripe body-parser
```

### Step 5: Create Project Structure

Create the following folder structure in your project:

```
FriendPortfolio/
│
├── public/                # For static files (HTML, CSS, JS)
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── routes/                # For route handling
│   └── api.js
│
├── views/                 # For any view templates (if using a templating engine)
│
├── .env                   # For environment variables (e.g., API keys)
├── server.js              # Main server file
└── package.json
```

### Step 6: Create the Server

In `server.js`, set up a basic Express server:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Add your Stripe secret key in .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/api', require('./routes/api'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Step 7: Set Up Routes

In `routes/api.js`, create routes for inquiries and payment processing:

```javascript
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Email setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
    },
});

// Inquiry route
router.post('/inquiry', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New Inquiry from ${name}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Inquiry sent successfully!');
    });
});

// Payment route
router.post('/pay', async (req, res) => {
    const { amount, token } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            source: token,
            description: 'Payment for work',
        });
        res.status(200).send('Payment successful!');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
```

### Step 8: Create Frontend Files

In `public/index.html`, create a simple form for inquiries and payment:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Portfolio</title>
</head>
<body>
    <h1>Showcase Your Work</h1>
    <form id="inquiry-form">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send Inquiry</button>
    </form>

    <form id="payment-form">
        <input type="number" name="amount" placeholder="Price in cents" required>
        <button type="submit">Pay</button>
    </form>

    <script src="script.js"></script>
</body>
</html>
```

In `public/script.js`, handle form submissions:

```javascript
document.getElementById('inquiry-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert('Inquiry sent!');
    } else {
        alert('Error sending inquiry.');
    }
});

document.getElementById('payment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert('Payment successful!');
    } else {
        alert('Error processing payment.');
    }
});
```

### Step 9: Environment Variables

Create a `.env` file in the root of your project to store sensitive information:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Step 10: Run Your Application

1. **Start the Server**: In the terminal, run:
   ```bash
   node server.js
   ```
2. **Open Your Browser**: Go to `http://localhost:3000` to see your website.

### Step 11: Deploy Your Application

Once your application is ready, you can deploy it using platforms like Heroku, Vercel, or DigitalOcean.

### Conclusion

This guide provides a basic structure for your friend's portfolio website. You can expand on this by adding features like user authentication, a database for storing inquiries and work details, and more advanced payment handling.