import { useState, useEffect } from 'react';
import { timeService } from '../services/TimeService';

interface TimerProps {
  city: string;
  timeZone: string;
}

const Timer = ({ city, timeZone }: TimerProps) => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const unsubscribe = timeService.subscribe((now) => {
      setDate(now);
    });
    return () => unsubscribe();
  }, []);

  const timeString = date.toLocaleTimeString('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const dateString = date.toLocaleDateString('en-US', {
    timeZone,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="timer-card">
      <span className="city-name">{city}</span>
      <div className="time-display">{timeString}</div>
      <div className="date-display">{dateString}</div>
    </div>
  );
};

export default Timer;