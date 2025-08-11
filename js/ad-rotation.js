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
                    adLink.href = selectedAd.url; // Set the hyperlink for the entire image
                    console.log(`Set background-image to: ${selectedAd.imageUrl} for ${adLinkElementId}`);
                    console.log(`Set href to: ${selectedAd.url} for ${adLinkElementId}`);


                    // --- GA4 Event Tracking ---
                    // Send an ad_impression event to Google Analytics 4
                    // The 'viewLimit' parameter is passed for reporting purposes in GA4,
                    // but it cannot be enforced client-side for a global count.
                    if (typeof gtag === 'function') {
                        gtag('event', 'ad_impression', {
                            'ad_unit_name': adLinkElementId, // e.g., 'rotating-ad-link-small-1'
                            'ad_creative_name': selectedAd.title, // Still useful for GA4 reports
                            'ad_creative_id': selectedAd.url, // Using URL as a unique ID for the creative
                            'ad_placement': 'sidebar',
                            'campaign_start_date': selectedAd.startDate,
                            'campaign_end_date': selectedAd.endDate,
                            'campaign_view_limit': selectedAd.viewLimit // For reporting in GA4
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
                const adContainer = document.getElementById(adLinkElementId).closest('.flex-col');
                if (adContainer) {
                    adContainer.style.display = 'none';
                    console.log(`No eligible ads for ${adLinkElementId}. Hiding container.`);
                } else {
                    console.error(`No eligible ads for ${adLinkElementId}, and its container could not be found.`);
                }
            }
        } else {
            console.log(`Ad data for ${adLinkElementId} is undefined or empty.`);
        }
    }

    // Rotate the first small sidebar ad (on index.html)
    rotateAd(
        window.sidebarSmallRotatingAdsData1,
        'rotating-ad-link-small-1'
    );

    // Rotate the second small sidebar ad (on index.html)
    rotateAd(
        window.sidebarSmallRotatingAdsData2,
        'rotating-ad-link-small-2'
    );

    // Activate rotation for the category page ad (on category-detail.html)
    // This block is now active and will attempt to rotate the ad on category pages.
     // Activate rotation on all pages except index.html
     if (!window.location.pathname.endsWith('index.html')) {
         rotateAd(
             window.categorySpotlightAdsData,
             'rotating-ad-link-category'
         );
     }
});
