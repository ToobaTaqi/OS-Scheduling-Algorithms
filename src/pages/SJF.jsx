import React, { useState, useEffect } from "react";

export default function SJF() {
  const [numProcessesInput, setNumProcessesInput] = useState("");
  const [range, setRange] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [bursts, setBursts] = useState([]);
  const [startTimes, setStartTimes] = useState([]);
  const [endTimes, setEndTimes] = useState([]);
  const [waitingTimes, setWaitingTimes] = useState([]);
  const [turnaroundTimes, setTurnaroundTimes] = useState([]); // Add turnaroundTimes state
  const [averageWaitingTime, setAverageWaitingTime] = useState(0);
  const [averageTurnaroundTime, setAverageTurnaroundTime] = useState(0);

  useEffect(() => {
    // This effect will run whenever arrivals is updated
    console.log(arrivals);
  }, [arrivals]);

  const calculateSJF = () => {
    const numProcesses = parseInt(numProcessesInput, 10);

    if (!isNaN(numProcesses) && numProcesses > 0) {
      const processes = [];

      for (let i = 0; i < numProcesses; i++) {
        processes.push({ id: i + 1, burst: bursts[i], arrival: arrivals[i] });
      }

      // Sort the processes initially by arrival time
      processes.sort((a, b) => a.arrival - b.arrival);

      // Calculate waiting times, turnaround times, and ending times
      let totalWaitingTime = 0;
      let totalTurnaroundTime = 0;
      let currentTime = 0;

      for (let i = 0; i < numProcesses; i++) {
        const availableProcesses = processes.filter(
          (process) => process.arrival <= currentTime && process.burst > 0
        );

        if (availableProcesses.length === 0) {
          currentTime++;
          continue;
        }

        // Sort available processes by burst time
        availableProcesses.sort((a, b) => a.burst - b.burst);

        const process = availableProcesses[0];
        const waitingTime = currentTime - process.arrival;
        const turnaroundTime = waitingTime + process.burst;

        totalWaitingTime += waitingTime;
        totalTurnaroundTime += turnaroundTime;

        startTimes[process.id - 1] = currentTime;
        endTimes[process.id - 1] = currentTime + process.burst;
        waitingTimes[process.id - 1] = waitingTime;
        turnaroundTimes[process.id - 1] = turnaroundTime;

        currentTime += process.burst;
        process.burst = 0; // Mark the process as completed
      }

      const avgWaitingTime = totalWaitingTime / numProcesses;
      const avgTurnaroundTime = totalTurnaroundTime / numProcesses;

      setRange(processes.map((process) => process.id));
      setAverageWaitingTime(avgWaitingTime);
      setAverageTurnaroundTime(avgTurnaroundTime);
    } else {
      alert("Please enter a valid number of processes greater than 0.");
    }
  };

  return (
    <div className="box d-flex flex-column align-items-center justify-content-center">
      <h4 className="text-center">
        <u>
          <b>Shortest Job First Algorithm</b>
        </u>
      </h4>
      <div className="d-flex flex-column align-items-center m-2">
        <div>
          <label>Number of Processes:</label>
          <input
            type="number"
            min={0}
            placeholder="1/2/3/..."
            style={{ width: "10vw" }}
            value={numProcessesInput}
            onChange={(e) => setNumProcessesInput(e.target.value)}
          />
        </div>
        {Array.from({ length: numProcessesInput }, (_, index) => (
          <div key={index}>
            <div>for Process {index + 1}:</div>
            <label>Arrival Time:</label>
            <input
              type="number"
              min={0}
              style={{ width: "6vw" }}
              value={arrivals[index] || ""}
              onChange={(e) => {
                const updatedArrivals = [...arrivals];
                updatedArrivals[index] = e.target.value;
                setArrivals(updatedArrivals);
              }}
            />
            <label>Burst Time:</label>
            <input
              type="number"
              min={0}
              style={{ width: "6vw" }}
              value={bursts[index] || ""}
              onChange={(e) => {
                const updatedBursts = [...bursts];
                updatedBursts[index] = parseInt(e.target.value, 10);
                setBursts(updatedBursts);
              }}
            />
          </div>
        ))}
        <button className="btn lnk" onClick={calculateSJF}>
          Calculate SJF
        </button>

        {startTimes.length > 0 && (
          <table >
            <thead>
              <tr>
                <th>Process</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
                <th>Starting Time</th>
                <th>Ending Time</th>
                <th>Waiting Time</th>
                <th>Turnaround Time</th> {/* Display Turnaround Time */}
              </tr>
            </thead>
            <tbody>
              {range.map((processId, index) => (
                <tr key={index}>
                  <td>P{processId}</td>
                  <td>{arrivals[processId - 1]}</td>
                  <td>{bursts[processId - 1]}</td>
                  <td>{startTimes[processId - 1]}</td>
                  <td>{endTimes[processId - 1]}</td>
                  <td>{waitingTimes[processId - 1]}</td>
                  <td>{turnaroundTimes[processId - 1]}</td> {/* Display Turnaround Time */}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div>
          <p>Average Waiting Time: {averageWaitingTime}</p>
          <p>Average Turnaround Time: {averageTurnaroundTime}</p>
        </div>
      </div>
    </div>
  );
}

//   return (
//     <div className="box d-flex flex-column align-items-center">
//       <h4 className="text-center">
//         <u>
//           <b> Shortest Job First Algorithm </b>
//         </u>
//       </h4>
//       <div className="d-flex flex-column align-items-center m-2">
//         <div>
//           <label>Number of Processes:</label>
//           <input
//             type="number"
//             min={0}
//             placeholder="1/2/3/..."
//             style={{ width: "10vw" }}
//             value={numProcessesInput}
//             onChange={handleNumProcessesChange}
//           />
//           <button className="lnk btn" onClick={handleRange}>
//             Submit
//           </button>
//         </div>
//         {/* <div> */}
//         {range.length > 0 &&
//           range.map((index) => (
//             <div key={index}>
//               {/* <div> */}
//               <label>Arrival Time for P{index + 1}:</label>
//               <input
//                 type="number"
//                 min={0}
//                 placeholder={`P ${index + 1}`}
//                 style={{ width: "10vw" }}
//                  value={arrivalTimes[index]}
//                 onChange={(e) => handleArrivalTimeChange(e, index)}
                
//               />

//               {/* </div> */}
//               {/* <div> */}
//               <label>Burst Time for P{index + 1}:</label>
//               <input
//                 type="number"
//                 min={0}
//                 placeholder={`P ${index + 1}`}
//                 style={{ width: "10vw" }}
//                 // value={burstTimes[index]}
//                 onChange={(e) => handleBurstTimeChange(e, index)}
//                 pattern="[0-9]*"
//               />
//               {/* </div> */}
//             </div>
//           ))}
//         <button className="btn lnk" onClick={handleExecution}>
//           Execute
//         </button>
//         <div>
//           <h5>Execution Table:</h5>
//           <table>
//             <thead>
//               <tr>
//                 <th>Process</th>
//                 <th>Arrival Time</th>
//                 <th>Burst Time</th>
//                 <th>Starting Time</th>
//                 <th>Ending Time</th>
//                 <th>Waiting Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {processQueue.map((process, index) => (
//                 <tr key={process.id}>
//                   <td>{index + 1}</td> {/* Process ID */}
//                   <td>{process.arrivalTime}</td>
//                   <td>{process.burstTime}</td>
//                   <td>
//                     {Math.max(
//                       process.arrivalTime,
//                       index > 0 ? processQueue[index - 1].endTime : 0
//                     )}
//                   </td>{" "}
//                   {/* Start Time */}
//                   <td>
//                     {Math.max(
//                       process.arrivalTime,
//                       index > 0 ? processQueue[index - 1].endTime : 0
//                     ) + process.burstTime}
//                   </td>{" "}
//                   {/* End Time */}
//                   <td>
//                     {Math.max(
//                       process.arrivalTime,
//                       index > 0 ? processQueue[index - 1].endTime : 0
//                     ) - process.arrivalTime}
//                   </td>{" "}
//                   {/* Waiting Time */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* </div> */}
//       </div>
//     </div>
//   );
// }
