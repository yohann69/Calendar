async function godMode() {
    const isGodModeEnabled = window.location.href.includes("godMode=true") && !window.location.href.includes("ressource=") && !document.cookie.includes("ressource=") || document.cookie.includes("godMode=");

    if (isGodModeEnabled) {
        console.log("GodMode Activated");

        try {
            const res = await fetch("https://apiade.chavanel.eu.org/listTeachers");
            const data = await res.json();

            const whereToAdd = document.querySelector(".ddlist > datalist");

            // Add a separator option
            const separatorOption = document.createElement("option");
            separatorOption.value = "╭─━─╯ Enseignants ╰─━─╮";
            whereToAdd.appendChild(separatorOption);

            data.forEach(teacher => {
                const option = document.createElement("option");
                option.value = teacher.resourceNumber;
                option.innerHTML = teacher.name;
                whereToAdd.appendChild(option);
            });

            // Add godMode=true to the cookies
            document.cookie += "godMode=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        } catch (error) {
            console.error("Error fetching teacher data:", error);
        }
    }
}
