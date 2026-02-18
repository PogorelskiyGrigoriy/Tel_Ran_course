import { Timer } from './components/Timer';
import './App.css';
import { CITIES } from './data/cities';



// Главный компонент приложения, который рендерит сетку таймеров для разных городов
export default function App() {
  return (
      <div className="timer-grid">
        {CITIES.map(c => <Timer key={`${c.n}-${c.z}`} city={c.n} zone={c.z} />)}
      </div>
  );
}