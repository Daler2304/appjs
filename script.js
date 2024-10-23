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

    fetch("/lang.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // Обновляем тексты на странице на выбранный язык
            document.querySelector(".rasp").textContent = data[lang].timetable;
            document.querySelector(".main-app p").textContent =
                data[lang].timetable;

            // Обновляем все элементы footer
            const footerItems = document.querySelectorAll(".footer-list li");
            footerItems[0].textContent = data[lang].admin;
            footerItems[1].textContent = data[lang].contacts;
            footerItems[2].textContent = data[lang].offsite;
            footerItems[3].textContent = data[lang].more;
            // Обновляем текст футера
            document.querySelector(".footer-3").textContent =
                data[lang].footer_text;

            // Обновляем группы
            const groupElements = document.querySelectorAll(".groups");
            const groups = data[lang].groups;
            groupElements.forEach((element, index) => {
                element.textContent = groups[index];
            });
        })
        .catch((error) => {
            console.error("Error fetching JSON:", error);
        });

    // Устанавливаем подчеркивание для выбранного языка
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
