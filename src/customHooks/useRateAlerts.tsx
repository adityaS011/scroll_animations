import { useState } from 'react';
import { Alert } from '../utils/types';
import { getRateAlerts } from '../services/firebase';

const useRateAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const fetchedAlerts = await getRateAlerts();
      setAlerts(fetchedAlerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  return { alerts, loading, fetchAlerts, setAlerts };
};

export default useRateAlerts;
