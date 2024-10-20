function showList() {
    const subApp = document.getElementById("sub-app");
    if (subApp.style.display === "flex") {
        subApp.style.display = "none";
    } else {
        subApp.style.display = "flex";
    }
}

function setUnderline(lang) {
    const enElement = document.getElementById("lang-en");
    const ruElement = document.getElementById("lang-ru");

    fetch("lang.json") // Укажите правильный путь к вашему файлу
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // Обновление текста на основе выбранного языка
            document.querySelector(".rasp").textContent = data[lang].timetable;
            document.querySelector(".main-app p").textContent =
                data[lang].current_year;
            document.querySelector(
                ".footer-list a:nth-child(1) li"
            ).textContent = data[lang].administration;
            document.querySelector(
                ".footer-list a:nth-child(2) li"
            ).textContent = data[lang].contacts;
            document.querySelector(
                ".footer-list a:nth-child(3) li"
            ).textContent = data[lang].offsite;
            document.querySelector(
                ".footer-list a:nth-child(4) li"
            ).textContent = data[lang].more;
            document.querySelector(".footer-3").textContent =
                data[lang].footer_text;

            // Обновление групп
            const groupElements = document.querySelectorAll(".groups");
            const groups = data[lang].groups;
            groupElements.forEach((element, index) => {
                element.textContent = groups[index];
            });
        })
        .catch((error) => {
            console.error("Error fetching JSON:", error);
        });

    // Установка выделения для языка
    if (lang === "en") {
        ruElement.style.textDecoration = "none";
        enElement.style.textDecoration = "underline";
    } else if (lang === "ru") {
        ruElement.style.textDecoration = "underline";
        enElement.style.textDecoration = "none";
    }
}

function updateGroupDisplay() {
    const groups = document.querySelectorAll(".groups");
    const viewportWidth = window.innerWidth;

    // Check if the screen width is below or equal to 360px
    if (viewportWidth) {
        groups.forEach((group) => {
            group.style.display = "flex";
        });
    } else {
        groups.forEach((group) => {
            group.style.display = "none";
        });
    }
}

// Trigger on page load
window.addEventListener("load", updateGroupDisplay);

// Trigger when the window is resized
window.addEventListener("resize", updateGroupDisplay);
