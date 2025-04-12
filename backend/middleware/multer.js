const multer = require("multer");

// Configure multer to use memory storage
const memoryStorage = multer.memoryStorage(); 
const upload = multer({ storage: memoryStorage });

module.exports = upload;



