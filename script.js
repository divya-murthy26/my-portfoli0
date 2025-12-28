document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. Profile Image Upload & Preview ---
    const imageUpload = document.getElementById("imageUpload");
    const profileImage = document.getElementById("profileImage");

    // Load saved image from LocalStorage if available
    const savedImage = localStorage.getItem("portfolioProfileImage");
    if (savedImage) {
        profileImage.src = savedImage;
    }

    imageUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Update image source
                profileImage.src = e.target.result;
                // Save to LocalStorage (Simulating persistence)
                localStorage.setItem("portfolioProfileImage", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // --- 2. Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% of element is visible
    });

    revealElements.forEach((el) => revealOnScroll.observe(el));

    // --- 3. Contact Form Validation ---
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent actual submission

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Basic Email Regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Simulate success
        alert(`Thank you, ${name}! Your message has been sent.`);
        contactForm.reset();
    });

    // --- 4. Navbar Active State on Scroll ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((li) => {
            li.classList.remove("active");
            if (li.getAttribute("href").includes(current)) {
                li.classList.add("active");
            }
        });
    });
});
