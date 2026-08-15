const $btn = $("#birth-start-btn")
const $main = $(".main")
let typedStarted = false
let messageTimer = null
const birthdayMessages = [
    "Sending hickeys",
    "Hope you get shorter and hotter every day",
    "finally… Luv youu",
    "hahah — just as a friend",
    "mmm… maybe more than a friend at last",
]

$(document).ready(function () {
    $btn.text("Open your birthday cup")
    $btn.prop("disabled", false)
    $btn.click(pageRender)
    $("#heart-button").click(function (event) {
        burstHearts(event.clientX, event.clientY, 12)
        openMessagePopup()
    })
    $("#popup-close").click(closeMessagePopup)
    $("#message-overlay").click(function (event) {
        if (event.target === this) closeMessagePopup()
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
        })
    }
}

function openMessagePopup() {
    const overlay = document.getElementById("message-overlay")
    overlay.classList.remove("is-flying")
    void overlay.offsetWidth
    overlay.classList.add("is-flying", "is-open")
    overlay.setAttribute("aria-hidden", "false")
    clearTimeout(messageTimer)
    let index = 0
    const typeNext = () => {
        if (index >= birthdayMessages.length) return
        typeMessage(birthdayMessages[index], () => {
            index += 1
            messageTimer = setTimeout(typeNext, 1100)
        })
    }
    setTimeout(typeNext, 850)
}

function typeMessage(message, onDone) {
    const target = document.getElementById("typing-message")
    target.textContent = ""
    let character = 0
    const type = () => {
        target.textContent = message.slice(0, character)
        character += 1
        if (character <= message.length) setTimeout(type, 48)
        else onDone()
    }
    type()
}

function closeMessagePopup() {
    const overlay = document.getElementById("message-overlay")
    overlay.classList.remove("is-open", "is-flying")
    overlay.setAttribute("aria-hidden", "true")
    clearTimeout(messageTimer)
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
