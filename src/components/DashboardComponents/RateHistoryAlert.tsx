import { useEffect, useState } from 'react';
import { countryData } from './CreateRateAlertModal';
import { UAEIcon, UKIcon } from '../../icon';
import useRateAlerts from '../../customHooks/useRateAlerts';

const RateAlertHistory = ({ isModalOpen }: { isModalOpen: boolean }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { fetchAlerts, loading, alerts } = useRateAlerts();

  const indexOfLastAlert = currentPage * itemsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - itemsPerPage;
  const currentAlerts = alerts.slice(indexOfFirstAlert, indexOfLastAlert);

  const totalPages = Math.ceil(alerts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Extract last two digits of the year
    return { day, month, year };
  };
  useEffect(() => {
    if (isModalOpen === true) return;
    fetchAlerts();
  }, [isModalOpen]);

  return (
    <div className='w-[544px] h-full text-white flex flex-col gap-6 items-center'>
      <div className='flex flex-row justify-between w-full items-center'>
        <p className='text-lg font-bold opacity-75 text-white'>
          Previous Alerts
        </p>
        <div>
          <div className='flex gap-2'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className='text-white hover:bg-[#292929] w-8 h-8 rounded-full'
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`${
                    page === currentPage
                      ? 'bg-[#7265EE] text-white rounded-lg'
                      : 'bg-transparent text-[#bbb]'
                  } px-3 py-1 rounded-md`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className='text-white hover:bg-[#292929] w-8 h-8 rounded-full'
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <p>Loading alerts...</p>
      ) : (
        <div className='flex flex-col gap-6 w-full'>
          {currentAlerts.map((alert, index) => {
            const { day, month, year } = formatDate(alert.createdAt);

            return (
              <div
                key={index}
                className='flex flex-row p-6 rounded-3xl bg-[#222222] h-[154px] w-full justify-between'
              >
                <div className='flex flex-col justify-between'>
                  <div className='flex flex-col gap-2'>
                    <p className='font-semibold opacity-75 leading-[1]'>
                      {alert.title}
                    </p>
                    <p className='text-[32px] text-[#F9F9F9] font-bold leading-[1]'>
                      {alert.rate.toFixed(2)}
                    </p>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-3'>
                    <div className='flex flex-row gap-1 items-center'>
                      {alert.country === 'UK' ? (
                        <UKIcon className='w-5 h-5' />
                      ) : (
                        <UAEIcon className='w-5 h-5' />
                      )}
                      <p>
                        {
                          countryData.find(
                            (item) => item.country === alert.country
                          )?.country
                        }
                      </p>
                      <p className='text-sm font-semibold opacity-50'>{`(${
                        countryData?.find(
                          (item) => item.country === alert.country
                        )?.currency
                      } ${
                        countryData?.find(
                          (item) => item.country === alert.country
                        )?.label
                      })`}</p>
                    </div>
                  </div>
                </div>

                <div className='flex flex-row gap-2 text-xl items-center h-fit '>
                  <p className='bg-[#333333] text-white text-xl h-8 rounded-md items-center flex px-[6px]'>
                    {day}
                  </p>
                  <p className='opacity-50'>/</p>
                  <p className='bg-[#333333] text-white text-xl h-8 rounded-md items-center flex px-[6px]'>
                    {month}
                  </p>
                  <p className='opacity-50'>/</p>
                  <p className='bg-[#333333] text-white text-xl h-8 rounded-md items-center flex px-[6px]'>
                    {year}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RateAlertHistory;
