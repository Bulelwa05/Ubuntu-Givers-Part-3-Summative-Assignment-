"use strict";

// Confirm that JavaScript is connected correctly.
document.addEventListener("DOMContentLoaded", function () {
    console.log("Ubuntu Givers JavaScript is working!");
});


// Confirm that JavaScript is connected correctly.
document.addEventListener("DOMContentLoaded", function () {
    console.log("Ubuntu Givers JavaScript is working!");
});

// Part 3: Dynamically load, search and sort community programmes.

document.addEventListener("DOMContentLoaded", function () {
    const programmeContainer = document.getElementById("programmeContainer");
    const searchInput = document.getElementById("programmeSearch");
    const searchMessage = document.getElementById("searchMessage");
    const sortSelect = document.getElementById("programmeSort");

    if (!programmeContainer || !searchInput || !searchMessage || !sortSelect) {
        return;
    }

    const programmes = [
        {
            title: "Education Support Programme",
            description: "This programme provides after-school tutoring, homework support, and educational resources to learners who need additional academic assistance."
        },
        {
            title: "Food Relief Initiative",
            description: "The Food Relief Initiative provides food parcels and community meals to families and individuals experiencing food insecurity."
        },
        {
            title: "Digital Skills Academy",
            description: "The Digital Skills Academy introduces community members to basic computer skills, digital literacy, and technology awareness."
        },
        {
            title: "Youth Leadership and Mentorship",
            description: "This programme provides young people with mentorship, career guidance, leadership development, and personal development opportunities."
        },
        {
            title: "Community Development Projects",
            description: "Community development projects include donation drives, seasonal outreach campaigns, and initiatives designed to improve local community spaces."
        }
    ];

    programmes.forEach(function (programme) {
        const card = document.createElement("section");
        card.className = "programme-card";

        const heading = document.createElement("h3");
        heading.textContent = programme.title;

        const description = document.createElement("p");
        description.textContent = programme.description;

        card.appendChild(heading);
        card.appendChild(description);
        programmeContainer.appendChild(card);
    });

    const cards = Array.from(
        programmeContainer.querySelectorAll(".programme-card")
    );

    function updateProgrammes() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const sortOrder = sortSelect.value;

        const sortedCards = [...cards];

        if (sortOrder === "ascending") {
            sortedCards.sort((a, b) =>
                a.querySelector("h3").textContent.localeCompare(
                    b.querySelector("h3").textContent
                )
            );
        } else if (sortOrder === "descending") {
            sortedCards.sort((a, b) =>
                b.querySelector("h3").textContent.localeCompare(
                    a.querySelector("h3").textContent
                )
            );
        }

        sortedCards.forEach(function (card) {
            card.hidden = !card.textContent.toLowerCase().includes(searchTerm);
            programmeContainer.appendChild(card);
        });

        const visibleCount = sortedCards.filter(card => !card.hidden).length;

        if (visibleCount === 0) {
            searchMessage.textContent = "No programmes found. Try another search.";
        } else if (searchTerm === "") {
            searchMessage.textContent = "Showing all " + visibleCount + " programmes.";
        } else {
            searchMessage.textContent = "Showing " + visibleCount + " matching programme(s).";
        }
    }

    searchInput.addEventListener("input", updateProgrammes);
    sortSelect.addEventListener("change", updateProgrammes);

    updateProgrammes();
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

/* Enquiry form validation and AJAX submission */
document.addEventListener("DOMContentLoaded", function () {
    const enquiryForm = document.getElementById("enquiryForm");
    const feedback = document.getElementById("enquiryFeedback");

    if (!enquiryForm || !feedback) {
        return;
    }

    enquiryForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            feedback.textContent =
                "Please correct the highlighted fields and try again.";
            return;
        }

        const fullName = document.getElementById("name").value.trim();
        const enquiryType = document.getElementById("enquiry-type").value;

        feedback.textContent = "Submitting your enquiry...";

        try {
            const response = await fetch(enquiryForm.action, {
                method: "POST",
                body: new FormData(enquiryForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Submission failed.");
            }

            let responseMessage = "";

            if (enquiryType === "volunteer") {
                responseMessage =
                    "Thank you for your interest in volunteering with Ubuntu Givers.";
            } else if (enquiryType === "sponsor") {
                responseMessage =
                    "Thank you for your interest in sponsoring Ubuntu Givers.";
            } else {
                responseMessage =
                    "Thank you for contacting Ubuntu Givers.";
            }

            enquiryForm.reset();

            feedback.textContent =
                "Thank you, " + fullName + "! " + responseMessage +
                " Your enquiry has been submitted successfully.";

        } catch (error) {
            feedback.textContent =
                "Sorry, your enquiry could not be submitted. Please try again.";
        }
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

// Part 3: Image gallery lightbox

document.addEventListener("DOMContentLoaded", function () {
    const galleryImages = document.querySelectorAll(".gallery-image img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    if (!lightbox || !lightboxImage || !closeLightbox) {
        return;
    }

    galleryImages.forEach(function (image) {
        image.parentElement.addEventListener("click", function () {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.hidden = false;
        });
    });

    closeLightbox.addEventListener("click", function () {
        lightbox.hidden = true;
        lightboxImage.src = "";
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.hidden = true;
            lightboxImage.src = "";
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            lightbox.hidden = true;
            lightboxImage.src = "";
        }
    });
});
