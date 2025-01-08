import { motion } from 'framer-motion';
import {
  FaRegHeart,
  FaRegComment,
  FaRetweet,
  FaRegBookmark,
} from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

function Tweet({
  content = '',
  author = 'User',
  username = '@user',
  timestamp = '2h',
  likes = 42,
  retweets = 12,
  comments = 8,
  duration = 0.6,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration:  duration  }}
      className="bg-white rounded-xl shadow-lg backdrop-blur-sm px-7 overflow-hidden transform hover:shadow-xl border border-gray-100"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="p-2"
      >
        {/* Tweet Header */}
        <div className="flex items-center space-x-2 mb-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="rounded-full flex items-center justify-center w-10 h-10 p-7  bg-gradient-to-br from-secondary-light to-secondary-dark shadow-md"
          >
            <span className="text-white text-2xl font-bold">{author[0]}</span>
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-base hover:underline cursor-pointer">
                  {author}
                </span>
                <span className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
                  {username}
                </span>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.2 }}
                className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <RiTwitterXFill className="text-gray-500 w-7 h-7" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tweet Content */}
        <div className="mb-2">
          <p className="text-gray-800 text-base leading-relaxed font-medium">
            {content}
          </p>
        </div>

        {/* Tweet Timestamp */}
        <div className="text-gray-500 text-sm mb-2 border-b border-gray-100 pb-2">
          {timestamp} · X
        </div>

        {/* Tweet Actions */}
        <div className="flex justify-between text-gray-500">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-1 hover:text-blue-500 transition-colors  group rounded-full hover:bg-blue-50 p-1"
          >
            <FaRegComment className="w-6 h-6 group-hover:animate-bounce" />
            <span className="text-sm font-medium">{comments}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-1 hover:text-green-500 transition-colors  group p-1 rounded-full hover:bg-green-50"
          >
            <FaRetweet className="w-6 h-6 group-hover:animate-spin" />
            <span className="text-sm font-medium">{retweets}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-1 hover:text-red-500 transition-colors                                                                                                                            group p-1 rounded-full hover:bg-red-50"
          >
            <FaRegHeart className="w-6 h-6 group-hover:animate-pulse" />
            <span className="text-sm font-medium">{likes}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-1 hover:text-blue-500 transition-colors p-1 rounded-full hover:bg-blue-50"
          >
            <FaRegBookmark className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Tweet;
