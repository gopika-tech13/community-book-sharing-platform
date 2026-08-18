const express = require("express");

const router = express.Router();

const {
  acceptRequest,
  rejectRequest
} = require("../controllers/exchangeController");

router.put(
  "/accept/:request_id",
  acceptRequest
);

router.put(
  "/reject/:request_id",
  rejectRequest
);

module.exports = router;