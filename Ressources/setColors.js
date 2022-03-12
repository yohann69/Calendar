"use strict";
/*------------------------------------------------
					ADE Calendar
			  ~ Written By @Yohann69 ~
-----------------------v0.1---------------------*/


function setColors (eventname){
    if (eventname.includes("DS")) {
        colorevent = "white";
    }
    if (eventname.includes("Graphes")) {
        colorevent = "green";
    }
    if (eventname.includes("bas niveau")) {
        colorevent = "orange";
    }
    if (eventname.includes("Gestion de projet")) {
        colorevent = "yellowpipi";
    }
    if (eventname.includes("Droit des contrats")) {
        colorevent = "yellow";
    }
    if (eventname.includes("POO")) {
        colorevent = "blue";
    }
    if (eventname.includes("base de données")) {
        colorevent = "red";
    }
    if (eventname.includes("Stat. descr.")) {
        colorevent = "greensapin";
    }
    if (eventname.includes("IHM")) {
        colorevent = "violet";
    }
    if (eventname.includes("Méthodes numériques")) {
        colorevent = "applegreen"
    }







    else{
		colorevent = "defaultcolor"
    }
}