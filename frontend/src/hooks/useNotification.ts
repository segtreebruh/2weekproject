import { useContext, useCallback } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) 
    throw new Error('useNotification must be used within a NotificationContextProvider');

  const { notification, setNotification } = context;
  const showNotification = useCallback(
    (msg: string, type: string) => {
      setNotification({ msg, type });
      setTimeout(() => setNotification(null), 5000);
    },
    [setNotification]
  );
  return { notification, setNotification, showNotification };
}