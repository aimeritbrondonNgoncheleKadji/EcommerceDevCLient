import { useState } from 'react';

export default function () {
  const [shown, setShown] = useState(false);

  function handleShow() {
    setShown(() => true);
  }

  function handleHide() {
    setShown(() => false);
  }

  return {
    shown,
    handleShow,
    handleHide,
  };
}
