import { ComponentProps } from 'react';
import Link from "next/link"
import { FC } from "react";
import classNames from 'classnames';

type AppLinkProps = ComponentProps<typeof Link>;

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    href,
    className,
  } = props;

  return (
    <Link {...props} href={href} className={classNames(className, "text-COLOR_8 dark:text-white dark:underline")} />
  );
};
