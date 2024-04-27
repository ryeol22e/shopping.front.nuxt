// https://v3-docs.vuejs-korea.org/guide/reusability/custom-directives.html
export const useDirectives = (app: any) => {
  const directiveObject: AnyObject = {
    /**
     * image lazy-load
     * @param {*} el
     * @param {*} binding
     */
    'lazy-load': (el: HTMLImageElement, binding: any) => {
      if (el.constructor === HTMLImageElement) {
        el.setAttribute('loading', 'lazy');
      }
    },
  };

  return { createDirectives: () => Object.keys(directiveObject).forEach((key) => app.directive(key, directiveObject[key])) };
};
