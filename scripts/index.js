let btn = document.getElementById("button")
let username = document.getElementById("username")
let radioBtns = document.querySelectorAll("input[name='radioButton']")
btn.addEventListener("click", e => {
    if (username.value.length < 1) {
        window.alert("ENTER USERNAME")
    }

    let radioBtn = [...radioBtns].filter(e => {
        return e.checked
    })[0]

    if (radioBtn == undefined) {
        window.alert("SELECT A STYLE")
    }

    let style = radioBtn.value
})