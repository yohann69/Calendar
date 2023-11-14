async function godMode() {
    if (window.location.href.includes("godMode=true") && !window.location.href.includes("ressource=") && !document.cookie.includes("ressource=") || document.cookie.includes("godMode=")) {

        console.log("GodMode Activated")

        let res = await fetch(`https://apiade.chavanel.eu.org/listTeachers`)
        let data = await res.json()

        let whereToAdd = document.querySelector(".ddlist>datalist")

        let option = document.createElement("option")
        option.value = "╭─━─╯ Enseignants ╰─━─╮"
        whereToAdd.appendChild(option)

        data.forEach(teacher => {
            let option = document.createElement("option")
            option.value = teacher.resourceNumber
            option.innerHTML = teacher.name
            whereToAdd.appendChild(option)
        })

        // Add godMode=true in the cookies
        document.cookie += `godMode=true; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }
}
