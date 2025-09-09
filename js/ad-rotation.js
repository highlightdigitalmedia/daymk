document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded fired. Initializing ad rotation.");

    // Function to rotate a single ad slot, now with date and GA4 tracking
    function rotateAd(adData, adLinkElementId) { // Removed adTitleElementId, adLearnMoreElementId
        console.log(`Attempting to rotate ad for element: ${adLinkElementId}`);
        console.log("Raw adData received:", adData);

        if (typeof adData !== 'undefined' && adData.length > 0) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize today's date to midnight for comparison
            console.log("Current date (normalized):", today.toISOString().split('T')[0]);

            // Filter ads based on start and end dates
            const eligibleAds = adData.filter(ad => {
                const startDate = new Date(ad.startDate);
                const endDate = new Date(ad.endDate);
                endDate.setHours(23, 59, 59, 999); // Set end date to end of day for inclusive comparison

                const isEligible = today >= startDate && today <= endDate;
                console.log(`Ad: ${ad.title}, Start: ${ad.startDate}, End: ${ad.endDate}, Eligible: ${isEligible}`);
                return isEligible;
            });

            console.log("Eligible ads after date filter:", eligibleAds);

            if (eligibleAds.length > 0) {
                // Get a random index from the eligible ads
                const randomIndex = Math.floor(Math.random() * eligibleAds.length);
                const selectedAd = eligibleAds[randomIndex];
                console.log("Selected ad for display:", selectedAd);

                // Get the ad elements
                const adLink = document.getElementById(adLinkElementId);
                console.log("Ad link element found:", adLink);

                  if (adLink) { // Only check for adLink now
                                    // Set the background image for the link (which acts as the image container)
                                    adLink.style.backgroundImage = `url('${selectedAd.imageUrl}')`;

                                    // --- START OF FIX ---
                                    // Helper function to process the URL
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

                                    // Use the processed URL
                                    adLink.href = processAdUrl(selectedAd.url);

                    console.log(`Set background-image to: ${selectedAd.imageUrl} for ${adLinkElementId}`);
                    console.log(`Set href to: ${selectedAd.url} for ${adLinkElementId}`);


                    // --- GA4 Event Tracking ---
                    if (typeof gtag === 'function') {
                        gtag('event', 'ad_impression', {
                            'ad_unit_name': adLinkElementId,
                            'ad_creative_name': selectedAd.title,
                            'ad_creative_id': selectedAd.url,
                            'ad_placement': 'sidebar',
                            'campaign_start_date': selectedAd.startDate,
                            'campaign_end_date': selectedAd.endDate,
                            'campaign_view_limit': selectedAd.viewLimit
                        });
                        console.log("GA4 ad_impression event sent.");
                    } else {
                        console.warn("gtag function not found. GA4 event not sent.");
                    }
                } else {
                    console.error(`Error: Ad link element with ID '${adLinkElementId}' not found.`);
                }
            } else {
                // If no eligible ads, hide the ad container
                const adContainer = document.getElementById(adLinkElementId);
                if(adContainer){
                    const parentContainer = adContainer.parentElement;
                    if(parentContainer){
                        parentContainer.style.display = 'none';
                         console.log(`No eligible ads for ${adLinkElementId}. Hiding container.`);
                    }
                } else {
                    console.error(`No eligible ads for ${adLinkElementId}, and its container could not be found.`);
                }
            }
        } else {
            console.log(`Ad data for ${adLinkElementId} is undefined or empty.`);
        }
    }

    // --- Desktop Ads ---
    if (window.sidebarSmallRotatingAdsData1) {
        rotateAd(window.sidebarSmallRotatingAdsData1, 'rotating-ad-link-small-1');
    }
    if (window.sidebarSmallRotatingAdsData2) {
        rotateAd(window.sidebarSmallRotatingAdsData2, 'rotating-ad-link-small-2');
    }
    if (window.categorySpotlightAdsData && !window.location.pathname.endsWith('index.html')) {
        rotateAd(window.categorySpotlightAdsData, 'rotating-ad-link-category');
    }

    // --- Mobile Ads ---
    if (window.mobileTopAdsData) {
        rotateAd(window.mobileTopAdsData, 'mobile-ad-link-top');
    }
    if (window.mobileMidAdsData) {
        rotateAd(window.mobileMidAdsData, 'mobile-ad-link-mid');
    }
});
