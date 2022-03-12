"use strict";
/*------------------------------------------------
					ADE Calendar
			  ~ Written By @Yohann69 ~
-----------------------v0.1---------------------*/

let colorevent = "defaultcolor"

function setColors (eventname){

	if (eventname.includes("DS"))                   		colorevent = "white";
	else if (eventname.includes("Graphes"))              	colorevent = "green";
	else if (eventname.includes("bas niveau"))           	colorevent = "orange";
	else if (eventname.includes("Gestion de projet")) 		colorevent = "yellowpipi";
	else if (eventname.includes("Droit des contrats")) 		colorevent = "yellow";
	else if (eventname.includes("POO")) 					colorevent = "blue";
	else if (eventname.includes("COO")) 					colorevent = "lightblue";
	else if (eventname.includes("base de données")) 		colorevent = "red";
	else if (eventname.includes("Stat. descr.")) 			colorevent = "greensapin";
	else if (eventname.includes("IHM")) 					colorevent = "violet";
	else if (eventname.includes("Méthodes numériques")) 	colorevent = "applegreen";


	else colorevent = "defaultcolor"
}