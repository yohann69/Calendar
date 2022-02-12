"use strict";
/*------------------------------------------------
					ADE Calendar
			  ~ Written By @Yohann69 ~
-----------------------v0.1---------------------*/
console.log("Bienvenue sur Fluent ADE");
console.log("Le code source est accessible publiquement ici: https://github.com/yohann69/Calendar");
console.log("Toutes contributions sont les bienvenues");

document.addEventListener('keydown', function (e) {
	if (e.key === 'Enter') {
		calendarlogin()
	}
})

async function calendarlogin() {
	const noressource = document.getElementById("input-noressource").value;

	const result = await fetch(`https://intranet.iut-valence.fr/ICS_ADE/${noressource}.ics`);
	let myText = await result.text();
	let testcalendar = myText.split('\n');

	if (testcalendar[0].includes("BEGIN") && testcalendar[0].includes("VCALENDAR") ) {
		document.querySelector('.alert-critical').classList.add('hidden');
		document.querySelector('.titlelogin').innerHTML = "N° de ressource valide! <br>Connexion en cours";
		
		window.history.pushState( {} , '', `?ressource=${noressource}` ); //Modifie l'url sans recharger
		//window.location.replace(`/calendar.html?ressource=${noressource}`); 	// Modifie l'url en rechargant la page
		
		console.log("Taille du fichier ics: " + testcalendar.length);

		// Edit the webpage (remove the login and switch to the calendar)
		document.querySelector('.logincenter').classList.add('timetable');
		document.querySelector('.timetable').classList.remove('logincenter');
		document.querySelector('.timetable').classList.remove('card');
		

		document.querySelector('.timetable').innerHTML = "<header>Calendrier</header><section><section class=\"options\"><section class=\"toc\"><a class=\"toc-el toc-active\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2ZM8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3ZM8 10C8.41421 10 8.75 10.3358 8.75 10.75C8.75 11.1642 8.41421 11.5 8 11.5C7.58579 11.5 7.25 11.1642 7.25 10.75C7.25 10.3358 7.58579 10 8 10ZM8 4.5C8.24546 4.5 8.44961 4.67688 8.49194 4.91012L8.5 5V8.5C8.5 8.77614 8.27614 9 8 9C7.75454 9 7.55039 8.82312 7.50806 8.58988L7.5 8.5V5C7.5 4.72386 7.72386 4.5 8 4.5Z\"></svg><p>Calendrier</p></a></section><section class=\"toc\"><a class=\"toc-el\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2ZM8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3ZM8 10C8.41421 10 8.75 10.3358 8.75 10.75C8.75 11.1642 8.41421 11.5 8 11.5C7.58579 11.5 7.25 11.1642 7.25 10.75C7.25 10.3358 7.58579 10 8 10ZM8 4.5C8.24546 4.5 8.44961 4.67688 8.49194 4.91012L8.5 5V8.5C8.5 8.77614 8.27614 9 8 9C7.75454 9 7.55039 8.82312 7.50806 8.58988L7.5 8.5V5C7.5 4.72386 7.72386 4.5 8 4.5Z\"></path></svg><p>Crédits</p></a><a class=\"toc-el\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2ZM8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3ZM8 10C8.41421 10 8.75 10.3358 8.75 10.75C8.75 11.1642 8.41421 11.5 8 11.5C7.58579 11.5 7.25 11.1642 7.25 10.75C7.25 10.3358 7.58579 10 8 10ZM8 4.5C8.24546 4.5 8.44961 4.67688 8.49194 4.91012L8.5 5V8.5C8.5 8.77614 8.27614 9 8 9C7.75454 9 7.55039 8.82312 7.50806 8.58988L7.5 8.5V5C7.5 4.72386 7.72386 4.5 8 4.5Z\"></path></svg><p>Déconnexion</p></a></section></section><section class=\"card calendar\"><h2>Later, your calendar will be displayed here</h2></section></section>"
		// Analyze the ics
		let i = 0;
		while(i != testcalendar.length){
			if(testcalendar[i].includes("BEGIN") && testcalendar[i].includes("VEVENT")){
				console.log(' --------------------  DEBUT EVENEMENT ------------------ ')
				while((testcalendar[i].includes("END") && testcalendar[i].includes("VEVENT"))===false){
					//console.log(testcalendar[i])
					i++;
				}
				console.log(' --------------------  FIN EVENEMENT ------------------ ')
			}
			i++;
		}
	} else {
		document.querySelector('.alert-critical').classList.remove('hidden');
	}
}

function closecriticalalert() {
	document.querySelector('.alert-critical').classList.add('hidden');
}
function showloginhelp() {
	document.querySelector('.help-ressource-nb').classList.remove('hidden');
}
function hideloginhelp() {
	document.querySelector('.help-ressource-nb').classList.add('hidden');
}








/* fs.writeFile(`${noressource}.txt`, response.data, function (err) {
	if (err) throw err;
	console.log('File is created successfully.');
});

fs.readFile(`${noressource}.txt`, 'utf-8', (err, data) => {
	if (err) throw err;
	else{
		data.split('\n');
		if(data[0] == line.match('^BEGIN:VEVENT')){
			console.log("Première ligne");
		}
	}
})*/
