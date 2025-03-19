
$(document).ready(function () {
  // Initialize Swiper  
    let firstColor = $(".color-preview").first().css({
        "border": "2px solid #555"
    }).find(".color-option").attr("data-color");

    $('#colorName').text(firstColor);

    let basePath = "./assets/images/product-image/";

    let multiImages = {
        'pink': [
            'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image.jpg',
            'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-side-1.jpg',
            'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-side-2.jpg',
            'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-side-3.jpg',
        ],

        'purple': [
            'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image.jpg', 
        ],


    };

    $(".color-option").click(function () {
        let color = $(this).attr("data-color");
        $('#colorName').text(color);

        $(".color-preview").css({
            "border": "none"
        });

        $(this).closest(".color-preview").css({
            "border": "2px solid #555"
        });


        if (multiImages[color]) {

            $("#main-image").attr("src", basePath  + color + '/' + multiImages[color][0]);
        } else {
            $("#main-image").attr("src", `assets/images/products/product-${color}.jpg`);
        }
    });


    $("#increase-quantity").click(function () {
        let quantityInput = $("#quantity").text();
        let currentQuantity = parseInt(quantityInput);
        $("#quantity").empty().text(currentQuantity+1);
    });

    $("#decrease-quantity").click(function () {
        let quantityInput = $("#quantity").text();
        let currentQuantity = parseInt(quantityInput);
        if (currentQuantity > 1) {
            $("#quantity").empty().text(currentQuantity-1);

        }
    });


    $('#main-image').click(function () {
        let src = $(this).attr('src');
        $('.ImageModal').modal('show');
        $('.ImageModal').find('img').attr('src', src);
    })


    $('#loadMore').click(function () {
            $('.reviewModal').modal('show');
            let modalBody = $('.reviewModal').find('.modal-body');

            // Add Bootstrap spinner before loading content
            modalBody.html('<div class="d-flex justify-content-center my-3">' +
                           '<div class="spinner-border text-primary" role="status">' +
                           '<span class="visually-hidden">Loading...</span>' +
                           '</div></div>');   
                           
            $.ajax({
            url: 'review.php', // Fetch all review data
            method: 'GET',
            dataType: 'html',
            success: function (response) {
                modalBody.html(response); // Append the fetched reviews to modal
            },
            error: function () {
                modalBody.html('<p class="text-danger text-center">Failed to load reviews. Please try again.</p>');
            }
        });
    });

});


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


