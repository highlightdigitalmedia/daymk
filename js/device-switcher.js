document.addEventListener('DOMContentLoaded', function () {
    const searchButtonDesktop = document.getElementById('search-button-desktop');
    const searchButtonMobile = document.getElementById('search-button-mobile');
    const searchModal = document.getElementById('search-modal');
    const closeModalButton = document.getElementById('close-search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results');

    let idx; // Lunr index
    let articles = {}; // Use an object for quick lookups by ID

    // --- UI Update Functions ---
    function showLoadingState() {
        if (searchResultsContainer) searchResultsContainer.innerHTML = '<p class="theme-text-secondary">Loading search index...</p>';
    }

    function showSearchError() {
        if (searchResultsContainer) searchResultsContainer.innerHTML = '<p class="theme-text-secondary">Error: Search index could not be loaded. Search is currently unavailable.</p>';
    }

    function showReadyState() {
        if (searchResultsContainer) searchResultsContainer.innerHTML = '<p class="theme-text-secondary">Ready to search. Please enter a query.</p>';
    }

    // --- Modal Control ---
    function openModal() {
        if (searchModal) searchModal.classList.remove('hidden');
        if (searchInput) {
            // UPDATED: Force a light theme on the input field for consistent visibility.
            searchInput.classList.remove('theme-bg-secondary', 'theme-text-primary');
            searchInput.classList.add('bg-white', 'text-gray-900');
            searchInput.focus();
        }
    }

    function closeModal() {
        if (searchModal) searchModal.classList.add('hidden');
    }

    // --- Search Initialization ---
    async function initializeSearch() {
        showLoadingState();
        try {
            const response = await fetch('search-index.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const articleList = await response.json();

            // Convert array to object for fast lookups
            articles = articleList.reduce((map, article) => {
                map[article.id] = article;
                return map;
            }, {});

            idx = lunr(function () {
                this.ref('id');
                this.field('title');
                this.field('description');

                articleList.forEach(function (doc) {
                    this.add(doc);
                }, this);
            });

            console.log("Search index initialized successfully.");
            showReadyState();

        } catch (error) {
            console.error('Error initializing search:', error);
            showSearchError();
        }
    }

    // --- Search Logic ---
    function performSearch() {
        if (!idx) {
            showSearchError();
            return;
        }
        const query = searchInput.value.trim();
        if (query.length < 2) {
            searchResultsContainer.innerHTML = '<p class="theme-text-secondary">Please enter at least 2 characters.</p>';
            return;
        }

        const searchResults = idx.search(`*${query}*`);
        displayResults(searchResults);
    }

    function displayResults(results) {
        searchResultsContainer.innerHTML = '';

        if (results.length === 0) {
            searchResultsContainer.innerHTML = '<p class="theme-text-secondary">No results found.</p>';
            return;
        }

        results.forEach(result => {
            const article = articles[result.ref];
            if (article) {
                const resultElement = document.createElement('a');
                resultElement.href = article.url;
                resultElement.className = 'block p-3 bg-white rounded-md hover:bg-gray-100 transition-colors';

                resultElement.innerHTML = `
                    <h4 class="font-bold text-gray-900">${article.title}</h4>
                    <p class="text-sm text-gray-600">${article.description.substring(0, 100)}...</p>
                `;
                searchResultsContainer.appendChild(resultElement);
            }
        });
    }

    // --- Event Listeners ---
    searchButtonDesktop?.addEventListener('click', openModal);
    searchButtonMobile?.addEventListener('click', openModal);
    closeModalButton?.addEventListener('click', closeModal);
    searchModal?.addEventListener('click', (e) => {
        if (e.target === searchModal) closeModal();
    });

    // Use 'input' for more responsive search-as-you-type
    searchInput?.addEventListener('input', performSearch);

    initializeSearch();
});

