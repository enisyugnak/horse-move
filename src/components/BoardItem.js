import React from 'react';
import { useState, useEffect } from 'react';

export default function BoardItem(props) {
  const { itemClicked, status, disabled } = props;
  const [styleClass, setStyleClass] = useState('');

  useEffect(() => {
    switch (status) {
      case 'first-captured':
        setStyleClass('board--item first-captured');
        break;
      case 'captured':
        setStyleClass('board--item captured');
        break;
      case 'chosen':
        setStyleClass('board--item chosen');
        break;
      default:
        setStyleClass('board--item');
        break;
    }
  }, [status]);

  return (
    <div className={styleClass} disabled={disabled} onClick={itemClicked}></div>
  );
}
