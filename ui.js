let heading = document.querySelector("h1");
if (heading) {
    heading.style.color = "#1e40af";
}

let list = document.getElementById("courseList");
if (list) {
    let courseArray = ["CSE", "ECE", "MECH", "CIVIL"];
    courseArray.forEach(course => {
        let li = document.createElement("li");
        li.innerText = course;
        list.appendChild(li);
    });
}

let faq = document.getElementById("faq");
let answer = document.getElementById("answer");

if (faq && answer) {
    faq.addEventListener("click", () => {
        answer.style.display =
            answer.style.display === "none" ? "block" : "none";
    });
}

function copyNotice() {
    navigator.clipboard.writeText("Admissions Open!");
    alert("Copied!");
}
