import { useState, useEffect } from 'react';
import { timeService } from '../services/TimeService';

interface TimerProps {
  city: string;
  timeZone: string;
}

const Timer = ({ city, timeZone }: TimerProps) => {
  // Локальное состояние для даты, чтобы React знал, когда перерисовать компонент
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    // Подписываемся на единственный интервал через наш сервис
    const unsubscribe = timeService.subscribe((now) => {
      setDate(now);
    });

    // Очистка при размонтировании (важно для useEffect!)
    return () => unsubscribe();
  }, []);

  // Форматирование времени (24-часовой формат)
  const timeString = date.toLocaleTimeString('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // Форматирование даты (например: Feb 17, 2026)
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