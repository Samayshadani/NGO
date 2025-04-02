// const Donation = require("../models/Donation");

// // Fetch all donations
exports.getDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching donations", error });
    }
};

// // Add a new donation
// exports.addDonation = async (req, res) => {
//     try {
//         const newDonation = new Donation({
//             name: req.body.name,
//             phone: req.body.phone,
//             email: req.body.email,
//             address: req.body.address,
//             note: req.body.note,
//             amount: req.body.amount,
//             date: req.body.date || new Date(),
//         });

//         const savedDonation = await newDonation.save();
//         res.status(201).json(savedDonation);
//     } catch (err) {
//         res.status(500).json({ error: "Server error" });
//     }
// };



// demo
// const paypal = require('@paypal/checkout-server-sdk');
// const Donation = require("../models/Donation");
// const PDFDocument = require("pdfkit");
// const nodemailer = require("nodemailer");
// const client = require("../paypalClient");  // Import the PayPal client

// // Add a new donation and initiate payment
// exports.addDonation = async (req, res) => {
//   try {
//     const { name, phone, email, address, note, amount } = req.body;

//     // Create a new donation document
//     const newDonation = new Donation({
//       name,
//       phone,
//       email,
//       address,
//       note,
//       amount,
//     });

//     // Save donation details to the database
//     const savedDonation = await newDonation.save();

//     // Create a PayPal order
//     const order = new paypal.orders.OrdersCreateRequest();
//     order.prefer("return=representation");
//     order.requestBody({
//       intent: 'CAPTURE',
//       purchase_units: [{
//         amount: {
//           currency_code: 'USD',
//           value: amount.toString(),  // Convert amount to string as PayPal expects it
//         },
//         description: `Donation for ${savedDonation.name}`,
//       }],
//     });

//     try {
//       const orderResponse = await client.execute(order);
//       const orderId = orderResponse.result.id;

//       // Send the order ID and amount to the frontend for payment
//       res.status(201).json({
//         orderId: orderId,
//         donationId: savedDonation._id,
//       });
//     } catch (error) {
//       res.status(500).json({ error: "Error creating PayPal order" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // Verify payment and generate invoice
// exports.verifyPayment = async (req, res) => {
//   const { paymentId, orderId, donationId } = req.body;

//   // Capture the payment
//   const captureRequest = new paypal.orders.OrdersCaptureRequest(orderId);
//   captureRequest.prefer("return=representation");

//   try {
//     const captureResponse = await client.execute(captureRequest);

//     // Mark the donation as paid
//     Donation.findByIdAndUpdate(donationId, { status: "Paid" }, { new: true })
//       .then((updatedDonation) => {
//         // Generate invoice PDF
//         const invoiceBuffer = generateInvoice(updatedDonation);

//         // Send the invoice via email
//         sendInvoiceEmail(updatedDonation.email, invoiceBuffer);

//         res.status(200).json({ message: "Payment verified and invoice sent." });
//       })
//       .catch((error) => {
//         res.status(500).json({ error: "Error updating donation status" });
//       });
//   } catch (error) {
//     res.status(400).json({ error: "Payment verification failed" });
//   }
// };

// // Function to generate invoice PDF
// const generateInvoice = (donation) => {
//   const doc = new PDFDocument();
//   const chunks = [];
//   doc.on("data", (chunk) => chunks.push(chunk));
//   doc.on("end", () => {
//     const pdfBuffer = Buffer.concat(chunks);
//     return pdfBuffer;
//   });

//   doc.fontSize(25).text("Invoice", { align: "center" });
//   doc.text("------------------------------------");
//   doc.text(`Name: ${donation.name}`);
//   doc.text(`Email: ${donation.email}`);
//   doc.text(`Amount Paid: ₹${donation.amount}`);
//   doc.text(`Transaction ID: ${donation._id}`);
//   doc.text(`Date: ${donation.date.toLocaleDateString()}`);
//   doc.end();
// };

// // Function to send invoice via email
// const sendInvoiceEmail = (email, invoiceBuffer) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "hackerbhaiya71@gmail.com", // Replace with your email
//       pass: "qwerty@123",   // Replace with your email password
//     },
//   });

//   const mailOptions = {
//     from: "hackerbhaiya71@gmail.com",
//     to: email,
//     subject: "Donation Invoice",
//     text: "Thank you for your donation! Please find the invoice attached.",
//     attachments: [
//       {
//         filename: "invoice.pdf",
//         content: invoiceBuffer,
//       },
//     ],
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Error sending email:", error);
//     } else {
//       console.log("Email sent:", info.response);
//     }
//   });
// };



const paypal = require('@paypal/checkout-server-sdk');
const Donation = require("../models/Donation");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const client = require("../paypalClient");  // Import the PayPal client

// Add a new donation and initiate payment
exports.addDonation = async (req, res) => {
  try {
    const { name, phone, email, address, note, amount } = req.body;

    // Create a new donation document
    const newDonation = new Donation({
      name,
      phone,
      email,
      address,
      note,
      amount,
    });

    // Save donation details to the database
    const savedDonation = await newDonation.save();
    console.log("Donation saved:", savedDonation); // Log saved donation

    // Create a PayPal order
    const order = new paypal.orders.OrdersCreateRequest();
    order.prefer("return=representation");
    order.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',  // Ensure currency is correct
          value: amount.toString(),  // Convert amount to string as PayPal expects it
        },
        description: `Donation for ${savedDonation.name}`,
      }],
    });

    try {
      const orderResponse = await client.execute(order);
      console.log("PayPal Order Created:", orderResponse.result);  // Log PayPal response
      const orderId = orderResponse.result.id;

      // Send the order ID and amount to the frontend for payment
      res.status(201).json({
        orderId: orderId,
        donationId: savedDonation._id,
      });
    } catch (error) {
      console.error("Error creating PayPal order:", error);  // Log error
      res.status(500).json({ error: "Error creating PayPal order" });
    }
  } catch (err) {
    console.error("Error saving donation:", err);  // Log error
    res.status(500).json({ error: "Server error" });
  }
};

// Verify payment and generate invoice
exports.verifyPayment = async (req, res) => {
  const { paymentId, orderId, donationId } = req.body;
  console.log("Payment verification received:", req.body);  // Log payment verification request

  // Capture the payment
  const captureRequest = new paypal.orders.OrdersCaptureRequest(orderId);
  captureRequest.prefer("return=representation");

  try {
    const captureResponse = await client.execute(captureRequest);
    console.log("PayPal Payment Capture Response:", captureResponse.result);  // Log capture response

    // Mark the donation as paid
    Donation.findByIdAndUpdate(donationId, { status: "Paid" }, { new: true })
      .then((updatedDonation) => {
        // Generate invoice PDF
        const invoiceBuffer = generateInvoice(updatedDonation);

        // Send the invoice via email
        sendInvoiceEmail(updatedDonation.email, invoiceBuffer);

        res.status(200).json({ message: "Payment verified and invoice sent." });
      })
      .catch((error) => {
        console.error("Error updating donation status:", error);  // Log error
        res.status(500).json({ error: "Error updating donation status" });
      });
  } catch (error) {
    console.error("Error verifying payment:", error);  // Log error
    res.status(400).json({ error: "Payment verification failed" });
  }
};

// Function to generate invoice PDF
const generateInvoice = (donation) => {
  const doc = new PDFDocument();
  const chunks = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {
    const pdfBuffer = Buffer.concat(chunks);
    return pdfBuffer;
  });

  doc.fontSize(25).text("Invoice", { align: "center" });
  doc.text("------------------------------------");
  doc.text(`Name: ${donation.name}`);
  doc.text(`Email: ${donation.email}`);
  doc.text(`Amount Paid: ₹${donation.amount}`);
  doc.text(`Transaction ID: ${donation._id}`);
  doc.text(`Date: ${donation.date.toLocaleDateString()}`);
  doc.end();
};

// Function to send invoice via email
const sendInvoiceEmail = (email, invoiceBuffer) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hackerbhaiya71@gmail.com", // Use environment variable for security
      pass: "qwerty@123",   // Use environment variable for security
    },
  });

  const mailOptions = {
    from: "hackerbhaiya71@gmail.com",  // Use environment variable for security
    to: email,
    subject: "Donation Invoice",
    text: "Thank you for your donation! Please find the invoice attached.",
    attachments: [
      {
        filename: "invoice.pdf",
        content: invoiceBuffer,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);  // Log error
    } else {
      console.log("Email sent:", info.response);  // Log success
    }
  });
};
