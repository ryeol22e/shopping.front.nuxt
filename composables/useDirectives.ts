// https://v3-docs.vuejs-korea.org/guide/reusability/custom-directives.html
export const useDirectives = (app: any) => {
	type signature = {
		[key: string]: any;
		[key: number]: any;
	};

	const directiveObject: signature = {
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
