document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".card, .content-block, .gallery-item, .intro-section");
    animatedElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        observer.observe(el);
    });

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const status = document.querySelector(".btn-submit");
            const formData = new FormData(this);

            status.innerHTML = "?ang g?i...";
            status.disabled = true;

            try {
                const response = await fetch(this.action, {
                    method: this.method,
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (response.ok) {
                    alert(" Ch¨²c m?ng! L?i ch¨²c c?a b?n ?? ???c g?i ?i th¨¤nh c?ng.");
                    contactForm.reset();
                } else {
                    alert("R?t ti?c, c¨® l?i x?y ra. H?y th? l?i sau nh¨¦!");
                }
            } catch (error) {
                alert("Kh?ng th? k?t n?i internet. Vui l¨°ng ki?m tra l?i!");
            } finally {
                status.innerHTML = "G?i L?i Ch¨²c";
                status.disabled = false;
            }
        });
    }

    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.padding = "10px 5%";
            header.style.background = "rgba(211, 47, 47, 0.95)";
        } else {
            header.style.padding = "10px 5%";
            header.style.background = "var(--primary-red)";
        }
    });

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach((link) => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPath) {
            link.classList.add("active");
        } else {
            if (link.classList.contains("active") && linkPath !== currentPath) {
                link.classList.remove("active");
            }
        }
    });

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            nav.classList.toggle("active");
        });
    }
    
    const countdownContainer = document.getElementById('countdown');
    if (countdownContainer) {
        const tetDate = new Date('February 17, 2026 00:00:00').getTime();
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = tetDate - now;

            if (distance < 0) {
                countdownContainer.innerHTML = '<div style="width:100%; text-align:center; background:none; border:none; backdrop-filter:none; box-shadow:none;"><h2 style="color:#ffd700; font-family: \'Playfair Display\', serif; font-size: 2rem; text-shadow: 2px 2px 4px #000; margin:0;">Ch¨²c M?ng N?m M?i!</h2></div>';
                
                const days = document.getElementById('days');
                if(days) days.parentElement.style.display = 'none';
                const hours = document.getElementById('hours');
                if(hours) hours.parentElement.style.display = 'none';
                const minutes = document.getElementById('minutes');
                if(minutes) minutes.parentElement.style.display = 'none';
                const seconds = document.getElementById('seconds');
                if(seconds) seconds.parentElement.style.display = 'none';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const dEl = document.getElementById('days');
            const hEl = document.getElementById('hours');
            const mEl = document.getElementById('minutes');
            const sEl = document.getElementById('seconds');

            if(dEl) dEl.innerText = String(days).padStart(2, '0');
            if(hEl) hEl.innerText = String(hours).padStart(2, '0');
            if(mEl) mEl.innerText = String(minutes).padStart(2, '0');
            if(sEl) sEl.innerText = String(seconds).padStart(2, '0');
        };

        updateCountdown(); 
        setInterval(updateCountdown, 1000);
    }
});
