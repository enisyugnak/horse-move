import React from 'react';
import { useState, useEffect } from 'react';

export default function BoardItem(props) {
  const { itemClicked, status, disabled } = props;
  const [styleClass, setStyleClass] = useState('');

  useEffect(() => {
    switch (status) {
      case 'first-captured':
        setStyleClass('first-captured');
        break;
      case 'captured':
        setStyleClass('captured');
        break;
      case 'chosen':
        setStyleClass('chosen');
        break;
      default:
        setStyleClass('');
        break;
    }
  }, [status]);

  return (
    <div
      className={'board--item ' + styleClass}
      disabled={disabled}
      onClick={itemClicked}
    ></div>
  );
}
