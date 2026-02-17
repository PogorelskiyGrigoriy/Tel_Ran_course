type TimeCallback = (date: Date) => void;

class TimeService {
  private static instance: TimeService;
  private listeners: Set<TimeCallback> = new Set();
  private intervalId: number | null = null;

  private constructor() {}

  public static getInstance(): TimeService {
    if (!TimeService.instance) {
      TimeService.instance = new TimeService();
    }
    return TimeService.instance;
  }

  public subscribe(callback: TimeCallback): () => void {
    this.listeners.add(callback);
    if (this.intervalId === null) {
      this.startTick();
    }

    return () => {
      this.listeners.delete(callback);
      if (this.listeners.size === 0 && this.intervalId !== null) {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
      }
    };
  }

  private startTick() {
    this.intervalId = window.setInterval(() => {
      const now = new Date();
      this.listeners.forEach((callback) => callback(now));
    }, 1000);
  }
}

export const timeService = TimeService.getInstance();