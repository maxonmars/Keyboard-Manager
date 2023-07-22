import { Callback, Key, Queue } from '../types';
import { addEventListener, removeEventListener } from './event';
import { allQueuesAreEmpty, getOrCreateQueue } from './queue';

type RemoveParams = {
  queue: Queue;
  callback: Callback;
};

const removeCallback = ({ queue, callback }: RemoveParams) => {
  const index = queue.findIndex(
    (queueCallback) => queueCallback === callback
  );

  if (index > -1) {
    queue.splice(index, 1);
  }

  if (allQueuesAreEmpty()) {
    removeEventListener();
  }
  console.log('remove callback', queue)
};

type AddParams = {
  key: Key;
  callback: Callback;
};

export const addCallback = ({ key, callback }: AddParams) => {
  const needAddEventListener = allQueuesAreEmpty();
  
  const queue = getOrCreateQueue(key);
  queue.push(callback);
  
  if (needAddEventListener) {
    addEventListener();
  }
console.log('add callback', queue)
  return () => removeCallback({ queue, callback });
};
