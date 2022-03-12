"use strict";
/*------------------------------------------------
					ADE Calendar
			  ~ Written By @Yohann69 ~
-----------------------v0.1---------------------*/


let monthlist = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let weeklist = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
let monthlistfr = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]

let eventlist3d = [[]];

function createEventTable(fechtedICS){
		/*		~ Initialyze the arrays for the calendar data ~		*/
		let eventlist = [];
		let templist = [];

		/**
         * Analyze the ics file and create a first list with all the events sorted in the chronological order
         */
		let i = 0;
		while (i != fechtedICS.length) {
			if (fechtedICS[i].includes("BEGIN:VEVENT")) { // At the beginning of an event
				i = i + 2; // Skip useless ics data
				templist = []; // Empty the temp array 
				while ((fechtedICS[i].includes("END:VEVENT")) === false) { // As long as the event isn't finished
					if (fechtedICS[i].includes("DTSTART:") || fechtedICS[i].includes("DTEND:") || fechtedICS[i].includes("SUMMARY:") || fechtedICS[i].includes("LOCATION:") || fechtedICS[i].includes("DESCRIPTION:")) {
						templist.push(fechtedICS[i]); // Add the event details to the temp array
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

        /**
         * Add all sorted events into a 3d array with the following structure:
         * [ ~ MainArray Containing multiple
         *      [ ~ NewDayArray Containing multiple
         *          { ~ EventObject
         *          }
         *      ]
         * ]
         */
		let day = 0;
		let event = 0;
		let searchevent = 0;

		let previouselement = eventlist[0][0].slice(8, 16)
		eventlist.forEach(element => {
			if (element[0].slice(8, 16) == previouselement) {
				eventlist3d[day][event] = {}
				eventlist3d[day][event].start = eventlist[searchevent][0].slice(8, 21)
				eventlist3d[day][event].end = eventlist[searchevent][1].slice(6, 19)
				eventlist3d[day][event].summary = eventlist[searchevent][2].slice(8, 200)
				eventlist3d[day][event].location = eventlist[searchevent][3].slice(9, 13)
				eventlist3d[day][event].description = eventlist[searchevent][4].slice(19, 200)
				event++;
				searchevent++;
			}
			else {
				day++;
				eventlist3d.push([]);
				event = 0;
				previouselement = element[0].slice(8, 16)
				eventlist3d[day][event] = {}
				eventlist3d[day][event].start = eventlist[searchevent][0].slice(8, 21)
				eventlist3d[day][event].end = eventlist[searchevent][1].slice(6, 19)
				eventlist3d[day][event].summary = eventlist[searchevent][2].slice(8, 200)
				eventlist3d[day][event].location = eventlist[searchevent][3].slice(9, 13)
				eventlist3d[day][event].description = eventlist[searchevent][4].slice(19, 200)
				event++;
				searchevent++;
			}
		});
		console.log(eventlist3d)
		showcalendar();
}




function displaysmallcalendar(yearact, monthact) {
	let detailmonth = []
	const myMonth = new MonthInformation(yearact, monthact)
	let mnb = 0;
	while (mnb < myMonth.dates.length) {
		detailmonth.push(myMonth.dates[mnb].toString().slice(0, 15))
		mnb++
	}
	let getprev = 0;
	let weeknb = 0;

	document.querySelector('.scweeks').innerHTML = `<tr class="weeknb${weeknb}"></tr>`
	document.querySelector('.scmonth').innerHTML = `${monthlistfr[monthact]} ${yearact}`
	let addweekspace = 0;
	let executed = 0;
	while (detailmonth.length > getprev) {
		if (detailmonth[getprev].slice(4, 7) === monthlist[monthact]) {
			if (detailmonth[getprev].slice(0, 3) != "Mon" && executed == 0) {
				while (detailmonth[getprev].slice(0, 3) != weeklist[addweekspace]) {
					document.querySelector(`.weeknb0`).innerHTML += `<td class="empty"></td>`
					addweekspace++;
				}
			}

			let temporaire = `${monthact + 1}`

			if (Array.from(temporaire).length == 1) {
				temporaire = `${"0" + temporaire}`
			}
			let temptoday = `${detailmonth[getprev].slice(11, 15)}-${temporaire}-${detailmonth[getprev].slice(8, 10)}`

			executed = 1;
			if (dateact.slice(0, 10) == temptoday) {
				document.querySelector(`.weeknb${weeknb}`).innerHTML += `<td class="today">${detailmonth[getprev].slice(8, 10)}</td>`
			} else {
				document.querySelector(`.weeknb${weeknb}`).innerHTML += `<td>${detailmonth[getprev].slice(8, 10)}</td>`
			}

			if (detailmonth[getprev].slice(0, 3) == "Sun") {
				weeknb++;
				document.querySelector('.scweeks').innerHTML += `<tr class="weeknb${weeknb}"></tr>`
			}
		}
		getprev++;
	}
}




/*------------------------------------------------------------
					~ Small Calendar ~
------------------------------------------------------------*/

/* Get the month dates*/
/* Thank you stackoverflow */
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

function showcalendar() {
	document.querySelector('.toc-active').classList.remove('toc-active');
	document.querySelector('.calendarmenu').classList.add('toc-active');
	document.querySelector('.calendar').innerHTML = `<section class="daytitles"><section class="empty"></section><section class="daysheader"><section class="Lun">Lundi</section><section class="Mar">Mardi</section><section class="Mer">Mercredi</section><section class="Jeu">Jeudi</section><section class="Ven">Vendredi</section><section class="Sam">Samedi</section></section></section><section class="calendarcontent"><section class="hours"><p>8h00</p><p>8h30</p><p>9h00</p><p>9h30</p><p>10h00</p><p>10h30</p><p>11h00</p><p>11h30</p><p>12h00</p><p>12h30</p><p>13h00</p><p>13h30</p><p>14h00</p><p>14h30</p><p>15h00</p><p>15h30</p><p>16h00</p><p>16h30</p><p>17h00</p><p>17h30</p><p>18h00</p><p>18h30</p><p>19h00</p>   </section><section class="days"><section class="Mon Lun"></section><section class="Tue Mar"></section><section class="Wed Mer"></section><section class="Thu Jeu"></section><section class="Fri Ven"></section><section class="Sat Sam"></section></section></section>`;
	displayevents();
	if (window.innerWidth <= 1300) {
		document.querySelector('.options').style.display = "none";
		hamburgernb = 0
	}
}
function showcredits() {
	document.querySelector('.toc-active').classList.remove('toc-active');
	document.querySelector('.credits').classList.add('toc-active');
	document.querySelector('.calendar').innerHTML = `<section class="headcredits"><img src="Ressources/img/calendaricon.png" alt="Icone Calendrier" width="100px"><section><h1 class="appnametitle">UGA Calendar</h1><p>v0.7 - Alpha</p></section></section><section class="expanders"><details class="card" open=""><summary>A propos de ce site<button><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="svelte-i0q990"><path fill="currentColor" d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z"></path></svg></button></summary><p>Ce site a été créé par <a href="https://github.com/yohann69/">Yohann</a> dans le but d'avoir une alternative à ADE qui fonctionne aussi bien sur téléphone que sur ordinateur</p></details><details class="card" open=""><summary>Crédits<button><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="svelte-i0q990"><path fill="currentColor" d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z"></path></svg></button></summary><p></p><ul><li>Code source: <a href="https://github.com/yohann69/Calendar">GitHub</a> - Toutes contributions sout les bienvenues</li><li>Site web hébergé par <a href="https://pages.cloudflare.com/">CloudFlare Pages</a></li><li>Copyright © 2022 <a href="https://github.com/yohann69/">Yohann</a></li></ul><p></p></details></section>`
	if (window.innerWidth <= 1300) {
		document.querySelector('.options').style.display = "none";
		hamburgernb = 0
	}
}












/*----------------------------------------------------------------------------------
				 ~ Display calendar events (is called by showcalendar) ~
----------------------------------------------------------------------------------*/

let colorevent = "defaultcolor"
function displayevents() {
	/*		~ Get the actual date & Time ~		*/
	let datesemiformated = d.toISOString(); // 2022-02-14T20:44:56.443Z     => .toISOString(); converts the date to an ICS like date format
	let date = `${datesemiformated.slice(0, 4)}` + `${datesemiformated.slice(5, 7)}` + `${datesemiformated.slice(8, 13)}` + `${datesemiformated.slice(14, 16)}` + `00Z`
	let semiday = d.toString();

	/*		~ Display the week events ~		*/
	let i = 0;

	let currentday = semiday.slice(0, 3) /* Name of the currentday */


	let maxdate = 311
	//while (eventlist3d[i][0].slice(12, 16) <= maxdate) {  
	/* Add some white space at the begenning of the day if the lessons doesn't start at 8'00'*/
	addspaces(700, eventlist3d[i][0].slice(17, 21), currentday);
	while (eventlist3d[i][0].slice(12, 16) == date.slice(4, 8)) {
		/* Get event duration */
		let eventstart = eventlist3d[i][0].slice(17, 21);
		let eventend = eventlist3d[i][1].slice(15, 19);
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
		} else if (eventduration == 180) { //150
			classduration = "twohoursandhalf";
		} else if (eventduration == 150) { //180
			classduration = "threehours";
		} else if (eventduration == 210) {
			classduration = "threehoursandhalf";
		} else if (eventduration == 240) {
			classduration = "fourhours";
		}


		let heuredebut = parseInt(eventlist3d[i][0].slice(17, 19)) + 1
		let heurefin = parseInt(eventlist3d[i][1].slice(15, 17)) + 1
		let eventname = eventlist3d[i][2].slice(8, 500)
		
        setColors(eventname);

		console.log(semiday.slice(0, 3))
		if (eventduration == 30) {
			document.querySelector(`.${currentday}`).innerHTML += `<article class="event ${classduration} ${colorevent}"><h3>${eventname}</h3><section><h4>${eventlist3d[i][3].slice(9, 500)}</h4><p>${heuredebut}h${eventlist3d[i][0].slice(19, 21)} - ${heurefin}h${eventlist3d[i][1].slice(17, 19)}</p><p class="nomprof">${eventlist3d[i][4].split('\\n')[3]}</p></section></article>`
		} else {
			document.querySelector(`.${currentday}`).innerHTML += `<article class="event ${classduration} ${colorevent}"><h3>${eventname}</h3><h4>${eventlist3d[i][3].slice(9, 500)}</h4><p>${heuredebut}h${eventlist3d[i][0].slice(19, 21)} - ${heurefin}h${eventlist3d[i][1].slice(17, 19)}</p><p class="nomprof">${eventlist3d[i][4].split('\\n')[3]}</p></article>`
		}
		addspaces(eventlist3d[i][1].slice(15, 19), eventlist3d[i + 1][0].slice(17, 21), currentday);
		i++
	}
	i++
	//}
	responsive();
}



/**
 * Function to add Spaces Between 2 lessons
 * @param {int} x end of the previous course 
 * @param {int} y the beginning of the following one
 * @param {string} z the day of the week where the space will be added
 */
function addspaces(x, y, z) {
	while ((y - x) > 0) {
		if (y[2] == "3") {
			y = y - 30;
			document.querySelector(`.${z}`).innerHTML += `<article class="halfhour"><article>`
		} else {
			y = y - 70;
			document.querySelector(`.${z}`).innerHTML += `<article class="halfhour"><article>`
		}
	}
}






/* Change Month In small Calendar */
function nextmonth() {
	if (monthact == 11) {
		monthact = 0;
		yearact++;
	} else {
		monthact++;
	}
	displaysmallcalendar(yearact, monthact)
}

/* Change Month In small Calendar */
function previousmonth() {
	if (monthact == 0) {
		monthact = 11;
		yearact = yearact - 1;
	} else {
		monthact = monthact - 1;
	}
	displaysmallcalendar(yearact, monthact)
}
