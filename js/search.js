document.addEventListener('DOMContentLoaded', function () {
    const searchButtonDesktop = document.getElementById('search-button-desktop');
    const searchButtonMobile = document.getElementById('search-button-mobile');
    const searchModal = document.getElementById('search-modal');
    const closeModalButton = document.getElementById('close-search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results');

    let articles = [];

    // --- UI State Helpers ---
    function showLoadingState() {
        searchResultsContainer.setAttribute('aria-busy', 'true');
        searchResultsContainer.innerHTML =
            '<p class="theme-text-secondary">Loading search index...</p>';
    }

    function showSearchError() {
        searchResultsContainer.setAttribute('aria-busy', 'false');
        searchResultsContainer.innerHTML =
            '<p class="theme-text-secondary">Error loading search index. Please try again later.</p>';
    }

    function showReadyState() {
        searchResultsContainer.setAttribute('aria-busy', 'false');
        searchResultsContainer.innerHTML =
            '<p class="theme-text-secondary">Ready to search. Type a query above.</p>';
    }

    function getSearchIndexCandidates() {
        const candidates = [];
        const scriptSrc = document.currentScript?.src ||
            Array.from(document.scripts).map((script) => script.src).find((src) => src.endsWith('/js/search.js'));

        if (scriptSrc) {
            const staticRoot = scriptSrc.replace(/\/js\/search\.js(?:\?.*)?$/, '');
            candidates.push(`${staticRoot}/search-index.json`);
        }

        candidates.push('search-index.json');
        candidates.push('/search-index.json');

        return [...new Set(candidates)];
    }

    // PERF: Use local in-browser matching to avoid third-party CDN script downloads.
    function scoreArticle(article, normalizedQuery, terms) {
        const title = (article.title || '').toLowerCase();
        const description = (article.description || '').toLowerCase();

        let score = 0;

        if (title.includes(normalizedQuery)) score += 8;
        if (description.includes(normalizedQuery)) score += 3;

        terms.forEach((term) => {
            if (title.includes(term)) score += 4;
            if (description.includes(term)) score += 1;
        });

        return score;
    }

    // --- Modal Controls ---
    async function openModal() {
        if (searchModal) {
            searchModal.classList.remove('hidden');
        }
        if (searchInput) {
            searchInput.classList.remove('theme-bg-secondary', 'theme-text-primary');
            searchInput.classList.add('bg-white', 'text-gray-900');
            setTimeout(() => searchInput.focus(), 50);
        }

        if (!articles.length) {
            await initializeSearch();
        } else {
            showReadyState();
        }
    }

    function closeModal() {
        if (searchModal) {
            searchModal.classList.add('hidden');
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    async function initializeSearch() {
        showLoadingState();
        try {
            const indexCandidates = getSearchIndexCandidates();
            let loaded = false;

            for (const indexUrl of indexCandidates) {
                const response = await fetch(indexUrl);
                if (!response.ok) continue;

                const articleList = await response.json();
                articles = Array.isArray(articleList) ? articleList : [];
                console.log(`✅ Search index initialized from ${indexUrl}.`);
                loaded = true;
                break;
            }

            if (!loaded) {
                throw new Error('Search index not found in expected locations.');
            }

            showReadyState();
        } catch (error) {
            console.error('❌ Search initialization failed:', error);
            showSearchError();
        }
    }

    function performSearch() {
        if (!articles.length) {
            showSearchError();
            return;
        }

        const query = (searchInput?.value || '').trim();
        if (query.length < 2) {
            searchResultsContainer.innerHTML =
                '<p class="theme-text-secondary">Enter at least 2 characters.</p>';
            return;
        }

        const normalizedQuery = query.toLowerCase();
        const terms = normalizedQuery.split(/\s+/).filter((t) => t.length > 0);

        const results = articles
            .map((article) => ({ article, score: scoreArticle(article, normalizedQuery, terms) }))
            .filter((entry) => entry.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 30)
            .map((entry) => entry.article);

        displayResults(results);
    }

    function displayResults(results) {
        searchResultsContainer.innerHTML = '';

        if (!results.length) {
            searchResultsContainer.innerHTML =
                '<p class="theme-text-secondary">No results found.</p>';
            return;
        }

        results.forEach((article) => {
            const resultElement = document.createElement('a');
            resultElement.href = article.url;
            resultElement.className =
                'block p-3 rounded-md theme-bg-secondary border theme-border-color hover:theme-bg-hover transition-colors';

            resultElement.innerHTML = `
                <h4 class="font-bold theme-text-primary">${article.title}</h4>
                <p class="text-sm theme-text-secondary">${(article.description || '').substring(0, 100)}...</p>
            `;
            searchResultsContainer.appendChild(resultElement);
        });
    }

    searchButtonDesktop?.addEventListener('click', openModal);
    searchButtonMobile?.addEventListener('click', openModal);
    closeModalButton?.addEventListener('click', closeModal);

    searchModal?.addEventListener('click', (e) => {
        if (e.target === searchModal) closeModal();
    });

    searchInput?.addEventListener('input', performSearch);

    // PERF: Keep index loading deferred until the user opens search.
});
