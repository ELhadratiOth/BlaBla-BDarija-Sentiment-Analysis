import { FloatingNav } from '../components/ui/floating-navbar';
import { FaQuestionCircle } from 'react-icons/fa';
import { GrContact } from 'react-icons/gr';
import { MdOutlineYoutubeSearchedFor } from 'react-icons/md';
import Logo from '../assets/Blabla.png';
import { FaGithub, FaStar } from 'react-icons/fa';
import { AiFillApi } from "react-icons/ai";
import { TbSmartHome } from 'react-icons/tb';

export default function Header() {
  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <TbSmartHome />,
    },
    {
      name: 'YT-Link',
      link: '/yt-link',
      icon: <MdOutlineYoutubeSearchedFor />,
    },
    {
      name: 'API',
      link: '/api',
      icon: <AiFillApi />,
    },
    {
      name: 'ABOUT',
      link: '#about',
      icon: <FaQuestionCircle />,
    },
    {
      name: 'CONTACT',
      link: '#contact',
      icon: <GrContact />,
    },
  ];

  return (
    <div className="flex justify-end">
      <div className=" pt-2 pl-8 fixed top-1 left-4 z-40">
        {' '}
        <img src={Logo} className="w-[14rem] bg-transparent" />
      </div>
      <FloatingNav
        navItems={navItems}
        className="shadow-lg ring-2 bg-transparent left-[7%] "
      />
      <div className="mt-7 mr-6 ">
        <a href="">
          <button className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1  disabled:pointer-events-none disabled:opacity-50 bg-primary-dark ring-1  shadow  h-9 px-4 py-2 max-w-52  md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-500 ease-in hover:ring-2 hover:ring-offset-2">
            <span className="absolute right-0 -mt-12 h-32 w-8 bg-secondary-light/20 translate-x-12 rotate-12 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
            <div className="flex items-center">
              <FaGithub className="text-2xl" />
              <span className="ml-1 ">Star on GitHub</span>
            </div>
            <div className="ml-2 flex items-center gap-1 text-sm md:flex">
              <FaStar className="w-4 h-4 text-gray-800 transition-all duration-300 group-hover:text-yellow-300" />
              <span className="inline-block tabular-nums tracking-wider font-display font-medium ">
                6
              </span>
            </div>
          </button>
        </a>
      </div>
    </div>
  );
}
