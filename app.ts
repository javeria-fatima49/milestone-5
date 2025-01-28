interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: string;
    skills: string;
    workExperience: string[];
    projects: string;
    contact: {
      email: string;
      phone: string;
      linkedin: string;
    };
    profilePicture?: string;
  }
  
// DOM Elements
const resumeDisplay = document.getElementById("resumeDisplay") as HTMLDivElement;
const editButton = document.getElementById("editResume") as HTMLButtonElement;
const downloadButton = document.getElementById("downloadResume") as HTMLButtonElement;
const shareButton = document.getElementById("shareResume") as HTMLButtonElement;
const saveButton = document.getElementById("saveChanges") as HTMLButtonElement;
const cancelButton = document.getElementById("cancelEdit") as HTMLButtonElement;
const resumeContainer = document.getElementById("resumeContainer") as HTMLDivElement;
const imageInput = document.getElementById("editImage") as HTMLInputElement;
const profilePic = document.getElementById("profilePic") as HTMLImageElement;

// Form Elements
const nameInput = document.getElementById("editName") as HTMLInputElement;
const emailInput = document.getElementById("editEmail") as HTMLInputElement;
const phoneInput = document.getElementById("editPhone") as HTMLInputElement;
const educationInput = document.getElementById("editEducation") as HTMLTextAreaElement;
const skillsInput = document.getElementById("editSkills") as HTMLTextAreaElement;
const workExperienceInput = document.getElementById("editWorkExperience") as HTMLTextAreaElement;
const projectsInput = document.getElementById("editProjects") as HTMLTextAreaElement;
const contactInput = document.getElementById("editContact") as HTMLTextAreaElement;

// Shared link elements for resume sharing
const sharedLinkElement = document.getElementById("sharedLink") as HTMLAnchorElement;
const sharedLinkContainer = document.getElementById("sharedLinkContainer") as HTMLDivElement;

// Initial resume data
let resumeData: ResumeData = {
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
class ResumeShare {

  // Method to handle sharing the resume
  public handleShare(): void {
    const data = this.getFormData();  // Extract data from the form or fields
    const resumeId = this.saveResume(data);  // Function to save the resume and get an ID

    // Generate a shareable link using the resume ID
    const shareableLink = `${window.location.origin}${window.location.pathname}?id=${resumeId}`;

    // Display the link
    if (sharedLinkElement && sharedLinkContainer) {
      sharedLinkElement.href = shareableLink;  // Set the link's href
      sharedLinkElement.textContent = shareableLink;  // Set the text content to the shareable link
      sharedLinkContainer.style.display = "block";  // Make the container visible to the user
    }
  }

  // Collect data from the form or fields
  private getFormData(): ResumeData {
    return {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      education: educationInput.value,
      skills: skillsInput.value,
      workExperience: workExperienceInput.value.split("\n").filter((item) => item.trim() !== ""),
      projects: projectsInput.value,
      contact: {
        email: "",  // Placeholder, adjust as needed
        phone: "",  // Placeholder, adjust as needed
        linkedin: "",  // Placeholder, adjust as needed
      },
    };
  }

  // Save the resume data and return a unique resume ID
  private saveResume(data: ResumeData): string {
    const resumeId = `resume-${Math.random().toString(36).slice(2, 9)}`;

    return resumeId;
  }
}

const resumeShare = new ResumeShare();

// Trigger share functionality when the button is clicked
shareButton.addEventListener("click", () => {
  resumeShare.handleShare();
});

// Edit Mode Toggle
editButton.addEventListener("click", () => {
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
  contactInput.value = `Email: ${resumeData.contact.email}\nPhone: ${resumeData.contact.phone}\nLinkedIn: ${resumeData.contact.linkedin}`;
});

// Save Changes
saveButton.addEventListener("click", () => {
  resumeData = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    education: educationInput.value,
    skills: skillsInput.value,
    workExperience: workExperienceInput.value.split("\n").filter((item) => item.trim() !== ""),
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
function exitEditMode(): void {
  resumeContainer.classList.add("hidden");
  saveButton.classList.add("hidden");
  cancelButton.classList.add("hidden");
  editButton.classList.remove("hidden");
}

function updateDisplay(): void {
  const nameElement = document.getElementById("name");
  const emailElement = document.getElementById("email");
  const phoneElement = document.getElementById("phone");
  const educationElement = document.getElementById("education");
  const skillsElement = document.getElementById("skills");
  const workExperienceElement = document.getElementById("workexperience");
  const projectsElement = document.getElementById("projects");
  const contactElement = document.getElementById("contact");

  if (nameElement) nameElement.textContent = resumeData.name;
  if (emailElement) emailElement.textContent = `📧 Email: ${resumeData.email}`;
  if (phoneElement) phoneElement.textContent = `📞 Phone: ${resumeData.phone}`;
  if (educationElement) educationElement.textContent = resumeData.education;
  if (skillsElement) skillsElement.textContent = resumeData.skills;
  if (workExperienceElement) {
    workExperienceElement.innerHTML = resumeData.workExperience.map((exp) => `<li>${exp}</li>`).join("");
  }
  if (projectsElement) projectsElement.textContent = resumeData.projects;
  if (contactElement) {
    contactElement.innerHTML = `
      <li>📧 Email: ${resumeData.contact.email}</li>
      <li>📞 Phone: ${resumeData.contact.phone}</li>
      <li>🔗 LinkedIn: <a href="${resumeData.contact.linkedin}" target="_blank">Click here</a></li>
    `;
  }
}

// Image upload handling
imageInput.addEventListener('change', (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      if (profilePic) {
        profilePic.src = reader.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
});
declare var html2pdf: any;
// Download functionality (using html2pdf.js)
downloadButton.addEventListener("click", () => {
  const element = resumeDisplay;  // The element you want to convert to a PDF
  const options = {
    margin:       1,
    filename:     'resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 8 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(element).set(options).save('resume.pdf');
});

// Load the initial data
updateDisplay();
