const $btn = $("#birth-start-btn")
const $main = $(".main")
let typedStarted = false

$(document).ready(function () {
    $btn.text("Open your birthday cup")
    $btn.prop("disabled", false)
    $btn.click(pageRender)
    $("#heart-button").click(function (event) {
        burstHearts(event.clientX, event.clientY, 12)
    })
})

function pageRender() {
    $(".birth-cover-container").fadeOut(700)
    $main.fadeIn(800)
    const audio = $(".song")[0]
    if (audio) audio.play().catch(() => {})
    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 22)
    if (!typedStarted) {
        typedStarted = true
        new Typed("#typed", {
            strings: ["hbd iced coffee"],
            typeSpeed: 48,
            showCursor: true,
            onComplete: revealBirthdayLines,
        })
    }
}

function revealBirthdayLines() {
    const lines = document.querySelectorAll(".reveal-line")
    lines.forEach((line, index) => {
        setTimeout(() => line.classList.add("is-visible"), index * 1500)
    })
}

function burstHearts(x, y, count) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement("span")
        heart.className = `heart-pop${i % 3 === 0 ? " blue" : ""}`
        heart.textContent = i % 4 === 0 ? "♥" : "❤"
        heart.style.left = `${x + (Math.random() * 120 - 60)}px`
        heart.style.top = `${y + (Math.random() * 50 - 25)}px`
        heart.style.animationDelay = `${Math.random() * 0.25}s`
        heart.style.fontSize = `${20 + Math.random() * 22}px`
        document.body.appendChild(heart)
        setTimeout(() => heart.remove(), 1800)
    }
}

setInterval(() => {
    if ($main.is(":visible")) {
        burstHearts(Math.random() * window.innerWidth, window.innerHeight - 30, 2)
    }
}, 2800)
