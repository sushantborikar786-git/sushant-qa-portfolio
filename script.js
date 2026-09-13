/* =========================
   NEO PURPLE THEME
   ========================= */
(function applyNeoPurpleTheme() {
  document.documentElement.setAttribute("data-theme", "neo-purple");
})();

/* Arctic Blue Theme */
(function applyArcticBlueTheme() {
  document.documentElement.setAttribute("data-theme", "arctic-blue");
})();

/* CYBER MINT THEME */
document.documentElement.setAttribute("data-theme","cyber-mint");

/* =========================
   RANDOM COLOR THEME
   A different palette is selected on every fresh visit.
========================= */

(function initRandomTheme() {
    const themes = ["ocean", "mint", "sunset", "violet", "mono"];
    const previousTheme = localStorage.getItem("qaPortfolioLastTheme");

    let availableThemes = themes.filter(theme => theme !== previousTheme);
    const selectedTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];

    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("qaPortfolioLastTheme", selectedTheme);
})();

/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );

revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================
   COUNTER ANIMATION
========================= */

const counters =
    document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    counterStarted = true;

    counters.forEach((counter) => {

        const target =
            Number(
                counter.dataset.count
            );

        let current = 0;

        const increment =
            Math.max(
                1,
                Math.ceil(target / 40)
            );

        const timer =
            setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);
                }

                counter.textContent =
                    current;

            }, 35);

    });
}


/* =========================
   COUNTER OBSERVER
========================= */

const dashboard =
    document.querySelector(
        ".quality-dashboard"
    );

if (dashboard) {

    const dashboardObserver =
        new IntersectionObserver(
            (entries) => {

                if (
                    entries[0].isIntersecting
                ) {

                    startCounters();

                    dashboardObserver.disconnect();
                }

            },
            {
                threshold: 0.3
            }
        );

    dashboardObserver.observe(
        dashboard
    );
}


/* =========================
   MOBILE MENU
========================= */

const menuBtn =
    document.getElementById(
        "menuBtn"
    );

const nav =
    document.querySelector("nav");

if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        () => {

            const isOpen =
                nav.classList.toggle(
                    "mobile-open"
                );

            if (isOpen) {

                nav.style.display =
                    "flex";

                nav.style.position =
                    "absolute";

                nav.style.top =
                    "68px";

                nav.style.left =
                    "0";

                nav.style.right =
                    "0";

                nav.style.padding =
                    "20px";

                nav.style.flexDirection =
                    "column";

                nav.style.background =
                    "var(--panel)";

                nav.style.borderBottom =
                    "1px solid var(--line)";

            } else {

                nav.removeAttribute(
                    "style"
                );
            }

        }
    );
}


/* =========================
   AI TERMINAL EFFECT
========================= */

const terminalText =
    document.querySelector(
        ".cursor-line"
    );

if (terminalText) {

    let messages = [
        "analyzing test coverage...",
        "finding missing scenarios...",
        "checking edge cases...",
        "AI recommendation ready."
    ];

    let index = 0;

    setInterval(() => {

        const text =
            terminalText.querySelector(
                ".cyan"
            );

        if (text) {

            terminalText.innerHTML = `
                <span class="cyan">$</span>
                ${messages[index]}
                <span class="cursor"></span>
            `;

            index =
                (index + 1) %
                messages.length;
        }

    }, 3500);
}


/* =========================
   CURRENT YEAR
========================= */

const year =
    new Date().getFullYear();

const footer =
    document.querySelector("footer");

if (footer) {

    footer.innerHTML =
        footer.innerHTML.replace(
            "2026",
            year
        );
}


/* =========================
   LIVE QUALITY METRICS (TERMINAL)
========================= */

function updateQualityMetrics() {

    const qualityTerminal =
        document.querySelector(
            ".quality-terminal"
        );

    function generateMetrics() {

        // Generate random values within constraints
        let pass =
            Math.floor(
                Math.random() * 18
            ) + 80; // 80-98%

        let failed =
            Math.floor(
                Math.random() * 14
            ) + 1; // 1-15%

        let blocked =
            Math.floor(
                Math.random() * 7
            ) + 1; // 1-8%

        // Normalize to sum to 100%
        const total =
            pass + failed + blocked;

        pass =
            Math.round(
                (pass / total) * 100
            );

        failed =
            Math.round(
                (failed / total) * 100
            );

        blocked =
            100 - pass - failed;

        return {
            pass,
            failed,
            blocked
        };
    }

    function updateMetricsDisplay(
        metrics
    ) {

        const passBar =
            qualityTerminal.querySelector(
                ".pass-bar"
            );

        const failedBar =
            qualityTerminal.querySelector(
                ".failed-bar"
            );

        const blockedBar =
            qualityTerminal.querySelector(
                ".blocked-bar"
            );

        const passValue =
            qualityTerminal.querySelector(
                ".pass-value"
            );

        const failedValue =
            qualityTerminal.querySelector(
                ".failed-value"
            );

        const blockedValue =
            qualityTerminal.querySelector(
                ".blocked-value"
            );

        if (passBar && failedBar && blockedBar) {

            passBar.style.width =
                metrics.pass + "%";

            failedBar.style.width =
                metrics.failed + "%";

            blockedBar.style.width =
                metrics.blocked + "%";

        }

        if (passValue && failedValue && blockedValue) {

            passValue.textContent =
                metrics.pass + "%";

            failedValue.textContent =
                metrics.failed + "%";

            blockedValue.textContent =
                metrics.blocked + "%";

        }

    }

    // Update immediately on load
    let metrics =
        generateMetrics();

    updateMetricsDisplay(metrics);

    // Update every 4 seconds
    const metricsInterval =
        setInterval(() => {

            metrics =
                generateMetrics();

            updateMetricsDisplay(
                metrics
            );

        }, 4000);

    // Stop updating 60 seconds after page load
    setTimeout(() => {

        clearInterval(metricsInterval);

    }, 60000);

}

// Start when terminal is in view
const qualityTerminal =
    document.querySelector(
        ".quality-terminal"
    );

if (qualityTerminal) {

    const metricsObserver =
        new IntersectionObserver(
            (entries) => {

                if (
                    entries[0].isIntersecting
                ) {

                    updateQualityMetrics();

                    metricsObserver.disconnect();
                }

            },
            {
                threshold: 0.3
            }
        );

    metricsObserver.observe(
        qualityTerminal
    );
}


/* =========================
   SMOOTH NAVIGATION
========================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const target =
                    document.querySelector(
                        link.getAttribute("href")
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });