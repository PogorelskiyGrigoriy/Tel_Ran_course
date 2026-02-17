import './App.css';
import Timer from './components/Timer';

// Список городов. TimeZone берется из стандарта IANA
const LOCATIONS = [
  { city: 'Tel Aviv', timeZone: 'Asia/Jerusalem' },
  { city: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { city: 'New York', timeZone: 'America/New_York' },
  { city: 'Paris', timeZone: 'Europe/Paris' },
];

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>World Clock</h1>
        <p>Stay synced with the world</p>
      </header>
      
      <main className="timer-grid">
        {LOCATIONS.map((loc) => (
          <Timer 
            key={loc.timeZone} 
            city={loc.city} 
            timeZone={loc.timeZone} 
          />
        ))}
      </main>
    </div>
  );
}

export default App;