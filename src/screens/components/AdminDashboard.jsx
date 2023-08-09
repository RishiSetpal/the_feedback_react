import { useState, useEffect } from "react";
import { get, ref, set, remove } from "firebase/database";
import { db } from "../../Firebase/FbConfig";

export default function AdminDashboard() {
  const [visitors, setVisitors] = useState({});
  const [wannaFetch, setWannaFetch] = useState(true);
  const [editedFeedbacks, setEditedFeedbacks] = useState({});
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    if (wannaFetch) {
      const dbRef = ref(db, "visitors");
      get(dbRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setVisitors(snapshot.val());
          } else {
            console.log("No Data");
          }
        })
        .finally(() => {
          setWannaFetch(false);
        });
    }
  }, [wannaFetch]);

  const handleEditFeedback = (emailKey, timestampKey, newFeedback) => {
    // Update the feedback and timestamp for the specific entry in Firebase Realtime Database
    const dbRef = ref(db, `visitors/${emailKey}/${timestampKey}`);
    const newTimestamp = new Date().toString();
    set(dbRef, {
      ...visitors[emailKey][timestampKey],
      Feedback: newFeedback,
      timestamp: newTimestamp,
    })
      .then(() => {
        alert("Feedback updated successfully!");
        // To fetch the updated data, set wannaFetch to true
        setWannaFetch(true);
      })
      .catch((error) => {
        console.error("Error updating feedback:", error);
      });
  };

  const deleteFeedback = (emailKey, timestampKey) => {
    const dbRef = ref(db, `visitors/${emailKey}/${timestampKey}`);
    remove(dbRef)
      .then(() => {
        alert("Record deleted");
        // To fetch the updated data after deletion, set wannaFetch to true
        setWannaFetch(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <center>
        <h1>Home Page</h1>
        <table border={1} style={{ margin: "20px", width: "60%" }}>
          <thead>
            <tr>
              <th>Feedback</th>
              <th>Rating</th>
              <th>EmailID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(visitors).map((emailKey) => {
              const emailData = visitors[emailKey];
              return Object.keys(emailData).map((timestampKey) => {
                const data = emailData[timestampKey];
                const editedFeedback = editedFeedbacks[`${emailKey}-${timestampKey}`] || data.Feedback;

                return (
                  <tr key={timestampKey} style={{ textAlign: "center" }}>
                    <td>
                      {editMode[`${emailKey}-${timestampKey}`] ? (
                        <input
                          type="text"
                          value={editedFeedback}
                          onChange={(e) =>
                            setEditedFeedbacks((prev) => ({
                              ...prev,
                              [`${emailKey}-${timestampKey}`]: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        data.Feedback
                      )}
                    </td>
                    <td>{data.Rating}</td>
                    <td>{data.emailId}</td>
                    <td>
                      {editMode[`${emailKey}-${timestampKey}`] ? (
                        <button
                          onClick={() => {
                            handleEditFeedback(emailKey, timestampKey, editedFeedback);
                            setEditMode((prev) => ({
                              ...prev,
                              [`${emailKey}-${timestampKey}`]: false,
                            }));
                          }}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditMode((prev) => ({
                              ...prev,
                              [`${emailKey}-${timestampKey}`]: true,
                            }));
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete the feedback?")) {
                            deleteFeedback(emailKey, timestampKey);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </center>
    </>
  );
}
