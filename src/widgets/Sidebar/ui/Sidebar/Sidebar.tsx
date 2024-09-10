'use client';

import { FC, useState } from "react";
import { FindUserInput } from "@/features/FindUserInput";
import { Dictionary } from "@/shared/i18n";
import { Dialogs } from "@/widgets/Dialogs";
import { ListOfUsers } from "@/features/ListOfUsers";

interface SidebarProps {
  d: Dictionary;
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const {
    d,
  } = props;

  const [isInputFocus, setIsInputFocus] = useState(false);

  const setFocus = (isFocus: boolean) => {
    setIsInputFocus(isFocus);
  };

  return (
    <div className="basis-80 h-screen bg-white dark:bg-COLOR_1">
      <div className="p-3 mb-3 shadow-md shadow-COLOR_17 dark:shadow-COLOR_5">
        <FindUserInput d={d} setFocus={setFocus} />
      </div>

      <div style={{ height: 'calc(100vh - 90px)' }} className="p-3 overflow-auto">
        {!isInputFocus && (
          <Dialogs className="overflow-x-auto" d={d} />
        )}

        {isInputFocus && (
          <ListOfUsers d={d} />
        )}
      </div>
    </div>
  );
};
