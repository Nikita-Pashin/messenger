import type { UserIconProps } from '@/shared/ui/UserIcon';
import React, { FC } from "react";
import { Clock, Check, CheckCheck } from 'lucide-react';
import classNames from "classnames";
import { UserIcon } from "@/shared/ui/UserIcon";

interface MessageProps {
  id: number;
  text: string;
  time: string;
  status: 'pending' | 'delivered' | 'readed';
  isMine: boolean;
  className?: string;
  userName: UserIconProps['name'];
  userEmojiAvatar: UserIconProps['emojy'];
  onInViewPort: (messageId: number) => void;
}

export const Message: FC<MessageProps> = React.memo((props) => {
  const {
    id,
    status,
    text,
    time,
    isMine,
    className,
    userName,
    userEmojiAvatar,
    onInViewPort,
  } = props;

  const refCallback = (e: HTMLDivElement | null) => {
    if (!e || status !== 'delivered' || isMine) {
      return;
    }

    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('entry.isIntersecting', entry.isIntersecting);
          onInViewPort(id);
          observer.unobserve(e);
        }
      });
    });

    obs.observe(e);
  }

  return (
    <div className={`flex ${isMine ? 'flex-row-reverse' : ''} gap-2 items-end`} ref={refCallback} data-id={`${id}`}>
      <UserIcon className="h-10 w-10" name={userName} emojy={userEmojiAvatar} />

      <div>
        <div className={classNames("relative w-max max-w-80", className)}>
          <div className={`rounded-t-2xl ${isMine ? 'rounded-l-2xl' : 'rounded-r-2xl'} ${isMine ? 'bg-COLOR_18 dark:COLOR_3' : 'bg-white'} p-2 flex flex-col gap-0.5`}>
            <span className="text-black leading-5">
              {text}
            </span>

            <div className="leading-3 flex gap-1">
              <span className="text-black text-xs leading-3">
                {time}
              </span>

              {' '}

              <span className="text-black text-xs leading-3">
                {status === 'pending' && <Clock size={12} />}
                {status === 'delivered' && <Check size={12} />}
                {status === 'readed' && <CheckCheck size={12} />}
              </span>
            </div>
          </div>

          {isMine ? (
            <div className="absolute left-full" style={{ top: '33px' }}>
              <svg width="9" height="20"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="messageAppendix"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g className="fill-COLOR_18" fillRule="evenodd"><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" className="fill-COLOR_18" filter="url(#messageAppendix)"></path><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" className="fill-COLOR_18 corner"></path></g></svg>
            </div>
          ) : (
            <div className="absolute right-full" style={{ top: '33px', transform: 'scaleX(-1)' }}>
              <svg width="9" height="20"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="messageAppendix"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g className="fill-white" fillRule="evenodd"><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" className="fill-white" filter="url(#messageAppendix)"></path><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" className="fill-white corner"></path></g></svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
