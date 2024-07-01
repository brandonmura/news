document.addEventListener("DOMContentLoaded", async () => {
    const apiKey = '3d9f633b65604ca08b33ae89b82138fc';
    let currentPage = 1;
    let currentCategory = '';
    let currentSearch = '';
    const pageSize = 10;

    const fetchAndDisplayNews = async (category, searchQuery, page) => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;

        if (category) {
            url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;
        } else if (searchQuery) {
            url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const displayNews = (articles) => {
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
    };

    document.getElementById('search-form').addEventListener('submit', (event) => {
        event.preventDefault();
        currentCategory = '';
        currentSearch = document.getElementById('search-input').value;
        currentPage = 1;
        fetchAndDisplayNews(currentCategory, currentSearch, currentPage);
    });

    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            currentCategory = link.getAttribute('data-category');
            currentSearch = '';
            currentPage = 1;
            fetchAndDisplayNews(currentCategory, currentSearch, currentPage);
        });
    });

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchAndDisplayNews(currentCategory, currentSearch, currentPage);
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        currentPage++;
        fetchAndDisplayNews(currentCategory, currentSearch, currentPage);
    });

    // Initial load of top headlines
    fetchAndDisplayNews('', '', currentPage);
});
