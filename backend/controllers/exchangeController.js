const db = require("../config/db");


// ========================================
// ACCEPT REQUEST
// ========================================
exports.acceptRequest = (req, res) => {
  const { request_id } = req.params;

  const getRequestSql = `
    SELECT
      er.request_id,
      er.requester_id,
      b.owner_id,
      er.book_id,
      b.title
    FROM exchange_requests er
    JOIN books b
      ON er.book_id = b.book_id
    WHERE er.request_id = ?
  `;

  db.query(
    getRequestSql,
    [request_id],
    (err, requests) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Failed to fetch request",
        });
      }

      if (requests.length === 0) {
        return res.status(404).json({
          message: "Request not found",
        });
      }

      const request = requests[0];

      // Update request
      const updateSql = `
        UPDATE exchange_requests
        SET status = 'ACCEPTED'
        WHERE request_id = ?
      `;

      db.query(
        updateSql,
        [request_id],
        (err) => {
          if (err) {
            console.error(err);

            return res.status(500).json({
              message: "Failed to accept request",
            });
          }

          // Notification for REQUESTER
          const notificationSql = `
            INSERT INTO notifications
            (user_id, request_id, message)
            VALUES (?, ?, ?)
          `;

          const message =
            `Your request for "${request.title}" was accepted.`;

          db.query(
            notificationSql,
            [
              request.requester_id,
              request.request_id,
              message,
            ],
            (err) => {
              if (err) {
                console.error(err);

                return res.status(500).json({
                  message:
                    "Request accepted but notification failed",
                });
              }

              res.json({
                message: "Request accepted successfully",
              });
            }
          );
        }
      );
    }
  );
};


// ========================================
// REJECT REQUEST
// ========================================
exports.rejectRequest = (req, res) => {
  const { request_id } = req.params;

  const getRequestSql = `
    SELECT
      er.request_id,
      er.requester_id,
      b.owner_id,
      er.book_id,
      b.title
    FROM exchange_requests er
    JOIN books b
      ON er.book_id = b.book_id
    WHERE er.request_id = ?
  `;

  db.query(
    getRequestSql,
    [request_id],
    (err, requests) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Failed to fetch request",
        });
      }

      if (requests.length === 0) {
        return res.status(404).json({
          message: "Request not found",
        });
      }

      const request = requests[0];

      // Update request
      const updateSql = `
        UPDATE exchange_requests
        SET status = 'REJECTED'
        WHERE request_id = ?
      `;

      db.query(
        updateSql,
        [request_id],
        (err) => {
          if (err) {
            console.error(err);

            return res.status(500).json({
              message: "Failed to reject request",
            });
          }

          // Notification for REQUESTER
          const notificationSql = `
            INSERT INTO notifications
            (user_id, request_id, message)
            VALUES (?, ?, ?)
          `;

          const message =
            `Your request for "${request.title}" was rejected.`;

          db.query(
            notificationSql,
            [
              request.requester_id,
              request.request_id,
              message,
            ],
            (err) => {
              if (err) {
                console.error(err);

                return res.status(500).json({
                  message:
                    "Request rejected but notification failed",
                });
              }

              res.json({
                message: "Request rejected successfully",
              });
            }
          );
        }
      );
    }
  );
};