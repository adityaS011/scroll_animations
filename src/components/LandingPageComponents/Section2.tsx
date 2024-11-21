import { motion } from 'framer-motion';

const Section2 = () => {
  return (
    <motion.div
      initial={{ backgroundColor: '#FFFFF' }}
      animate={{
        background:
          'radial-gradient(circle at bottom, #4602D9 2%, #111111 67%)',
        backdropFilter: 'blur(10px)',
      }}
      transition={{ duration: 2 }}
      className='relative w-full h-[1200px] flex flex-col items-center gap-24'
    >
      {/* Top Content */}
      <div className='mt-6 text-center flex flex-col gap-12 relative z-10'>
        <div className='flex flex-col gap-9 mt-24'>
          <motion.div
            initial={{
              marginRight: '-100px',
            }}
            animate={{
              marginRight: '0px',
            }}
            transition={{ duration: 0.5 }}
            className='text-[56px] text-[#FFFFFF] font-bold leading-[1]'
          >
            Always know when it’s a <br /> good time to transfer with
          </motion.div>
          <p className='text-[#ffffff94] text-lg font-medium leading-[1] text-center'>
            Say goodbye to forex fees - get the best value for your transfers
          </p>
        </div>
        <div className='flex flex-row gap-4 text-white justify-center'>
          <button className='flex flex-row bg-transparent border-2 border-[#2D2D2D] rounded-full px-5 h-16 items-center gap-1'>
            <img src='AppleIcon.svg' alt='Apple Icon' className='w-6' />
            <div className='flex flex-col gap-1'>
              <p className='text-xs font-semibold leading-[1]'>
                Download on the
              </p>
              <p className='font-bold text-lg leading-[1]'>App Store</p>
            </div>
          </button>
          <button className='flex flex-row bg-transparent border-2 border-[#2D2D2D] rounded-full px-5 h-16 items-center gap-1'>
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

      {/* Centered Content */}
      <div className='relative flex flex-row items-center justify-center w-fit h-fit rounded-full'>
        <motion.img
          src='Testimonials.svg'
          alt='Background'
          className='h-auto opacity-10'
          initial={{ width: '100%' }}
          animate={{ width: '70%', opacity: 0.9 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className='absolute overflow-hidden top-0 left-1/2 transform -translate-x-1/2'
          initial={{
            marginTop: '-40px',
          }}
          animate={{ marginTop: '0px' }}
          transition={{ duration: 1 }}
        >
          <div className='relative w-[742px] h-[707px] ml-[200px] px-[43px]'>
            <img src='PhoneScreen.svg' alt='Phone Illustration' />
            {/* Display */}
            <img
              src='Display2.svg'
              alt='screen1'
              className='absolute w-[745px] h-[635px] mt-2 -left-[100px] top-0'
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Section2;
