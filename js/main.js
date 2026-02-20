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

      status.innerHTML = "Đang gửi...";
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
          alert("🌸 Chúc mừng! Lời chúc của bạn đã được gửi đi thành công.");
          contactForm.reset();
        } else {
          alert("Rất tiếc, có lỗi xảy ra. Hãy thử lại sau nhé!");
        }
      } catch (error) {
        alert("Không thể kết nối internet. Vui lòng kiểm tra lại!");
      } finally {
        status.innerHTML = "Gửi Lời Chúc";
        status.disabled = false;
      }
    });
  }

  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    lastScrollY = window.scrollY;
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
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle("active");
      nav.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove("active");
        nav.classList.remove("active");
      }
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
         menuToggle.classList.remove("active");
         nav.classList.remove("active");
      });
    });
  }
});
