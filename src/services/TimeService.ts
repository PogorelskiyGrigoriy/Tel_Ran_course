// Сервис для управления временем и подписчиками на его изменения
type TimeListener = (date: Date) => void;

let listeners: TimeListener[] = [];

// Единый интервал для всего приложения
setInterval(() => {
  const now = new Date();
  // Создаем копию массива перед итерацией для безопасности
  [...listeners].forEach(render => render(now));
}, 1000);

// Экспортируем объект с методом подписки, который возвращает функцию отписки
export const timeService = {
  subscribe(fn: TimeListener) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter(l => l !== fn);
    };
  }
};