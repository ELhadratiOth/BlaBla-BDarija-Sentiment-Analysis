import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InfoNotifProps {
  show: boolean;
  onClose: () => void;
}

const InfoNotif: React.FC<InfoNotifProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="fixed top-4 right-4 flex flex-col gap-2 sm:w-72 t sm:text-xs z-50"
        >
          <div className="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
            <div className="flex gap-2">
              <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="text-white">Thanks for helping us :)</p>
                <p className="text-gray-500">Your feedback will help us improve</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
  
export default InfoNotif;