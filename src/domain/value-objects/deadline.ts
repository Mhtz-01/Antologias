export default class Deadline {
    public initial_time: Date;
    public end_time: Date;
  
    constructor(initial_time: Date, end_time: Date) {
      if (end_time < initial_time) {
        throw new Error("Data final não pode ser antes da inicial");
      }
  
      this.initial_time = initial_time;
      this.end_time = end_time;
    }
  
    formatEditalDeadline(locale = 'pt-BR'): string {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
  
      const inicio = this.initial_time.toLocaleDateString(locale, options);
      const fim = this.end_time.toLocaleDateString(locale, options);
  
      return `De ${inicio} até ${fim}`;
    }

    isWithinDeadline(date: Date = new Date()): boolean {
      return date >= this.initial_time && date <= this.end_time;
    }
  
    isExpired(date: Date = new Date()): boolean {
      return date > this.end_time;
    }
  
    daysUntilDeadline(date: Date = new Date()): number {
      if (this.isExpired(date)) return 0;
  
      const diff = this.end_time.getTime() - date.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
  }
  