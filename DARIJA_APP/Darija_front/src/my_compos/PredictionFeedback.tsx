import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../API';

interface PredictionFeedbackProps {
  onFeedback: (feedback: 'correct' | 'incorrect' | 'unknown') => void;
  text: string;
  sentiment: string;
}

const PredictionFeedback: React.FC<PredictionFeedbackProps> = ({ onFeedback, text , sentiment }) => {
  const handleFeedback = async (feedbackType: 'correct' | 'incorrect' | 'unknown') => {
    try {
      await API.post('/save-feedback/', null, {
        params: {
          text: text,
          sentiment: sentiment,
          feedback: feedbackType
        }
      });
      onFeedback(feedbackType);
    } catch (error) {
      console.error('Error sending feedback:', error);
      onFeedback(feedbackType);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="feedback"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.2
          }
        }}
        exit={{ 
          opacity: 0, 
          x: -20,
          transition: {
            duration: 0.3,
            ease: 'easeIn',
            delay:0.9
          }
        }}
        className="flex flex-col gap-2 text-base bg-white/10 backdrop-blur-sm text-gray-300 font-mono w-full p-4 rounded-lg border border-white/20 hover:border-white/30"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-[20px] fill-gray-300">
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
            <span>Was this prediction correct?</span>
          </div>
        </div>
        <hr className="my-2 border-white/20" />
        <div className="flex gap-4">
          <button 
            onClick={() => handleFeedback('correct')}
            className="w-full bg-white/5 backdrop-blur-sm p-2 rounded-md border border-white/20 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
          >
            Yes
          </button>
          <button 
            onClick={() => handleFeedback('incorrect')}
            className="w-full bg-white/5 backdrop-blur-sm p-2 rounded-md border border-white/20 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
          >
            No
          </button>
          <button 
            onClick={() => handleFeedback('unknown')}
            className="w-full bg-white/5 backdrop-blur-sm p-2 rounded-md border border-white/20 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
          >
            Not Sure
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PredictionFeedback;
