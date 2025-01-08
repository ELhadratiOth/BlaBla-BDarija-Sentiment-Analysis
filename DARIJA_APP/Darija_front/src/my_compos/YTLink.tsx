import Ytimg from '../assets/yt.jpeg';
import Result from './Result';
import { useState } from 'react';
import BoxReveal from '../components/ui/box-reveal';
import BlurIn from '../components/ui/typewriter-effect';
import { motion } from 'framer-motion';
import Loader from './Loader';
import API from '../API';
import { BsYoutube } from 'react-icons/bs';

const YTLink = () => {
  interface Comment {
    id: string;
    text: string;
    sentiment: string;
    probability: number;
  }

  const [comments, setComments] = useState<Comment[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState(Ytimg);
  const [prediction, setPrediction] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [text, setText] = useState('');

  const sendText = async () => {
    setWarning(false);
    setLoading(true);

    try {
      const response = await API.get(`/analyze-youtube/`, {
        params: { video_url: text },
      });
      console.log(response.data);
      const {
        url,
        thumbnail,
        overall_sentiment,
        average_certainty,
        comments_analysis,
      } = response.data;

      setComments(comments_analysis);
      setConfidence(average_certainty);
      setPrediction(overall_sentiment);
      setThumbnail(thumbnail);
      setUrl(url);
    } catch (error) {
      console.error('Error fetching data', error);
      setWarning(true);
    } finally {
      setLoading(false);
    }
  };

  interface AnalyzeClickEvent {
    preventDefault: () => void;
  }

  const handleAnalyzeClick = (e: AnalyzeClickEvent): void => {
    e.preventDefault();

  if (!text || !isValidUrl(text)) {
      setWarning(true);
      setIsClicked(false); 
      return;
    }

    setIsClicked(true);
    sendText();
  };

  const isValidUrl = (url: string): boolean => {
    const regex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
    return regex.test(url);
  };

  return (
    <div>
      <section className="z-0 w-full flex justify-around items-center space-x-3 my-20 px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="p-8 md:pt-10 rounded-3xl lg:px-0 w-full backdrop-blur-sm bg-main/20"
        >
          <div className="text-start px-10 py-5">
            <BoxReveal width="100%">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary-dark to-primary-light text-transparent bg-clip-text md:text-3xl">
                Analyze the Sentiment of Moroccan YouTube Video Comments
              </h2>
            </BoxReveal>
            <BoxReveal>
              <p className="text-primary-light sm:mt-4 sm:block">
                Drop a link to any YouTube video, and we'll analyze the
                sentiment of the relevant comments. Get instant feedback on
                whether the comments are mostly positive or negative!
              </p>
            </BoxReveal>
          </div>

          <div className="mt-6 px-10">
            <BoxReveal width="100%">
              <>
                <form
                  className="sm:flex sm:gap-4"
                  onSubmit={handleAnalyzeClick}
                >
                  <div className="sm:flex-1">
                    <input
                      className={`bg-[#222630] px-4 py-3 w-full outline-none border-2  text-white rounded-lg  transition-colors duration-100 
                        ${warning ? 'border-red-500 ' : ' border-main'}
                        `}
                      type="url"
                      id="yt-link"
                      placeholder="Enter YouTube video link"
                      value={text}
                      onChange={e => {
                        console.log(warning);
                        setText(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex justify-center gap-2 items-center mx-auto shadow-xl text-base bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-main hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                  >
                    Analyze Sentiment
                  </button>
                </form>
                {warning && !text && (
                  <p className="text-red-500 text-sm mt-2">
                    Please enter a YouTube video link.
                  </p>
                )}
                {warning && text && !isValidUrl(text) && (
                  <p className="text-red-500 text-sm mt-2">
                    Please enter a valid YouTube video link.
                  </p>
                )}
              </>
            </BoxReveal>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          className="w-full p-5 z-0 relative "
          style={{ height: 'auto', aspectRatio: '16/9' }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-full w-full">
              {' '}
              <Loader />
            </div>
          ) : url ? (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <motion.img
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                src={thumbnail}
                alt="yt"
                className="w-full  h-full object-cover rounded-xl shadow-lg"
              />
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 0.25 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute inset-0 bg-black ring-2 rounded-xl m-5"
              />

              <BsYoutube
                className="absolute inset-0 translate-x-36 text-[#FF0000] text-8xl"
                style={{
                  top: '50%',
                  left: '48%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </a>
          ) : (
            <motion.img
              src={thumbnail}
              alt="yt"
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          )}
        </motion.div>
      </section>

      {isClicked && (
        <div className="mt-12 mb-10 bg-transparent flex w-full mx-10 items-center space-x-12">
          {loading ? (
            <Loader />
          ) : (
            <>
              <Result
                predicition={prediction}
                confidence={confidence}
                width={true}
              />
              <motion.div
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
                className="border bg-primary-light/10 rounded-2xl border-white/20 p-4 w-[44%] z-0 space-y-4"
              >
                <BlurIn
                  word="Relevant Comments"
                  className="text-4xl font-bold text-primary-light"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {comments.map((comment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                        delay: index * 0.1,
                      }}
                      className="p-4 bg-white rounded-lg shadow-md space-y-0.5"
                    >
                      <p className="text-gray-800">
                        {comment.text && comment.text.length > 18
                          ? `"${comment.text.slice(0, 14)}..."`
                          : `"${comment.text}"`}
                      </p>
                      <p>
                        Sentiment:{' '}
                        <span
                          className={`font-semibold ${
                            comment.sentiment === 'positive'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          {comment.sentiment}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        <span className="font-bold">{comment.probability}</span>{' '}
                        Of Confidence
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default YTLink;
