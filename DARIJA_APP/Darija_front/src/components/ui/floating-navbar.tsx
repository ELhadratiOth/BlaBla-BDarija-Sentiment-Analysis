import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const handleScroll = (hash: string) => {
    const section = document.querySelector(hash);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          'flex max-w-fit fixed mx-auto ring-4 backdrop-blur-[2px] ring-primary-light rounded-full z-[5000] px-0 sm:px-10 py-0.5 items-center justify-center space-x-2 sm:space-x-4',
          'bottom-4 sm:bottom-auto sm:top-5 ',
          'inset-x-0',
          className,
        )}
      >
        {navItems.map((navItem, idx) => (
          <React.Fragment key={idx}>
            {navItem.link.startsWith('#') ? (
              <button
                onClick={() => handleScroll(navItem.link)}
                className={cn(
                  'relative dark:text-neutral-50 items-center flex space-x-1.5 hover:text-primary-dark text-primary-light group px-3 sm:px-1 py-2',
                )}
              >
                <span
                  className={cn(
                    'block group-hover:scale-110 transition-transform duration-300',
                    navItem.name === 'CONTACT' || navItem.name === 'ABOUT'
                      ? 'text-2xl sm:text-xl'
                      : 'text-2xl sm:text-sm',
                  )}
                >
                  {navItem.icon}
                </span>
                <span className="hidden sm:block text-sm font-bold relative">
                  {navItem.name}
                  <span className="absolute -bottom-0.5 rounded-full left-0 w-0 h-0.5 bg-primary-dark group-hover:w-full transition-all duration-300 ease-in-out" />
                </span>
              </button>
            ) : (
              <Link
                to={navItem.link}
                className={cn(
                  'relative dark:text-neutral-50 items-center flex space-x-1 hover:text-primary-dark text-primary-light group px-1 sm:px-1 py-2',
                )}
              >
                <span className="block text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                  {navItem.icon}
                </span>
                <span className="hidden sm:block text-lg font-bold relative">
                  {navItem.name}
                  <span className="absolute -bottom-0.5 rounded-full left-0 w-0 h-0.5 bg-primary-dark group-hover:w-full transition-all duration-300 ease-in-out" />
                </span>
              </Link>
            )}
            {idx < navItems.length - 1 && (
              <span className="text-neutral-100 dark:text-neutral-500 text-2xl sm:text-3xl mb-1.5">
                |
              </span>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
