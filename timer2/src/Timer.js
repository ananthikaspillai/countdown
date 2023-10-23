
import React, { useState, useEffect } from 'react';
import './Timer.css'
function Timer() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let updatedTime = { ...prevTime };
          if (updatedTime.seconds > 0) updatedTime.seconds--;
          else if (updatedTime.minutes > 0) {
            updatedTime.minutes--;
            updatedTime.seconds = 59;
          } else if (updatedTime.hours > 0) {
            updatedTime.hours--;
            updatedTime.minutes = 59;
            updatedTime.seconds = 59;
          }
          return updatedTime;
        });

        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
          clearInterval(interval);
          setTimerOn(false);
          alert('Time is up!');
        }
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn, time]);

  return (
    <div className='timer-container'>
      <div className='timer-inputs'>
        <h1>Countdown Timer</h1>
      <input
        type="number"
        value={time.hours}
        onChange={(e) => setTime({ ...time, hours: e.target.value })}
      />
      <p style={{color:"brown"}}>Hours</p>
      <input
        type="number"
        value={time.minutes}
        onChange={(e) => setTime({ ...time, minutes: e.target.value })}
      />
      <p style={{color:"brown"}}>Minutes</p>
      <input
        type="number"
        value={time.seconds}
        onChange={(e) => setTime({ ...time, seconds: e.target.value })}
      />
      <p style={{color:"brown"}}>Seconds</p>
      </div>
      <div className='timer-buttons'>
      <button onClick={() => setTimerOn(true)}>Start</button>
      <button onClick={() => setTimerOn(false)}>Pause</button>
      <button onClick={() => setTime({ hours: 0, minutes: 0, seconds: 0 })}>Reset</button>
      </div>
      <p className='end'> The Time Remaining - {`${time.hours}: ${time.minutes}: ${time.seconds}`}</p>
    </div>
  );
}

export default Timer;



