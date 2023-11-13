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
 *         add more lessons names during the updates.
 */

function setColors(eventname) {

    if (eventname.includes("DS")) colorevent = "white";
    else if (eventname.includes("Graphes")) colorevent = "green";
    else if (eventname.includes("bas niveau")) colorevent = "orange";
    else if (eventname.includes("DROIT")) colorevent = "orange";
    else if (eventname.includes("Cryptographie")) colorevent = "orange";
    else if (eventname.includes("logicielle")) colorevent = "orange";
    else if (eventname.includes("Cryptographie")) colorevent = "orange";
    else if (eventname.includes("architecture")) colorevent = "orange";
    else if (eventname.includes("décision")) colorevent = "orange";
    else if (eventname.includes("économie")) colorevent = "yellowpipi";
    else if (eventname.includes("Management")) colorevent = "yellowpipi";
    else if (eventname.includes("management")) colorevent = "yellowpipi";
    else if (eventname.includes("Droit des contrats")) colorevent = "yellow";
    else if (eventname.includes("Economie durable et numérique")) colorevent = "yellow";
    else if (eventname.includes("GSI")) colorevent = "yellow";
    else if (eventname.includes("organisations")) colorevent = "yellow";
    else if (eventname.includes("POO")) colorevent = "blue";
    else if (eventname.includes("mobiles")) colorevent = "blue";
    else if (eventname.includes("efficace")) colorevent = "blue";
    else if (eventname.includes("COO")) colorevent = "lightblue";
    else if (eventname.includes("Analyse")) colorevent = "lightblue";
    else if (eventname.includes("objet")) colorevent = "lightblue";
    else if (eventname.includes("Initiation au développement")) colorevent = "lightblue";
    else if (eventname.includes("Virtualisation")) colorevent = "lightblue";
    else if (eventname.includes("MANAGEMENT")) colorevent = "lightblue";
    else if (eventname.includes("base de données")) colorevent = "red";
    else if (eventname.includes("Programmation multimédia")) colorevent = "red";
    else if (eventname.includes("BDD")) colorevent = "red";
    else if (eventname.includes("Nouvelles BD")) colorevent = "red";
    else if (eventname.includes("SQL")) colorevent = "red";
    else if (eventname.includes("Vue")) colorevent = "red";
    else if (eventname.includes("Stat. descr.")) colorevent = "greensapin";
    else if (eventname.includes("statistiques")) colorevent = "greensapin";
    else if (eventname.includes("INTERNATIONAL")) colorevent = "greensapin";
    else if (eventname.includes("Probabilités")) colorevent = "greensapin";
    else if (eventname.includes("discrètes")) colorevent = "greensapin";
    else if (eventname.includes("Automates")) colorevent = "greensapin";
    else if (eventname.includes("Automatisation")) colorevent = "greensapin";
    else if (eventname.includes("web")) colorevent = "lightpink";
    else if (eventname.includes("Programmation système")) colorevent = "applegreen";
    else if (eventname.includes("optimisation")) colorevent = "applegreen";
    else if (eventname.includes("Allemand")) colorevent = "applegreen";
    else if (eventname.includes("Méthodes numériques")) colorevent = "applegreen";
    else if (eventname.includes("fondamentaux")) colorevent = "applegreen";
    else if (eventname.includes("Maths")) colorevent = "applegreen";
    else if (eventname.includes("Anglais")) colorevent = "darkblue";
    else if (eventname.includes("ACHAT")) colorevent = "darkblue";
    else if (eventname.includes("PPP")) colorevent = "deepviolet";
    else if (eventname.includes("MARKETING")) colorevent = "violet";
    else if (eventname.includes("IHM")) colorevent = "violet";
    else if (eventname.includes("Communication")) colorevent = "violet";
    else if (eventname.includes("communication")) colorevent = "violet";
    else if (eventname.includes("réseaux")) colorevent = "lightorange";
    else if (eventname.includes("Qualité")) colorevent = "salmon";
    else if (eventname.includes("Programmation avancée")) colorevent = "salmon";


    else colorevent = "defaultcolor"
}