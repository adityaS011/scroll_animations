import { AlertIcon } from '../../icon';

const BottomNavigation = ({
  onSectionChange,
  activeSection,
}: {
  onSectionChange: (section: number) => void;
  activeSection: number; // Receive activeSection as a prop
}) => {
  return (
    <div className='absolute z-40 bg-[#81EBAB]  p-1 gap-4 -bottom-40 flex flex-row rounded-full font-semibold items-center'>
      <button
        className={`px-4 hover:text-white h-10 ${
          activeSection === 0 ? 'bg-[#7C5BDA] rounded-full text-white' : ''
        }`}
        onClick={() => onSectionChange(0)} // Navigate to Section 1
      >
        Currency Convertor ₹
      </button>
      <button
        className={`px-4 hover:text-white h-10 ${
          activeSection === 1 ? 'bg-[#7C5BDA] rounded-full text-white' : ''
        }`}
        onClick={() => onSectionChange(1)} // Navigate to Section 2
      >
        Live Rates (O)
      </button>
      <button
        className={`flex flex-row items-center px-4 h-10 ${
          activeSection === 2 ? 'bg-[#7C5BDA] rounded-full text-white' : ''
        }`}
        onClick={() => onSectionChange(2)} // Navigate to Section 3
      >
        Set rate alerts <AlertIcon />
      </button>
    </div>
  );
};

export default BottomNavigation;
