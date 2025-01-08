import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MdCopyAll } from 'react-icons/md';
import WordFadeIn from '../components/ui/api-text';
import { motion } from 'framer-motion';
const APICompo: React.FC = () => {
  const codeString = `import requests
import json

text = "" # Your Darija text here

url = "https://darija-back.onrender.com/predict"
payload = {"text": text}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

result = response.json()
print(f"Input text: {text}")
print(f"Prediction: {result['prediction']}")
print(f"Confidence: {result['confidence']:.2f}")
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeString).then(
      () => {
        alert('Code copied to clipboard!');
      },
      err => {
        console.error('Failed to copy code: ', err);
      },
    );
  };

  return (
    <div className="w-full z-0 flex justify-center items-center px-10 space-x-10 ">
      <div className=" w-[45%] pb-10 rounded-xl pt-6  bg-main/20 backdrop-blur-sm px-4 ">
        <WordFadeIn
          className="text-start bg-gradient-to-r from-primary-dark to-primary-light text-transparent bg-clip-text"
          words="Use BlaBla BDarija's API"
        />
        <WordFadeIn
          className="md:text-lg text-start text-primary-light font-normal"
          words="Access BlaBla BDarija's API to integrate Moroccan Darija (SA) into your projects effortlessly and create localized experiences!"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-secondary-dark text-white px-6  py-2 rounded-lg w-[50%] font-mono"
      >
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-red-500">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="group relative flex justify-center items-center text-zinc-600 text-xs font-bold">
            <div
              onClick={handleCopyCode}
              className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-primary-dark to-primary-dark px-3 rounded-full p-3 mt-1 cursor-pointer duration-300"
            >
              <MdCopyAll className="text-xl text-primary-light" />
              <span className="text-[0px] group-hover:text-base duration-300">
                Copy Code
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-green-400">$ python@3.10+</p>
          <p className="text-green-400">$ pip install requests</p>
          <p className="text-white">
            <span className="text-green-400"> {'>>> '}</span>
            Requirement already satisfied: requests in
            /opt/lib/python3.10/site-...
          </p>
          <p className="text-green-400">$ code : </p>
          <p className="text-green-400 "> {'>>>'}</p>

          <SyntaxHighlighter
            language="python"
            style={dracula}
            customStyle={{
              backgroundColor: 'transparent',
              paddingLeft: '5%',
              margin: 0,
              borderRadius: '0px',
            }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      </motion.div>
    </div>
  );
};

export default APICompo;
