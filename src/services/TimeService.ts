/**
 * Паттерн: Singleton + Observer
 * Позволяет иметь только один setInterval на всё приложение.
 * Все компоненты Timer подписываются на этот сервис.
 */
type TimeCallback = (date: Date) => void;

class TimeService {
  private static instance: TimeService;
  private listeners: Set<TimeCallback> = new Set();
  private intervalId: number | null = null;

  private constructor() {}

  // Гарантируем, что объект будет создан только один раз
  public static getInstance(): TimeService {
    if (!TimeService.instance) {
      TimeService.instance = new TimeService();
    }
    return TimeService.instance;
  }

  // Метод для подписки компонента на "тик" таймера
  public subscribe(callback: TimeCallback): () => void {
    this.listeners.add(callback);

    // Если появился первый подписчик — запускаем таймер
    if (this.intervalId === null) {
      this.startTick();
    }

    // Возвращаем функцию отписки (используется в useEffect cleanup)
    return () => {
      this.listeners.delete(callback);
      // Если подписчиков не осталось — останавливаем таймер для экономии ресурсов
      if (this.listeners.size === 0 && this.intervalId !== null) {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
      }
    };
  }

  private startTick() {
    this.intervalId = window.setInterval(() => {
      const now = new Date();
      // Уведомляем все подписанные компоненты одновременно
      this.listeners.forEach((callback) => callback(now));
    }, 1000);
  }
}

export const timeService = TimeService.getInstance();