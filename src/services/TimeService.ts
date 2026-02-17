// Сервис для получения текущего времени и уведомления всех подписчиков каждую секунду
class TimeService {
  private static instance = new TimeService();
  private listeners: ((d: Date) => void)[] = [];

  // Конструктор запускает таймер, который каждую секунду вызывает всех подписчиков с текущим временем
  private constructor() {
    setInterval(() => {
      const now = new Date();
      this.listeners.forEach(fn => fn(now));
    }, 1000);
  }

  public static getInstance() { return this.instance; }

  // Добавить слушателя в список
  subscribe(fn: (d: Date) => void) {
    this.listeners.push(fn);
    // Возвращаем функцию для удаления из списка (отписки)
    return () => { this.listeners = this.listeners.filter(l => l !== fn); };
  }
}

export const timeService = TimeService.getInstance();