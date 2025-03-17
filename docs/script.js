document.addEventListener("DOMContentLoaded", function () {
    // Elements cache
    const elements = {
        menu: document.querySelector(".menu"),
        navList: document.querySelector(".nav-list"),
        tabLinks: document.querySelectorAll(".nav-list li"),
        tabContents: document.querySelectorAll(".tab-content"),
        productCards: document.querySelectorAll(".product-card"),
        backToTopBtn: document.getElementById("back-to-top"),
        whatsappBtns: document.querySelectorAll(".whatsapp-btn"),
        currentYear: document.getElementById("current-year")
    };

    // Current year in footer
    if (elements.currentYear) {
        elements.currentYear.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Menu Toggle
    if (elements.menu && elements.navList) {
        elements.menu.addEventListener("click", function () {
            const menuBtn = this;
            requestAnimationFrame(() => {
                elements.navList.classList.toggle("show");
                menuBtn.classList.toggle("active");
                menuBtn.setAttribute(
                    "aria-expanded",
                    menuBtn.classList.contains("active").toString()
                );
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {
            if (
                !event.target.closest(".nav-list") &&
                !event.target.closest(".menu") &&
                elements.navList.classList.contains("show")
            ) {
                requestAnimationFrame(() => {
                    elements.navList.classList.remove("show");
                    elements.menu.classList.remove("active");
                    elements.menu.setAttribute("aria-expanded", "false");
                });
            }
        });
    }

    // Tab Navigation using event delegation
    if (elements.navList) {
        elements.navList.addEventListener("click", function (e) {
            // Check if clicked element is a tab link or its child
            const tabLink = e.target.closest("li");

            if (tabLink) {
                e.preventDefault();

                const tabId = tabLink.getAttribute("data-tab");

                requestAnimationFrame(() => {
                    // Remove active class from all tabs and content
                    elements.tabLinks.forEach((item) => item.classList.remove("active"));
                    elements.tabContents.forEach((content) => content.classList.remove("active"));

                    // Add active class to current tab and content
                    tabLink.classList.add("active");
                    const tabContent = document.getElementById(tabId);
                    if (tabContent) {
                        tabContent.classList.add("active");
                    }
                });

                // Close mobile menu after tab selection
                if (elements.navList.classList.contains("show")) {
                    requestAnimationFrame(() => {
                        elements.navList.classList.remove("show");
                        elements.menu.classList.remove("active");
                        elements.menu.setAttribute("aria-expanded", "false");
                    });
                }

                // Update URL hash
                window.location.hash = tabId;

                // Scroll to top of page
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        });
    }

    // Handle initial tab based on URL hash
    const handleHashChange = () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const activeTab = document.querySelector(`[data-tab="${hash}"]`);
            if (activeTab) {
                requestAnimationFrame(() => {
                    elements.tabLinks.forEach((item) => item.classList.remove("active"));
                    elements.tabContents.forEach((content) => content.classList.remove("active"));

                    activeTab.classList.add("active");
                    const tabContent = document.getElementById(hash);
                    if (tabContent) {
                        tabContent.classList.add("active");
                    }
                });

                // Scroll to top of page
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    const footerLinks = document.querySelectorAll('.footer-links a');
    if (footerLinks.length > 0) {
        footerLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                // Ensure scroll to top
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }, 10); // Small timeout to ensure hash change happens first
            });
        });
    }

    const logoLink = document.querySelectorAll('.logo');
    if (logoLink.length > 0) {
        logoLink.forEach(link => {
            link.addEventListener('click', function (e) {
                // Ensure scroll to top
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }, 10); // Small timeout to ensure hash change happens first
            });
        });
    }

    // Back to top button
    if (elements.backToTopBtn) {
        let ticking = false;
        window.addEventListener("scroll", function () {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 300) {
                        elements.backToTopBtn.classList.add("visible");
                    } else {
                        elements.backToTopBtn.classList.remove("visible");
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });

        elements.backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // WhatsApp order functionality
    if (elements.whatsappBtns.length > 0) {
        elements.whatsappBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                // Get product info from data attributes
                const productName = this.getAttribute("data-product-name");

                // Create WhatsApp message with product details
                const message = `Olá, Tayane! Eu tenho interesse em adquirir o ${productName}.`;
                const whatsappURL = `https://wa.me/+5521981938331?text=${encodeURIComponent(message)}`;

                // Open WhatsApp with pre-filled message
                window.open(whatsappURL, '_blank');
            });
        });
    }

    // WhatsApp service inquiry functionality
    const serviceButtons = document.querySelectorAll(".whatsapp-service");
    if (serviceButtons.length > 0) {
        serviceButtons.forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();

                // Get service type from data attribute
                const serviceType = this.getAttribute("data-service");

                // Create custom messages based on service type
                let message = "";

                switch (serviceType) {
                    case "consulta":
                        message = "Olá, Tayane! Eu tenho interesse na consulta nutricional.";
                        break;
                    case "consultoria":
                        message = "Olá, Tayane! Eu tenho interesse na consultoria nutricional.";
                        break;
                    case "avaliacao":
                        message = "Olá, Tayane! Eu tenho interesse na avaliação física.";
                        break;
                    case "exames":
                        message = "Olá, Tayane! Eu tenho interesse em exames bioquímicos.";
                        break;
                    case "plano":
                        message = "Olá, Tayane! Eu tenho interesse no plano alimentar personalizado.";
                        break;
                    default:
                        message = "Olá, Tayane! Eu gostaria de saber mais sobre seus serviços nutricionais.";
                }

                // Create and open WhatsApp URL
                const whatsappURL = `https://wa.me/+5521981938331?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
            });
        });
    }
});
