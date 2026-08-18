const express = require("express");

const router = express.Router();

const {
  createRequest,
  getRequests,
  acceptRequest,
  rejectRequest
} = require("../controllers/requestController");

// ========================================
// CREATE REQUEST
// ========================================
router.post("/send", createRequest);

// ========================================
// GET ALL REQUESTS
// ========================================
router.get("/", getRequests);

// ========================================
// ACCEPT REQUEST
// ========================================
router.put(
  "/:request_id/accept",
  acceptRequest
);

// ========================================
// REJECT REQUEST
// ========================================
router.put(
  "/:request_id/reject",
  rejectRequest
);

module.exports = router;