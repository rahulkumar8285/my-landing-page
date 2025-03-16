

const mainImage = document.getElementById("main-image");
const images = document.querySelectorAll(".product__image");

images.forEach((image) => {
  image.addEventListener("click", (event) => {
    mainImage.src = event.target.src;

    document
      .querySelector(".product__image--active")
      .classList.remove("product__image--active");

    event.target.classList.add("product__image--active");
  });
});

 
 // Optional: Change the toggle icon from "+" to "-" when expanded
 document.querySelectorAll(".collapse-header").forEach((header) => {
    header.addEventListener("click", () => {
      const icon = header.querySelector("span:last-child");
      if (header.getAttribute("aria-expanded") === "true") {
        icon.textContent = "+";
      } else {
        icon.textContent = "-";
      }
    });
  });

  // Open the first collapse section on document load
  document.addEventListener("DOMContentLoaded", () => {
    const firstCollapseHeader = document.querySelector(".collapse-header");
    const firstCollapseContent =
      document.querySelector(".collapse-content");
    if (firstCollapseHeader && firstCollapseContent) {
      firstCollapseHeader.setAttribute("aria-expanded", "true");
      firstCollapseContent.classList.add("show");
      firstCollapseHeader.querySelector("span:last-child").textContent =
        "-";
    }
  });


