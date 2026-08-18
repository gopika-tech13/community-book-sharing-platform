import React, { useEffect, useState } from "react";

import {
  Bell,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";

import {
  getNotifications,
  acceptRequest,
  rejectRequest,
  clearNotifications,
} from "../services/api";

function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [clearing, setClearing] = useState(false);

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;


  // ========================================
  // LOAD NOTIFICATIONS
  // ========================================

  const loadNotifications = async () => {

    try {

      setLoading(true);

      if (!user?.user_id) {
        console.error("❌ User ID not found");
        return;
      }

      const data = await getNotifications(user.user_id);

      console.log(
        "🔥 NOTIFICATIONS:",
        JSON.stringify(data, null, 2)
      );

      setNotifications(data);

    } catch (error) {

      console.error(
        "❌ Failed to load notifications:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // ========================================
  // LOAD WHEN PAGE OPENS
  // ========================================

  useEffect(() => {
    loadNotifications();
  }, []);


  // ========================================
  // ACCEPT REQUEST
  // ========================================

  const handleAccept = async (requestId) => {

    if (!requestId) {
      console.error("❌ Request ID is missing");
      return;
    }

    try {

      console.log(
        "🟢 ACCEPT REQUEST ID:",
        requestId
      );

      setProcessingId(requestId);

      await acceptRequest(requestId);

      console.log(
        "✅ Request accepted successfully"
      );

      // Reload notifications
      await loadNotifications();

    } catch (error) {

      console.error(
        "❌ Accept request failed:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to accept request"
      );

    } finally {

      setProcessingId(null);

    }
  };


  // ========================================
  // REJECT REQUEST
  // ========================================

  const handleReject = async (requestId) => {

    if (!requestId) {
      console.error("❌ Request ID is missing");
      return;
    }

    try {

      console.log(
        "🔴 REJECT REQUEST ID:",
        requestId
      );

      setProcessingId(requestId);

      await rejectRequest(requestId);

      console.log(
        "✅ Request rejected successfully"
      );

      // Reload notifications
      await loadNotifications();

    } catch (error) {

      console.error(
        "❌ Reject request failed:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to reject request"
      );

    } finally {

      setProcessingId(null);

    }
  };


  // ========================================
  // CLEAR ALL NOTIFICATIONS
  // ========================================

  const handleClearNotifications = async () => {

    if (!user?.user_id) {
      console.error("❌ User ID not found");
      return;
    }

    const confirmClear = window.confirm(
      "Are you sure you want to clear all notifications?"
    );

    if (!confirmClear) {
      return;
    }

    try {

      setClearing(true);

      console.log(
        "🗑️ CLEARING NOTIFICATIONS FOR USER:",
        user.user_id
      );

      await clearNotifications(user.user_id);

      // Immediately clear UI
      setNotifications([]);

      console.log(
        "✅ All notifications cleared"
      );

    } catch (error) {

      console.error(
        "❌ Clear notifications failed:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to clear notifications"
      );

    } finally {

      setClearing(false);

    }
  };


  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (
      <div className="page">

        <div className="container">

          <div className="empty-state">

            <Bell size={40} />

            <h3>
              Loading notifications...
            </h3>

          </div>

        </div>

      </div>
    );
  }


  // ========================================
  // UI
  // ========================================

  return (

    <div className="page">

      <div className="container">


        {/* ========================================
            HEADER
        ======================================== */}

        <div className="page-header">

          <div className="page-header-row">

            <div>

              <h1>
                Notifications
              </h1>

              <p>
                Stay updated with your book activity.
              </p>

            </div>


            {/* CLEAR BUTTON */}

            {notifications.length > 0 && (

              <button
                onClick={handleClearNotifications}
                disabled={clearing}
                className="btn btn-danger"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >

                <Trash2 size={17} />

                {clearing
                  ? "Clearing..."
                  : "Clear All"}

              </button>

            )}

          </div>

        </div>


        {/* ========================================
            NO NOTIFICATIONS
        ======================================== */}

        {notifications.length === 0 ? (

          <div className="empty-state">

            <Bell size={40} />

            <h3>
              No notifications yet.
            </h3>

            <p>
              Stay updated with your book activity.
            </p>

          </div>

        ) : (


          /* ========================================
             NOTIFICATION LIST
          ======================================== */

          <div className="notification-list">

            {notifications.map((notification) => {


              // ========================================
              // ONLY NEW REQUEST NOTIFICATIONS
              // ========================================

              const isRequest =
                Boolean(notification.request_id) &&
                notification.message?.startsWith("New ") &&
                notification.message?.includes(
                  "request received"
                );


              const isProcessing =
                processingId ===
                notification.request_id;


              return (

                <div
                  key={notification.notification_id}
                  className="notification-card"
                >


                  {/* NOTIFICATION ICON */}

                  <div className="notification-icon">

                    <Bell size={20} />

                  </div>


                  {/* NOTIFICATION CONTENT */}

                  <div className="notification-content">


                    {/* MESSAGE */}

                    <p>
                      {notification.message}
                    </p>


                    {/* DATE */}

                    <span>

                      {notification.created_at
                        ? new Date(
                            notification.created_at
                          ).toLocaleString()
                        : ""}

                    </span>


                    {/* ========================================
                        ACCEPT / REJECT
                        ONLY FOR NEW REQUEST
                    ======================================== */}

                    {isRequest && (

                      <div
                        className="request-actions"
                        style={{
                          marginTop: "12px",
                          display: "flex",
                          gap: "10px",
                        }}
                      >


                        {/* ACCEPT */}

                        <button
                          onClick={() =>
                            handleAccept(
                              notification.request_id
                            )
                          }
                          disabled={isProcessing}
                          className="btn btn-green"
                        >

                          <CheckCircle size={16} />

                          {isProcessing
                            ? "Processing..."
                            : "Accept"}

                        </button>


                        {/* REJECT */}

                        <button
                          onClick={() =>
                            handleReject(
                              notification.request_id
                            )
                          }
                          disabled={isProcessing}
                          className="btn btn-danger"
                        >

                          <XCircle size={16} />

                          {isProcessing
                            ? "Processing..."
                            : "Reject"}

                        </button>


                      </div>

                    )}

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );
}

export default Notifications;