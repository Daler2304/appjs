

//Поле пароль
document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const toggleIcon = document.getElementById("toggleIcon");
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    toggleIcon.src =
        type === "password"
        ? "static/unvisible.png"
        : "static/visible.png";
    
    toggleIcon.title =
        type === "password"
        ? "Показать пароль"
        : "Скрыть пароль";
});