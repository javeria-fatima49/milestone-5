// const form = document.getElementById('resumeForm') as HTMLFormElement;
// const resumeContainer = document.getElementById('resumeContainer') as HTMLElement;
// const displayName = document.getElementById('displayName') as HTMLElement;
// const displayEmail = document.getElementById('displayEmail') as HTMLElement;
// const displayEducation = document.getElementById('displayEducation') as HTMLElement;
// const displayExperience = document.getElementById('displayExperience') as HTMLElement;
// const displaySkills = document.getElementById('displaySkills') as HTMLElement;
// const downloadHtmlBtn = document.getElementById('downloadHtml') as HTMLButtonElement;
// const shareLinkBtn = document.getElementById('shareLink') as HTMLButtonElement;
// const sharedLinkContainer = document.getElementById('sharedLinkContainer') as HTMLElement;
// const sharedLink = document.getElementById('sharedLink') as HTMLAnchorElement;
// DOM Elements
var resumeDisplay = document.getElementById("resumeDisplay");
var editButton = document.getElementById("editResume");
var downloadButton = document.getElementById("downloadResume");
var shareButton = document.getElementById("shareResume");
var saveButton = document.getElementById("saveChanges");
var cancelButton = document.getElementById("cancelEdit");
var resumeContainer = document.getElementById("resumeContainer");
var imageInput = document.getElementById("editImage");
var profilePic = document.getElementById("profilePic");
// Form Elements
var nameInput = document.getElementById("editName");
var emailInput = document.getElementById("editEmail");
var phoneInput = document.getElementById("editPhone");
var educationInput = document.getElementById("editEducation");
var skillsInput = document.getElementById("editSkills");
var workExperienceInput = document.getElementById("editWorkExperience");
var projectsInput = document.getElementById("editProjects");
var contactInput = document.getElementById("editContact");
// Shared link elements for resume sharing
var sharedLinkElement = document.getElementById("sharedLink");
var sharedLinkContainer = document.getElementById("sharedLinkContainer");
// Initial resume data
var resumeData = {
    name: "JAVERIA FATIMA",
    email: "example@gmail.com",
    phone: "0000000000",
    education: "your qualification",
    skills: "example: JavaScript, TypeScript, HTML, CSS",
    workExperience: [
        "Built an interactive resume builder",
        "Designed and deployed a personal portfolio on GitHub and Vercel.",
    ],
    projects: "Resume Builder - Five different versions showcasing modern UI/UX design.",
    contact: {
        email: "example@gmail.com",
        phone: "0000000000",
        linkedin: "https://www.linkedin.com/in/javeria-fatima-5414a330b",
    },
};
// Class to handle resume sharing
var ResumeShare = /** @class */ (function () {
    function ResumeShare() {
    }
    // Method to handle sharing the resume
    ResumeShare.prototype.handleShare = function () {
        var data = this.getFormData(); // Extract data from the form or fields
        var resumeId = this.saveResume(data); // Function to save the resume and get an ID
        // Generate a shareable link using the resume ID
        var shareableLink = "".concat(window.location.origin).concat(window.location.pathname, "?id=").concat(resumeId);
        // Display the link
        if (sharedLinkElement && sharedLinkContainer) {
            sharedLinkElement.href = shareableLink; // Set the link's href
            sharedLinkElement.textContent = shareableLink; // Set the text content to the shareable link
            sharedLinkContainer.style.display = "block"; // Make the container visible to the user
        }
    };
    // Collect data from the form or fields
    ResumeShare.prototype.getFormData = function () {
        return {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            education: educationInput.value,
            skills: skillsInput.value,
            workExperience: workExperienceInput.value.split("\n").filter(function (item) { return item.trim() !== ""; }),
            projects: projectsInput.value,
            contact: {
                email: "", // Placeholder, adjust as needed
                phone: "", // Placeholder, adjust as needed
                linkedin: "", // Placeholder, adjust as needed
            },
        };
    };
    // Save the resume data and return a unique resume ID
    ResumeShare.prototype.saveResume = function (data) {
        var resumeId = "resume-".concat(Math.random().toString(36).slice(2, 9));
        // Save the resume data (you can replace this with logic for saving to a backend, localStorage, etc.)
        // Example saving to localStorage:
        // localStorage.setItem(resumeId, JSON.stringify(data));
        return resumeId;
    };
    return ResumeShare;
}());
// Instantiate the ResumeShare class
var resumeShare = new ResumeShare();
// Trigger share functionality when the button is clicked
shareButton.addEventListener("click", function () {
    resumeShare.handleShare();
});
// Edit Mode Toggle
editButton.addEventListener("click", function () {
    resumeContainer.classList.remove("hidden");
    saveButton.classList.remove("hidden");
    cancelButton.classList.remove("hidden");
    editButton.classList.add("hidden");
    // Populate form fields
    nameInput.value = resumeData.name;
    emailInput.value = resumeData.email;
    phoneInput.value = resumeData.phone;
    educationInput.value = resumeData.education;
    skillsInput.value = resumeData.skills;
    workExperienceInput.value = resumeData.workExperience.join("\n");
    projectsInput.value = resumeData.projects;
    contactInput.value = "Email: ".concat(resumeData.contact.email, "\nPhone: ").concat(resumeData.contact.phone, "\nLinkedIn: ").concat(resumeData.contact.linkedin);
});
// Save Changes
saveButton.addEventListener("click", function () {
    resumeData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        education: educationInput.value,
        skills: skillsInput.value,
        workExperience: workExperienceInput.value.split("\n").filter(function (item) { return item.trim() !== ""; }),
        projects: projectsInput.value,
        contact: {
            email: resumeData.contact.email,
            phone: resumeData.contact.phone,
            linkedin: resumeData.contact.linkedin,
        },
    };
    updateDisplay();
    exitEditMode();
});
// Cancel Edit
cancelButton.addEventListener("click", exitEditMode);
// Helper functions
function exitEditMode() {
    resumeContainer.classList.add("hidden");
    saveButton.classList.add("hidden");
    cancelButton.classList.add("hidden");
    editButton.classList.remove("hidden");
}
function updateDisplay() {
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var educationElement = document.getElementById("education");
    var skillsElement = document.getElementById("skills");
    var workExperienceElement = document.getElementById("workexperience");
    var projectsElement = document.getElementById("projects");
    var contactElement = document.getElementById("contact");
    if (nameElement)
        nameElement.textContent = resumeData.name;
    if (emailElement)
        emailElement.textContent = "\uD83D\uDCE7 Email: ".concat(resumeData.email);
    if (phoneElement)
        phoneElement.textContent = "\uD83D\uDCDE Phone: ".concat(resumeData.phone);
    if (educationElement)
        educationElement.textContent = resumeData.education;
    if (skillsElement)
        skillsElement.textContent = resumeData.skills;
    if (workExperienceElement) {
        workExperienceElement.innerHTML = resumeData.workExperience.map(function (exp) { return "<li>".concat(exp, "</li>"); }).join("");
    }
    if (projectsElement)
        projectsElement.textContent = resumeData.projects;
    if (contactElement) {
        contactElement.innerHTML = "\n      <li>\uD83D\uDCE7 Email: ".concat(resumeData.contact.email, "</li>\n      <li>\uD83D\uDCDE Phone: ").concat(resumeData.contact.phone, "</li>\n      <li>\uD83D\uDD17 LinkedIn: <a href=\"").concat(resumeData.contact.linkedin, "\" target=\"_blank\">Click here</a></li>\n    ");
    }
}
// Image upload handling
imageInput.addEventListener('change', function (event) {
    var _a;
    var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            if (profilePic) {
                profilePic.src = reader_1.result;
            }
        };
        reader_1.readAsDataURL(file);
    }
});
// Download functionality (using html2pdf.js)
downloadButton.addEventListener("click", function () {
    var element = resumeDisplay; // The element you want to convert to a PDF
    var options = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 8 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save('resume.pdf');
});
// Load the initial data
updateDisplay();
