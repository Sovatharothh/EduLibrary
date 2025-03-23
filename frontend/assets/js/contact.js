document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim(),
        };

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                formMessage.textContent = "✅ Message sent successfully!";
                formMessage.style.color = "green";
                contactForm.reset();
            } else {
                formMessage.textContent = `❌ Error: ${data.error || "Something went wrong!"}`;
                formMessage.style.color = "red";
            }
        } catch (error) {
            formMessage.textContent = "❌ Failed to send message. Please try again.";
            formMessage.style.color = "red";
        }

        formMessage.classList.remove("hidden"); // Show message
    });
});
