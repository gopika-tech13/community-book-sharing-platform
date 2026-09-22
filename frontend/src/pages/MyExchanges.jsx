import React from "react";
import { useEffect, useState } from "react";
import {
  Handshake,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  getRequests,
  acceptRequest,
  rejectRequest,
} from "../services/api";

import Badge from "../components/Badge";

function MyExchanges() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData =
    localStorage.getItem("user");

  const user =
    userData
      ? JSON.parse(userData)
      : null;

  const loadRequests = async () => {
    try {
      setLoading(true);

      const response =
        await getRequests();

      const data =
        response.data.requests ||
        response.data.data ||
        response.data;

      setRequests(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const incomingRequests =
    requests.filter(
      (request) =>
        String(request.owner_id) ===
        String(user?.user_id)
    );

  const handleAccept = async (id) => {
    try {
      await acceptRequest(id);

      alert("Request accepted.");

      loadRequests();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to accept request."
      );
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id);

      alert("Request rejected.");

      loadRequests();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to reject request."
      );
    }
  };

  return (
    <main className="page">

      <div className="container">

        <div className="page-header">

          <h1>Book Requests</h1>

          <p>
            Manage requests received for your books.
          </p>

        </div>

        {loading ? (

          <div className="empty-state">
            Loading requests...
          </div>

        ) : incomingRequests.length === 0 ? (

          <div className="empty-state">

            <Handshake size={40} />

            <h3>
              No incoming requests
            </h3>

            <p>
              Requests from other community members
              will appear here.
            </p>

          </div>

        ) : (

          <div className="request-list">

            {incomingRequests.map((request) => (

              <div
                className="request-card"
                key={request.request_id}
              >

                <div className="request-icon">
                  <Handshake size={22} />
                </div>

                <div className="request-main">

                  <h3>
                    {request.title ||
                      "Book Request"}
                  </h3>

                  <p>
                    {request.message ||
                      "No message"}
                  </p>

                  <div className="request-meta">

                    <span>
                      From:{" "}
                      {request.requester_name ||
                        "Community Member"}
                    </span>

                    <Badge
                      type={
                        request.request_type?.toLowerCase()
                      }
                    >
                      {request.request_type}
                    </Badge>

                  </div>

                </div>

                <div className="request-actions">

                  <Badge
                    type={
                      request.status?.toLowerCase()
                    }
                  >
                    {request.status}
                  </Badge>

                  {request.status === "PENDING" && (
                    <>
                      <button
                        className="icon-action accept"
                        onClick={() =>
                          handleAccept(
                            request.request_id
                          )
                        }
                        title="Accept"
                      >
                        <CheckCircle size={19} />
                      </button>

                      <button
                        className="icon-action reject"
                        onClick={() =>
                          handleReject(
                            request.request_id
                          )
                        }
                        title="Reject"
                      >
                        <XCircle size={19} />
                      </button>
                    </>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}

export default MyExchanges;