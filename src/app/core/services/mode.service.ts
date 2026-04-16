import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type PortfolioMode = 'coder' | 'admin';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  private modeSubject = new BehaviorSubject<PortfolioMode>('coder');
  public mode$: Observable<PortfolioMode> = this.modeSubject.asObservable();

  constructor() {
    this.loadSavedMode();
  }

  getCurrentMode(): PortfolioMode {
    return this.modeSubject.value;
  }

  toggleMode(): void {
    const newMode: PortfolioMode = this.modeSubject.value === 'coder' ? 'admin' : 'coder';
    this.setMode(newMode);
  }

  setMode(mode: PortfolioMode): void {
    this.modeSubject.next(mode);
    localStorage.setItem('portfolioMode', mode);
  }

  private loadSavedMode(): void {
    const saved = localStorage.getItem('portfolioMode') as PortfolioMode;
    if (saved) {
      this.modeSubject.next(saved);
    }
  }

  isAdminMode(): boolean {
    return this.modeSubject.value === 'admin';
  }

  isCoderMode(): boolean {
    return this.modeSubject.value === 'coder';
  }
}
