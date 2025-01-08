import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlurIn from '../components/ui/typewriter-effect';

interface ResultProps {
  confidence: number;
          predicition: string;
          width: boolean;
}

const Result: React.FC<ResultProps> = ({ confidence, predicition  , width=false }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
        className={` ${
          width ? ' w-[46%]' : ''
        }  bg-white/10 backdrop-blur-sm  rounded-2xl p-4 mt-10 border border-white/20 hover:border-white/30 space-y-4 transform transition-all `}
      >
        <BlurIn
          word="Sentiment Analysis Result"
          className="text-4xl font-bold text-primary-light"
        />{' '}
        <div className="flex  justify-center items-center  space-x-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="group bg-neutral-50  p-7 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md"
          >
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute blur z-10 fill-primary-dark duration-500  group-hover:blur-none group-hover:scale-105"
            >
              <path
                transform="translate(100 100)"
                d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
              />
            </svg>
            <motion.div className="z-20 flex flex-col justify-center items-center">
              <p className="font-bold text-sm text-center">
                Sentiment Of This
                <br /> Sentence is:
              </p>
              <motion.span className="font-bold text-3xl ml-2">
                {predicition}
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-lg w-1/2 py-1.5 overflow-hidden bg-gray-50 shadow-lg dark:bg-gray-800"
          >
            <div className="px-5 py-2 flex justify-between items-center ">
              <h3 className="text-black text-lg font-medium">
                Model Confidence (%)
              </h3>
            </div>
            <div className="px-5 py-5 pt-3">
              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-main to-primary-dark h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <motion.div className="flex justify-between items-center mt-3">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {confidence}% Confidence
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Result;
