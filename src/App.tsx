import { Timer } from './components/Timer';
import './App.css';

// Список городов и их часовых поясов для отображения
const cities = [
  { n: 'Tel Aviv', z: 'Asia/Jerusalem' },
  { n: 'Tokyo', z: 'Asia/Tokyo' },
  { n: 'New York', z: 'America/New_York' },
  { n: 'Paris', z: 'Europe/Paris' },
];

// Главный компонент приложения, который рендерит сетку таймеров для разных городов
export default function App() {
  return (
      <div className="timer-grid">
        {cities.map(c => <Timer key={c.z} city={c.n} zone={c.z} />)}
      </div>
  );
}