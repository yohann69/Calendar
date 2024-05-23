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


const colorMap = {
    "DS": "white",
    "Graphes": "green",
    "bas niveau": "orange",
    "DROIT": "orange",
    "Cryptographie": "orange",
    "logicielle": "orange",
    "architecture": "orange",
    "décision": "orange",
    "économie": "yellowpipi",
    "Management": "yellowpipi",
    "management": "yellowpipi",
    "Droit des contrats": "yellow",
    "Economie durable et numérique": "yellow",
    "GSI": "yellow",
    "organisations": "yellow",
    "POO": "blue",
    "mobiles": "blue",
    "efficace": "blue",
    "COO": "lightblue",
    "Analyse": "lightblue",
    "objet": "lightblue",
    "Développement avancé": "lightblue",
    "Initiation au développement": "lightblue",
    "Virtualisation": "lightblue",
    "MANAGEMENT": "lightblue",
    "base de données": "red",
    "Programmation multimédia": "red",
    "BDD": "red",
    "Nouvelles BD": "red",
    "SQL": "red",
    "Vue": "red",
    "Stat. descr.": "greensapin",
    "statistiques": "greensapin",
    "INTERNATIONAL": "greensapin",
    "Probabilités": "greensapin",
    "discrètes": "greensapin",
    "Automates": "greensapin",
    "Automatisation": "greensapin",
    "web": "lightpink",
    "Entrepreneuriat": "red",
    "Programmation système": "applegreen",
    "optimisation": "applegreen",
    "Allemand": "applegreen",
    "Méthodes numériques": "applegreen",
    "Maintenance": "applegreen",
    "fondamentaux": "applegreen",
    "Maths": "applegreen",
    "Anglais": "darkblue",
    "ACHAT": "darkblue",
    "PPP": "deepviolet",
    "MARKETING": "violet",
    "IHM": "violet",
    "Communication": "violet",
    "communication": "violet",
    "réseaux": "lightorange",
    "Qualité": "salmon",
    "Programmation avancée": "salmon",
    "Modélisation": "applegreen",
    "Suivi SAE S5": "orange",
};

function setColors(eventname) {
    const normalizedEventName = eventname.toLowerCase();

    for (const key in colorMap) {
        if (normalizedEventName.includes(key.toLowerCase())) {
            colorevent = colorMap[key];
            return;
        }
    }

    colorevent = "defaultcolor";
}
