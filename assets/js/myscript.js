
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
            'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-side-1.jpg',
            'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-side-2.jpg',
            'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-side-3.jpg',
            'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-side-4.jpg',
            'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-side-5.jpg',
        ],


    };


    let color = Cookies.get('color');
    let itemqty = Cookies.get('itemqty');

    if (color && itemqty) { // Check if both cookies exist
      if (multiImages[color]) {
          // console.log(multiImages[color]); // Log the specific color images
          $("#checkout-img").attr("src", basePath  + color + '/' + multiImages[color][0]);
          $('#finaCoun').empty().text(itemqty);
          let priceVal = 599;
          let subTotal = 599 * itemqty;
          $('#subTotal').empty().text('₹'+subTotal);
          $('#total').empty().text('₹'+subTotal);

      }
  } 

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
            // change all images
            $('.product__slider').empty();
            multiImages[color].forEach((image, index) => {
                let img = `<img class="product__image ${index === 0 ? 'product__image--active' : ''}"  src="${basePath + color + '/' + image}" alt="product image">`;
                
                $('.product__slider').append(img);
            });

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


    $('.reviewModal').click(function () {
      $('.reviewModal').modal('hide');
  });


    $('.product__slider').on('click', 'img', function () {
        $('.product__slider img').removeClass('product__image--active');
        $(this).addClass('product__image--active');
        $('#main-image').attr('src', $(this).attr('src'));
    });



    $('#checkoutBtn').on('click',function(){
         $(this).append(' <div class="spinner-border spinner-border-sm text-light" role="status"></div>');
         $(this).attr('disabled', true);

         let color = $('#colorName').text();
         let itemqty  = $('#quantity').text();
      
         Cookies.set('color', color);
         Cookies.set('itemqty', itemqty);


         window.location.href = 'checkout.php';
    });
    



});


// const mainImage = document.getElementById("main-image");
// const images = document.querySelectorAll(".product__image");

// images.forEach((image) => {
//   image.addEventListener("click", (event) => {
//     mainImage.src = event.target.src;

//     document
//       .querySelector(".product__image--active")
//       .classList.remove("product__image--active");

//     event.target.classList.add("product__image--active");
//   });
// });

 
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



  function getCookie(name) {
    let cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            return decodeURIComponent(cookie[1]); // Return cookie value
        }
    }
    return null; // Return null if cookie doesn't exist
}


$(document).ready(function () {
  $('#checkOutForm').on('submit', function (event) {
      event.preventDefault(); // Prevent default submission

      let isValid = true;

      // Loop through all required inputs and validate them
      $('#checkOutForm input[required], #checkOutForm textarea[required]').each(function () {
          let value = $(this).val().trim();

          if (value === '') {
              $(this).addClass('is-invalid'); // Add Bootstrap's invalid class
              isValid = false;
          } else {
              $(this).removeClass('is-invalid'); // Remove invalid class if fixed
          }
      });

      // Validate phone number (must be 10 digits)
      let phone = $('#phone').val().trim();
      if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
          $('#phone').addClass('is-invalid');
          isValid = false;
      } else {
          $('#phone').removeClass('is-invalid');
      }

      // Validate payment method (must be selected)
      if (!$('input[name="paymentMethod"]:checked').val()) {
          $('#paymentValidErr').empty().text('Select Payment Method');
          isValid = false;
      } else {
          $('input[name="paymentMethod"]').removeClass('is-invalid');
          $('#paymentValidErr').empty()
      }

      // If the form is valid, submit via AJAX or perform the next action
      // if (isValid) {
      //     alert('Form is valid! Proceeding with submission.');
      //     // Example: Submit via AJAX
      //     $.ajax({
      //         url: $(this).attr('action'), // Get form action URL
      //         type: 'POST',
      //         data: $(this).serialize(), // Serialize form data
      //         success: function (response) {
      //             alert('Order placed successfully!');
      //             console.log(response);
      //         },
      //         error: function (error) {
      //             alert('Something went wrong!');
      //             console.log(error);
      //         }
      //     });
      // }
  });

  // Remove 'is-invalid' class when the user types
  $('#checkOutForm input, #checkOutForm textarea').on('input', function () {
      $(this).removeClass('is-invalid');
  });


  $('input[name="paymentMethod"]').click(function () {
    let paymentType = $(this).val();
    let itemqty = Cookies.get('itemqty') || 0; // Default to 0 if not set
    itemqty = parseInt(itemqty, 10); // Convert to integer

    let subTotal = Math.round(599 * itemqty); // Calculate subtotal

    if (paymentType === 'Online Pay') {
        let discount = Math.round(subTotal * 0.05); // 5% discount (rounded)
        let finalSum = subTotal - discount; // Apply discount

        $('#prepaidorder').text(discount); // Show discount amount
        $('#total').text(finalSum); // Show final amount
        $('.prepaidorderBox').css('display', 'block'); // Show discount box
    } else {
        // If Cash on Delivery is selected, reset to original subtotal
        $('#prepaidorder').text('0'); // No discount
        $('#total').text(subTotal); // Set total to original subtotal
        $('.prepaidorderBox').css('display', 'none'); // Hide discount box
    }
});

});