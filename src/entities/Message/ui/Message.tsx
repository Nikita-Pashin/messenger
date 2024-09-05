import type { UserIconProps } from '@/shared/ui/UserIcon';
import { FC } from "react";
import { Clock, Check, CheckCheck } from 'lucide-react';
import classNames from "classnames";
import { UserIcon } from "@/shared/ui/UserIcon";

interface MessageProps {
  text: string;
  time: string;
  status: 'pending' | 'delivered' | 'readed';
  isMine: boolean;
  className?: string;
  userName: UserIconProps['name'];
  userEmojiAvatar: UserIconProps['emojy'];
}

export const Message: FC<MessageProps> = (props) => {
  const {
    status,
    text,
    time,
    isMine,
    className,
    userName,
    userEmojiAvatar,
  } = props;

  return (
    <div className={`flex ${isMine ? 'flex-row-reverse' : ''} gap-2 items-end`}>
      <UserIcon size={10} name={userName} emojy={userEmojiAvatar} />

      <div>
        <div className={classNames("relative w-max max-w-80", className)}>
          <div className={`rounded-t-2xl ${isMine ? 'rounded-l-2xl' : 'rounded-r-2xl'} ${isMine ? 'bg-COLOR_3' : 'bg-COLOR_1'} p-2 flex flex-col gap-0.5`}>
            <span className="text-white leading-5">
              {text}
            </span>

            <div className="leading-3 flex gap-1">
              <span className="text-white text-xs leading-3">
                {time}
              </span>

              {' '}

              <span className="text-white text-xs leading-3">
                {status === 'pending' && <Clock size={12} />}
                {status === 'delivered' && <Check size={12} />}
                {status === 'readed' && <CheckCheck size={12} />}
              </span>
            </div>
          </div>

          {isMine ? (
            <div className="absolute left-full" style={{ top: '33px' }}>
              <svg width="9" height="20"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="messageAppendix"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g fill="#8774e1" fillRule="evenodd"><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#8774e1" filter="url(#messageAppendix)"></path><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#8774e1" className="corner"></path></g></svg>
            </div>
          ) : (
            <div className="absolute right-full" style={{ top: '33px', transform: 'scaleX(-1)' }}>
              <svg width="9" height="20"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="messageAppendix"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g fill="#212121" fillRule="evenodd"><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#212121" filter="url(#messageAppendix)"></path><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#212121" className="corner"></path></g></svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
