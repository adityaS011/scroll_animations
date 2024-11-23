import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PlusIcon, UKIcon, UAEIcon } from '../../icon';
import CreateRateAlertModal from './CreateRateAlertModal';
import { ResponsiveContainer } from 'recharts';
import { ForexData } from '../../utils/types';
import CustomDropdown from '../CustomDropdown';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const countryData = [
  {
    country: 'UK',
    code: 'GBP',
    label: 'GBP',
    icon: <UKIcon className='w-6 h-6' />,
  },
  {
    country: 'UAE',
    code: 'AED',
    label: 'AED',
    icon: <UAEIcon className='w-6 h-6' />,
  },
];

const ExchangeRateChart = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
}) => {
  const [data, setData] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('UK');
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const navigate = useNavigate();
  const fetchForexData = async () => {
    try {
      const countryCode = selectedCountry === 'UK' ? 'GBPINR=X' : 'AEDINR=X';
      const response = await axios.get(
        `/api/public/api/currency-converter/forex?code=${countryCode}&timeline=1M`
      );
      const rawData = response.data;
      setCurrentRate(rawData[0].open);
      const chartData = rawData.map((item: ForexData) => ({
        date: item.resDate,
        rate: parseFloat(item.close),
      }));
      setData(chartData);
    } catch (error) {
      console.error('Error fetching forex data', error);
    } finally {
    }
  };

  useEffect(() => {
    fetchForexData();
  }, [selectedCountry]);

  const handleSetAlert = () => {
    setIsModalOpen(true);
  };

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: `${
          countryData.find((country) => country.code === selectedCountry)
            ?.country
        } Rate`,
        data: data.map((item) => item.rate),
        fill: true,
        borderColor: '#82ca9d',
        backgroundColor: '#82ca9d50',
        tension: 0.4, // Makes the line curve
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Date' },
      },
      y: {
        title: { display: true, text: 'Rate' },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className='w-full h-full items-center bg-[#111111] flex flex-col gap-12'>
      <div className='text-center w-full text-xl font-bold text-[#ffffff] relative'>
        <p>Rate Alert Dashboard</p>
        <div
          className='top-0 right-0 p-2 rounded-full opacity-70 hover:opacity-100 cursor-pointer bg-gray-800 absolute '
          onClick={() => {
            navigate('/signIn');
          }}
        >
          <BiLogOut className=' w-6 h-6' />
        </div>
      </div>

      <div className='w-[544px] bg-[#222222] py-6 px-4 rounded-3xl'>
        <CustomDropdown
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <ResponsiveContainer width={512} height={317}>
          <Line data={chartData} options={chartOptions} />
        </ResponsiveContainer>

        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row items-center gap-2'>
            <p className='font-bold text-2xl text-[#F9F9F9] px-4'>
              ₹{Number(currentRate ?? 0).toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleSetAlert}
            className='bg-[#81EBAB] rounded-full px-4 h-10 text-sm text-[#0B0B0B] hover:bg-[#59de8e] flex flex-row gap-2 justify-between items-center'
          >
            Set Alert <PlusIcon fill='#111111' />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <CreateRateAlertModal
          closeModal={() => setIsModalOpen(false)}
          country={selectedCountry}
        />
      )}
    </div>
  );
};

export default ExchangeRateChart;
