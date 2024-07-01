document.addEventListener("DOMContentLoaded", async () => {
    const apiKey = '3d9f633b65604ca08b33ae89b82138fc';
    const urls = [
        `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`,
        `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`,
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
    ];

    try {
        const [techNews, sportsNews, businessNews] = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
        let allArticles = [...techNews.articles, ...sportsNews.articles, ...businessNews.articles];
        displayNews(allArticles);

        // Search functionality
        const searchForm = document.getElementById('search-form');
        searchForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const searchTerm = document.getElementById('search-input').value;
            if (searchTerm.trim() !== '') {
                const searchResults = await searchNews(searchTerm, apiKey);
                displayNews(searchResults);
            } else {
                displayNews(allArticles); // Display all articles if search term is empty
            }
        });

    } catch (error) {
        console.error("Error fetching news:", error);
    }
});

async function searchNews(searchTerm, apiKey) {
    const url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error searching news:", error);
        return [];
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ''; // Clear previous news articles
    articles.forEach(article => {
        const articleElem = document.createElement("div");
        articleElem.classList.add("bg-white", "p-4", "rounded", "shadow-md");

        articleElem.innerHTML = `
            <h3 class="text-lg font-semibold">${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" class="text-blue-500" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(articleElem);
    });
}
