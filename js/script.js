
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#siteSearch");
  const searchInput = document.querySelector("#searchInput");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const pages = [
    {
      url: "index.html",
      title: "Home",
      keywords: ["home", "homepage", "welcome", "adventure"]
    },
    
    {
      url: "shop.html",
      title: "Shop",
      keywords: ["shop", "store", "buy", "shopping", "gear"]
    },
    {
      url: "products.html",
      title: "Products",
      keywords: [
        "products",
        "equipment",
        "outdoor",
        "camping",
        "hiking",
        "backpacking",
        "gear"
      ]
    },
    
    {
      url: "about.html",
      title: "About Us",
      keywords: ["about", "story", "company", "mission", "team"]
    },
   
    {
      url: "contact.html",
      title: "Contact Us",
      keywords: ["contact", "email", "message", "support", "help"]
    }
  ];

  // Search form
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const query = searchInput.value.trim().toLowerCase();

      if (!query) {
        searchInput.focus();
        return;
      }

      // Headings Search 
      const headings = document.querySelectorAll(
        "main h1, main h2, main h3"
      );

      const matchingHeading = Array.from(headings).find((heading) =>
        heading.textContent.toLowerCase().includes(query)
      );

      if (matchingHeading) {
        matchingHeading.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start"
        });

        if (!matchingHeading.hasAttribute("tabindex")) {
          matchingHeading.setAttribute("tabindex", "-1");
        }

        matchingHeading.focus({ preventScroll: true });
        return;
      }

      // Page Search
      const matchingPages = pages.filter((page) => {
        const titleMatches = page.title.toLowerCase().includes(query);
        const keywordMatches = page.keywords.some((keyword) =>
          keyword.includes(query)
        );

        return titleMatches || keywordMatches;
      });

      const exactTitleMatch = matchingPages.find(
        (page) => page.title.toLowerCase() === query
      );

      const destination = exactTitleMatch || matchingPages[0];

      if (destination) {
        window.location.href = destination.url;
      } else {
        window.alert("No matching page found. Please try another search.");
      }
    });
  }

  const activeText = document.querySelector("#activeText");
  const activeLink = activeText?.closest("a.active-text");
  const featuredSection = document.querySelector("#featured");

  if (activeText && activeLink && featuredSection) {
    const messages = ["Your adventure.", "Your world."];

    let messageIndex = 0;
    let characterIndex = messages[0].length;
    let deleting = true;
    let animationTimer;

    if (reduceMotion) {
      activeText.textContent = messages[0];
    } else {
      function animateText() {
        const message = messages[messageIndex];

        activeText.textContent = message.slice(0, characterIndex);

        if (deleting) {
          characterIndex--;

          if (characterIndex < 0) {
            deleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            characterIndex = 0;

            animationTimer = window.setTimeout(animateText, 350);
            return;
          }

          animationTimer = window.setTimeout(animateText, 45);
        } else {
          characterIndex++;

          if (characterIndex > messages[messageIndex].length) {
            deleting = true;
            animationTimer = window.setTimeout(animateText, 1400);
            return;
          }

          animationTimer = window.setTimeout(animateText, 85);
        }
      }

      animationTimer = window.setTimeout(animateText, 1400);
    }

    // Stop animation link activation
    activeLink.addEventListener("click", () => {
      window.clearTimeout(animationTimer);
    });
  }

  // Auto Footer Update
  const currentYear = document.querySelector("#currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});