const API_KEY="68c71cef503027e479e864b4b8c888dd";
const API_URL="https://api.themoviedb.org"
const IMG_URL="https://image.tmdb.org/t/p/w220_and_h330_face"

var i = 0;

function limparbusca(){
    const container = document.getElementById("resultado-busca");
    container.innerHtml = "";
    container.innerText = "";
}

function busca() {
    //window.location.reload();
    //window.setTimeout('funcao()', 300);
	query = document.getElementById("txtBusca").value.replace(' ','+');
	if (query == "")
		return;
	const query_string = API_URL+"/3/search/movie?language=pt-BR&api_key="+API_KEY+"&query="+query;
	const container = document.getElementById("resultado-busca");
	container.innerHtml = "";
    container.innerText = "";

	var request = new XMLHttpRequest();
	request.open('GET', query_string, true);

	request.onload = function () {
		var data = JSON.parse(this.response);

		if (request.status >= 200 && request.status < 400) {
			var movie;
			for (var i=0; i<4; i++) {
				movie = data.results[i];
				const card = document.createElement('div');
				card.setAttribute('class', 'col-md-6 col-md-offset-3');

				const card_img = document.createElement('div');
				card_img.setAttribute('class', 'col-md-3');
				const image = document.createElement('img');
				image.setAttribute('src', IMG_URL+movie.poster_path);

				const h1 = document.createElement('h1');
				h1.textContent = movie.title;

				const p = document.createElement('p');
				p.textContent = `${movie.overview}`;

				const p1 = document.createElement('p');
				var rating = movie.vote_average;
				p1.textContent = `nota média: ${rating}...`;

				container.appendChild(card);
				card.appendChild(card_img);
				card_img.appendChild(image);
				card.appendChild(h1);
				card.appendChild(p1);
				card.appendChild(p);
			}
		} else {
			console.log('error');
		}
	}

	request.send();
	return 1;
}

function populares() {
	const query_string = API_URL+"/3/movie/popular?api_key="+API_KEY+"&language=pt-BR";
	const container = document.getElementById("destq");
    container.innerHtml = "";

	if (container == null) return;

	var request = new XMLHttpRequest();
	request.open('GET', query_string, true);

	request.onload = function () {
		var data = JSON.parse(this.response);

		if (request.status >= 200 && request.status < 400) {
			var movie;
			for (var j= i+4; i<j; i++) {
				movie = data.results[i];

				const card = document.createElement('div');
				card.setAttribute('class', 'poster col-md-3');

				const image = document.createElement('img');
				image.setAttribute('src', IMG_URL+movie.poster_path);

				const h1 = document.createElement('p');
				h1.textContent = movie.original_title;

				const p = document.createElement('p');
				var description = movie.overview.substring(0, 300);
				p.textContent = `${description}...`;

				const p1 = document.createElement('p');
				var rating = movie.vote_average;
				p1.textContent = `nota média: ${rating}...`;

				container.appendChild(card);
				card.appendChild(image);
				card.appendChild(h1);
				card.appendChild(p1);
				card.appendChild(p);
			};
		} else {
			console.log('error');
		}
	}

	request.send();
}

window.onload = populares();
