window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuToggle.textContent = "×";
    } else {
        menuToggle.textContent = "☰";
    }

});


// Close mobile menu after clicking a link

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

    });

});


// ==========================================
// CONTACT FORM
// ==========================================

const contactOpen = document.querySelector("#contact-open");
const contactForm = document.querySelector("#contact-form");


// Open / close contact form

contactOpen.addEventListener("click", () => {

    contactForm.classList.toggle("active");

    if (contactForm.classList.contains("active")) {

        contactOpen.textContent = "Hide form ↑";

    } else {

        contactOpen.textContent = "Start a conversation →";

    }

});


// ==========================================
// FORM ELEMENTS
// ==========================================

const form = document.querySelector("#contact-form");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const successMessage = document.querySelector(".form-success");


// ==========================================
// FORM SUBMISSION
// ==========================================

form.addEventListener("submit", (event) => {

    event.preventDefault();

    let isValid = true;


    // ==========================================
    // NAME VALIDATION
    // ==========================================

    if (nameInput.value.trim() === "") {

        nameInput.nextElementSibling.textContent =
            "Please enter your name.";

        nameInput.classList.add("error");

        isValid = false;

    } else {

        nameInput.nextElementSibling.textContent = "";

        nameInput.classList.remove("error");

    }


    // ==========================================
    // EMAIL VALIDATION
    // ==========================================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value.trim())) {

        emailInput.nextElementSibling.textContent =
            "Please enter a valid email.";

        emailInput.classList.add("error");

        isValid = false;

    } else {

        emailInput.nextElementSibling.textContent = "";

        emailInput.classList.remove("error");

    }


    // ==========================================
    // MESSAGE VALIDATION
    // ==========================================

    if (messageInput.value.trim() === "") {

        messageInput.nextElementSibling.textContent =
            "Please tell us about your project.";

        messageInput.classList.add("error");

        isValid = false;

    } else {

        messageInput.nextElementSibling.textContent = "";

        messageInput.classList.remove("error");

    }


    // ==========================================
    // SEND FORM
    // ==========================================

    if (isValid) {

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };


        fetch("/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(formData)

        })

        .then((response) => response.json())

        .then((data) => {

            if (data.success) {

                successMessage.classList.add("active");

                form.reset();

            }

        })

        .catch((error) => {

            console.error("Error:", error);

        });

    }

});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

});


revealElements.forEach((element) => {

    observer.observe(element);

});

setTimeout(() => {
    window.scrollTo(0, 0);
}, 500);