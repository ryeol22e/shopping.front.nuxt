export const useSetHead = (to: any) => {
	const setHead = () => {
		const pageName = to.name;
		const head = {
			title: '',
			meta: [],
			bodyAttrs: {
				class: '',
			},
			// link: [{ rel: 'stylesheet', href: bootstrapCss, defer: true }],
			script: [],
		};

		switch (pageName) {
			case 'index':
				head.title = 'shoppingmall';
				break;
			default:
				head.title = pageName;
				break;
		}

		// import('bootstrap/dist/css/bootstrap.min.css');
		useHead(head);
	};

	return {
		setHead,
	};
};
