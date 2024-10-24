document.getElementById("signupForm").addEventListener("submit", function(event) {
    const password = document.getElementById("password").value;
    const errorElement = document.getElementById("password-error");

    // Regular expression to check for sequences like "12345678", "abcdefg", etc.
    const simplePatterns = /^(?:12345678|abcdefg|password|qwerty|000000|111111)$/i;

    if (password.length < 6) {
        errorElement.textContent = "Password must be at least 6 characters long.";
        errorElement.style.color = "red";
        event.preventDefault(); // Prevent form submission
    } else if (simplePatterns.test(password)) {
        errorElement.textContent = "Password cannot be a simple pattern like '12345678' or 'abcdefg'.";
        errorElement.style.color = "red";
        event.preventDefault(); // Prevent form submission
    } else {
        errorElement.textContent = ""; // Clear any previous error message
    }
});
