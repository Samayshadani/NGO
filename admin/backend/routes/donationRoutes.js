const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");

router.get("/donate", donationController.getDonations);
router.post("/donate", donationController.addDonation);

module.exports = router;
