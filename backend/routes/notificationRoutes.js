const express = require("express");

const router = express.Router();

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

// ========================================
// GET NOTIFICATIONS
// ========================================

router.get("/:user_id", getNotifications);

// ========================================
// MARK NOTIFICATION AS READ
// ========================================

router.put("/:notification_id", markAsRead);

// ========================================
// CLEAR ALL NOTIFICATIONS FOR USER
// ========================================

router.delete("/user/:user_id", (req, res) => {
  const { user_id } = req.params;

  const db = require("../config/db");

  const sql = `
    DELETE FROM notifications
    WHERE user_id = ?
  `;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error(
        "❌ CLEAR NOTIFICATIONS ERROR:",
        err
      );

      return res.status(500).json({
        message: "Failed to clear notifications",
      });
    }

    console.log(
      "✅ Notifications cleared:",
      result.affectedRows
    );

    return res.status(200).json({
      message: "All notifications cleared successfully",
      deleted: result.affectedRows,
    });
  });
});

module.exports = router;