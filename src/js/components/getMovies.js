import "babel-polyfill";
export default () => {
	const serialsBox = document.querySelector('.poster-serials');
	const moviesBox = document.querySelector('.poster-movies')
	const linkSerials = ' http://www.omdbapi.com/?s=marvel&page=1&apikey=b154db48&type=series';
	const linkMovies = 'http://www.omdbapi.com/?s=dc-comics&page=1&apikey=b154db48&type=movie';
	const posterMoreBtn = document.querySelector('.poster-link');



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
											<div class="poster-item db" data-id-serial="${item.imdbID}" >
												<img class="poster-item__img db" src="${item.Poster}" alt="#">
											</div>
											`
					}
				}
			})
			.then(()=>{
				const posterSerials = serialsBox.querySelectorAll('.poster-item')

				posterSerials.forEach(item => {
					item.addEventListener('click', ()=>{
						const idSerial = item.dataset.idSerial;
						console.log(idSerial);
						fetch(`http://www.omdbapi.com/?i=${idSerial}&apikey=b154db48`)
						.then(response => response.json())
						.then(data => {
							console.log(data);
						})
					})
				})
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
					<div class="poster-item db" data-id-serial="${item.imdbID}" >
						<img class="poster-item__img db" src="${item.Poster}" alt="#">
					</div>
					`
				}
			}
		})
		.then(()=>{
			const posterMovies = moviesBox.querySelectorAll('.poster-item')

			posterMovies.forEach(item => {
				item.addEventListener('click', ()=>{
					const idSerial = item.dataset.idSerial;
					console.log(idSerial);
					fetch(`http://www.omdbapi.com/?i=${idSerial}&apikey=b154db48`)
					.then(response => response.json())
					.then(data => {
						console.log(data);
					})
				})
			})
		})
	}
	loadMoviesData(prodMovies)

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