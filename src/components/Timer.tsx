import { useState, useEffect } from 'react';
import { timeService } from '../services/TimeService';

// Компонент для отображения текущего времени в заданной временной зоне
export const Timer = ({ city, zone }: { city: string, zone: string }) => {
  const [date, setDate] = useState(new Date());

  // Подписываемся на "тик" при монтировании и отписываемся при размонтировании
  useEffect(() => {
    const unsubscribe = timeService.subscribe(newDate => setDate(newDate));
    return unsubscribe; 
  }, []);

  // Выводим время в нужной временной зоне
  return (
    <div className="timer-card">
      <strong>{city}</strong>
      <div>{date.toLocaleTimeString('en-US', { timeZone: zone, hour12: false })}</div>
    </div>
  );
};