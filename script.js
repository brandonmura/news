document.addEventListener("DOMContentLoaded", async () => {
    const apiKey = '3d9f633b65604ca08b33ae89b82138fc';
    const urls = [
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=5`,
        `https://newsapi.org/v2/everything?q=technology&apiKey=${apiKey}&pageSize=5`,
        `https://newsapi.org/v2/everything?q=sports&apiKey=${apiKey}&pageSize=5`
    ];

    try {
        const [topHeadlines, techNews, sportsNews] = await Promise.all(
            urls.map(url => fetch(url).then(response => response.json()))
        );

        const allArticles = [
            ...topHeadlines.articles,
            ...techNews.articles,
            ...sportsNews.articles
        ];

        displayNews(allArticles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
});

function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ''; // Clear previous news articles

    articles.forEach(article => {
        const articleElem = document.createElement("div");
        articleElem.classList.add("bg-white", "p-4", "rounded", "shadow-md", "mb-4");

        articleElem.innerHTML = `
            <h3 class="text-lg font-semibold">${article.title}</h3>
            <p class="text-gray-600">${article.description}</p>
            <a href="${article.url}" class="text-blue-500" target="_blank" rel="noopener noreferrer">Read more</a>
        `;

        newsContainer.appendChild(articleElem);
    });
}
