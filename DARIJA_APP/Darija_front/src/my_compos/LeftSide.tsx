import { useState } from 'react';
import BoxReveal from '../components/ui/box-reveal';
import { motion } from 'framer-motion';
import { FaMagic } from 'react-icons/fa';
import Result from './Result';
import PredictionFeedback from './PredictionFeedback';
import API from '../API';
import Loader from './Loader';
function LeftSide({updateInfoNotif}:any) {
  const [text, setText] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [confidence, setConfidence] = useState(70);
  const [prediction, setPrediction] = useState('Positive');
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [showFeedback, setShowFeedback] = useState(true);



  const sendText = async () => {
    setWarning(false);
    setLoading(true); 

    try {
      const response = await API.get('/predict/' + text);
      setConfidence(response.data.probability);
      setPrediction(response.data.sentiment);

    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleFeedback = () => {
    updateInfoNotif();
    setTimeout(() => {
      setShowFeedback(false);
    }, 500);
  };
  
  return (
    <div className="w-1/2 items-center justify-center overflow-hidden py-3 px-8 pr- space-y-8 bg-secondary-light/10 backdrop-blur-sm rounded-2xl shadow-xl ">
      <BoxReveal duration={0.6}>
        <motion.div
          className="space-y-2 text-start w-full"
          transition={{ duration: 0.3 }}
        >
          <p className="text-[3.5rem] font-bold bg-gradient-to-r from-primary-dark to-primary-light text-transparent bg-clip-text">
            BlaBla BDarija <span className="text-indigo-600">AI</span>。
          </p>
        </motion.div>
      </BoxReveal>

      <BoxReveal duration={0.8} width="100%">
        <motion.h2
          className="text-start text-lg sm:text-xl rounded-xl text-primary-light"
          transition={{ duration: 0.2 }}
        >
          7elel lmacha3ir dyalk{' '}
          <span className="text-indigo-600 font-semibold">
            (Sentiment Analysis)
          </span>{' '}
          mssemem khsisan l{' '}
          <span className="text-indigo-600 font-semibold">Darija</span>。
        </motion.h2>
      </BoxReveal>

      <div className="mt-2 space-y-2 w-full">
        <BoxReveal width="100%">
          <textarea
            value={text}
            onChange={e => {
              setText(e.target.value);
              if (e.target.value.trim() !== '') {
                setWarning(false); 
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (text.trim() === '') {
                  setWarning(true);
                  setIsClicked(false);
                } else {
                  setIsClicked(true);
                  sendText();
                  setShowFeedback(true);
                }
              }
            }}
            placeholder="Kteb chi 7aja hna... 📝"
            className={`placeholder:text-black w-full px-4 py-3 border-4 rounded-xl bg-white/50
                       focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                       placeholder-gray-400 text-gray-700 h-24 resize-none transition-all duration-300
                       group-hover:border-indigo-300 ${
                         warning ? 'border-red-600' : 'border-indigo-200'
                       }`}
          />
        </BoxReveal>
        <BoxReveal width="100%">
          <motion.button
            onClick={() => {
              if (text.trim() === '') {
                setWarning(true);
                setIsClicked(false);
              } else {
                setIsClicked(true);
                sendText();
                setShowFeedback(true);
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 mb-5 w-full bg-gradient-to-r from-main to-primary-dark text-white py-3 rounded-xl
                       hover:from-primary-dark hover:to-main transition-all duration-300
                       font-semibold shadow-lg flex items-center justify-center space-x-2"
          >
            <FaMagic />
            <span>Analyze Sentiment</span>
          </motion.button>
        </BoxReveal>

        {loading && <Loader/>}

        {isClicked && !loading ? (
          <div className='w-full space-y-4'>
            <Result
              confidence={confidence}
              predicition={prediction}
              width={false}
            />
            {showFeedback && (
              <PredictionFeedback 
                onFeedback={handleFeedback}
                text={text}
                sentiment={prediction}
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LeftSide;
