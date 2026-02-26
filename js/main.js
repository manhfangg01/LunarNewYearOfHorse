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

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        nav.classList.remove("active");
      });
    });
  }

  // ================= NAVIGATION ARROWS =================
  const pages = [
    { name: "Trang Chủ", url: "index.html" },
    { name: "Giới Thiệu", url: "gioi-thieu.html" },
    { name: "Tết Bình Dương", url: "tet-binh-duong.html" },
    { name: "Ẩm Thực", url: "am-thuc.html" },
    { name: "Văn Hóa", url: "van-hoa.html" },
    { name: "Thư Viện", url: "thu-vien.html" },
    { name: "Liên Hệ", url: "lien-he.html" },
  ];

  let currentPage = window.location.pathname.split("/").pop();
  if (!currentPage || currentPage === "") currentPage = "index.html";
  // Remove anchor/query string
  currentPage = currentPage.split(/[?#]/)[0];

  // Try to match partial if needed, but exact match is best for this structure
  const currentIndex = pages.findIndex((p) => p.url === currentPage);

  if (currentIndex !== -1) {
    // Chỉ hiển thị mũi tên trái nếu không phải trang đầu
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevPage = pages[prevIndex];

      const prevArrow = document.createElement("a");
      prevArrow.href = prevPage.url;
      prevArrow.className = "page-nav-arrow page-nav-prev";
      prevArrow.innerHTML = "&#10094;"; // <
      prevArrow.setAttribute("data-title", `Quay lại: ${prevPage.name}`);
      document.body.appendChild(prevArrow);
    }

    // Chỉ hiển thị mũi tên phải nếu không phải trang cuối
    if (currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextPage = pages[nextIndex];

      const nextArrow = document.createElement("a");
      nextArrow.href = nextPage.url;
      nextArrow.className = "page-nav-arrow page-nav-next";
      nextArrow.innerHTML = "&#10095;"; // >
      nextArrow.setAttribute("data-title", `Tiếp theo: ${nextPage.name}`);
      document.body.appendChild(nextArrow);
    }
  }
});
