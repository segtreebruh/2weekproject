import { createContext } from 'react';
import type { NotificationContextType } from '@shared/types';

export const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  setNotification: () => {}
})
