/******************************************************************************************
 * Repository: https://github.com/kolserdav/uyem.git
 * File name: Room.lib.ts
 * Author: Sergey Kolmiller
 * Email: <uyem.ru@gmail.com>
 * License: BSD-2-Clause
 * License text: Binary distributions of this software include WebRTC and other third-party libraries.
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Sun Jun 19 2022 01:44:53 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import s from './Room.module.scss';
import c from './ui/CloseButton.module.scss';

export const getRoomLink = (roomId: number | string | null): string | null => {
  let res = null;
  if (typeof window !== 'undefined' && roomId) {
    res = `${window.location.href.replace(/\?.*/, '')}?uid=${new Date().getTime()}`;
  }
  return res;
};

export const getPathname = (): string | null => {
  let res = null;
  if (typeof window !== 'undefined') {
    res = window.location.pathname;
  }
  return res;
};

const checkVideoFixed = (container: HTMLDivElement) => {
  const { classList } = container;
  let check = false;
  for (let i = 0; classList[i]; i++) {
    if (classList[i] === s.video__fixed) {
      check = true;
    }
  }
  return check;
};

export const getWidthOfItem = ({
  lenght,
  container,
  coeff,
}: {
  lenght: number;
  container: HTMLDivElement;
  coeff: number;
}) => {
  let a = 0;
  let vertical = false;
  let dims = {
    cols: 1,
    rows: 1,
  };
  const { offsetWidth: width, offsetHeight: height } = container;
  const _lenght = checkVideoFixed(container) ? 1 : lenght;
  if (_lenght) {
    const horizontal = width > height;
    switch (_lenght) {
      case 2:
        dims = horizontal ? { cols: 2, rows: 1 } : { cols: 1, rows: 2 };
        break;
      case 3:
        dims = horizontal ? { cols: 3, rows: 1 } : { cols: 1, rows: 3 };
        break;
      case 4:
        dims = { cols: 2, rows: 2 };
        break;
      case 5:
      case 6:
        dims = horizontal ? { cols: 3, rows: 2 } : { cols: 2, rows: 3 };
        break;
      case 7:
      case 8:
      case 9:
        dims = horizontal ? { cols: 3, rows: 3 } : { cols: 2, rows: 4 };
        break;
      default:
      // TODO other counts
    }
    const w = width / dims.cols;
    const h = height / dims.rows;
    vertical = dims.cols > dims.rows;
    a = vertical ? w : h;
    a = dims.cols === dims.rows && horizontal ? h : dims.cols === dims.rows && !horizontal ? w : a;
    if (_lenght === 1 && horizontal && a * coeff <= width) {
      a *= coeff;
    } else if (a * coeff <= width && _lenght === 1) {
      a = width / coeff;
    }
  }
  return {
    width: Math.floor(a),
    vertical,
    cols: dims.cols,
    rows: dims.rows,
  };
};

export const onClickVideo = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
  const { target }: { target: HTMLVideoElement } = e as any;
  const { videoWidth, videoHeight } = target;
  const { outerWidth } = window;
  const coeff = videoWidth / videoHeight;
  const height = outerWidth / coeff;
  target.parentElement?.classList.add(s.video__fixed);
  target.parentElement?.firstElementChild?.classList.add(c.open);
  target.setAttribute('data', 'full');
  target.setAttribute('width', outerWidth.toString());
  target.setAttribute('height', height.toString());
};