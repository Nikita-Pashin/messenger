'use client'

import { FC, ReactNode } from "react";
import chatBgBr from '@/public/chat-bg-br.png';
import chatBgPatternLight from '@/public/chat-bg-pattern-light.png';
import chatBgPatternDark from '@/public/chat-bg-pattern-dark.png';
import classNames from 'classnames';
import { useTheme } from '@/shared/hooks/useTheme/useTheme';

interface DefaultBackgroundProps {
  children: ReactNode;
  className?: string;
}

const DefaultBackground: FC<DefaultBackgroundProps> = (props) => {
  const {
    children,
    className,
  } = props;

  const { theme, changeTheme } = useTheme();

  return (
    <div className={classNames(className, 'relative')}>
      <img src={chatBgBr.src} className="absolute h-full w-full dark:hidden" />
      <div className="absolute h-full w-full bg-contain dark:hidden" style={{ backgroundImage: `url(${chatBgPatternLight.src})` }} />
      <div className="absolute h-full w-full bg-contain bg-COLOR_7 hidden dark:block" style={{ backgroundImage: `url(${chatBgPatternDark.src})` }} />
      <div className="relative">
        <div className="dark:block hidden">dark</div>
        <div className="dark:hidden">light</div>
        {children}
        <button onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}>change</button>
      </div>
    </div>
  );
};

export default DefaultBackground;
