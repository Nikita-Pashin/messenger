'use client'

import { FC, ReactNode } from "react";
import chatBgBr from '@/public/chat-bg-br.png';
import chatBgPatternLight from '@/public/chat-bg-pattern-light.png';
import chatBgPatternDark from '@/public/chat-bg-pattern-dark.png';
import classNames from 'classnames';

interface DefaultBackgroundProps {
  children: ReactNode;
  className?: string;
}

const DefaultBackground: FC<DefaultBackgroundProps> = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <div className={classNames(className, 'relative')}>
      <img src={chatBgBr.src} className="absolute h-full w-full dark:hidden" />
      <div className="absolute h-full w-full bg-contain dark:hidden" style={{ backgroundImage: `url(${chatBgPatternLight.src})` }} />
      <div className="absolute h-full w-full bg-contain bg-COLOR_7 hidden dark:block" style={{ backgroundImage: `url(${chatBgPatternDark.src})` }} />
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default DefaultBackground;
