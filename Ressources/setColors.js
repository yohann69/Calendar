"use strict";
/*------------------------------------------------
					ADE Calendar
			  ~ Written By @Yohann69 ~
-----------------------v0.1---------------------*/

let colorevent = "defaultcolor"

/**
 * Assign automatically a color based on the lesson name
 * Fuction called by displayday()
 * @param {string} eventname name of the lesson
 * 
 * Note: This list of lessons name isn't complete. I'll 
 * 		 add more lessons names during the updates.
 */

function setColors (eventname){

	if (eventname.includes("DS"))                   		colorevent = "white";
	else if (eventname.includes("Graphes"))              	colorevent = "green";
	else if (eventname.includes("bas niveau"))           	colorevent = "orange";
	else if (eventname.includes("DROIT"))        		   	colorevent = "orange";
	else if (eventname.includes("Cryptographie"))          	colorevent = "orange";
	else if (eventname.includes("Gestion de projet")) 		colorevent = "yellowpipi";
	else if (eventname.includes("Management")) 				colorevent = "yellowpipi";
	else if (eventname.includes("Droit des contrats")) 		colorevent = "yellow";
	else if (eventname.includes("POO")) 					colorevent = "blue";
	else if (eventname.includes("efficace")) 				colorevent = "blue";
	else if (eventname.includes("COO")) 					colorevent = "lightblue";
	else if (eventname.includes("Analyse")) 				colorevent = "lightblue";
	else if (eventname.includes("MANAGEMENT")) 				colorevent = "lightblue";
	else if (eventname.includes("base de données")) 		colorevent = "red";
	else if (eventname.includes("SQL")) 					colorevent = "red";
	else if (eventname.includes("Stat. descr.")) 			colorevent = "greensapin";
	else if (eventname.includes("INTERNATIONAL")) 			colorevent = "greensapin";
	else if (eventname.includes("Probabilités")) 			colorevent = "greensapin";
	else if (eventname.includes("IHM")) 					colorevent = "violet";
	else if (eventname.includes("Développement web")) 		colorevent = "violet";
	else if (eventname.includes("MARKETING")) 				colorevent = "violet";
	else if (eventname.includes("Programmation système")) 	colorevent = "applegreen";
	else if (eventname.includes("Allemand")) 				colorevent = "applegreen";
	else if (eventname.includes("Méthodes numériques")) 	colorevent = "applegreen";
	else if (eventname.includes("Maths")) 					colorevent = "applegreen";
	else if (eventname.includes("Anglais")) 				colorevent = "darkblue";
	else if (eventname.includes("ACHAT")) 					colorevent = "darkblue";
	else if (eventname.includes("PPP")) 					colorevent = "deepviolet";
	else if (eventname.includes("Communication")) 			colorevent = "lightpink";
	else if (eventname.includes("réseaux")) 				colorevent = "lightorange";
	else if (eventname.includes("Qualité")) 				colorevent = "salmon";


	else colorevent = "defaultcolor"
}