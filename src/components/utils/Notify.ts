/**
 * A class to manage and display pop-up notifications.
 * This class injects its own CSS into the document's head, making it a
 * self-contained, single-file component.
 */
export class Notify {
  containerId: string;
  constructor() {
    this.containerId = 'notify-notification-container';
  }
  /**
   * Creates and returns the SVG icon for a given notification type.
   * @param {string} type - The type of notification (success, warning, error, info).
   * @returns {string} The SVG markup as a string.
   * @private
   */
  _getIconSvg(type: string | number): string {
    const icons = {
      success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
      warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm0-6c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1z"/></svg>`,
      error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`,
      info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`
    };
    return icons[type] || '';
  }

  /**
   * Creates and displays a new notification.
   * @param {string} type - The type of notification (success, warning, error, info).
   * @param {string} title - The title of the notification.
   * @param {string} message - The main message of the notification.
   * @param {number} [duration=5000] - The duration in milliseconds before the notification fades out.
   */
  show(type: string, title: string, message: string, duration: number = 5000) {
    let container = document.getElementById(this.containerId) as HTMLDivElement;
    if (!container) {
      container = document.createElement('div');
      container.id = this.containerId;
      container.className = 'notify-notification-container';
      document.body.appendChild(container);
    }

    const notificationBox = document.createElement('div') as HTMLDivElement;
    notificationBox.className = 'notify-notification-box';
    notificationBox.setAttribute('data-type', type);

    notificationBox.innerHTML = `
                    <div class="notify-notification-icon">
                        ${this._getIconSvg(type)}
                    </div>
                    <div class="notification-content">
                        <h3 class="notification-title">${title}</h3>
                        <p class="notification-message">${message}</p>
                    </div>
                `;

    container.appendChild(notificationBox);

    setTimeout(() => {
      notificationBox.style.animation = 'notify-slide-out 0.5s forwards';
      notificationBox.addEventListener('animationend', () => {
        notificationBox.remove();
      }, { once: true });
    }, duration);
  }
}


