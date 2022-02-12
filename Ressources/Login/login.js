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

		window.location.replace(`/calendar.html?${noressource}`); 
		console.log("Taille du fichier ics: " + testcalendar.length);
		let i = 0;
		while(i != testcalendar.length){
			if(testcalendar[i].includes("BEGIN") && testcalendar[i].includes("VEVENT")){
				console.log(' --------------------  DEBUT EVENEMENT ------------------ ')
				while((testcalendar[i].includes("END") && testcalendar[i].includes("VEVENT"))===false){
					console.log(testcalendar[i])
					i++
				}
				console.log(' --------------------  FIN EVENEMENT ------------------ ')
			}
			i++
		}
		/*
		for(let i=0; i<testcalendar.length; i++){
			console.log(i)
		}*/

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
