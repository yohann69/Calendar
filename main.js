"use strict";
/*------------------------------------------------
					ADE Calendar
			  ~ Written By @Yohann69 ~
-----------------------v0.1---------------------*/

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
	
	if (testcalendar[0] == "<!DOCTYPE html>") {
		document.querySelector('.alert-critical').classList.remove('hidden');
	} else {
		document.querySelector('.alert-critical').classList.add('hidden');
		document.querySelector('.titlelogin').innerHTML="No de ressource valide :)";
		console.log("lets go (bon il reste encore beaucoup a coder mais ça avance :)");
	}

}

function closecriticalalert(){
	document.querySelector('.alert-critical').classList.add('hidden');
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
