// Publications data structure
// This will be used to generate the publications list
// Data can be fetched from Google Scholar or manually updated

const publicationsData = {
    "2025": [
        {
            title: "Phenotypical Characterization of Novel Apicoplast Membrane Proteins in Toxoplasma gondii",
            authors: "Chen, Xiaowei, Huiyong Ding, Hui Dong, De-Hua Lai, Geoff Hide, Xun Suo, and Shaojun Long",
            journal: "One Health Advances",
            volume: "3 (1): 11",
            year: "2025",
            doi: "https://doi.org/10.1186/s44280-025-00077-z"
        },
        {
            title: "Regulation of the Developmental Programs in Toxoplasma by a Novel SNF2L-Containing Chromatin Remodeling Complex",
            authors: "Zhu, Yuchao, Bolin Fan, Hao Xu, Yazhou Li, Xiaohan Liang, Lilan Xue, Liting Wei, et al.",
            journal: "Nature Communications",
            volume: "16 (1): 5757",
            year: "2025",
            doi: "https://doi.org/10.1038/s41467-025-60795-1"
        }
    ],
    "2022": [
        {
            title: "VEuPathDB: The eukaryotic pathogen, vector and host bioinformatics resource center",
            authors: "Amos B, Aurrecoechea C, Barba M, Barreto A, Basenko EY, Bażant W, Belnap R, Blevins AS, Böhme U, Brestelli J, Brunk BP, Caddick M, Callan D, Campbell L, Christensen MB, Christophides GK, Crouch K, Davis K, DeBarry J, Doherty R, Duan Y, Dunn M, Falke D, Fisher S, Flicek P, Fox B, Gajria B, Giraldo-Calderón GI, Harb OS, Harper E, Hertz-Fowler C, Hickman MJ, Howington C, Hu S, Humphrey J, Iodice J, Jones A, Judkins J, Kelly SA, Kissinger JC, et al.",
            journal: "Nucleic Acids Research",
            volume: "50 (D1): D898-D911",
            year: "2022",
            doi: "https://academic.oup.com/nar/article/50/D1/D898/6415417"
        }
    ]
};

// Initialize publications page
document.addEventListener('DOMContentLoaded', function() {
    const publicationsContainer = document.getElementById('publications-container');
    if (!publicationsContainer) return;

    let allPublications = [];

    // Flatten publications by year
    function flattenPublications() {
        allPublications = [];
        Object.keys(publicationsData).sort((a, b) => b - a).forEach(year => {
            publicationsData[year].forEach(pub => {
                allPublications.push(pub);
            });
        });
        // Limit to latest 12 publications
        allPublications = allPublications.slice(0, 12);
    }

    // Render publications
    function renderPublications() {
        publicationsContainer.innerHTML = '';

        if (allPublications.length === 0) {
            publicationsContainer.innerHTML = '<p class="no-publications">No publications found.</p>';
            return;
        }

        allPublications.forEach((pub, index) => {
            const pubElement = document.createElement('article');
            pubElement.className = 'publication-item fade-in';
            pubElement.style.animationDelay = `${index * 0.1}s`;

            pubElement.innerHTML = `
                <h3 class="pub-title">${pub.title}</h3>
                <p class="pub-authors">${pub.authors}</p>
                <p class="pub-journal"><em>${pub.journal}</em>, ${pub.volume} (${pub.year})</p>
                <div class="pub-links">
                    <a href="${pub.doi}" target="_blank" class="pub-link">View Article</a>
                </div>
            `;

            publicationsContainer.appendChild(pubElement);
        });
    }

    // Initialize
    flattenPublications();
    renderPublications();
});

// Add fade-in animation keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in {
        animation: fadeIn 0.5s ease forwards;
        opacity: 0;
    }
`;
document.head.appendChild(style);
