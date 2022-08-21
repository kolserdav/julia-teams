/******************************************************************************************
 * Repository: https://github.com/kolserdav/werift-sfu-react.git
 * File name: IconButton.tsx
 * Author: Sergey Kolmiller
 * Email: <uyem.ru@gmail.com>
 * License: MIT
 * License text: See in LICENSE file
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Fri Jul 29 2022 21:35:51 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import s from './IconButton.module.scss';

function IconButton({
  children,
  className,
  width,
  title,
  height,
  onClick,
}: {
  children: JSX.Element;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div
      style={{ width, height }}
      onClick={onClick}
      role="button"
      title={title}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  );
}
IconButton.defaultProps = {
  className: s.wrapper,
  width: 40,
  height: 40,
  title: '',
  onClick: () => {
    /** */
  },
};

export default IconButton;
