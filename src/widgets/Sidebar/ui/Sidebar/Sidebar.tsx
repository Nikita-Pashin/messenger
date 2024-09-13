'use client';

import { FC, MouseEvent, useState } from "react";
import { FindUserInput } from "@/features/FindUserInput";
import { Dictionary } from "@/shared/i18n";
import { Dialogs } from "@/widgets/Dialogs";
import { ListOfUsers } from "@/features/ListOfUsers";
import { Menu as MenuIcon, ArrowBigLeft, SunMoon, Languages } from 'lucide-react';
import { Menu, MenuItem } from '@mui/material';
import { useTheme } from "@/shared/hooks/useTheme/useTheme";

interface SidebarProps {
  d: Dictionary;
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const {
    d,
  } = props;

  const [isInputFocus, setIsInputFocus] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { theme, changeTheme } = useTheme();

  const setFocus = (isFocus: boolean) => {
    setIsInputFocus(isFocus);
  };

  const onClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(currentTarget);
  }

  const onClickBack = () => {
    setIsInputFocus(false);
  }

  const onClickThemeButton = () => {
    changeTheme(theme === 'dark' ? 'light' : 'dark');
    close();
  }

  const onClickLanguageButton = () => {
    close();
  }

  const close = () => {
    setAnchorEl(null);
  };

  return (
    <div className="basis-80 h-screen bg-white dark:bg-COLOR_1">
      <div className="p-3 mb-3 shadow-md shadow-COLOR_17 dark:shadow-COLOR_5">
        <div className="flex gap-4 items-center">
          <div className="basis-6">
            {isInputFocus ? (
              <button onClick={onClickBack}><ArrowBigLeft /></button>
            ) : (
              <button onClick={onClick}><MenuIcon /></button>
            )}
          </div>
          
          <FindUserInput d={d} setFocus={setFocus} className="grow" />
        </div>
      </div>

      <div style={{ height: 'calc(100vh - 90px)' }} className="p-3 overflow-auto">
        {!isInputFocus && (
          <Dialogs className="overflow-x-auto" d={d} />
        )}

        {isInputFocus && (
          <ListOfUsers d={d} />
        )}
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onClickThemeButton}>
          <div className="flex gap-2">
            <SunMoon />
            <span>Change theme</span>
          </div>
        </MenuItem>
        {/* <MenuItem onClick={onClickLanguageButton}>
          <div className="flex gap-2">
            <Languages />
            <span>Change language</span>
          </div>
        </MenuItem> */}
      </Menu>
    </div>
  );
};
