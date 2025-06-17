import { createContext } from 'react';
import type { NotificationType } from '@shared/types';

interface NotificationContextType {
  notification: NotificationType | null;
  setNotification: React.Dispatch<React.SetStateAction<NotificationType | null>>;
}

export const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  setNotification: () => {}
})
