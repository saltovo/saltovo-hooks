import { useState, useEffect } from 'react';

export function useDeepCompareState(value: any) {
  const [deepCompareState, setDeepCompareState] = useState<any>(value);

  const isDifferent = (compareValue: any, other: any): boolean => {
    if (Array.isArray(compareValue) && Array.isArray(other)) {
      return JSON.stringify(compareValue) !== JSON.stringify(other);
    }
    if (typeof compareValue === 'object' && typeof other === 'object') {
      const objProps = Object.keys(Object(compareValue));
      const objLength = objProps.length;
      const othProps = Object.keys(Object(other));
      const othLength = othProps.length;
      if (objLength != othLength) {
        return true;
      }
      if (isDifferent(objProps, othProps)) {
        return true;
      }
      const compare = objProps.every((ele) => {
        return !isDifferent(compareValue[ele], other[ele]);
        // return compareValue[ele] === other[ele]
      });
      return !compare;
    }
    return compareValue !== other;
  };

  useEffect(() => {
    if (isDifferent(deepCompareState, value)) {
      setDeepCompareState(value);
    }
  }, [value]);

  return deepCompareState;
}
