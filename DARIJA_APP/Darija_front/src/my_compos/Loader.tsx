import React, { useState, useEffect } from 'react';

const Loader: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-primary-dark animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-primary-dark animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-primary-dark animate-bounce [animation-delay:.7s]"></div>
      </div>
      {showMessage && (<> 
        <p className="text-sm font-bold text-primary-dark">Sber chwiya, serveur yallah kich3el ...</p>
        <p className="text-sm font-bold text-primary-dark">L Budget makaynch :)</p></>
      )}
    </div>
  );
};

export default Loader;