import { useState, useEffect, useMemo } from 'react';
import { timeService } from '../services/TimeService';

// Компонент для отображения времени в определенном часовом поясе
interface TimerProps {
  city: string;
  zone: string;
}

export const Timer = ({ city, zone }: TimerProps) => {
  const [date, setDate] = useState(new Date());

  // Подписываемся на обновления времени при монтировании компонента
  useEffect(() => {
    return timeService.subscribe(newDate => setDate(newDate));
  }, []);

// Создаем форматтер для данного часового пояса, мемоизируя его для оптимизации
const formatter = useMemo(() => {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: zone,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}, [zone]);

// Разделяем дату и время для лучшей верстки (опционально)
// Intl позволяет форматировать части отдельно через formatToParts
const parts = formatter.formatToParts(date);
const timeString = parts
  .filter(p => ['hour', 'minute', 'second'].includes(p.type))
  .map(p => p.value)
  .join(':');
const dateString = parts
  .filter(p => ['day', 'month', 'year'].includes(p.type))
  .map(p => p.value)
  .join(' ');

return (
  <div className="timer-card">
    <span className="city-name">{city}</span>
    <div className="date-display">{dateString}</div>
    <div className="time-display">{timeString}</div>
    <span className="timezone-label">{city}</span>
  </div>
);
};