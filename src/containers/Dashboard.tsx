import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
 
export default function Dashboard() {
  const [value, setValue] = useState(new Date());
 
  useEffect(() => {
    const interval = setInterval(
      () => setValue(new Date()),
      1000
    );
 
    return () => {
      clearInterval(interval);
    }
  }, []);
 
  return (
    <div className="container">
    <div id="dashboard" className="card dashboard">
      <h1>Welcome to Dashboard</h1>
      <Clock value={value} />
    </div>
    </div>

  )
}