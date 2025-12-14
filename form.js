let form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.querySelector("input[type='email']").value;
        let phone = document.querySelector("input[type='tel']").value;

        if (!email.includes("@")) {
            alert("Enter valid email");
            return;
        }

        if (phone.length < 10) {
            alert("Enter valid phone number");
            return;
        }

        // LocalStorage
        localStorage.setItem("email", email);

        alert("Form submitted successfully");
        location.href = "index.html";
    });
}
