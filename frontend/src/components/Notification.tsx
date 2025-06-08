import { useState } from 'react';
import type { NotificationType } from '@shared/types';
import { NotificationContext } from '../contexts/NotificationContext';
import '../styles/index.css';

export const NotificationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<NotificationType | null>(null);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {notification && (
        <div className={notification.type}>
          {notification.msg}
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
}
