import { motion } from 'framer-motion';
import { VscDebugBreakpointLog } from 'react-icons/vsc';

import BlurIn from '../components/ui/typewriter-effect';

function LeftSide() {
  const features = [
    {
      icon: '🚀',
      text: '7ellel t3li9at dyal ay video f youtube w 3ref wach positive wla negative.',
    },
    {
      icon: '🌍',
      text: 'Khedmetna mkhetessa bach tfhem darija li mektouba bel 3erbiya o 7ta arabizi.',
    },
    {
      icon: '💡',
      text: 'Mdevelopper b akhir makayn f les techs dyal AI o ML bach te3tik nata2ij bdi9a kbira.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="mt-[3.7rem] bg-secondary-dark z-20 " id="about">
      <div>
        <svg
          className="wave-divider scale-y-[-1]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 300"
        >
          <defs>
            <radialGradient
              id="wave-gradient"
              cx="50%"
              cy="100%"
              r="75%"
              fx="50%"
              fy="100%"
            >
              <stop offset="0%" stop-color="rgb(11,37,69)" />
              <stop offset="20%" stop-color="rgb(11,37,69)" />
              <stop offset="80%" stop-color="rgb(19,49,92)" />

              <stop offset="100%" stop-color="rgb(19,49,92)" />
            </radialGradient>
          </defs>
          <path
            fill="#0f2b50"
            d="M0,288L48,272C96,256,192,224,288,224C384,224,480,256,576,240C672,224,768,160,864,144C960,128,1056,160,1152,186.7C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            // transform="scale(1, -1) translate(0, -320)"
          ></path>
          {/* <path
            fill="url(#wave-gradient)"
            d="M0,288L48,272C96,256,192,224,288,224C384,224,480,256,576,240C672,224,768,160,864,144C960,128,1056,160,1152,186.7C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          
          ></path> */}
        </svg>
      </div>
      <div className="w-full -mt-36 pb-12 ml-10 ">
        <BlurIn
          word="Our BlaBla WebSite Abilities"
          className="text-4xl font-bold text-primary-light"
        />
      </div>
      <div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 "
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureVariants}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4
                          border border-white/20 hover:border-white/30
                          transform transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                className="text-4xl mb-3"
              >
                {feature.icon}
              </motion.div>
              <p className="text-primary-light text-lg font-semibold">
                <div className="flex ">
                  <VscDebugBreakpointLog className="text-3xl mr-2" />
                  {feature.text}
                </div>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default LeftSide;
