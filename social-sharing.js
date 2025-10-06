/**
 * Social Media Sharing & Integration
 * Comprehensive social sharing functionality
 */

class SocialSharing {
    constructor() {
        this.shareData = {
            title: 'Startup Nation - Tampere Startup Association',
            text: 'Join Finland\'s most vibrant startup ecosystem in Tampere. Connect, collaborate, and build the future of innovation.',
            url: window.location.href,
            hashtags: ['StartupNation', 'Tampere', 'Finland', 'Startup', 'Innovation', 'Entrepreneurship']
        };
        
        this.init();
    }

    init() {
        this.createShareButtons();
        this.setupSocialTracking();
        this.addSocialMetaTags();
    }

    /**
     * Create social sharing buttons
     */
    createShareButtons() {
        // Add share buttons to hero section
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons) {
            const shareButton = document.createElement('a');
            shareButton.href = '#';
            shareButton.className = 'btn btn-secondary share-btn';
            shareButton.innerHTML = '<i class="fas fa-share-alt"></i> Share';
            shareButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.showShareModal();
            });
            heroButtons.appendChild(shareButton);
        }

        // Add floating share button
        this.createFloatingShareButton();
    }

    /**
     * Create floating share button
     */
    createFloatingShareButton() {
        const floatingShare = document.createElement('div');
        floatingShare.className = 'floating-share';
        floatingShare.innerHTML = `
            <button class="floating-share-btn" aria-label="Share this page">
                <i class="fas fa-share-alt"></i>
            </button>
            <div class="share-dropdown" style="display: none;">
                <a href="#" data-platform="facebook" class="share-option">
                    <i class="fab fa-facebook-f"></i> Facebook
                </a>
                <a href="#" data-platform="twitter" class="share-option">
                    <i class="fab fa-twitter"></i> Twitter
                </a>
                <a href="#" data-platform="linkedin" class="share-option">
                    <i class="fab fa-linkedin-in"></i> LinkedIn
                </a>
                <a href="#" data-platform="whatsapp" class="share-option">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
                <a href="#" data-platform="telegram" class="share-option">
                    <i class="fab fa-telegram-plane"></i> Telegram
                </a>
                <a href="#" data-platform="email" class="share-option">
                    <i class="fas fa-envelope"></i> Email
                </a>
                <a href="#" data-platform="copy" class="share-option">
                    <i class="fas fa-copy"></i> Copy Link
                </a>
            </div>
        `;

        // Add styles
        floatingShare.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1000;
        `;

        document.body.appendChild(floatingShare);

        // Add event listeners
        const shareBtn = floatingShare.querySelector('.floating-share-btn');
        const dropdown = floatingShare.querySelector('.share-dropdown');
        const shareOptions = floatingShare.querySelectorAll('.share-option');

        shareBtn.addEventListener('click', () => {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });

        shareOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = option.dataset.platform;
                this.shareToPlatform(platform);
                dropdown.style.display = 'none';
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!floatingShare.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    }

    /**
     * Show share modal
     */
    showShareModal() {
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <div class="share-modal-header">
                    <h3>Share Startup Nation</h3>
                    <button class="close-modal" aria-label="Close">&times;</button>
                </div>
                <div class="share-platforms">
                    <div class="share-platform" data-platform="facebook">
                        <i class="fab fa-facebook-f"></i>
                        <span>Facebook</span>
                    </div>
                    <div class="share-platform" data-platform="twitter">
                        <i class="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </div>
                    <div class="share-platform" data-platform="linkedin">
                        <i class="fab fa-linkedin-in"></i>
                        <span>LinkedIn</span>
                    </div>
                    <div class="share-platform" data-platform="whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        <span>WhatsApp</span>
                    </div>
                    <div class="share-platform" data-platform="telegram">
                        <i class="fab fa-telegram-plane"></i>
                        <span>Telegram</span>
                    </div>
                    <div class="share-platform" data-platform="email">
                        <i class="fas fa-envelope"></i>
                        <span>Email</span>
                    </div>
                    <div class="share-platform" data-platform="copy">
                        <i class="fas fa-copy"></i>
                        <span>Copy Link</span>
                    </div>
                </div>
                <div class="share-url">
                    <input type="text" value="${this.shareData.url}" readonly>
                    <button class="copy-url-btn">Copy</button>
                </div>
            </div>
        `;

        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        document.body.appendChild(modal);

        // Add event listeners
        const closeBtn = modal.querySelector('.close-modal');
        const platforms = modal.querySelectorAll('.share-platform');
        const copyBtn = modal.querySelector('.copy-url-btn');

        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        platforms.forEach(platform => {
            platform.addEventListener('click', () => {
                const platformName = platform.dataset.platform;
                this.shareToPlatform(platformName);
                modal.remove();
            });
        });

        copyBtn.addEventListener('click', () => {
            this.copyToClipboard(this.shareData.url);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
            }, 2000);
        });
    }

    /**
     * Share to specific platform
     */
    shareToPlatform(platform) {
        const url = encodeURIComponent(this.shareData.url);
        const title = encodeURIComponent(this.shareData.title);
        const text = encodeURIComponent(this.shareData.text);
        const hashtags = this.shareData.hashtags.join(',');

        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${text}%20${url}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${title}&body=${text}%20${url}`;
                break;
            case 'copy':
                this.copyToClipboard(this.shareData.url);
                this.showNotification('Link copied to clipboard!', 'success');
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            this.trackSocialShare(platform);
        }
    }

    /**
     * Copy to clipboard
     */
    async copyToClipboard(text) {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    /**
     * Setup social media tracking
     */
    setupSocialTracking() {
        // Track social media clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.social-link')) {
                const platform = this.getPlatformFromUrl(e.target.closest('.social-link').href);
                this.trackSocialClick(platform);
            }
        });

        // Track share actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-platform]')) {
                const platform = e.target.closest('[data-platform]').dataset.platform;
                this.trackSocialShare(platform);
            }
        });
    }

    /**
     * Get platform from URL
     */
    getPlatformFromUrl(url) {
        if (url.includes('linkedin.com')) return 'linkedin';
        if (url.includes('twitter.com')) return 'twitter';
        if (url.includes('instagram.com')) return 'instagram';
        if (url.includes('facebook.com')) return 'facebook';
        if (url.includes('youtube.com')) return 'youtube';
        if (url.includes('github.com')) return 'github';
        return 'unknown';
    }

    /**
     * Track social media clicks
     */
    trackSocialClick(platform) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'social_click', {
                social_network: platform,
                social_action: 'click',
                social_target: window.location.href
            });
        }

        // Custom analytics
        console.log(`Social click tracked: ${platform}`);
    }

    /**
     * Track social shares
     */
    trackSocialShare(platform) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'share', {
                method: platform,
                content_type: 'page',
                item_id: window.location.href
            });
        }

        // Custom analytics
        console.log(`Social share tracked: ${platform}`);
    }

    /**
     * Add social media meta tags
     */
    addSocialMetaTags() {
        // These are already in the HTML, but we can add dynamic ones
        const metaTags = [
            { property: 'og:title', content: this.shareData.title },
            { property: 'og:description', content: this.shareData.text },
            { property: 'og:url', content: this.shareData.url },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'Startup Nation' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: this.shareData.title },
            { name: 'twitter:description', content: this.shareData.text },
            { name: 'twitter:url', content: this.shareData.url }
        ];

        metaTags.forEach(tag => {
            let meta = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                if (tag.property) {
                    meta.setAttribute('property', tag.property);
                } else {
                    meta.setAttribute('name', tag.name);
                }
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', tag.content);
        });
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Use the existing notification system from the main app
        if (window.startupNationApp) {
            window.startupNationApp.showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Initialize social sharing when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SocialSharing();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SocialSharing;
}
