// BASIC JAVASCRIPT FUNDAMENTALS

let collegeName = "SJC Institute of Technology";
let year = 1986;
let admissionOpen = true;

let courses = ["CSE", "ECE", "MECH", "CIVIL"];

let college = {
    name: collegeName,
    established: year
};

let selectedCourse = null;
let tempValue;

// Show alert only on index page
if (
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname === "/" ||
  window.location.pathname === ""
) {
  alert("Welcome to " + collegeName);
}

// BOM usage
console.log("Screen Width:", screen.width);
console.log("Online Status:", navigator.onLine);

setTimeout(() => {
    alert("Admissions closing soon!");
}, 55000);

if (window.matchMedia("(max-width:768px)").matches) {
    console.log("Mobile View");
}

