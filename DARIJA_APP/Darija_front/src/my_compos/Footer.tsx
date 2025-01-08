import { FaLinkedinIn } from 'react-icons/fa6';
import { FiGithub } from 'react-icons/fi';
import { SiInstagram } from 'react-icons/si';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-primary-dark w-full">
      <div className=" px-4 pb-8 pt-10 sm:px-6 lg:px-8 ">
        <div className=" border-t  pt-4 border-secondary-dark sm:flex sm:items-center sm:justify-between ">
          <div className="flex text-main   flex-wrap justify-center gap-4 text-sm lg:justify-end">
            © 2024 All Rights Reserved{' '}
          </div>
          <div className="text-sm text-main  ">
            {' '}
            Created by{' '}
            <span className="hover:underline font-semibold cursor-pointer text-secondary-light">
              <a
                href="https://www.0thman.tech"
                rel="noreferrer"
                target="_blank"
              >
                Othman
              </a>{' '}
            </span>{' '}
          </div>
          <ul className="mt-8 flex text-main justify-center gap-6 sm:mt-0 lg:justify-end mr-4">
            <li>
              <a
                href="https://www.linkedin.com/in/othman-el-hadrati-91aa98243/"
                rel="noreferrer"
                target="_blank"
                className="transition hover:opacity-75"
              >
                <FaLinkedinIn className="text-2xl" />
              </a>
            </li>

            <li>
              <a
                href="https://github.com/ELhadratiOth"
                rel="noreferrer"
                target="_blank"
                className=" transition hover:opacity-75"
              >
                <FiGithub className="text-2xl" />
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/otnox_/"
                rel="noreferrer"
                target="_blank"
                className=" transition hover:opacity-75"
              >
                <SiInstagram className="text-2xl" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
