// Array to store unique email addresses
const uniqueEmails = [];

// Function to notify the user and save email to the backend
function notifyMe() {
    const email = document.getElementById("email-input").value;
    const errorMessageElement = document.getElementById("error-message");
    const successMessageElement = document.getElementById("success-message");

    // Reset the error and success messages
    errorMessageElement.style.display = "none";
    errorMessageElement.textContent = "";
    successMessageElement.style.display = "none"; // Hide success message initially
    successMessageElement.textContent = "";

    if (validateEmail(email)) {
        // Check if the email is already in the uniqueEmails array
        if (uniqueEmails.includes(email)) {
            errorMessageElement.style.display = "block";
            errorMessageElement.textContent = "This email address has already been entered";
            return;
        }

        const emailRequest = {
            email_address: email
        };

        fetch("http://localhost:8081/notify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emailRequest)
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error while saving the email');
            }
        })
        .then(data => {
            console.log(data);
            // Display success message
            successMessageElement.style.display = "block";
            successMessageElement.textContent = "Email saved successfully!";
            successMessageElement.style.color = "green"; // Set text color to green
            // Add the email to the uniqueEmails array
            uniqueEmails.push(email);
        })
        .catch(error => {
            console.error("Error:", error);
            errorMessageElement.style.display = "block";
            errorMessageElement.textContent = "Error while saving the email. Please try again.";
        });

        document.getElementById("email-input").value = "";
    } else {
        errorMessageElement.style.display = "block";
        errorMessageElement.textContent = "Please enter a valid email address.";
    }
}

// Email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

// Event listener for Notify Me button
document.getElementById("notify-button").addEventListener("click", notifyMe);

// Function to open WhatsApp chat
function openWhatsApp() {
    window.open("https://wa.me/1234567890", "_blank");
}

// Function to open Instagram page
function openInstagram() {
    window.open("https://www.instagram.com", "_blank");
}
