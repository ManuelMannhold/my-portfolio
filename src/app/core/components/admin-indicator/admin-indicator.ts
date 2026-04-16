import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-admin-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-indicator" [class.active]="(isAdminMode$ | async) === 'admin'">
      <div class="status-dots">
        <span class="dot dot-1"></span>
        <span class="dot dot-2"></span>
        <span class="dot dot-3"></span>
      </div>
      <span class="status-text">
        {{ (isAdminMode$ | async) === 'admin' ? 'SYSTEM_ONLINE' : 'DEVELOPER_MODE' }}
      </span>
    </div>
  `,
  styles: [`
    .admin-indicator {
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      border-radius: 4px;
      background: rgba(100, 181, 246, 0.1);
      border: 1px solid #64b5f6;
      font-size: 11px;
      font-weight: bold;
      color: #64b5f6;
      font-family: 'Courier New', monospace;
      transition: all 0.5s ease;
      z-index: 999;
      letter-spacing: 1px;
      box-shadow: 0 0 10px rgba(100, 181, 246, 0.2);

      &.active {
        background: rgba(76, 175, 80, 0.1);
        border: 1px solid #4caf50;
        color: #00ff41;
        box-shadow: 0 0 20px rgba(76, 175, 80, 0.4), inset 0 0 10px rgba(76, 175, 80, 0.05);
        text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
      }

      .status-dots {
        display: flex;
        gap: 4px;
      }

      .dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #64b5f6;
        opacity: 0.3;
        transition: all 0.3s ease;
        box-shadow: 0 0 4px #64b5f6;

        .active & {
          background: #00ff41;
          opacity: 1;
          box-shadow: 0 0 8px #00ff41;
        }

        &.dot-1 {
          animation: pulse-1 2s ease-in-out infinite;

          .active & {
            animation: pulse-active-1 1.5s ease-in-out infinite;
          }
        }

        &.dot-2 {
          animation: pulse-2 2s ease-in-out infinite;

          .active & {
            animation: pulse-active-2 1.5s ease-in-out infinite;
          }
        }

        &.dot-3 {
          animation: pulse-3 2s ease-in-out infinite;

          .active & {
            animation: pulse-active-3 1.5s ease-in-out infinite;
          }
        }
      }

      .status-text {
        letter-spacing: 2px;
        text-transform: uppercase;
      }

      @keyframes pulse-1 {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }

      @keyframes pulse-2 {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
        33% { opacity: 0.3; }
      }

      @keyframes pulse-3 {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
        66% { opacity: 0.3; }
      }

      @keyframes pulse-active-1 {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.2); }
      }

      @keyframes pulse-active-2 {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.2); }
        33% { opacity: 1; }
      }

      @keyframes pulse-active-3 {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.2); }
        66% { opacity: 1; }
      }
    }
  `]
})
export class AdminIndicator {
  protected modeService = inject(ModeService);
  isAdminMode$ = this.modeService.mode$;
}
