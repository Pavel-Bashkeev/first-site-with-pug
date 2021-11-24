export default  () => {
	const link = document.querySelectorAll('.nav-list__link');

	link.forEach(item => {
		item.addEventListener('click', (e)=>{
			e.preventDefault();
			for(let i = 0; i < link.length; i++){
				link[i].parentElement.classList.remove('active');
			}
			item.parentElement.classList.add('active')
		})
	})
}