function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    console.log('Menu toggled');
}

// Socials links
document.getElementById('linkedin-icon').addEventListener('click', function() {
    window.open('https://www.linkedin.com/in/brandon-wong-191258254/', '_blank');
});
document.getElementById('github-icon').addEventListener('click', function() {
    window.open('https://www.github.com/brandon0719', '_blank');
});

// Experience link
document.getElementById('webgen-github').addEventListener('click', function() {
    window.open("https://github.com/ylu8888/GenomeGenesis/tree/master", '_blank');
})
document.getElementById("webgen-link").addEventListener("click", function () {
    window.open("https://genomegenesis.netlify.app/", "_blank");
});


/**
 * Resume modal functions
 */
// Resume Modal
function openModal() {
    const pdfPath = './assets/Brandon_Wong_Resume_2024.pdf';
    document.getElementById('resumeModal').style.display = "flex";
    renderPDF(pdfPath);
}

function closeModal() {
    document.getElementById('resumeModal').style.display = "none";
}

// Close the modal if the user clicks outside of the modal content
window.onclick = function(event) {
    if (event.target == document.getElementById('resumeModal')) {
        closeModal();
    }
}
/**
 * Resume render function
 * @param {} url 
 */
// Function to render the PDF
async function renderPDF(url) {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;

    //Fetch page

    const page = await pdf.getPage(1);
    
    // Get viewport and scale
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.getElementById('pdfCanvas');
    const context = canvas.getContext('2d');

    // Calculate the scale to fit the modal content
    const modalContent = document.querySelector('.modal-content');
    const scale = Math.min(
        modalContent.clientWidth / viewport.width,
        modalContent.clientHeight / viewport.height
    );
    const scaledViewport = page.getViewport({ scale: scale });
    
    // Set canvas dimensions for higher resolution rendering
    const outputScale = window.devicePixelRatio || 1;
    canvas.width = scaledViewport.width * outputScale;
    canvas.height = scaledViewport.height * outputScale;
    canvas.style.width = `${scaledViewport.width}px`;
    canvas.style.height = `${scaledViewport.height}px`;

    const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
        transform: [outputScale, 0, 0, outputScale, 0, 0] // Apply the output scale
    };

    const renderTask = page.render(renderContext);
    await renderTask.promise;
    console.log('Page rendered');
}

/**
 * Observer API
 */
const hiddens = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}); 
hiddens.forEach((hidden) => observer.observe(hidden));