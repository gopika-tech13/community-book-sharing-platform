import React from "react";
import { useEffect, useState } from "react";
import {
  Inbox,
  User,
  BookOpen,
} from "lucide-react";

import { getRequests } from "../services/api";
import Badge from "../components/Badge";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      try {
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

    loadRequests();
  }, []);

  const userData =
    localStorage.getItem("user");

  const user =
    userData
      ? JSON.parse(userData)
      : null;

  const myRequests = requests.filter(
    (request) =>
      String(request.requester_id) ===
      String(user?.user_id)
  );

  return (
    <main className="page">

      <div className="container">

        <div className="page-header">

          <h1>My Requests</h1>

          <p>
            Track your book exchange and sharing requests.
          </p>

        </div>

        {loading ? (
          <div className="empty-state">
            Loading requests...
          </div>
        ) : myRequests.length === 0 ? (

          <div className="empty-state">

            <Inbox size={40} />

            <h3>
              No requests yet
            </h3>

            <p>
              Browse books and send your first request.
            </p>

          </div>

        ) : (

          <div className="request-list">

            {myRequests.map((request) => (

              <div
                className="request-card"
                key={request.request_id}
              >

                <div className="request-icon">
                  <BookOpen size={22} />
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
                      <User size={14} />
                      {request.owner_name ||
                        "Book Owner"}
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

                <Badge
                  type={
                    request.status?.toLowerCase()
                  }
                >
                  {request.status}
                </Badge>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}

export default MyRequests;