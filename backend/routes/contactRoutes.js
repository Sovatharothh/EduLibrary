const express = require("express");
const { submitForm, getAllMessages } = require("../controllers/contactController");
const router = express.Router();

router.post("/", submitForm);
router.get("/", getAllMessages);

module.exports = router;
