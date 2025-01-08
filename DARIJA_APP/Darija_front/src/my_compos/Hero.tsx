import { RightSide } from "./RightSide";
import LeftSide from './LeftSide';
import InfoNotif from "./InfoNotif";
import { useState } from "react";

const Hero: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);

  const handleShowNotification = () => {
    setShowInfo(true);
    setTimeout(() => {
      setShowInfo(false);
    }, 5000);
  };

  const handleCloseNotification = () => {
    setShowInfo(false);
  };

  return (
    <>
      <InfoNotif show={showInfo} onClose={handleCloseNotification} />
      <section className="flex items-center justify-around space-x-32 md:flex-row">
        <LeftSide updateInfoNotif={handleShowNotification} />
        <RightSide />
      </section>
    </>
  );
};

export default Hero;
