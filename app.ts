const form = document.getElementById('resumeForm') as HTMLFormElement;
const resumeContainer = document.getElementById('resumeContainer') as HTMLElement;
const displayName = document.getElementById('displayName') as HTMLElement;
const displayEmail = document.getElementById('displayEmail') as HTMLElement;
const displayEducation = document.getElementById('displayEducation') as HTMLElement;
const displayExperience = document.getElementById('displayExperience') as HTMLElement;
const displaySkills = document.getElementById('displaySkills') as HTMLElement;
const downloadHtmlBtn = document.getElementById('downloadHtml') as HTMLButtonElement;
const shareLinkBtn = document.getElementById('shareLink') as HTMLButtonElement;
const sharedLinkContainer = document.getElementById('sharedLinkContainer') as HTMLElement;
const sharedLink = document.getElementById('sharedLink') as HTMLAnchorElement;

form.addEventListener('submit', (event) => {
    event.preventDefault();
       const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    displayName.textContent = name;
    displayEmail.textContent = email;
    displayEducation.textContent = education;
    displayExperience.textContent = experience;
    displaySkills.textContent = skills;

    resumeContainer.style.display = 'block';
});
downloadHtmlBtn.addEventListener('click', () => {
    const resumeContent = `
        <html>
        <head>
            <title>Resume</title>
        </head>
        <body>
            <h2>Resume</h2>
            <p><strong>Name:</strong> ${displayName.textContent}</p>
            <p><strong>Email:</strong> ${displayEmail.textContent}</p>
            <p><strong>Education:</strong> ${displayEducation.textContent}</p>
            <p><strong>Work Experience:</strong> ${displayExperience.textContent}</p>
            <p><strong>Skills:</strong> ${displaySkills.textContent}</p>
        </body>
        </html>
    `;
    const blob = new Blob([resumeContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.html';
    link.click();
});
shareLinkBtn.addEventListener('click', () => {
    const userName = (document.getElementById('name') as HTMLInputElement).value.toLowerCase().replace(/\s+/g, '-');
    const uniqueLink =`https://milestone-4-orpin.vercel.app/${userName}-resume`;
    sharedLink.href = uniqueLink;
    sharedLink.textContent = uniqueLink;
    sharedLinkContainer.style.display = 'block';
});
