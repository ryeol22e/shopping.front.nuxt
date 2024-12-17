export function debounceHandler<T extends (...args: Array<any>) => Promise<void> | void>(method: T) {
  let timer: NodeJS.Timeout | undefined;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }

    return Promise.resolve(() => {
      timer = setTimeout(async () => {
        return await method.apply(this, args);
      }, 300);
    });
  };
}
