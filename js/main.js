document.addEventListener("DOMContentLoaded", () => {
  // 1. Scroll Animation (Intersection Observer)
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

  // 2. Contact Form Handling
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Ngăn trang web load lại

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
          // Nếu gửi thành công
          alert("🌸 Chúc mừng! Lời chúc của bạn đã được gửi đi thành công.");
          contactForm.reset(); // Xóa trắng form
        } else {
          // Nếu có lỗi từ server
          alert("Rất tiếc, có lỗi xảy ra. Hãy thử lại sau nhé!");
        }
      } catch (error) {
        // Nếu lỗi mạng
        alert("Không thể kết nối internet. Vui lòng kiểm tra lại!");
      } finally {
        // Trả lại trạng thái nút bấm
        status.innerHTML = "Gửi Lời Chúc";
        status.disabled = false;
      }
    });
  }

  // 3. Navbar Scroll Effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.padding = "10px 50px";
      header.style.background = "rgba(211, 47, 47, 0.95)";
    } else {
      header.style.padding = "15px 50px";
      header.style.background = "var(--primary-red)";
    }
  });

  // 4. Active Link Highlight
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
});
