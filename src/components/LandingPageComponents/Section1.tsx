import { motion } from 'framer-motion';

const Section1 = () => {
  return (
    <motion.div className='overflow-hidden h-[1200px] '>
      <div className='mt-6 text-center flex flex-col gap-12 z-10 h-fit relative'>
        <div className='flex flex-col gap-9 mt-24'>
          <p className='text-[56px] text-[#111111] font-bold leading-[1]'>
            Send money to India at Google rates.
          </p>
          <p className='text-[#4e4e4e] text-xl font-medium leading-[1] text-center'>
            Say goodbye to forex fees - get the best value for your transfers
          </p>
        </div>
        <div className='flex flex-row gap-4 text-white justify-center'>
          <button className='flex flex-row bg-[#111111] border-2 border-[#2D2D2D] rounded-full px-5 h-16 items-center gap-1'>
            <img src='AppleIcon.svg' alt='Apple Icon' className='w-6' />
            <div className='flex flex-col gap-1'>
              <p className='text-xs font-semibold leading-[1]'>
                Download on the
              </p>
              <p className='font-bold text-lg leading-[1]'>App Store</p>
            </div>
          </button>
          <button className='flex flex-row bg-[#111111] border-2 border-[#2D2D2D] rounded-full px-5 h-16 items-center gap-1'>
            <img
              src='PlayStoreIcon.svg'
              alt='Play Store Icon'
              className='w-6'
            />
            <div className='flex flex-col gap-1'>
              <p className='text-xs font-semibold leading-[1]'>
                Download on the
              </p>
              <p className='font-bold text-lg leading-[1]'>Play Store</p>
            </div>
          </button>
        </div>
      </div>

      <div className='relative flex flex-row items-center justify-center mt-6 w-full h-fit rounded-full '>
        <img
          src='Testimonials.svg'
          alt='Background'
          className=' opacity-90 h-auto'
        />

        <div className='absolute z-20 overflow-hidden top-0 left-1/2 mt-16 transform -translate-x-1/2 '>
          <div className='relative w-[742px] h-[791px]  ml-[200px] px-[43px]'>
            <img src='PhoneScreen.svg' alt='Phone Illustration' />
            {/* Display */}
            <img
              src='Display1.svg'
              alt='screen1'
              className='absolute w-[745px] h-[635px] mt-2 -left-[100px]  top-0'
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Section1;
