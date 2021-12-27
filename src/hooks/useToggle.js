import { useState } from 'react';

function useToggle(defaultState = true) {
  const [isVisible, setIsVisible] = useState(defaultState);

  function toggle() {
    setIsVisible((prevVisible) => !prevVisible);
  }

  return [isVisible, toggle];
}

export default useToggle;
