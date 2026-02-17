import { Timer } from './components/Timer';
import './App.css';

// Список городов и их временных зон для отображения в приложении
const cities = [
  { n: 'Tel Aviv', z: 'Asia/Jerusalem' },
  { n: 'Tokyo', z: 'Asia/Tokyo' },
  { n: 'New York', z: 'America/New_York' },
  { n: 'Paris', z: 'Europe/Paris' }
];

export default function App() {
  return (
    <div className="timer-grid">
      {cities.map(c => <Timer key={c.z} city={c.n} zone={c.z} />)}
    </div>
  );
}