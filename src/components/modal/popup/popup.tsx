import React from 'react';

import './popup.scss';

interface Props {
  text: string;
}

export default function Popup({ text }: Props) {
  const popupClass = text ? "popup popup-anim" : "popup";
  return (
    <div className={popupClass}>
      <span className="popup-text">
        { text }
      </span>
    </div>
  );
}