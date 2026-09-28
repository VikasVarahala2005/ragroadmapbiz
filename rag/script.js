document.addEventListener("DOMContentLoaded", () => {
    // 1. Highlight current active navigation tab
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");
    
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // 2. Dynamic Reference Link Management using LocalStorage
    const linkForm = document.getElementById("link-upload-form");
    const linkList = document.getElementById("reference-links");

    if (linkForm && linkList) {
        // Load initial links
        displayLinks();

        linkForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const titleInput = document.getElementById("link-title");
            const urlInput = document.getElementById("link-url");

            const title = titleInput.value.trim();
            const url = urlInput.value.trim();

            if (title && url) {
                const newLink = { title, url };
                saveLink(newLink);
                titleInput.value = "";
                urlInput.value = "";
                displayLinks();
            }
        });
    }

    function getStoredLinks() {
        const stored = localStorage.getItem("rag_reference_links");
        return stored ? JSON.parse(stored) : [
            { title: "LangChain Official Documentation", url: "https://python.langchain.com/" },
            { title: "Pinecone RAG Guide", url: "https://www.pinecone.io/learn/retrieval-augmented-generation/" }
        ];
    }

    function saveLink(link) {
        const links = getStoredLinks();
        links.push(link);
        localStorage.setItem("rag_reference_links", JSON.stringify(links));
    }

    function displayLinks() {
        const links = getStoredLinks();
        linkList.innerHTML = "";
        links.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = "resource-item";
            li.innerHTML = `
                <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>
                <span style="font-size:0.8rem; color:#64748b;">${new URL(item.url).hostname}</span>
            `;
            linkList.appendChild(li);
        });
    }
});