document.addEventListener('DOMContentLoaded', function () {
    const searchButtonDesktop = document.getElementById('search-button-desktop');
    const searchButtonMobile = document.getElementById('search-button-mobile');
    const searchModal = document.getElementById('search-modal');
    const closeModalButton = document.getElementById('close-search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results');

    let idx; // Lunr index
    let articles = {}; // Lookup by ID

    // --- UI State Helpers ---
    function showLoadingState() {
        searchResultsContainer.innerHTML =
            '<p class="theme-text-secondary">Loading search index...</p>';
    }

    function showSearchError() {
        searchResultsContainer.innerHTML =
            '<p class="theme-text-secondary">Error loading search index. Please try again later.</p>';
    }

    function showReadyState() {
        searchResultsContainer.innerHTML =
            '<p class="theme-text-secondary">Ready to search. Type a query above.</p>';
    }

    // --- Modal Controls ---
    function openModal() {
        if (searchModal) {
            searchModal.classList.remove('hidden');
        }
        if (searchInput) {
            // Force consistent light style for input
            searchInput.classList.remove('theme-bg-secondary', 'theme-text-primary');
            searchInput.classList.add('bg-white', 'text-gray-900');
            setTimeout(() => searchInput.focus(), 50); // delay for mobile
        }
        showReadyState();
    }

    function closeModal() {
        if (searchModal) {
            searchModal.classList.add('hidden');
        }
    }

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // --- Search Initialization ---
    async function initializeSearch() {
        showLoadingState();
        try {
            const response = await fetch('search-index.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const articleList = await response.json();

            articles = articleList.reduce((map, article) => {
                map[article.id] = article;
                return map;
            }, {});

            idx = lunr(function () {
                this.pipeline.remove(lunr.trimmer);
                this.pipeline.remove(lunr.stemmer);

                this.ref('id');
                this.field('title');
                this.field('description');

                articleList.forEach((doc) => this.add(doc));
            });

            console.log('✅ Search index initialized.');
            showReadyState();
        } catch (error) {
            console.error('❌ Search initialization failed:', error);
            showSearchError();
        }
    }

    // --- Search Execution ---
    function performSearch() {
        if (!idx) {
            showSearchError();
            return;
        }
        const query = searchInput.value.trim();
        if (query.length < 2) {
            searchResultsContainer.innerHTML =
                '<p class="theme-text-secondary">Enter at least 2 characters.</p>';
            return;
        }

        // Split into terms & add wildcard (*)
        const terms = query.split(/\s+/).filter((t) => t.length > 0);
        const lunrQuery = terms.map((t) => `${t}*`).join(' ');

        let results;
        try {
            results = idx.search(lunrQuery);
        } catch (e) {
            console.error('Search failed:', e);
            showSearchError();
            return;
        }

        displayResults(results);
    }

    function displayResults(results) {
        searchResultsContainer.innerHTML = '';

        if (!results.length) {
            searchResultsContainer.innerHTML =
                '<p class="theme-text-secondary">No results found.</p>';
            return;
        }

        results.forEach((result) => {
            const article = articles[result.ref];
            if (article) {
                const resultElement = document.createElement('a');
                resultElement.href = article.url;
                resultElement.className =
                    'block p-3 rounded-md theme-bg-secondary border theme-border-color hover:theme-bg-hover transition-colors';

                resultElement.innerHTML = `
                    <h4 class="font-bold theme-text-primary">${article.title}</h4>
                    <p class="text-sm theme-text-secondary">${article.description.substring(0, 100)}...</p>
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

    searchInput?.addEventListener('input', performSearch);

    initializeSearch();
});
