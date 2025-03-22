import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type Props = {
  text: string;
  href: string;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const AnimatedLink: FC<Props> = ({ text, href, className = '', leftIcon, rightIcon }) => {
  const mergedClassName = clsx(
    'flex items-center gap-2',
    'bg-white dark:bg-blue-500 dark:text-white px-6 py-3 rounded-sm shadow-md font-medium relative z-1 hover:text-white',
    'after:content-[""] after:absolute after:h-full after:inset-0 hover:after:w-full after:w-0',
    'after:rounded-sm after:duration-300 hover:after:bg-blue-700 after:transition-all after:z-[-1]',
    className,
  );

  return (
    <Link href={href} className={mergedClassName}>
      {leftIcon && leftIcon}
      {text}
      {rightIcon && rightIcon}
    </Link>
  );
};

export default AnimatedLink;
