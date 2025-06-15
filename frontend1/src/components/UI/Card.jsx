import React from 'react';
import { clsx } from 'clsx';

function Card({
  children,
  className,
  padding = 'md',
  hover = false
}) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm',
        hover && 'transition-all duration-200 hover:shadow-md hover:-translate-y-1',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;

