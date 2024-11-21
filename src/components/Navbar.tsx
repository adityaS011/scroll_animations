import { useNavigate } from 'react-router-dom';
import { DownloadIcon, Logo } from '../icon';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-[#111111] md:px-[200px] px-4 py-4  border-b border-[#ffffff36] flex flex-row justify-between items-center'>
      <div
        className='cursor-pointer'
        onClick={() => {
          navigate('/');
        }}
      >
        <Logo />
      </div>

      <div className='bg-[#81EBAB] rounded-[100px] px-4 hover:bg-[#67e097] cursor-pointer text-[#0B0B0B] flex flex-row gap-2 items-center h-10 font-semibold leading-6'>
        Download app
        <DownloadIcon />
      </div>
    </div>
  );
};

export default Navbar;
