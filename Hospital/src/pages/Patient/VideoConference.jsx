// import React, { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import axios from "axios";

// const VideoConference = () => {
//   const { doctorName } = useParams();
//   const location = useLocation();
//   const { url, did, date, time, aid } = location.state || {};

//   const [queueData, setQueueData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const USE_DUMMY_DATA = true;

//   // useEffect(() => {
//   //   if (did && date && time) {
//   //     const fetchQueue = async () => {
//   //       try {
//   //         const response = await axios.post(
//   //           "http://localhost:8080/patient/getQueue",
//   //           {
//   //             date,
//   //             did,
//   //             time,
//   //           }
//   //         );

//   //         if (response.data.success) {
//   //           setQueueData(response.data.data);
//   //         }
//   //       } catch (error) {
//   //         console.error("Error fetching queue:", error);
//   //       } finally {
//   //         setLoading(false);
//   //       }
//   //     };

//   //     fetchQueue();
//   //   }
//   // }, [did, date, time]);

//   // ✅ Calculate queue stats
//   useEffect(() => {
//     if (USE_DUMMY_DATA) {
//       // ✅ Dummy queue data for testing
//       const dummy = [
//         {
//           aid: "1756377098079",
//           pid: "006",
//           did: "003",
//           date: "2025-08-20",
//           time: "evening",
//           status: "completed",
//           description: "New appointment booking",
//           reports: [],
//           paymentState: "paid",
//           number: 1,
//         },
//         {
//           aid: "1756377098080",
//           pid: "007",
//           did: "003",
//           date: "2025-08-20",
//           time: "evening",
//           status: "scheduled",
//           description: "Follow-up checkup",
//           reports: [],
//           paymentState: "paid",
//           number: 2,
//         },
//         {
//           aid: "1756377098081",
//           pid: "008",
//           did: "003",
//           date: "2025-08-20",
//           time: "evening",
//           status: "scheduled",
//           description: "Consultation",
//           reports: [],
//           paymentState: "unpaid",
//           number: 3,
//         },
//       ];

//       setTimeout(() => {
//         setQueueData(dummy);
//         setLoading(false);
//       }, 800); // simulate API delay
//     } else {
//       // ✅ Real API call
//       if (did && date && time) {
//         const fetchQueue = async () => {
//           try {
//             const response = await axios.post(
//               "http://localhost:8080/patient/getQueue",
//               { date, did, time }
//             );

//             if (response.data.success) {
//               setQueueData(response.data.data);
//             }
//           } catch (error) {
//             console.error("Error fetching queue:", error);
//           } finally {
//             setLoading(false);
//           }
//         };

//         fetchQueue();
//       }
//     }
//   }, [did, date, time]);

//   const completed = queueData.filter((q) => q.status === "completed").length;

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">
//           Video Conference
//         </h1>
//         <h2 className="text-xl text-gray-700 mb-6">Dr. {doctorName}</h2>

//         {/* ✅ Queue Summary Card */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-3">
//             Patient Queue
//           </h3>
//           {loading ? (
//             <p className="text-gray-500">Loading queue...</p>
//           ) : queueData.length === 0 ? (
//             <p className="text-gray-500">No patients in queue</p>
//           ) : (
//             <div className="flex flex-wrap gap-3">
//               {queueData.map((q) => {
//                 const isCurrentPatient = q.aid === aid;

//                 return (
//                   <div
//                     key={q.aid}
//                     className={`
//               relative w-20 h-20 rounded-xl flex flex-col items-center justify-center p-2 border shadow-md
//               ${
//                 q.status === "completed"
//                   ? "bg-gray-100 border-gray-300"
//                   : "bg-white border-gray-300"
//               }
//               ${isCurrentPatient ? "border-2 border-purple-500 scale-105" : ""}
//               transition-transform duration-200
//             `}
//                   >
//                     {/* "You" label for current patient */}
//                     {isCurrentPatient && (
//                       <span className="absolute top-1 text-xs font-semibold text-purple-600">
//                         You
//                       </span>
//                     )}

//                     {/* Checkmark for completed */}
//                     {q.status === "completed" && (
//                       <span className="absolute top-2 right-2 text-green-600 font-bold text-lg">
//                         ✔️
//                       </span>
//                     )}

//                     {/* Number */}
//                     <p className="text-xl font-bold">{q.number}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Jitsi Meet iframe */}
//         {url ? (
//           <iframe
//             src={url}
//             allow="camera; microphone; fullscreen; display-capture"
//             className="w-full h-[600px] rounded-lg shadow-lg"
//             title="Video Conference"
//           ></iframe>
//         ) : (
//           <p className="text-red-600">No video conference URL provided</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoConference;

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const VideoConference = () => {
  const { doctorName } = useParams();
  const location = useLocation();
  const { url, did, date, time, aid } = location.state || {};

  const [queueData, setQueueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const USE_DUMMY_DATA = true;
  const [socket, setSocket] = useState(null);
  const [uid, setuid] = useState("");
  const [connected, setConnected] = useState(false);

  // Initialize queue (dummy or real)
  // useEffect(() => {
  //   if (USE_DUMMY_DATA) {
  //     const dummy = [
  //       { aid: "1756377098078", number: 1, status: "completed" },
  //       { aid: "1756377098079", number: 2, status: "scheduled" },
  //       { aid: "1756377098080", number: 3, status: "scheduled" },
  //     ];
  //     setTimeout(() => {
  //       setQueueData(dummy);
  //       setLoading(false);
  //     }, 800);
  //   } else if (did && date && time) {
  //     const fetchQueue = async () => {
  //       try {
  //         const response = await axios.post(
  //           "http://localhost:8080/patient/getQueue",
  //           { date, did, time }
  //         );
  //         if (response.data.success) setQueueData(response.data.data);
  //       } catch (err) {
  //         console.error(err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchQueue();
  //   }
  // }, [did, date, time]);

  useEffect(() => {
    if (did && date && time) {
      const fetchQueue = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/patient/getQueue",
            {
              date,
              did,
              time,
            }
          );

          if (response.data.success) {
            setQueueData(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching queue:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchQueue();
    }
  }, [did, date, time]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/getUser", {
          withCredentials: true, // 👈 send cookies
        });

        console.log(response.data);
        setuid(response.data.data.uid);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // WebSocket to listen for completed patients
  useEffect(() => {
    const ws = new WebSocket("ws://10.10.5.3:9090/ws");

    ws.onopen = () => {
      console.log("🔗 Connected to server");
      setConnected(true);

      // Automatically send UID once socket is open
      if (uid && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            message: "patientConecting",
            uid,
            uidList: [],
            completedAid: "",
          })
        );
        console.log("✅ Sent UID to server:", uid);
      }
    };

    ws.onmessage = (event) => {
      const completedAid = event.data; // treat it as string directly

      setQueueData((prev) =>
        prev.map((q) =>
          q.aid === completedAid ? { ...q, status: "completed" } : q
        )
      );
    };

    ws.onclose = () => {
      console.log("❌ Connection closed");
      setConnected(false);
    };

    setSocket(ws);
    return () => ws.close();
  }, [uid]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Video Conference
        </h1>
        <h2 className="text-xl text-gray-700 mb-6">Dr. {doctorName}</h2>

        {/* Patient Queue */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Patient Queue
          </h3>
          {loading ? (
            <p className="text-gray-500">Loading queue...</p>
          ) : queueData.length === 0 ? (
            <p className="text-gray-500">No patients in queue</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {queueData.map((q) => {
                const isCurrentPatient = q.aid === aid;

                return (
                  <div
                    key={q.aid}
                    className={`
                      relative w-20 h-20 rounded-xl flex flex-col items-center justify-center p-2 border shadow-md
                      ${
                        q.status === "completed"
                          ? "bg-gray-100 border-gray-300"
                          : "bg-white border-gray-300"
                      }
                      ${
                        isCurrentPatient
                          ? "border-2 border-purple-500 scale-105"
                          : ""
                      }
                      transition-transform duration-200
                    `}
                  >
                    {/* "You" label */}
                    {isCurrentPatient && (
                      <span className="absolute top-1 text-xs font-semibold text-purple-600">
                        You
                      </span>
                    )}

                    {/* Checkmark for completed */}
                    {q.status === "completed" && (
                      <span className="absolute top-2 right-2 text-green-600 font-bold text-lg">
                        ✔️
                      </span>
                    )}

                    <p className="text-xl font-bold">{q.number}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Jitsi iframe */}
        {url ? (
          <iframe
            src={url}
            allow="camera; microphone; fullscreen; display-capture"
            className="w-full h-[600px] rounded-lg shadow-lg"
            title="Video Conference"
          />
        ) : (
          <p className="text-red-600">No video conference URL provided</p>
        )}
      </div>
    </div>
  );
};

export default VideoConference;
