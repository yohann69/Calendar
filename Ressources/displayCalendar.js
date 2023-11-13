"use strict";
/*------------------------------------------------
					ADE Calendar
			  ~ Written By @Yohann69 ~
-----------------------v1.0---------------------*/


let monthlist = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let weeklist = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
let weeklistfr = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
let monthlistfr = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]


function displaysmallcalendar(yearact, monthact) {
    let detailmonth = []
    const myMonth = new MonthInformation(yearact, monthact)
    let mnb = 0;
    while (mnb < myMonth.dates.length) {
        detailmonth.push(myMonth.dates[mnb].toString().slice(0, 15))
        mnb++
    }
    let getprev = 0;

    let weenknbstart = new Date(`${yearact}-${String(monthact + 1).padStart(2, '0')}-01T00:00:00Z`)
    let displayweek = weenknbstart.getWeek()
    let displayweekbackup = displayweek;
    if (monthact == 0 && yearact == 2023) {
        displayweek = 0;
        displayweekbackup = 0;
    }
    let weeknb = 0;
    document.querySelector('.scweeks').innerHTML = `<tr class="weeknb${weeknb}" onclick="showcalendar(${displayweek}); selectweek(&quot;weeknb${weeknb}&quot;)"></tr>`
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
                /* displayweek ++; */
                displayweek = (new Date(`${yearact}-${String(monthact + 1).padStart(2, '0')}-${String(parseInt(detailmonth[getprev].slice(8, 10)) + 1).padStart(2, '0')}T00:00:00Z`)).getWeek();


                if (weeknb == 1) {
                    document.querySelector('.scweeks').innerHTML += `<tr class="weeknb${weeknb}"  onclick="showcalendar(${displayweekbackup + 1}); selectweek(&quot;weeknb${weeknb}&quot;)"></tr>`
                } else {
                    document.querySelector('.scweeks').innerHTML += `<tr class="weeknb${weeknb}"  onclick="showcalendar(${displayweek}); selectweek(&quot;weeknb${weeknb}&quot;)"></tr>`
                }
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
    document.querySelector('.calendar').innerHTML = `<section class="daytitles"><section class="empty"></section><section class="daysheader"><button onclick="previousday();">&lt;</button><section class="Lun">Lundi</section><section class="Mar">Mardi</section><section class="Mer">Mercredi</section><section class="Jeu">Jeudi</section><section class="Ven">Vendredi</section><section class="Sam">Samedi</section><button onclick="nextday();">&gt;</button></section></section><section class="calendarcontent"><section class="hours"><p>8h00</p><p>8h30</p><p>9h00</p><p>9h30</p><p>10h00</p><p>10h30</p><p>11h00</p><p>11h30</p><p>12h00</p><p>12h30</p><p>13h00</p><p>13h30</p><p>14h00</p><p>14h30</p><p>15h00</p><p>15h30</p><p>16h00</p><p>16h30</p><p>17h00</p><p>17h30</p><p>18h00</p><p>18h30</p><p>19h00</p>   </section><section class="days"><section class="Mon Lun"></section><section class="Tue Mar"></section><section class="Wed Mer"></section><section class="Thu Jeu"></section><section class="Fri Ven"></section><section class="Sat Sam"></section></section></section>`;
    displayweek();
    if (window.innerWidth <= 1300) {
        document.querySelector('.options').style.display = "none";
        hamburgernb = 0
    }
    responsive();
}

function showcredits() {
    document.querySelector('.toc-active').classList.remove('toc-active');
    document.querySelector('.credits').classList.add('toc-active');
    document.querySelector('.calendar').innerHTML = `<section class="headcredits"><img src="Ressources/img/calendaricon.png" alt="Icone Calendrier" width="100px"><section><h1 class="appnametitle">UGA Calendar</h1><p>v1.5</p></section></section><section class="expanders"><details class="card" open=""><summary>A propos de ce site<button><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="svelte-i0q990"><path fill="currentColor" d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z"></path></svg></button></summary><p>Ce site a été créé par <a href="https://github.com/yohann69/">Yohann</a> dans le but d'avoir une alternative à ADE qui fonctionne aussi bien sur téléphone que sur ordinateur</p></details><details class="card" open=""><summary>Crédits<button><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="svelte-i0q990"><path fill="currentColor" d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z"></path></svg></button></summary><p></p><ul><li>Code source: <a href="https://github.com/yohann69/Calendar">GitHub</a> - Toutes contributions sout les bienvenues</li><li>Site web hébergé par <a href="https://pages.cloudflare.com/">CloudFlare Pages</a></li><li>Copyright © 2022 <a href="https://github.com/yohann69/">Yohann</a></li></ul><p></p></details><details class="card" open=""><summary>Contact<button><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="svelte-i0q990"><path fill="currentColor" d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z"></path></svg></button></summary><p></p><ul><li>Mail: <a href="mailto:yohann@chavanel.eu.org">yohann@chavanel.eu.org</a></li><li>Discord: <code>NΞОИ#1723</code></li></ul></details></section>`
    if (window.innerWidth <= 1300) {
        document.querySelector('.options').style.display = "none";
        hamburgernb = 0
    }
}

<<<<<<< Updated upstream
=======
function showsettings() {
    document.querySelector('.toc-active').classList.remove('toc-active');
    document.querySelector('.settings').classList.add('toc-active');
    document.querySelector('.calendar').innerHTML = `<p>Cette fonctionnalité arrive prochainement 👀<p>` // TODO: Implement settings
    if (window.innerWidth <= 1300) {
        document.querySelector('.options').style.display = "none";
        hamburgernb = 0
    }
}
>>>>>>> Stashed changes


/*----------------------------------------------------------------------------------
				 ~ Display calendar events (is called by showcalendar) ~
----------------------------------------------------------------------------------*/


function displayweek() {
    let count = 0;
    let days = [];
    console.log(eventArray[0])
    for (let i = 0; i < eventArray.length; i++) {
            count++;
            days.push(eventArray[i].start.toLocaleString('default', {weekday: 'long'}))
            displayday(`${eventArray[i].start.getFullYear()}-${String(eventArray[i].start.getMonth() + 1).padStart(2, '0')}-${String(eventArray[i].start.getDate()).padStart(2, '0')}`, i); // .padStart(2, '0') add 0 to a the beginnig of the string when it has a length of 2
    }
    if (count < 5) {
        let future = true;
        let today = new Date();
        if (weektodysplay <= today.getWeek()) future = false;

        if (days.indexOf("Monday") == -1) {
            emptyday("Mon", future)
        }
        if (days.indexOf("Tuesday") == -1) {
            emptyday("Tue", future)
        }
        if (days.indexOf("Wednesday") == -1) {
            emptyday("Wed", future)
        }
        if (days.indexOf("Thursday") == -1) {
            emptyday("Thu", future)
        }
        if (days.indexOf("Friday") == -1) {
            emptyday("Fri", future)
        }
    }

}

function emptyday(daytoempty, future) {
    if (future) {
        // document.querySelector(`.${daytoempty}`).innerHTML = `<article class="event2 completeday">
        // 												<h3>Rien à afficher.</h3>
        // 												<h4>Mais cela ne veut pas dire que tu n'as pas cours!</h4>
        // 												 <p class="nomprof">L'api utilisée ne possède qu'un mois d'edt</p>
        // 											 </article>`
    } else {
        //document.querySelector(`.${daytoempty}`).innerHTML = `<article class="event2 completeday">
        //												<a href="https://youtu.be/wQP9XZc2Y_c?t=178" style="color: var(--default-color); text-decoration: none; cursor: default; font-size: 105%; margin-bottom:5px"><i>"Le passé est passé"</i></a>
        //												 <p class="nomprof">En effet, l'api utilisée ne permets pas de voir dans le passé</p>
        //											 </article>`

    }
}


/**
 * Display a specific day
 * Function called by displayweek()
 * @param {string} dateoftheday the date of the day to display in the following
 * @param {int} eventArrayIndex
 */
function displayday(dateoftheday, eventArrayIndex) {

    let previousevent = new Date(`${dateoftheday}T07:00:00Z`)   // change the 6 in 7 when changing the timezone and vice versa
    let executed = false

    eventArray[eventArrayIndex].forEach(element => {
        let nomprof
        if (element.description.split("\\n")[1].includes('(Exporté le:')) nomprof = ""
        else nomprof = element.description.split("\\n")[1]

        let emplacement = ""
        if (String(element.location).split("\\,")[1]) {
            for (let i = 0; i < (String(element.location).split("\\,")).length; i++) {
                emplacement += `${String(element.location).split("\\,")[i]}<br/>`
            }
        } else emplacement = element.location

        let dayName = weeklist[element.start.getDay() - 1]
        if (executed) {

        } else {
            document.querySelectorAll(`.${weeklistfr[element.start.getDay() - 1]}`)[0].innerHTML += `<p>${element.start.getDate()}/${String(element.start.getMonth() + 1).padStart(2, '0')}/${element.start.getFullYear()}</p>`
            executed = true
        }
        if (element.start.getHours() === 7 && element.start.getMinutes() === 30) {

        } else {
            addspaces(Math.abs(previousevent - element.start), dayName)
        }
        setColors(element.summary) // Get the event color based on the event name

        let eventduration = Math.abs(element.end - element.start) // Diff between 2 dates in ms

        let lessonduration = "onehour"

        if (eventduration === 5400000) lessonduration = "onehourandhalf";
        if (eventduration === 7200000) lessonduration = "twohours";
        if (eventduration === 9000000) lessonduration = "twohoursandhalf";
        if (eventduration === 10800000) lessonduration = "threehours";
        if (eventduration === 14400000) lessonduration = "fourhours";
        if (eventduration === 16200000) lessonduration = "fourhoursandhalf";
        if (eventduration === 27000000) lessonduration = "sevenhoursandhalf";
        if (eventduration === 27000000 && element.start.getHours() === 7 && element.start.getMinutes() === 30) lessonduration = "sevenhours";
        if (eventduration === 39600000) lessonduration = "completeday";
        if (eventduration === 1800000) {
            document.querySelector(`.${dayName}`).innerHTML += `<article class="event halfhour ${colorevent}">
																	<h3>${element.summary}</h3>
																	<section>
																		<h4>${emplacement}</h4>
																		<p class="nomprof">${nomprof}</p>
																		<p>${element.start.getHours()}h${String(element.start.getMinutes()).padStart(2, '0')} - ${element.end.getHours()}h${String(element.end.getMinutes()).padStart(2, '0')}</p>
																	</section>
																</article>`
            document.querySelector(`.${dayName}`).innerHTML += `<article class="mousemove halfhour ${colorevent}">
																	<h3>${element.summary}</h3>
																	<h4>${emplacement}</h4>
																	<p class="nomprof">${nomprof}</p>
																	<p>${element.start.getHours()}h${String(element.start.getMinutes()).padStart(2, '0')} - ${element.end.getHours()}h${String(element.end.getMinutes()).padStart(2, '0')}</p>
		 														</article>`
        } else {
            document.querySelector(`.${dayName}`).innerHTML += `<article class="event ${lessonduration} ${colorevent}">
													 				<h3>${element.summary}</h3>
													 				<h4>${emplacement}</h4>
													 				<p class="nomprof">${nomprof}</p>
													 				<p>${element.start.getHours()}h${String(element.start.getMinutes()).padStart(2, '0')} - ${element.end.getHours()}h${String(element.end.getMinutes()).padStart(2, '0')}</p>
													 			</article>`
            document.querySelector(`.${dayName}`).innerHTML += `<article class="mousemove ${lessonduration} ${colorevent}">
																	<h3>${element.summary}</h3>
																	<h4>${emplacement}</h4>
																 	<p class="nomprof">${nomprof}</p>
																 	<p>${element.start.getHours()}h${String(element.start.getMinutes()).padStart(2, '0')} - ${element.end.getHours()}h${String(element.end.getMinutes()).padStart(2, '0')}</p>
															 	</article>`
        }
        previousevent = element.end;
    })
    responsive();
}


/**
 * Add Spaces Between 2 lessons
 * Function called by displayday()
 * @param {int} x the difference between the previous course and the next one
 * @param {string} y the day of the week where the space will be added
 */
function addspaces(x, y) {
    if (x === 1800000) document.querySelector(`.${y}`).innerHTML += `<article class="halfhour"><article>`;
    else if (x === 3600000) document.querySelector(`.${y}`).innerHTML += `<article class="onehour"><article>`;
    else if (x === 5400000) document.querySelector(`.${y}`).innerHTML += `<article class="onehourandhalf"><article>`;
    else if (x === 7200000) document.querySelector(`.${y}`).innerHTML += `<article class="twohours"><article>`;
    else if (x === 10800000) document.querySelector(`.${y}`).innerHTML += `<article class="threehours"><article>`;
    else if (x === 14400000) document.querySelector(`.${y}`).innerHTML += `<article class="fourhours"><article>`;
    else if (x === 21600000) document.querySelector(`.${y}`).innerHTML += `<article class="sixhours"><article>`;
    else while (x > 0) {
            x -= 1800000;
            document.querySelector(`.${y}`).innerHTML += `<article class="halfhour"><article>`;
        }
}


/* Change Month In small Calendar */
function nextmonth() {
    document.querySelector('.tomaketheselectedweekwork').classList.add('selectedweek')
    if (monthact == 11) {
        monthact = 0;
        yearact++;
    } else monthact++;
    displaysmallcalendar(yearact, monthact)
}

/* Change Month In small Calendar */
function previousmonth() {
    document.querySelector('.tomaketheselectedweekwork').classList.add('selectedweek')
    if (monthact == 0) {
        monthact = 11;
        yearact = yearact - 1;
    } else monthact = monthact - 1;
    displaysmallcalendar(yearact, monthact)
}


function selectweek(weektoselect) {
    document.querySelector('.selectedweek').classList.remove('selectedweek')
    document.querySelector(`.${weektoselect}`).classList.add('selectedweek')
}


document.addEventListener('mousemove', (e) => {
    const mouseFollow = document.querySelectorAll('.mousemove');
    const x = e.clientX; //-25 to center div over mouse
    const y = e.clientY;
    for (let i = 0; i < mouseFollow.length; i++) {
        mouseFollow[i].style.setProperty("top", `${y - 75}px`, "important");
        if (hamburgernb == 0) {
            mouseFollow[i].style.setProperty("left", `calc(100% - (100% - ${x}px))`, "important");
        } else {
            mouseFollow[i].style.setProperty("left", `calc(100% - (100% - ${x - 240}px))`, "important");
        }
    }
})
