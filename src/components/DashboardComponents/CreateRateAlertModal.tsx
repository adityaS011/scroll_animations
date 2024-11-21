import { useState } from 'react';
import { Alert } from '../../utils/types';
import { PlusIcon, UKIcon, UAEIcon } from '../../icon';
import { saveRateAlert } from '../../services/firebase';
import useRateAlerts from '../../customHooks/useRateAlerts';

export const countryData = [
  {
    icon: <UKIcon className='w-16 h-16' />,
    currency: '£',
    label: 'GBP',
    country: 'UK',
  },
  {
    icon: <UAEIcon className='w-16 h-16' />,
    currency: 'فلس',
    label: 'AED',
    country: 'UAE',
  },
];

const CreateRateAlertModal = ({
  closeModal,
  country,
}: {
  closeModal: () => void;
  country: string;
}) => {
  const [title, setTitle] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchAlerts, setAlerts } = useRateAlerts();
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Title cannot be empty');
      return;
    }
    const finalRate = Number(rate);
    if (finalRate <= 0) {
      alert('Rate must be greater than 0');
      return;
    }

    const newAlert: Alert = {
      title,
      country,
      rate: finalRate,
      createdAt: Date.now().toString(),
    };

    setLoading(true);

    try {
      await saveRateAlert(newAlert);
      setAlerts((prev) => [newAlert, ...prev]); // Prepend the new alert to the top
      fetchAlerts();
      closeModal();
    } catch (error) {
      console.error('Error saving alert:', error);
      alert('Failed to create alert');
    } finally {
      setLoading(false);
    }
  };

  const { icon, currency, label } =
    countryData.find((item) => item.country === country) || countryData[0];

  return (
    <div className='fixed inset-0 flex items-center justify-center h-screen bg-black bg-opacity-50 backdrop-blur z-50'>
      <div className='w-[374px] bg-[#333333] rounded-3xl py-6 text-white gap-6 flex flex-col items-center'>
        <h3 className='text-lg font-semibold text-center'>Set Rate Alert!</h3>
        <div className='flex flex-col items-center justify-center gap-3'>
          {icon}
          <div className='flex flex-row gap-1 items-center'>
            <p>{country}</p>
            <p className='text-sm font-semibold opacity-50'>{`(${
              currency + label
            })`}</p>
          </div>
        </div>
        <div className='w-full px-6 gap-3 flex flex-col'>
          <label className='text-sm font-semibold text-[#D5D6DE]'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full bg-[#4F4F4F] focus:outline-none rounded-xl py-3 px-4 text-white placeholder:text-slate-200'
            placeholder='Enter alert title'
          />
        </div>

        <div className='w-full px-6 gap-3 flex flex-col'>
          <label className='text-sm font-semibold text-[#D5D6DE]'>
            Rate Alert Value
          </label>
          <input
            type='number'
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className='w-full bg-[#4F4F4F] focus:outline-none rounded-xl py-3 px-4 text-white placeholder:text-slate-200'
            placeholder='Enter target rate'
          />
        </div>

        <div className='flex flex-col w-full px-4 gap-2'>
          <button
            onClick={handleSubmit}
            className='bg-[#81EBAB] hover:bg-[#59de8e] rounded-full px-4 h-12 text-sm text-[#0B0B0B] flex flex-row gap-2 justify-center items-center'
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Set Alert'} <PlusIcon fill='#111111' />
          </button>
          <button
            onClick={closeModal}
            className='px-4 h-8 opacity-50 text-sm hover:opacity-75 text-white rounded-md'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRateAlertModal;
