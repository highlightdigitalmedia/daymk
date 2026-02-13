document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded fired. Initializing ad rotation.");

    // Function to rotate a single ad slot, with safe date handling + GA4 tracking
    function rotateAd(adData, adLinkElementId) { // Removed adTitleElementId, adLearnMoreElementId
        console.log(`Attempting to rotate ad for element: ${adLinkElementId}`);
        console.log("Raw adData received:", adData);

        // Basic sanity check
        if (!Array.isArray(adData) || adData.length === 0) {
            console.log(`Ad data for ${adLinkElementId} is undefined, not an array, or empty.`);
            return;
        }

        // Get the <a> element that displays the ad
        const adLink = document.getElementById(adLinkElementId);
        console.log("Ad link element found:", adLink);

        if (!adLink) {
            console.error(`Error: Ad link element with ID '${adLinkElementId}' not found.`);
            return;
        }

        // Normalize today's date for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to midnight
        console.log("Current date (normalized):", today.toISOString().split('T')[0]);

        // Helper to safely parse dates (returns null if invalid)
        function safeParseDate(value) {
            if (!value) return null;
            const d = new Date(value);
            if (isNaN(d.getTime())) {
                return null;
            }
            return d;
        }

        // Filter ads based on start and end dates, but tolerate missing/invalid dates
        const eligibleAds = adData.filter(ad => {
            const startDate = safeParseDate(ad.startDate);
            const endDateRaw = safeParseDate(ad.endDate);

            // If both dates missing/invalid → always eligible
            if (!startDate && !endDateRaw) {
                console.log(`Ad: ${ad.title} has no valid dates → Eligible (no date restriction).`);
                return true;
            }

            let endDate = endDateRaw;
            if (endDate) {
                // Set end date to end of day for inclusive comparison
                endDate.setHours(23, 59, 59, 999);
            }

            let isEligible = true;

            if (startDate && today < startDate) {
                isEligible = false;
            }
            if (endDate && today > endDate) {
                isEligible = false;
            }

            console.log(`Ad: ${ad.title}, Start: ${ad.startDate}, End: ${ad.endDate}, Eligible: ${isEligible}`);
            return isEligible;
        });

        console.log("Eligible ads after date filter:", eligibleAds);

        if (eligibleAds.length === 0) {
            console.log(`No eligible ads for ${adLinkElementId}. Hiding container if present.`);
            // If no eligible ads, hide the ad container (parent of the link)
            const parentContainer = adLink.parentElement;
            if (parentContainer) {
                parentContainer.style.display = 'none';
                console.log(`No eligible ads for ${adLinkElementId}. Hiding parent container.`);
            } else {
                console.error(`No eligible ads for ${adLinkElementId}, and its parent container could not be found.`);
            }
            return;
        }

        // Pick a random eligible ad
        const randomIndex = Math.floor(Math.random() * eligibleAds.length);
        const selectedAd = eligibleAds[randomIndex];
        console.log("Selected ad for display:", selectedAd);

        // Helper function to process the URL safely
        function processAdUrl(url) {
            if (!url || url.trim() === '' || url.startsWith('#')) {
                return '#';
            }
            if (url.endsWith('.html')) {
                return url;
            }
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return url;
            }
            return `https://${url}`;
        }

        // Set the background image for the link (which acts as the image container)
        if (selectedAd.imageUrl) {
            adLink.style.backgroundImage = `url('${selectedAd.imageUrl}')`;
        } else {
            adLink.style.backgroundImage = '';
        }

        // Use the processed URL
        adLink.href = processAdUrl(selectedAd.url);

        console.log(`Set background-image to: ${selectedAd.imageUrl} for ${adLinkElementId}`);
        console.log(`Set href to: ${adLink.href} for ${adLinkElementId}`);

        // --- GA4 Event Tracking ---
        try {
            if (typeof gtag === 'function') {
                gtag('event', 'ad_impression', {
                    'ad_unit_name': adLinkElementId,
                    'ad_creative_name': selectedAd.title,
                    'ad_creative_id': selectedAd.url,
                    'ad_placement': 'sidebar',
                    'campaign_start_date': selectedAd.startDate || null,
                    'campaign_end_date': selectedAd.endDate || null,
                    'campaign_view_limit': selectedAd.viewLimit || null
                });
                console.log("GA4 ad_impression event sent.");
            } else {
                console.warn("gtag function not found. GA4 event not sent.");
            }
        } catch (err) {
            console.error("Error while sending GA4 event:", err);
        }
    }

    // --- Desktop Ads (clean refactor: single pool -> 2 slots everywhere) ---
    try {
        if (typeof window.desktopSmallAdsData !== 'undefined') {
            rotateAd(window.desktopSmallAdsData, 'rotating-ad-link-small-1');
            rotateAd(window.desktopSmallAdsData, 'rotating-ad-link-small-2');
        } else {
            console.log("desktopSmallAdsData is undefined.");
        }
    } catch (e) {
        console.error("Error initializing desktop ads:", e);
    }

    // --- Mobile Ads ---
    try {
        if (typeof window.mobileTopAdsData !== 'undefined') {
            rotateAd(window.mobileTopAdsData, 'mobile-ad-link-top');
        } else {
            console.log("mobileTopAdsData is undefined.");
        }

        if (typeof window.mobileMidAdsData !== 'undefined') {
            rotateAd(window.mobileMidAdsData, 'mobile-ad-link-mid');
        } else {
            console.log("mobileMidAdsData is undefined.");
        }
    } catch (e) {
        console.error("Error initializing mobile ads:", e);
    }
});
