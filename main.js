"use strict";
/*------------------------------------------------
					ADE Calendar
			  ~ Written By @Yohann69 ~
-----------------------v0.1---------------------*/
const axios = require('axios').default;
const fs = require('fs');
const { listenerCount } = require('process');
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});




rl.question("Veuillez entrer votre numéro de ressource: ", function (noressource) {

	axios.get(`https://intranet.iut-valence.fr/ICS_ADE/${noressource}.ics`)
		.then(function (response) {
			var calendar = response.data.split('\n');
			var line0 = calendar[0];
			if(line0 == 'BEGIN:VCALENDAR'){
				console.log("Première ligne");
			}else{
				console.log("C'est pas un fichier calendar")
			}
			// handle success
			// console.log(response.data);

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

		})
		.catch(function (error) {
			// handle error
			console.log("✋ Le numéro de ressource est invalide")
		});
	rl.close();
});
