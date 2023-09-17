import React, { useState } from "react";

export default function HRRN() {
  const [n, setN] = useState(0); // Number of processes
  const [arrivalTimes, setArrivalTimes] = useState([]);
  const [burstTimes, setBurstTimes] = useState([]);
  const [waitingTimes, setWaitingTimes] = useState([]);
  const [turnaroundTimes, setTurnaroundTimes] = useState([]);
  const [completionTimes, setCompletionTimes] = useState([]);
  const [normalizedTurnaroundTimes, setNormalizedTurnaroundTimes] = useState(
    []
  );
  const [responseRatios, setResponseRatios] = useState([]); // Response Ratios
  const [startingTimes, setStartingTimes] = useState([]); // Starting Times

  // Function to handle input change for the number of processes
  const handleInputChange = (e) => {
    const numProcesses = parseInt(e.target.value, 10);
    setN(numProcesses);
    setArrivalTimes(Array(numProcesses).fill(0));
    setBurstTimes(Array(numProcesses).fill(0));
    setWaitingTimes(Array(numProcesses).fill(0));
    setTurnaroundTimes(Array(numProcesses).fill(0));
    setCompletionTimes(Array(numProcesses).fill(0));
    setNormalizedTurnaroundTimes(Array(numProcesses).fill(0));
    setResponseRatios(Array(numProcesses).fill(0));
    setStartingTimes(Array(numProcesses).fill(0));
  };

  // Function to handle input change for arrival times
  const handleArrivalTimeChange = (index, value) => {
    const newArrivalTimes = [...arrivalTimes];
    newArrivalTimes[index] = parseInt(value, 10);
    setArrivalTimes(newArrivalTimes);
  };

  // Function to handle input change for burst times
  const handleBurstTimeChange = (index, value) => {
    const newBurstTimes = [...burstTimes];
    newBurstTimes[index] = parseInt(value, 10);
    setBurstTimes(newBurstTimes);
  };

  // Function to calculate waiting, turnaround, and completion times
  const findWaitingTurnaroundCompletionTime = () => {
    // Create an array to store the remaining burst times for each process
    const remainingBurstTimes = [...burstTimes];

    // Create arrays to store other metrics
    const newCompletionTimes = Array(n).fill(0);
    const newNormalizedTurnaroundTimes = Array(n).fill(0);
    const newResponseRatios = Array(n).fill(0);
    const newStartingTimes = Array(n).fill(0);
    const newWaitingTimes = Array(n).fill(0);
    const newTurnaroundTimes = Array(n).fill(0);

    // Initialize the current time
    let currentTime = 0;

    // Perform HRRN calculations
    while (true) {
      let selectedProcess = -1;
      let highestResponseRatio = -1;

      // Find the process with the highest response ratio that has arrived and not yet completed
      for (let i = 0; i < n; i++) {
        if (arrivalTimes[i] <= currentTime && remainingBurstTimes[i] > 0) {
          const waitingTime = currentTime - arrivalTimes[i];
          const responseRatio =
            (waitingTime + remainingBurstTimes[i]) / remainingBurstTimes[i];

          if (responseRatio > highestResponseRatio) {
            highestResponseRatio = responseRatio;
            selectedProcess = i;
          }
        }
      }

      if (selectedProcess === -1) {
        // No eligible process found, break the loop
        break;
      }

      // Set starting time if it's the first time the process is executed
      if (newCompletionTimes[selectedProcess] === 0) {
        newStartingTimes[selectedProcess] = currentTime;
      }

      // Execute the selected process for 1 unit of time
      currentTime++;
      remainingBurstTimes[selectedProcess]--;

      // If the process has completed, update completion time and other metrics
      if (remainingBurstTimes[selectedProcess] === 0) {
        newCompletionTimes[selectedProcess] = currentTime;
        const turnaroundTime =
          newCompletionTimes[selectedProcess] - arrivalTimes[selectedProcess];
        const waitingTime = turnaroundTime - burstTimes[selectedProcess];
        newNormalizedTurnaroundTimes[selectedProcess] =
          turnaroundTime / burstTimes[selectedProcess];
        newTurnaroundTimes[selectedProcess] = turnaroundTime;
        newWaitingTimes[selectedProcess] = waitingTime;
      }

      // Update the response ratio for the selected process
      newResponseRatios[selectedProcess] = highestResponseRatio;
    }

    // Update state variables with the new values
    setCompletionTimes(newCompletionTimes);
    setTurnaroundTimes(newTurnaroundTimes);
    setNormalizedTurnaroundTimes(newNormalizedTurnaroundTimes);
    setWaitingTimes(newWaitingTimes);
    setResponseRatios(newResponseRatios);
    setStartingTimes(newStartingTimes);
  };

  // Function to calculate average waiting time
  const calculateAvgWaitingTime = () => {
    const sumWaitingTimes = waitingTimes.reduce((acc, wt) => acc + wt, 0);
    return sumWaitingTimes / n;
  };

  // Function to calculate average turnaround time
  const calculateAvgTurnaroundTime = () => {
    const sumTurnaroundTimes = turnaroundTimes.reduce(
      (acc, tat) => acc + tat,
      0
    );
    return sumTurnaroundTimes / n;
  };

  return (
    <div className=" box d-flex flex-column align-items-center justify-content-center">
      <h4 className="text-center">
        <u>
          <b>Highest Response Ratio Next</b>
        </u>
      </h4>
      <div>
        <div>
          <label>
            Enter the number of processes:
            <input
              type="number"
              name="n"
              value={n}
              onChange={handleInputChange}
            />
          </label>
        </div>
        {arrivalTimes.map((arrival, index) => (
          <div key={index}>
            <label>
              Arrival Time for Process {index + 1}:
              <input
                type="number"
                value={arrival}
                onChange={(e) => handleArrivalTimeChange(index, e.target.value)}
              />
            </label>
            <label>
              Burst Time for Process {index + 1}:
              <input
                type="number"
                value={burstTimes[index]}
                onChange={(e) => handleBurstTimeChange(index, e.target.value)}
              />
            </label>
          </div>
        ))}
        <button onClick={findWaitingTurnaroundCompletionTime}>Calculate</button>
        <div>
          <h2>Process Table</h2>
          <table>
            <thead>
              <tr>
                <th>Process ID</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
                <th>Starting Time</th>
                <th>Completion Time</th>
                <th>Waiting Time</th>
                <th>Turnaround Time</th>
                <th>Normalized Turnaround Time</th>
                <th>Response Ratio</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: n }, (_, index) => (
                <tr key={index}>
                  <td>P{index + 1}</td>
                  <td>{arrivalTimes[index]}</td>
                  <td>{burstTimes[index]}</td>
                  <td>{startingTimes[index]}</td>
                  <td>{completionTimes[index]}</td>
                  <td>{waitingTimes[index]}</td>
                  <td>{turnaroundTimes[index]}</td>
                  <td>{normalizedTurnaroundTimes[index].toFixed(2)}</td>
                  <td>{responseRatios[index].toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Results</h2>
          <p>Average Waiting Time: {calculateAvgWaitingTime().toFixed(2)}</p>
          <p>
            Average Turnaround Time: {calculateAvgTurnaroundTime().toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
