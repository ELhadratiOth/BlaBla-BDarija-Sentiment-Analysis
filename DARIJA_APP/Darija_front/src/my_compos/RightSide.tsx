import { motion } from 'framer-motion';
import Tweet from './Tweet';

const tweets = [
  {
    id: 1,
    content: 'واش كاين شي حد فيكم عندو شي فكرة مزيانة؟ 🤔',
    author: 'Moroccan Dev',
    username: '@moroccan_dev',
    timestamp: '2h',
    likes: 245,
    retweets: 23,
    comments: 15,
    featured: true,
    duration: 0.6,
  },
  {
    id: 2,
    content: 'نهار زوين و قهيوة... شنو بغيتي كتر من هادشي 😌☕',
    author: 'Coffee Lover',
    username: '@coffee_maghrabi',
    timestamp: '4h',
    likes: 567,
    retweets: 89,
    comments: 34,
    duration: 0.8,
    
  },
  {
    id: 3,
    content: 'ماشي كولشي لي كيبان ليك مزيان هو لي خاصك تبعو 💫',
    author: 'Wisdom',
    username: '@wisdom_darija',
    timestamp: '5h',
    likes: 890,
    retweets: 156,
    comments: 45,
    featured: true,
    duration: 1,  
  },

];

export const RightSide: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className=""
    >
      <div className="grid gap-2  ">
        {tweets.map((tweet) => (
          <motion.div
            key={tweet.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${tweet.featured ? 'md:col-span-1' : 'md:col-span-2 ml-16'}`}
          >
            <Tweet {...tweet}  />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};


