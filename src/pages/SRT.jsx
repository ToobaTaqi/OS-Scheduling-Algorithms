import React, { useState } from "react";

export default function Srt() {
  const [n, setN] = useState(0); // Number of processes
  const [arrivalTimes, setArrivalTimes] = useState([]); // Array to store arrival times
  const [burstTimes, setBurstTimes] = useState([]); // Array to store burst times
  const [wt, setWt] = useState([]); // Waiting times
  const [tat, setTat] = useState([]); // Turnaround times
  const [ct, setCt] = useState([]); // Completion times
  const [avgWt, setAvgWt] = useState(0); // Average waiting time
  const [avgTat, setAvgTat] = useState(0); // Average turnaround time
  const [startingTimes, setStartingTimes] = useState([]);

  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target;
  //     if (name === "n") {
  //       // Update the number of processes and initialize arrays
  //       setN(value);
  //       setArrivalTimes(new Array(parseInt(value)).fill(0));
  //       setBurstTimes(new Array(parseInt(value)).fill(0));
  //     }
  //   };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "n") {
      // Update the number of processes and initialize arrays
      setN(value);
      const numProcesses = parseInt(value, 10);
      setArrivalTimes(new Array(numProcesses).fill(0));
      setBurstTimes(new Array(numProcesses).fill(0));
    }
  };

  const handleArrivalTimeChange = (index, value) => {
    const newArrivalTimes = [...arrivalTimes];
    newArrivalTimes[index] = parseInt(value, 10);
    setArrivalTimes(newArrivalTimes);
  };

  // const handleBurstTimeChange = (index, value) => {
  //   const newBurstTimes = [...burstTimes];
  //   newBurstTimes[index] = parseInt(value, 10);
  //   setBurstTimes(newBurstTimes);
  // };
  const handleBurstTimeChange = (index, value) => {
    const newBurstTimes = [...burstTimes];
    const parsedValue = parseInt(value, 10);
  
    // Check if the parsed value is a positive integer
    if (!isNaN(parsedValue) && parsedValue > 0) {
      newBurstTimes[index] = parsedValue;
    } else {
      // Display an error message or handle the validation error as needed
      alert("Burst time must be a positive integer greater than 0.");
      // Optionally, you can set a default burst time or handle the error differently.
      // newBurstTimes[index] = 1; // Set a default burst time of 1
    }
  
    setBurstTimes(newBurstTimes);
  };
  

  const findWaitingTurnaroundCompletionTime = () => {
    const n = arrivalTimes.length; // Get the number of processes

    // Create an array of process objects
    const processes = [];
    for (let i = 0; i < n; i++) {
      processes.push({
        id: i + 1,
        arrival: arrivalTimes[i],
        burst: burstTimes[i],
      });
    }

    // Initialize arrays to store waiting times, turnaround times, and completion times
    const wt = Array(n).fill(0);
    const tat = Array(n).fill(0);
    const ct = Array(n).fill(0);
    const startingTimes = Array(n).fill(0); // Array to store starting times

    let currentTime = 0;
    let completed = 0;

    while (completed < n) {
      let minRemainingTime = Number.MAX_SAFE_INTEGER;
      let shortestProcessIndex = -1;

      // Find the process with the shortest remaining burst time
      for (let i = 0; i < n; i++) {
        if (processes[i].arrival <= currentTime && processes[i].burst > 0) {
          if (processes[i].burst < minRemainingTime) {
            minRemainingTime = processes[i].burst;
            shortestProcessIndex = i;
          }
        }
      }

      if (shortestProcessIndex === -1) {
        currentTime++;
        continue;
      }

      // Record the starting time of the selected process
      if (startingTimes[shortestProcessIndex] === 0) {
        startingTimes[shortestProcessIndex] = currentTime;
      }

      // Execute the shortest remaining time process for one time unit
      processes[shortestProcessIndex].burst--;
      currentTime++;

      // Check if the process is completed
      if (processes[shortestProcessIndex].burst === 0) {
        const process = processes[shortestProcessIndex];
        const completionTime = currentTime;
        const turnaroundTime = completionTime - process.arrival;

        wt[shortestProcessIndex] =
          startingTimes[shortestProcessIndex] - process.arrival;
        tat[shortestProcessIndex] = turnaroundTime;
        ct[shortestProcessIndex] = completionTime;

        completed++;
      }
    }

    // Calculate average waiting time
    const avgWt = wt.reduce((sum, waitingTime) => sum + waitingTime, 0) / n;

    // Calculate average turnaround time
    const avgTat =
      tat.reduce((sum, turnaroundTime) => sum + turnaroundTime, 0) / n;

    // Update state with the new values, including starting times
    setWt([...wt]);
    setTat([...tat]);
    setCt([...ct]);
    setStartingTimes([...startingTimes]); // You can add this state variable
    setAvgWt(avgWt);
    setAvgTat(avgTat);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h4>
        <u>
          <b>Shortest Remaining Time First Algorithm</b>
        </u>
      </h4>
      <div>
        <label>
          Enter the number of processes:
          <input
            type="number"
            min={0}
            placeholder="1/2/3/..."
            style={{ width: "10vw" }}
            name="n"
            // value={n}
            onChange={handleInputChange}
          />
        </label>
      </div>
      {arrivalTimes.map((arrival, index) => (
        <div key={index}>
          <b>
            For Process {index + 1} {"-> "}
          </b>
          <label>
            Arrival Time:
            <input
              type="number"
              min={0}
              style={{ width: "6vw" }}
              value={arrival}
              onChange={(e) => handleArrivalTimeChange(index, e.target.value)}
            />
          </label>
          <label>
            Burst Time:
            <input
             type="number"
             min={1}
             style={{ width: "6vw" }}
              value={burstTimes[index]}
              onChange={(e) => handleBurstTimeChange(index, e.target.value)}
            />
          </label>
        </div>
      ))}
      <button className="btn lnk" onClick={findWaitingTurnaroundCompletionTime}>
        Calculate SRTF
      </button>
      <div
        style={{
          border: "1px solid white",
          borderRadius: "15px",
          padding: "10px",
          textAlign: "center",
          color: "#a6b0d9",
          backgroundColor: "white",
        }}
      >
        <table>
          <thead>
            <tr>
              <th> - Process -</th>
              <th>- Arrival Time -</th>
              <th>- Burst Time -</th>
              <th>- Starting Time -</th>
              <th>- Ending Time -</th>
              <th>- Waiting Time -</th>
              <th>- Turnaround Time -</th>
            </tr>
          </thead>
          <tbody style={{ border: "1px solid white", textAlign: "center" }}>
            {Array.from({ length: n }, (_, index) => (
              <tr key={index}>
                <td>P{index + 1}</td>
                <td>{arrivalTimes[index]}</td>
                <td>{burstTimes[index]}</td>
                <td>{startingTimes[index]}</td>
                <td>{ct[index]}</td>
                <td>{wt[index]}</td>
                <td>{tat[index]}</td>

              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <p>Average Waiting Time: {avgWt.toFixed(2)}</p>
          <p>Average Turnaround Time: {avgTat.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
