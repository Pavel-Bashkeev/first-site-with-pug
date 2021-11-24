import "smoothscroll-polyfill";

export default () => {
	const links = document.querySelectorAll('a[href*="#"]');
	for (let anchor of links) {
		anchor.addEventListener('click', (event) => {
			event.preventDefault();
			let blockId = anchor.getAttribute('href');
			if (document.querySelector('' + blockId)) {
				document.querySelector('' + blockId).scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}

		});
	}

}