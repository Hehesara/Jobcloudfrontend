// Check login status on page load
document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem("jobcloud_user"));
    const profileText = document.querySelector(".profile-text");
    const signInBtn = document.querySelector(".sign-in a");
    const signOutBtn = document.querySelector(".dropdown-content a:last-child");

    if (user && user.fullname && user.email) {
        // Update profile with user name
        if (profileText) profileText.textContent = "Hi, " + user.fullname.split(" ")[0];
        
        // Update Sign In to Sign Out in navbar
        if (signInBtn) {
            signInBtn.textContent = "Sign Out";
            signInBtn.href = "#";
            signInBtn.onclick = logout;
        }

        // Add My Applications & Logout to profile dropdown if it exists
        const dropdown = document.querySelector(".dropdown-content");
        if (dropdown) {
            dropdown.innerHTML = `
                <a href="my-applications.html">My Applications</a>
                <a href="#">Settings</a>
                <a href="#" onclick="logout(event)">Sign Out</a>
            `;
        }
    } else if (user) {
        // Fallback for old sessions: If user exists but email is missing, clear it
        localStorage.removeItem("jobcloud_user");
    }
});

// Protect clicks on restricted elements
function checkAuth(event) {
    const user = localStorage.getItem("jobcloud_user");
    if (!user) {
        event.preventDefault();
        alert("Please sign in to access this feature.");
        window.location.href = "login.html";
        return false;
    }
    return true;
}

// Global Logout function
function logout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem("jobcloud_user");
    alert("You have been signed out.");
    window.location.href = "index.html";
}

// Page protection (for sensitive pages)
function protectPage() {
    const user = JSON.parse(localStorage.getItem("jobcloud_user"));
    if (!user || !user.email) {
        window.location.href = "login.html";
    }
}
