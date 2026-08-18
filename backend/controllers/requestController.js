const db = require("../config/db");

// ========================================
// CREATE BOOK REQUEST
// ========================================
exports.createRequest = (req, res) => {
  const {
    book_id,
    requester_id,
    message,
    request_type
  } = req.body;

  // ========================================
  // GET BOOK OWNER
  // ========================================
  const bookSql = `
    SELECT
      book_id,
      title,
      owner_id
    FROM books
    WHERE book_id = ?
  `;

  db.query(
    bookSql,
    [book_id],
    (err, books) => {
      if (err) {
        console.error(
          "❌ Find book error:",
          err
        );

        return res.status(500).json({
          message: "Failed to find book"
        });
      }

      if (books.length === 0) {
        return res.status(404).json({
          message: "Book not found"
        });
      }

      const book = books[0];

      // ========================================
      // PREVENT OWNER REQUESTING OWN BOOK
      // ========================================
      if (
        String(book.owner_id) ===
        String(requester_id)
      ) {
        return res.status(400).json({
          message:
            "You cannot request your own book"
        });
      }

      // ========================================
      // CREATE REQUEST
      // ========================================
      const requestSql = `
        INSERT INTO exchange_requests
        (
          book_id,
          requester_id,
          message,
          request_type,
          status
        )
        VALUES (?, ?, ?, ?, 'PENDING')
      `;

      db.query(
        requestSql,
        [
          book_id,
          requester_id,
          message,
          request_type
        ],
        (err, result) => {
          if (err) {
            console.error(
              "❌ Create request error:",
              err
            );

            return res.status(500).json({
              message:
                "Failed to create request"
            });
          }

          // ========================================
          // UNIQUE REQUEST ID
          // ========================================
          const requestId =
            result.insertId;

          console.log(
            "🆔 New Request ID:",
            requestId
          );

          // ========================================
          // CREATE NOTIFICATION
          // ========================================
          const notificationSql = `
            INSERT INTO notifications
            (
              user_id,
              request_id,
              message
            )
            VALUES (?, ?, ?)
          `;

          const notificationMessage =
            `New ${request_type} request received for "${book.title}".`;

          db.query(
            notificationSql,
            [
              book.owner_id,
              requestId,
              notificationMessage
            ],
            (notificationError) => {
              if (notificationError) {
                console.error(
                  "❌ Notification error:",
                  notificationError
                );

                return res.status(500).json({
                  message:
                    "Request created but notification failed"
                });
              }

              console.log(
                "🔔 Notification created for request:",
                requestId
              );

              return res.status(201).json({
                success: true,
                message:
                  "Request sent successfully",
                request_id:
                  requestId
              });
            }
          );
        }
      );
    }
  );
};


// ========================================
// GET ALL REQUESTS
// ========================================
exports.getRequests = (req, res) => {

  const sql = `
    SELECT
      er.request_id,
      er.book_id,
      er.requester_id,
      er.request_type,
      er.message,
      er.status,
      er.created_at,

      b.title,
      b.owner_id,

      u.name AS requester_name

    FROM exchange_requests er

    JOIN books b
      ON er.book_id = b.book_id

    JOIN users u
      ON er.requester_id = u.user_id

    ORDER BY er.created_at DESC
  `;

  db.query(
    sql,
    (err, result) => {
      if (err) {
        console.error(
          "❌ Get requests error:",
          err
        );

        return res.status(500).json({
          message:
            "Failed to fetch requests"
        });
      }

      return res.status(200).json({
        requests: result
      });
    }
  );
};


// ========================================
// ACCEPT REQUEST
// ========================================
exports.acceptRequest = (req, res) => {

  const { request_id } = req.params;

  const sql = `
    UPDATE exchange_requests
    SET status = 'ACCEPTED'
    WHERE request_id = ?
  `;

  db.query(
    sql,
    [request_id],
    (err, result) => {

      if (err) {
        console.error(
          "❌ Accept request error:",
          err
        );

        return res.status(500).json({
          success: false,
          message:
            "Failed to accept request"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Request not found"
        });
      }

      console.log(
        "🟢 Request accepted:",
        request_id
      );

      return res.status(200).json({
        success: true,
        message:
          "Request accepted successfully",
        request_id:
          request_id
      });
    }
  );
};


// ========================================
// REJECT REQUEST
// ========================================
exports.rejectRequest = (req, res) => {

  const { request_id } = req.params;

  const sql = `
    UPDATE exchange_requests
    SET status = 'REJECTED'
    WHERE request_id = ?
  `;

  db.query(
    sql,
    [request_id],
    (err, result) => {

      if (err) {
        console.error(
          "❌ Reject request error:",
          err
        );

        return res.status(500).json({
          success: false,
          message:
            "Failed to reject request"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Request not found"
        });
      }

      console.log(
        "🔴 Request rejected:",
        request_id
      );

      return res.status(200).json({
        success: true,
        message:
          "Request rejected successfully",
        request_id:
          request_id
      });
    }
  );
};