
"use strict";

// Confirm that JavaScript is connected correctly.
document.addEventListener("DOMContentLoaded", function () {
    console.log("Ubuntu Givers JavaScript is working!");
});


"use strict";

// Confirm that JavaScript is connected correctly.
document.addEventListener("DOMContentLoaded", function () {
    console.log("Ubuntu Givers JavaScript is working!");
});

// Search and filter community programmes.
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("programmeSearch");
    const programmes = document.querySelectorAll(".programme-card");
    const searchMessage = document.getElementById("searchMessage");

    if (!searchInput || programmes.length === 0 || !searchMessage) {
        return;
    }

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        programmes.forEach(function (programme) {
            const programmeText = programme.textContent.toLowerCase();
            const matches = programmeText.includes(searchTerm);

            programme.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        if (visibleCount === 0) {
            searchMessage.textContent = "No programmes found. Try another search.";
        } else if (searchTerm === "") {
            searchMessage.textContent = "Showing all " + visibleCount + " programmes.";
        } else {
            searchMessage.textContent = "Showing " + visibleCount + " matching programme(s).";
        }
    });
});


/* Frequently Asked Questions accordion */
document.addEventListener("DOMContentLoaded", function () {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const answer = question.nextElementSibling;
            const isExpanded = question.getAttribute("aria-expanded") === "true";

            question.setAttribute("aria-expanded", String(!isExpanded));
            answer.hidden = isExpanded;
        });
    });
});


/* Enquiry form validation */
document.addEventListener("DOMContentLoaded", function () {
    const enquiryForm = document.getElementById("enquiryForm");
    const feedback = document.getElementById("enquiryFeedback");

    if (!enquiryForm || !feedback) {
        return;
    }

    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            feedback.textContent = "Please correct the highlighted fields and try again.";
            return;
        }

        const fullName = document.getElementById("name").value.trim();
const enquiryType = document.getElementById("enquiry-type").value;

let responseMessage = "";

if (enquiryType === "volunteer") {
    responseMessage =
        "Thank you for your interest in volunteering with Ubuntu Givers. " +
        "Volunteer opportunities and availability would need to be confirmed by the organisation.";
} else if (enquiryType === "sponsor") {
    responseMessage =
        "Thank you for your interest in sponsoring Ubuntu Givers. " +
        "Sponsorship arrangements, costs and opportunities would need to be discussed with the organisation.";
} else {
    responseMessage =
        "Thank you for contacting Ubuntu Givers. " +
        "Please use our Contact page to prepare an email with your enquiry.";
}

enquiryForm.reset();

feedback.textContent =
    "Thank you, " + fullName + "! " + responseMessage +
    " Please note: this demonstration does not send or store your enquiry.";

feedback.hidden = false;
feedback.style.display = "block";
feedback.style.color = "#245c32";
feedback.style.backgroundColor = "#f5f8f2";
feedback.style.border = "1px solid #81a881";
feedback.style.padding = "12px";
feedback.style.marginTop = "15px";

    });
});

/* Contact form validation and email preparation */
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const feedback = document.getElementById("contactFeedback");

    if (!contactForm || !feedback) {
        return;
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            feedback.textContent =
                "Please correct the highlighted fields and try again.";
            return;
        }

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const messageType = document.getElementById("message-type").value;
        const message = document.getElementById("contact-message").value.trim();

        if (name.length < 2 || message.length < 10) {
            feedback.textContent =
                "Please enter a valid name and a message of at least 10 characters.";
            return;
        }

        const recipient = "info@ubuntugivers.org.za";
        const subject = encodeURIComponent(
            messageType + " from " + name
        );

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\nMessage type: " + messageType +
            "\n\nMessage:\n" + message
        );

        feedback.textContent =
            "Your message has been validated. Your email application will open so you can review and send it.";

        window.location.href =
            "mailto:" + recipient +
            "?subject=" + subject +
            "&body=" + body;
    });
});
