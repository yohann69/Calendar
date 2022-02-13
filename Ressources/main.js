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
		document.querySelector('.titlelogin').innerHTML = "N° de ressource valide! <br>Connexion en cours";
		document.querySelector('.alert-critical').classList.add('hidden');
		
		window.history.pushState( {} , '', `?ressource=${noressource}` ); //Modifie l'url sans recharger
		//window.location.replace(`/calendar.html?ressource=${noressource}`); 	// Modifie l'url en rechargant la page
		
		console.log("Taille du fichier ics: " + testcalendar.length);

		// Edit the webpage (remove the login and switch to the calendar)
		document.querySelector('.logincenter').classList.add('timetable');
		document.querySelector('.timetable').classList.remove('logincenter');
		document.querySelector('.timetable').classList.remove('card');
		

		document.querySelector('.timetable').innerHTML = "<header><img src=\"Ressources/img/calendaricon.png\" alt=\"Icone Calendrier\" height=\"50%\"><p>Calendrier</p><svg class=\"hamburger\" onclick=\"showoptions();\" height=\"40%\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7.94977 11.9498H39.9498\" stroke=\"white\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M7.94977 23.9498H39.9498\" stroke=\"white\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M7.94977 35.9498H39.9498\" stroke=\"white\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></header><section><section class=\"options\"><section class=\"toc\"><a class=\"toc-el calendarmenu toc-active\" onclick=\"showcalendar();\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 42 42\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><linearGradient id=\"gDhs_GJdOvNXmd9k7HRk_a\" x1=\"23.02\" x2=\"25.063\" y1=\"4.362\" y2=\"18.044\" gradientUnits=\"userSpaceOnUse\"><stop offset=\".042\" stop-color=\"#076db4\"></stop><stop offset=\".85\" stop-color=\"#0461af\"></stop></linearGradient><path fill=\"url(#gDhs_GJdOvNXmd9k7HRk_a)\" d=\"M42,14H6V8c0-1.105,0.895-2,2-2h32c1.105,0,2,0.895,2,2V14z\"></path><linearGradient id=\"gDhs_GJdOvNXmd9k7HRk_b\" x1=\"21.635\" x2=\"27.567\" y1=\"6.417\" y2=\"58.193\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#33bef0\"></stop><stop offset=\"1\" stop-color=\"#0a85d9\"></stop></linearGradient><path fill=\"url(#gDhs_GJdOvNXmd9k7HRk_b)\" d=\"M6,14v26c0,1.105,0.895,2,2,2h32c1.105,0,2-0.895,2-2V14H6z\"></path><path fill=\"#fff\" d=\"M21,23h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C22,22.552,21.552,23,21,23z\"></path><path fill=\"#fff\" d=\"M29,23h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C30,22.552,29.552,23,29,23z\"></path><path fill=\"#fff\" d=\"M37,23h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C38,22.552,37.552,23,37,23z\"></path><path fill=\"#fff\" d=\"M21,30h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C22,29.552,21.552,30,21,30z\"></path><path fill=\"#fff\" d=\"M13,30h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C14,29.552,13.552,30,13,30z\"></path><path fill=\"#fff\" d=\"M29,30h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C30,29.552,29.552,30,29,30z\"></path><path fill=\"#fff\" d=\"M21,37h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C22,36.552,21.552,37,21,37z\"></path><path fill=\"#fff\" d=\"M13,37h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C14,36.552,13.552,37,13,37z\"></path><path fill=\"#fff\" d=\"M29,37h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C30,36.552,29.552,37,29,37z\"></path><path fill=\"#fff\" d=\"M37,30h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C38,29.552,37.552,30,37,30z\"></path><path d=\"M14,6v3.5c0,0.276-0.225,0.5-0.5,0.5S13,9.776,13,9.5V6h-2v3.5c0,1.378,1.121,2.5,2.5,2.5 S16,10.878,16,9.5V6H14z\" opacity=\".05\"></path><path d=\"M14.5,6v3.5c0,0.551-0.448,1-1,1s-1-0.449-1-1V6h-1v3.5c0,1.103,0.897,2,2,2s2-0.897,2-2V6H14.5z\" opacity=\".07\"></path><path d=\"M35,6v3.5c0,0.276-0.225,0.5-0.5,0.5S34,9.776,34,9.5V6h-2v3.5c0,1.378,1.121,2.5,2.5,2.5 S37,10.878,37,9.5V6H35z\" opacity=\".05\"></path><path d=\"M35.5,6v3.5c0,0.551-0.448,1-1,1s-1-0.449-1-1V6h-1v3.5c0,1.103,0.897,2,2,2s2-0.897,2-2V6H35.5z\" opacity=\".07\"></path><path fill=\"#54daff\" d=\"M34.5,11L34.5,11c-0.828,0-1.5-0.672-1.5-1.5v-5C33,3.672,33.672,3,34.5,3l0,0 C35.328,3,36,3.672,36,4.5v5C36,10.328,35.328,11,34.5,11z\"></path><path fill=\"#54daff\" d=\"M13.5,11L13.5,11c-0.828,0-1.5-0.672-1.5-1.5v-5C12,3.672,12.672,3,13.5,3h0 C14.328,3,15,3.672,15,4.5v5C15,10.328,14.328,11,13.5,11z\"></path></svg><p>Calendrier</p></a></section><section class=\"toc\"><a class=\"toc-el credits\" onclick=\"showcredits();\"><svg version=\"1.1\" id=\"Calque_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 500 500\" style=\"enable-background:new 0 0 500 500;\" xml:space=\"preserve\" width=\"16\" height=\"16\"><style type=\"text/css\">.st0{fill:url(#SVGID_1_);}.st1{fill:#FFFFFF;}</style><linearGradient id=\"SVGID_1_\" gradientUnits=\"userSpaceOnUse\" x1=\"5.7709\" y1=\"250\" x2=\"498.2291\" y2=\"250\" gradientTransform=\"matrix(3.464102e-07 -1 1 3.464102e-07 -8.694894e-05 501.9999)\"><stop offset=\"0\" style=\"stop-color:#1D65AF\"></stop><stop offset=\"1\" style=\"stop-color:#3ABAED\"></stop></linearGradient><circle class=\"st0\" cx=\"250\" cy=\"250\" r=\"246.23\"></circle><path class=\"st1\" d=\"M248.36,356.91c-16.71,0.74-21.57-13.85-21.37-25.62c0.01-0.46,0.01-0.88,0.01-1.27l0,0,c0-16.59,2.35-30.92,7.04-42.97c3.44-9.08,9-18.24,16.67-27.47c5.64-6.73,15.77-16.56,30.41-29.47,c14.64-12.92,24.15-23.21,28.53-30.88c4.38-7.67,6.58-16.04,6.58-25.13c0-16.44-6.42-30.88-19.26-43.32,c-12.84-12.45-28.57-18.67-47.2-18.67c-18,0-33.03,5.64-45.09,16.91c-10.06,9.41-17.23,23.23-21.51,41.48,c-0.76,3.24-4.73,15.44-9.97,18.69c-6.97,4.32-6.38,7.37-19.4,5.4l0,0c-8.35-1.72-13.26-15-14.24-22.74,c-0.4-3.19-0.32-6.4,0.2-8.89c5.28-25.46,16.15-45.46,32.63-60c19.33-17.06,44.89-25.6,76.67-25.6c33.66,0,60.5,9.16,80.54,27.47,c20.04,18.32,30.06,40.47,30.06,66.45c0,15.03-3.52,28.88-10.57,41.56c-7.04,12.68-20.82,28.1-41.33,46.26,c-13.78,12.21-22.78,21.21-27.01,27c-4.23,5.79-7.36,12.45-9.39,19.96c-1.51,5.57-2.54,13.73-3.11,24.46,c0,0.07-0.88,5.48-0.89,5.55C266.89,344.94,259.66,357.21,248.36,356.91L248.36,356.91z M273.82,397.43,c0-13.16-10.66-23.82-23.82-23.82c-13.16,0-23.82,10.66-23.82,23.82c0,13.16,10.66,23.82,23.82,23.82,C263.16,421.25,273.82,410.58,273.82,397.43z\"></path></svg><p>Crédits</p></a><a class=\"toc-el\" onclick=\"deconnexion();\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M116.832 543.664H671.28c17.696 0 32-14.336 32-32s-14.304-32-32-32H118.832l115.76-115.76c12.496-12.496 12.496-32.752 0-45.248s-32.752-12.496-45.248 0l-189.008 194 189.008 194c6.256 6.256 14.432 9.376 22.624 9.376s16.368-3.12 22.624-9.376c12.496-12.496 12.496-32.752 0-45.248zM959.664 0H415.663c-35.36 0-64 28.656-64 64v288h64.416V103.024c0-21.376 17.344-38.72 38.72-38.72h464.72c21.391 0 38.72 17.344 38.72 38.72l1.007 818.288c0 21.376-17.328 38.72-38.72 38.72H454.816c-21.376 0-38.72-17.344-38.72-38.72V670.944l-64.416.08V960c0 35.344 28.64 64 64 64h543.984c35.36 0 64.016-28.656 64.016-64V64c-.015-35.344-28.671-64-64.015-64z\"></path></svg><p>Déconnexion</p></a></section></section><section class=\"card calendar\"><h2>Later, your calendar will be displayed here</h2></section></section>"
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





function showcredits(){
	document.querySelector('.toc-active').classList.remove('toc-active');
	document.querySelector('.credits').classList.add('toc-active')
	document.querySelector('.calendar').innerHTML="<details class=\"card\"><summary>Epcot Center</summary><p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p></details><details class=\"card\"><summary>Epcot Center</summary><p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p></details>"
}
function showcalendar(){
	document.querySelector('.toc-active').classList.remove('toc-active');
	document.querySelector('.calendarmenu').classList.add('toc-active');
	document.querySelector('.calendar').innerHTML = "<h2>Later, your calendar will be displayed here</h2>"
}

let hamburgernb = 0
function showoptions(){
	if(hamburgernb == 0){
		console.log("fermé")
		hamburgernb = 1
		document.querySelector('.options').style.display="flex";
	}else if(hamburgernb ==1){
		console.log("ouvert")
		document.querySelector('.options').style.display="none";
		hamburgernb=0
	}
}


function deconnexion(){
	window.location.replace(`/`);
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
