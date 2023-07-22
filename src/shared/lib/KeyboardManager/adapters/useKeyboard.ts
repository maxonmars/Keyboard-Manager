import { useEffect, useMemo } from 'react';

import { addCallback } from '../core';
import { Callback, Key } from '../types';

type Props = {
  key: Key;
  callback: Callback;
  disabled?: boolean;
};

export const useKeyboard = ({ key, callback, disabled = false }: Props) => {
  // const wrappedCallback = useRef<WrappedCallback>(null);

  // wrappedCallback.current = { callback };

  const removeCallback = useMemo(() => {
    if (disabled) {
      return null;
    }

    return addCallback({
      key,
      callback,
    });
  }, [key, disabled, callback]);

  useEffect(() => {
    if (removeCallback) return removeCallback;
  }, [removeCallback]);
};
