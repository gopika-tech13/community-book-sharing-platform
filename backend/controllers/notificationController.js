const db = require("../config/db");

// ========================================
// GET USER NOTIFICATIONS
// ========================================
exports.getNotifications = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT
      n.notification_id,
      n.user_id,
      n.request_id,
      n.message,
      n.created_at
    FROM notifications AS n
    WHERE n.user_id = ?
    ORDER BY n.created_at DESC
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error(
        "❌ Notification fetch error:",
        err
      );

      return res.status(500).json({
        message: "Failed to fetch notifications",
        error: err.message,
      });
    }

    console.log(
      "🔥 Notifications for user:",
      user_id
    );

    console.log(
      "🔥 Notification results:",
      results
    );

    return res.status(200).json({
      notifications: results,
    });
  });
};

// ========================================
// MARK NOTIFICATION AS READ
// ========================================
exports.markAsRead = (req, res) => {
  const { notification_id } = req.params;

  const sql = `
    UPDATE notifications
    SET is_read = 1
    WHERE notification_id = ?
  `;

  db.query(
    sql,
    [notification_id],
    (err, result) => {
      if (err) {
        console.error(
          "❌ Mark notification error:",
          err
        );

        return res.status(500).json({
          message:
            "Failed to mark notification as read",
          error: err.message,
        });
      }

      return res.status(200).json({
        message:
          "Notification marked as read",
      });
    }
  );
};