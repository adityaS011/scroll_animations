import { useState } from 'react';
import { countryData } from './DashboardComponents/CreateRateAlertModal';
import { UAEIcon, UKIcon } from '../icon';
import { IoMdArrowDropdown } from 'react-icons/io';

const CustomDropdown = ({
  selectedCountry,
  setSelectedCountry,
}: {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (country: string) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <div className='relative w-fit'>
      <button
        onClick={toggleDropdown}
        className='bg-[#393939] text-white rounded-lg px-4 h-10 flex items-center gap-2'
      >
        {selectedCountry === 'UK' ? (
          <UKIcon className='w-4 h-4' />
        ) : (
          <UAEIcon className='w-4 h-4' />
        )}
        <p className='flex flex-row items-center gap-1'>
          {selectedCountry}{' '}
          <span className='text-sm opacity-75'>
            (
            {
              countryData.find((item) => item.country === selectedCountry)
                ?.label
            }
            {
              countryData.find((item) => item.country === selectedCountry)
                ?.currency
            }
            )
          </span>
        </p>
        <IoMdArrowDropdown />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className='absolute mt-2 bg-[#1f1f1f] rounded-lg overflow-hidden shadow-lg gap-0.5 flex flex-col text-white border'>
          {countryData.map((country) => (
            <li
              key={country.currency}
              onClick={() => handleSelect(country.country)}
              className='flex items-center gap-2 px-4 py-2  hover:bg-[#393939] bg-[#212121]  cursor-pointer'
            >
              {country.country === 'UK' ? (
                <UKIcon className='w-4 h-4' />
              ) : (
                <UAEIcon className='w-4 h-4' />
              )}
              <span>{country.country}</span>
              <span className='text-sm opacity-50'>({country.label})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
