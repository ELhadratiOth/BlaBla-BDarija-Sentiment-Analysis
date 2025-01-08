import { BackgroundBeams } from './components/ui/background-beams-with-collision';
import Header from './my_compos/header';
import Details from './my_compos/Details';
import AboutUs from './my_compos/AboutUs';
import Footer from './my_compos/Footer';
import Hero from './my_compos/Hero';
import YTLink from './my_compos/YTLink'; 
import ScrollToTop from './my_compos/ScrollToTop';
import APICompo from './my_compos/APICompo';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="bg-custom w-screen h-full ">
        <BackgroundBeams className="  h-full hidden md:block" />
        <Header />

        <div className="w-screen pt-12 flex justify-center items-center flex-col">
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/yt-link" element={<YTLink />} />
            <Route path="/api" element={<APICompo/> } />
          </Routes>

          <div className=" w-full flex justify-center items-center flex-col ">
            <Details />
            <AboutUs />
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}
