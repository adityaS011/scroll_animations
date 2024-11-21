import React, { useEffect, useState } from 'react';
import ExchangeRateHistory from '../components/DashboardComponents/ExchangeRateHistory';
import RateAlertHistory from '../components/DashboardComponents/RateHistoryAlert';
import useRateAlerts from '../customHooks/useRateAlerts';

const Dashboard: React.FC = () => {
  const { fetchAlerts } = useRateAlerts();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className='w-full bg-[#111111] h-fit overflow-hidden flex justify-center'>
      <div className='flex flex-col items-center md:px-[400px] py-12 gap-12 w-full overflow-y-auto'>
        <ExchangeRateHistory
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <RateAlertHistory isModalOpen={isModalOpen} />
      </div>
    </div>
  );
};

export default Dashboard;
