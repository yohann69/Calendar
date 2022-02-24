"use strict";
/*------------------------------------------------
					ADE Calendar
			  ~ Written By @Yohann69 ~
-----------------------v0.1---------------------*/


console.log("Bienvenue sur Fluent ADE");
console.log("Le code source est accessible publiquement ici: https://github.com/yohann69/Calendar");
console.log("Toutes contributions sont les bienvenues. Enjoy!");
console.log("Le code n'est pas peaufiné. Il y a des trucs pas beaux, pas optimisés, incorrects... mais il a prour première vocation d'être fonctionnel. Au cours des MAJ, je ferais en sorte que le code soit le meilleur possible :)");
console.log("-------------------------------------------------------------------------------------------------------------------------------------");


/*------------------------------------------------------------
		   ~ Automatically select the input at login ~
------------------------------------------------------------*/
var input = document.getElementById('input-noressource');
input.focus();
input.select();

/* 	Wait for the enter key to be pressed (due to my weird code, pressing enter wasn't 
	working to login to the website after putting the ressource number so I created 
	this small function)  */
document.addEventListener('keydown', function (e) {
	if (e.key === 'Enter') {
		calendarlogin();
	}
})

/*------------------------------------------------------------
		~ Automatically login to the website via url ~
------------------------------------------------------------*/
if ((window.location.href).includes("?")) {
	let urlparameters = (window.location.href).split("?");
	console.log(urlparameters)

	for (let i = 0; i<urlparameters.length; i++){
		if(urlparameters[i].includes("ressource=")){
			let inputnumber = document.getElementById("input-noressource")
			if (inputnumber) {
				console.log((urlparameters[1]).slice(10, 500))
				inputnumber.value = `${(urlparameters[1]).slice(10, 500)}`;
				document.getElementById("loginbtn").click();
			}
		}
		
		if (urlparameters[i].includes("theme=1")) {
			document.body.style.backgroundImage="url(https://about.netflix.com/images/backgrounds/background-texture-s.jpg)"
		}if (urlparameters[i].includes("theme=2")) {
			document.body.style.backgroundImage="url(Ressources/img/bg2.jpg)"
		}if (urlparameters[i].includes("theme=3")) {
			document.body.style.backgroundImage="url(Ressources/img/bg3.jpg)"
		}
	}
}



/*------------------------------------------------------------
					~ Main script ~
------------------------------------------------------------*/
async function calendarlogin() {
	const noressource = document.getElementById("input-noressource").value;
	const result = await fetch(`https://intranet.iut-valence.fr/ICS_ADE/${noressource}.ics`);
	let myText = await result.text();
	let testcalendar = myText.split('\n');

	/*------------------------------------------------------------
		~ Check wether the ressource number is valid or not ~
	------------------------------------------------------------*/
	/*		~ If valid ~		*/
	if (testcalendar[0].includes("BEGIN:VCALENDAR")) {
		window.history.pushState({}, '', `?ressource=${noressource}`); // Add the ressource number in the url without reloading

		// Edit the webpage (remove the login and switch to the calendar)
		document.querySelector('.logincenter').classList.add('timetable');
		document.querySelector('.timetable').classList.remove('logincenter');
		document.querySelector('.timetable').classList.remove('card');
		document.querySelector('.timetable').innerHTML = `<header><img src="Ressources/img/calendaricon.png" alt="Icone Calendrier" height="50%" onclick="tempshowcalendar();"><p>Calendrier</p><svg class="hamburger" onclick="showoptions();" height="40%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.94977 11.9498H39.9498" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.94977 23.9498H39.9498" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.94977 35.9498H39.9498" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></header><section><section class="options"><section class="toc"><a class="toc-el calendarmenu toc-active" onclick="tempshowcalendar();"><svg width="16" height="16" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="gDhs_GJdOvNXmd9k7HRk_a" x1="23.02" x2="25.063" y1="4.362" y2="18.044" gradientUnits="userSpaceOnUse"><stop offset=".042" stop-color="#076db4"></stop><stop offset=".85" stop-color="#0461af"></stop></linearGradient><path fill="url(#gDhs_GJdOvNXmd9k7HRk_a)" d="M42,14H6V8c0-1.105,0.895-2,2-2h32c1.105,0,2,0.895,2,2V14z"></path><linearGradient id="gDhs_GJdOvNXmd9k7HRk_b" x1="21.635" x2="27.567" y1="6.417" y2="58.193" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33bef0"></stop><stop offset="1" stop-color="#0a85d9"></stop></linearGradient><path fill="url(#gDhs_GJdOvNXmd9k7HRk_b)" d="M6,14v26c0,1.105,0.895,2,2,2h32c1.105,0,2-0.895,2-2V14H6z"></path><path fill="#fff" d="M21,23h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C22,22.552,21.552,23,21,23z"></path><path fill="#fff" d="M29,23h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C30,22.552,29.552,23,29,23z"></path><path fill="#fff" d="M37,23h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C38,22.552,37.552,23,37,23z"></path><path fill="#fff" d="M21,30h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C22,29.552,21.552,30,21,30z"></path><path fill="#fff" d="M13,30h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C14,29.552,13.552,30,13,30z"></path><path fill="#fff" d="M29,30h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C30,29.552,29.552,30,29,30z"></path><path fill="#fff" d="M21,37h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C22,36.552,21.552,37,21,37z"></path><path fill="#fff" d="M13,37h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C14,36.552,13.552,37,13,37z"></path><path fill="#fff" d="M29,37h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C30,36.552,29.552,37,29,37z"></path><path fill="#fff" d="M37,30h-2c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v2 C38,29.552,37.552,30,37,30z"></path><path d="M14,6v3.5c0,0.276-0.225,0.5-0.5,0.5S13,9.776,13,9.5V6h-2v3.5c0,1.378,1.121,2.5,2.5,2.5 S16,10.878,16,9.5V6H14z" opacity=".05"></path><path d="M14.5,6v3.5c0,0.551-0.448,1-1,1s-1-0.449-1-1V6h-1v3.5c0,1.103,0.897,2,2,2s2-0.897,2-2V6H14.5z" opacity=".07"></path><path d="M35,6v3.5c0,0.276-0.225,0.5-0.5,0.5S34,9.776,34,9.5V6h-2v3.5c0,1.378,1.121,2.5,2.5,2.5 S37,10.878,37,9.5V6H35z" opacity=".05"></path><path d="M35.5,6v3.5c0,0.551-0.448,1-1,1s-1-0.449-1-1V6h-1v3.5c0,1.103,0.897,2,2,2s2-0.897,2-2V6H35.5z" opacity=".07"></path><path fill="#54daff" d="M34.5,11L34.5,11c-0.828,0-1.5-0.672-1.5-1.5v-5C33,3.672,33.672,3,34.5,3l0,0 C35.328,3,36,3.672,36,4.5v5C36,10.328,35.328,11,34.5,11z"></path><path fill="#54daff" d="M13.5,11L13.5,11c-0.828,0-1.5-0.672-1.5-1.5v-5C12,3.672,12.672,3,13.5,3h0 C14.328,3,15,3.672,15,4.5v5C15,10.328,14.328,11,13.5,11z"></path></svg><p>Calendrier</p></a><section class="smallcalendar"><section><button>&lt;</button><h4>Février</h4><button>&gt;</button></section><table><thead><tr>  <th>Lun</th>  <th>Mar</th>  <th>Mer</th>  <th>Jeu</th>  <th>Ven</th>  <th>Sam</th>  <th>Dim</th></tr></thead><tbody class="scweeks"><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td class="today">6</td><td>7</td></tr><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr></tbody></table></section></section><section class="toc"><a class="toc-el credits" onclick="showcredits();"><svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve" width="16" height="16"><style type="text/css">.st0{fill:url(#SVGID_1_);}.st1{fill:#FFFFFF;}</style><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="5.7709" y1="250" x2="498.2291" y2="250" gradientTransform="matrix(3.464102e-07 -1 1 3.464102e-07 -8.694894e-05 501.9999)"><stop offset="0" style="stop-color:#1D65AF"></stop><stop offset="1" style="stop-color:#3ABAED"></stop></linearGradient><circle class="st0" cx="250" cy="250" r="246.23"></circle><path class="st1" d="M248.36,356.91c-16.71,0.74-21.57-13.85-21.37-25.62c0.01-0.46,0.01-0.88,0.01-1.27l0,0,c0-16.59,2.35-30.92,7.04-42.97c3.44-9.08,9-18.24,16.67-27.47c5.64-6.73,15.77-16.56,30.41-29.47,c14.64-12.92,24.15-23.21,28.53-30.88c4.38-7.67,6.58-16.04,6.58-25.13c0-16.44-6.42-30.88-19.26-43.32,c-12.84-12.45-28.57-18.67-47.2-18.67c-18,0-33.03,5.64-45.09,16.91c-10.06,9.41-17.23,23.23-21.51,41.48,c-0.76,3.24-4.73,15.44-9.97,18.69c-6.97,4.32-6.38,7.37-19.4,5.4l0,0c-8.35-1.72-13.26-15-14.24-22.74,c-0.4-3.19-0.32-6.4,0.2-8.89c5.28-25.46,16.15-45.46,32.63-60c19.33-17.06,44.89-25.6,76.67-25.6c33.66,0,60.5,9.16,80.54,27.47,c20.04,18.32,30.06,40.47,30.06,66.45c0,15.03-3.52,28.88-10.57,41.56c-7.04,12.68-20.82,28.1-41.33,46.26,c-13.78,12.21-22.78,21.21-27.01,27c-4.23,5.79-7.36,12.45-9.39,19.96c-1.51,5.57-2.54,13.73-3.11,24.46,c0,0.07-0.88,5.48-0.89,5.55C266.89,344.94,259.66,357.21,248.36,356.91L248.36,356.91z M273.82,397.43,c0-13.16-10.66-23.82-23.82-23.82c-13.16,0-23.82,10.66-23.82,23.82c0,13.16,10.66,23.82,23.82,23.82,C263.16,421.25,273.82,410.58,273.82,397.43z"></path></svg><p>Crédits</p></a><a class="toc-el" onclick="deconnexion();"><svg width="13" height="13" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M116.832 543.664H671.28c17.696 0 32-14.336 32-32s-14.304-32-32-32H118.832l115.76-115.76c12.496-12.496 12.496-32.752 0-45.248s-32.752-12.496-45.248 0l-189.008 194 189.008 194c6.256 6.256 14.432 9.376 22.624 9.376s16.368-3.12 22.624-9.376c12.496-12.496 12.496-32.752 0-45.248zM959.664 0H415.663c-35.36 0-64 28.656-64 64v288h64.416V103.024c0-21.376 17.344-38.72 38.72-38.72h464.72c21.391 0 38.72 17.344 38.72 38.72l1.007 818.288c0 21.376-17.328 38.72-38.72 38.72H454.816c-21.376 0-38.72-17.344-38.72-38.72V670.944l-64.416.08V960c0 35.344 28.64 64 64 64h543.984c35.36 0 64.016-28.656 64.016-64V64c-.015-35.344-28.671-64-64.015-64z"></path></svg><p>Déconnexion</p></a></section></section><section class="card calendar"></section></section>`


		/*		~ Initialyze the arrays for the calendar data ~		*/
		let eventlist = [];
		let templist = [];

		// Analyze the ics file
		let i = 0;
		while (i != testcalendar.length) {
			if (testcalendar[i].includes("BEGIN:VEVENT")) { // At the beginning of an event
				i = i + 2; // Skip useless ics data
				templist = []; // Set the temp array empty
				while ((testcalendar[i].includes("END:VEVENT")) === false) { // As long as the event isn't finished
					if (testcalendar[i].includes("DTSTART:") || testcalendar[i].includes("DTEND:") || testcalendar[i].includes("SUMMARY:") || testcalendar[i].includes("LOCATION:") || testcalendar[i].includes("DESCRIPTION:")) {
						templist.push(testcalendar[i]); // Add the event details to the temp array
						i++
					} else {
						i++;
					}
				}
				eventlist.push(templist); // When the event is finished, add the temparray to the main array
			}
			i++;
		}
		eventlist.sort(); // Sort the main array in the chronological order
		showcalendar(eventlist);


		/*		~ Call the fat function above with the actual month and year (to display it) ~		*/
		const d = new Date();
		let monthact = d.getMonth();
		let yearact = d.getFullYear();

		const myMonth = new MonthInformation(yearact, monthact)
		let detailmonth = []
		let mnb = 0;
		while (mnb < myMonth.dates.length) {
			detailmonth.push(myMonth.dates[mnb].toString().slice(0, 15))
			mnb++
		}
		console.log(myMonth.dates[0].getFullYear())
		let getprev = 0;
		while (detailmonth.length > getprev) {
			if (detailmonth[getprev].slice(4, 7) === "Feb") {
				//document.querySelector('.scweeks').innerHTML += "<td></td>"
				//console.log(detailmonth[getprev]);
			}
			getprev++;
		}


	} else {
		document.querySelector('.alert-critical').classList.remove('hidden');
	}
}









/*------------------------------------------------------------
					~ Small Calendar ~
------------------------------------------------------------*/

/* Get the month dates*/
function MonthInformation(year, oneBasedMonth) {
	const month = oneBasedMonth/* month given to Date() starts at 0 = January */
	this.startDate = new Date(year, month, 1)
	this.endDate = new Date(year, month + 1, 0) /* 0 `day` gets last day from prior month */

	/* result of getDay(): 0 means Sunday and 6 means Saturday */
	this.startDay = this.startDate.getDay()
	/* last day number = total days in current month */
	this.currentMonthTotalDays = this.endDate.getDate()
	this.totalWeeks = Math.ceil((this.currentMonthTotalDays + this.startDay) / 7)

	const prevMonthEndDate = new Date(year, month, 0)
	let prevMonthDay = prevMonthEndDate.getDate() - this.startDay + 1
	let nextMonthDay = 1
	this.dates = []

	for (let i = 0; i < (this.totalWeeks * 7); i += 1) {
		let date
		/* Previous month dates (if month does not start on Sunday) */
		if (i < this.startDay) {
			date = new Date(year, month - 1, prevMonthDay)
			prevMonthDay = prevMonthDay + 1
			/* Next month dates (if month does not end on Saturday) */
		} else if (i > this.currentMonthTotalDays + (this.startDay - 1)) {
			date = new Date(year, month + 1, nextMonthDay)
			nextMonthDay = nextMonthDay + 1
			/* Current month dates. */
		} else {
			date = new Date(year, month, (i - this.startDay) + 1)
		}
		this.dates.push(date)
	}
	return this
}






/*----------------------------------------------------------------------------------
								   ~ Navbar Functions ~
----------------------------------------------------------------------------------*/

function showcalendar(y) {
	let eventlist = y;
	document.querySelector('.toc-active').classList.remove('toc-active');
	document.querySelector('.calendarmenu').classList.add('toc-active');
	document.querySelector('.calendar').innerHTML = `<section class="daytitles"><section class="empty"></section><section class="daysheader"><section class="Lun">Lundi</section><section class="Mar">Mardi</section><section class="Mer">Mercredi</section><section class="Jeu">Jeudi</section><section class="Ven">Vendredi</section><section class="Sam">Samedi</section></section></section><section class="calendarcontent"><section class="hours"><p>8h00</p><p>8h30</p><p>9h00</p><p>9h30</p><p>10h00</p><p>10h30</p><p>11h00</p><p>11h30</p><p>12h00</p><p>12h30</p><p>13h00</p><p>13h30</p><p>14h00</p><p>14h30</p><p>15h00</p><p>15h30</p><p>16h00</p><p>16h30</p><p>17h00</p><p>17h30</p><p>18h00</p><p>18h30</p><p>19h00</p>   </section><section class="days"><section class="Mon Lun"></section><section class="Tue Mar"></section><section class="Wed Mer"></section><section class="Thu Jeu"></section><section class="Fri Ven"></section><section class="Sat Sam"></section></section></section>`;
	displayevents(eventlist);
	if (window.innerWidth <= 1300) {
		document.querySelector('.options').style.display = "none";
		hamburgernb = 0
	}
}
function showcredits() {
	document.querySelector('.toc-active').classList.remove('toc-active');
	document.querySelector('.credits').classList.add('toc-active');
	document.querySelector('.calendar').innerHTML = `<section class="headcredits"><img src="Ressources/img/calendaricon.png" alt="Icone Calendrier" width="100px"><section><h1 class="appnametitle">UGA Calendar</h1><p>v0.5</p></section></section><section class="expanders"><details class="card" open=""><summary>A propos de ce site<button><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="svelte-i0q990"><path fill="currentColor" d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z"></path></svg></button></summary><p>Ce site a été créé par <a href="https://github.com/yohann69/">Yohann</a> dans le but d'avoir une alternative à ADE qui fonctionne aussi bien sur téléphone que sur ordinateur</p></details><details class="card" open=""><summary>Crédits<button><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="svelte-i0q990"><path fill="currentColor" d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z"></path></svg></button></summary><p></p><ul><li>Code source: <a href="https://github.com/yohann69/Calendar">GitHub</a> - Toutes contributions sout les bienvenues</li><li>Site web hébergé par <a href="https://pages.cloudflare.com/">CloudFlare Pages</a></li><li>Copyright © 2022 <a href="https://github.com/yohann69/">Yohann</a></li></ul><p></p></details></section>`
	if (window.innerWidth <= 1300) {
		document.querySelector('.options').style.display = "none";
		hamburgernb = 0
	}
}

/*This isn't optimized yet but I hope this will disappear in the upcoming versions*/
async function tempshowcalendar() {
	const result = await fetch(`https://intranet.iut-valence.fr/ICS_ADE/${(window.location.search).slice(11, 500)}.ics`);
	let myText = await result.text();
	let testcalendar = myText.split('\n');
	let eventlist = [];
	let templist = [];
	let i = 0;
	while (i != testcalendar.length) {
		if (testcalendar[i].includes("BEGIN:VEVENT")) { // At the beginning of an event
			i = i + 2; // Skip useless ics data
			templist = []; // Set the temp array empty
			while ((testcalendar[i].includes("END:VEVENT")) === false) { // As long as the event isn't finished
				if (testcalendar[i].includes("DTSTART:") || testcalendar[i].includes("DTEND:") || testcalendar[i].includes("SUMMARY:") || testcalendar[i].includes("LOCATION:") || testcalendar[i].includes("DESCRIPTION:")) {
					templist.push(testcalendar[i]); // Add the event details to the temp array
					i++
				} else {
					i++;
				}
			}
			eventlist.push(templist); // When the event is finished, add the temparray to the main array
		}
		i++;
	}
	eventlist.sort(); // Sort the main array in the chronological order
	showcalendar(eventlist);
}












/*----------------------------------------------------------------------------------
				 ~ Display calendar events (is called by showcalendar) ~
----------------------------------------------------------------------------------*/
function displayevents(z) {
	let eventlist = z;

	/*		~ Get the actual date & Time ~		*/
	let todaydateunformatted = new Date();
	let datesemiformated = todaydateunformatted.toISOString(); // 2022-02-14T20:44:56.443Z     => .toISOString(); converts the date to an ICS like date format
	let date = `${datesemiformated.slice(0, 4)}` + `${datesemiformated.slice(5, 7)}` + `${datesemiformated.slice(8, 13)}` + `${datesemiformated.slice(14, 16)}` + `00Z`
	let semiday = todaydateunformatted.toString();

	/*		~ Display the today events ~		*/
	let i = 9;
	//console.log(eventlist[0][0].slice(12, 16))
	if (eventlist[9][0].slice(12, 16) == '0302') {  //date.slice(4, 8)
		/* Add some white space at the begenning of the day if the lessons doesn't start at 8''*/
		addspaces(700, eventlist[i][0].slice(17, 21), semiday);


		while (eventlist[i][0].slice(12, 16) == '0302') { //date.slice(4, 8)
			/* Get event duration */
			let eventstart = eventlist[i][0].slice(17, 21);
			let eventend = eventlist[i][1].slice(15, 19);
			let eventduration = 0;
			while ((eventend - eventstart) > 0) {
				if (eventend[2] == "3") {
					eventend = eventend - 30;
					eventduration += 30;
				} else {
					eventend = eventend - 70;
					eventduration += 30;
				}
			}

			let classduration;
			if (eventduration == 30) {
				classduration = "halfhour";
			} else if (eventduration == 60) {
				classduration = "onehour";
			} else if (eventduration == 90) {
				classduration = "onehourandhalf";
			} else if (eventduration == 120) {
				classduration = "twohours";
			} else if (eventduration == 150) {
				classduration = "twohoursandhalf";
			} else if (eventduration == 180) {
				classduration = "threehours";
			} else if (eventduration == 210) {
				classduration = "threehoursandhalf";
			} else if (eventduration == 240) {
				classduration = "fourhours";
			}


			console.log(eventlist[i])
			//console.log("End Event1: " + eventlist[i][1].slice(15, 19));
			//console.log("Start Event2: " + eventlist[i + 1][0].slice(17, 21));

			if (eventduration == 30) {
				document.querySelector(`.${semiday.slice(0, 3)}`).innerHTML += `<article class="event ${classduration}"><h3>${eventlist[i][2].slice(8, 500)}</h3><section><h4>${eventlist[i][3].slice(9, 500)}</h4><p>${eventlist[i][0].slice(17, 19)}h${eventlist[i][0].slice(19, 21)} - ${eventlist[i][1].slice(15, 17)}h${eventlist[i][1].slice(17, 19)}</p><p class="nomprof">${eventlist[i][4].split('\\n')[3]}</p></section></article>`
			} else {
				document.querySelector(`.${semiday.slice(0, 3)}`).innerHTML += `<article class="event ${classduration}"><h3>${eventlist[i][2].slice(8, 500)}</h3><h4>${eventlist[i][3].slice(9, 500)}</h4><p>${eventlist[i][0].slice(17, 19)}h${eventlist[i][0].slice(19, 21)} - ${eventlist[i][1].slice(15, 17)}h${eventlist[i][1].slice(17, 19)}</p><p class="nomprof">${eventlist[i][4].split('\\n')[3]}</p></article>`
			}
			addspaces(eventlist[i][1].slice(15, 19), eventlist[i + 1][0].slice(17, 21), semiday);
			i++
		}
	}
	responsive();
}



/**
 * @param {end of the previous course} x 
 * @param {the beginning of the following one} y 
 * @param {the day of the week where the space will be added} z 
 */
function addspaces(x, y, z) {
	while ((y - x) > 0) {
		if (y[2] == "3") {
			y = y - 30;
			document.querySelector(`.${z.slice(0, 3)}`).innerHTML += `<article class="halfhour"><article>`
		} else {
			y = y - 70;
			document.querySelector(`.${z.slice(0, 3)}`).innerHTML += `<article class="halfhour"><article>`
		}
	}
}












/*------------------------------------------------------------
						~ Responsive ~
------------------------------------------------------------*/
// This is terrible (but working). I'll improve it later.

function responsive() {


	var viewport_width = window.innerWidth;
	const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
	const d = new Date();


	let Lun = document.querySelectorAll(`.Lun`)
	let Mar = document.querySelectorAll(`.Mar`)
	let Mer = document.querySelectorAll(`.Mer`)
	let Jeu = document.querySelectorAll(`.Jeu`)
	let Ven = document.querySelectorAll(`.Ven`)
	let Sam = document.querySelectorAll(`.Sam`)


	if (days[d.getDay()] == "Lun" || days[d.getDay()] == "Dim") {
		if (viewport_width <= 800) {
			for (let i = 0; i < Lun.length; i++) {
				Ven[i].style.setProperty("display", "none", "important");
				Sam[i].style.setProperty("display", "none", "important");
				Jeu[i].style.display = "flex";
				Mar[i].style.display = "flex";
				Mer[i].style.display = "flex";
				Lun[i].style.setProperty("border-right", "1px solid var(--border-color)", "important");
			}
		}
		if (viewport_width <= 420) {
			for (let i = 0; i < Lun.length; i++) {
				Mar[i].style.setProperty("display", "none", "important");
				Mer[i].style.setProperty("display", "none", "important");
				Jeu[i].style.setProperty("display", "none", "important");
				Ven[i].style.setProperty("display", "none", "important");
				Sam[i].style.setProperty("display", "none", "important");

				Lun[i].style.setProperty("border-right", "0");

			}
		}
		if (viewport_width > 800) {
			for (let i = 0; i < Lun.length; i++) {
				Mar[i].style.display = "flex";
				Mer[i].style.display = "flex";
				Jeu[i].style.display = "flex";
				Ven[i].style.display = "flex";
				Sam[i].style.display = "flex";
			}
		}
	}
	if (days[d.getDay()] == "Mar") {
		if (viewport_width <= 800) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.setProperty("display", "none", "important");
				Sam[i].style.setProperty("display", "none", "important");
				Jeu[i].style.display = "flex";
				Ven[i].style.display = "flex";
				Mer[i].style.display = "flex";
				Mar[i].style.setProperty("border-right", "1px solid var(--border-color)", "important");
			}
		}
		if (viewport_width <= 420) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.setProperty("display", "none", "important");
				Mer[i].style.setProperty("display", "none", "important");
				Jeu[i].style.setProperty("display", "none", "important");
				Ven[i].style.setProperty("display", "none", "important");
				Sam[i].style.setProperty("display", "none", "important");

				Mar[i].style.setProperty("border-right", "0");
			}
		}
		if (viewport_width > 800) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.display = "flex";
				Mer[i].style.display = "flex";
				Jeu[i].style.display = "flex";
				Ven[i].style.display = "flex";
				Sam[i].style.display = "flex";
			}
		}
	}
	if (days[d.getDay()] == "Mer") {
		if (viewport_width <= 800) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.setProperty("display", "none", "important");
				Mar[i].style.setProperty("display", "none", "important");
				Jeu[i].style.display = "flex";
				Ven[i].style.display = "flex";
				Sam[i].style.display = "flex";
				Mer[i].style.setProperty("border-right", "1px solid var(--border-color)", "important");
			}
		}
		if (viewport_width <= 420) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.setProperty("display", "none", "important");
				Mar[i].style.setProperty("display", "none", "important");
				Jeu[i].style.setProperty("display", "none", "important");
				Ven[i].style.setProperty("display", "none", "important");
				Sam[i].style.setProperty("display", "none", "important");

				Mer[i].style.setProperty("border-right", "0");
			}
		}
		if (viewport_width > 800) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.display = "flex";
				Mar[i].style.display = "flex";
				Jeu[i].style.display = "flex";
				Ven[i].style.display = "flex";
				Sam[i].style.display = "flex";
			}
		}
	}
	if (days[d.getDay()] == "Jeu") {
		if (viewport_width <= 800) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.setProperty("display", "none", "important");
				Mar[i].style.setProperty("display", "none", "important");
				Jeu[i].style.display = "flex";
				Ven[i].style.display = "flex";
				Sam[i].style.display = "flex";
				Jeu[i].style.setProperty("border-right", "1px solid var(--border-color)", "important");
			}
		}
		if (viewport_width <= 420) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.setProperty("display", "none", "important");
				Mar[i].style.setProperty("display", "none", "important");
				Mer[i].style.setProperty("display", "none", "important");
				Ven[i].style.setProperty("display", "none", "important");
				Sam[i].style.setProperty("display", "none", "important");

				Jeu[i].style.setProperty("border-right", "0");
			}
		}
		if (viewport_width > 800) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.display = "flex";
				Mar[i].style.display = "flex";
				Mer[i].style.display = "flex";
				Ven[i].style.display = "flex";
				Sam[i].style.display = "flex";
			}
		}
	}
	if (days[d.getDay()] == "Ven") {
		if (viewport_width <= 800) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.setProperty("display", "none", "important");
				Mar[i].style.setProperty("display", "none", "important");
				Jeu[i].style.display = "flex";
				Ven[i].style.display = "flex";
				Sam[i].style.display = "flex";
				Ven[i].style.setProperty("border-right", "1px solid var(--border-color)", "important");
			}
		}
		if (viewport_width <= 420) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.setProperty("display", "none", "important");
				Mar[i].style.setProperty("display", "none", "important");
				Mer[i].style.setProperty("display", "none", "important");
				Jeu[i].style.setProperty("display", "none", "important");
				Sam[i].style.setProperty("display", "none", "important");

				Ven[i].style.setProperty("border-right", "0");
			}
		}
		if (viewport_width > 800) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.display = "flex";
				Mar[i].style.display = "flex";
				Mer[i].style.display = "flex";
				Jeu[i].style.display = "flex";
				Sam[i].style.display = "flex";
			}
		}
	}
	if (days[d.getDay()] == "Sam") {
		if (viewport_width <= 800) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.setProperty("display", "none", "important");
				Mar[i].style.setProperty("display", "none", "important");
				Jeu[i].style.display = "flex";
				Ven[i].style.display = "flex";
				Sam[i].style.display = "flex";
				Sam[i].style.setProperty("border-right", "1px solid var(--border-color)", "important");
			}
		}
		if (viewport_width <= 420) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.setProperty("display", "none", "important");
				Mar[i].style.setProperty("display", "none", "important");
				Mer[i].style.setProperty("display", "none", "important");
				Jeu[i].style.setProperty("display", "none", "important");
				Ven[i].style.setProperty("display", "none", "important");

				Sam[i].style.setProperty("border-right", "0");
			}
		}
		if (viewport_width > 800) {
			for (let i = 0; i < Lun.length; i++) {
				Lun[i].style.display = "flex";
				Mar[i].style.display = "flex";
				Mer[i].style.display = "flex";
				Jeu[i].style.display = "flex";
				Ven[i].style.display = "flex";
			}
		}
	}
}





/*------------------------------------------------------------
					~ HamburgerButton ~
------------------------------------------------------------*/
let hamburgernb = 0;
if (window.innerWidth > 1300) {
	hamburgernb = 1
}
function showoptions() {
	if (hamburgernb == 0) {
		hamburgernb = 1
		document.querySelector('.options').style.display = "flex";
	} else if (hamburgernb == 1) {
		document.querySelector('.options').style.display = "none";
		hamburgernb = 0
	}
}



/*------------------------------------------------------------
					~ Other small scripts ~
------------------------------------------------------------*/
function deconnexion() {
	window.location.replace(`/`);	// Modifie l'url en rechargant la page
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