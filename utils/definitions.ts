export function debounceHandler<T extends (...args: Array<any>) => void>(method: T) {
  let timer: NodeJS.Timeout | undefined;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }

    timer = setTimeout(() => {
      method.apply(this, args);
    }, 300);
  };
}

export function throttleHandler<T extends (...args: Array<any>) => void>(method: T) {}
