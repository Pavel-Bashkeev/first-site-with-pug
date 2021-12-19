import "babel-polyfill";
export default () => {
	const serialsBox = document.querySelector('.poster-serials');
	const moviesBox = document.querySelector('.poster-movies')
	const linkSerials = ' http://www.omdbapi.com/?s=marvel&page=1&apikey=b154db48&type=series';
	const linkMovies = 'http://www.omdbapi.com/?s=dc-comics&page=1&apikey=b154db48&type=movie';
	const posterMoreBtn = document.querySelector('.poster-link');
	const modal = document.querySelector('.modal');
	const modalContent = document.querySelector('.modal-content');
	const modalCloseBtn = document.querySelector('.modal-close');



	let prodSerias = 6;
	let prodMovies = 6;
	let moviesLength = null;
	const loadSeriesData = (quantity = 6) => {
		fetch(linkSerials)
			.then(response => response.json())
			.then(data => {

				const series = data.Search;
				const seriesLenght = series.length;


				serialsBox.innerHTML = ''

				for (let i = 0; i < seriesLenght; i++) {
					let item = series[i];
					if (i < quantity) {
						serialsBox.innerHTML += `
											<div class="poster-item db" data-id-film="${item.imdbID}" >
												<img class="poster-item__img db" src="${item.Poster}" alt="#">
											</div>
											`
					}
				}
			})
			.then(()=>{
				const posterSerials = serialsBox.querySelectorAll('.poster-item')

				loadModalContent(posterSerials);
			})
	}

	loadSeriesData(prodSerias);

	const loadMoviesData = (quantity = 6) => {
		fetch(linkMovies)
		.then(response => response.json())
		.then(data => {
			const movies = data.Search;
			moviesLength = movies.length;
			moviesBox.innerHTML = ''
			for(let i = 0; i < moviesLength; i++){
				let item = movies[i];
				if(i < quantity) {
					moviesBox.innerHTML += `
					<div class="poster-item db" data-id-film="${item.imdbID}" >
						<img class="poster-item__img db" src="${item.Poster}" alt="#">
					</div>
					`
				}
			}
		})
		.then(()=>{
			const posterMovies = moviesBox.querySelectorAll('.poster-item')

			loadModalContent(posterMovies);
		})
	}
	loadMoviesData(prodMovies)

	const loadModalContent = (items) => {
		items.forEach(item => {
			item.addEventListener('click', ()=>{
				const idMovie = item.dataset.idFilm;
				modal.classList.add('is-open');
				document.body.classList.add('disable-scroll')
				modalContent.innerHTML = ''
				fetch(`http://www.omdbapi.com/?i=${idMovie}&apikey=b154db48`)
				.then(response => response.json())
				.then(data => {
					console.log(data);
					if(data.imdbID == idMovie){
					modalContent.innerHTML = `
						${data.Title}
					`}
				})
			})
		})
	}

	modalCloseBtn.addEventListener('click', ()=>{
		modal.classList.remove('is-open');
		document.body.classList.remove('disable-scroll')
	})
	posterMoreBtn.addEventListener('click', ()=>{
		prodMovies++
		loadMoviesData(prodMovies);

		if(prodMovies >= moviesLength){
			posterMoreBtn.classList.add('disable');
		} else {
			posterMoreBtn.classList.remove('disable');
		}
	})

};