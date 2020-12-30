import { useRef } from 'react';

export default (state: any, compare: (currentState: any, state: any) => void | undefined): any => {
  const previousState = useRef();
  const currentState = useRef();
  const bool = typeof compare === 'function' ? compare(currentState.current, state) : true;

  if (bool) {
    previousState.current = currentState.current;
    currentState.current = state;
  }

  return previousState.current;
};
