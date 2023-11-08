async function godMode() {
    if (window.location.href.includes("godMode=true") && !window.location.href.includes("ressource=") && !document.cookie.includes("ressource=")) {

        console.log("GodMode Activated")

        let res = await fetch(`https://calendar-backend-production-c04d.up.railway.app/listTeachers`)
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
    }
}
