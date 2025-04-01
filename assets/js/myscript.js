
$(document).ready(function () {
  // Initialize Swiper  
    let firstColor = $(".color-preview").first().css({
        "border": "2px solid #555"
    }).find(".color-option").attr("data-color");

    if (firstColor) { // Checks if firstColor is not null, undefined, or empty
        let capitalizedColor = firstColor.charAt(0).toUpperCase() + firstColor.slice(1);
        $('#colorName').text(capitalizedColor);
    }
  

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

        'blue':[
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image.jpeg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-1.jpeg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-2.jpeg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-3.jpeg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-4.jpeg',
        ],

        'black':[
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-1.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-2.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-3.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-4.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-5.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-6.jpg',
        ],


        'grey':[
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-1.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-2.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-3.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-4.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-5.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-6.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-7.jpg',
        ],

        'green':[
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-1.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-2.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-3.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-4.jpg',
          'NoirÉlan Multi-color Water Proof Foldable Travel Duffel Bag With Pocket-main-image-side-5.jpg',
        ],





    };


    let color = Cookies.get('color');
    let itemqty = Cookies.get('itemqty');

    if (color && itemqty) { // Check if both cookies exist
      let leColor = color.toLowerCase();
      if (multiImages[leColor]) {
          // console.log(multiImages[color]); // Log the specific color images
          $("#checkout-img").attr("src", basePath  + leColor + '/' + multiImages[leColor][0]);
          $('#finaCoun').empty().text(itemqty);
          let priceVal = 599;
          let subTotal = 599 * itemqty;
          $('#subTotal').empty().text('₹'+subTotal);
          $('#total').empty().text('₹'+subTotal);

      }
  } 

    $(".color-option").click(function () {
        let color = $(this).attr("data-color");
        let capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1);
        $('#colorName').text(capitalizedColor);

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



    $('#checkoutBtn').on('click', function () {
        let btn = $(this); // Store reference to button
        btn.append(' <div class="spinner-border spinner-border-sm text-light" role="status"></div>');
        btn.attr('disabled', true); // Disable button
    
        let color = $('#colorName').text();
        let itemqty = $('#quantity').text();
    
        Cookies.set('color', color);
        Cookies.set('itemqty', itemqty);
    
        // Simulate processing (remove loader after 2 sec, then redirect)
        setTimeout(function () {
            btn.find('.spinner-border').remove(); // Remove spinner
            btn.attr('disabled', false); // Enable button
            window.location.href = 'checkout.php';
        }, 2000); // Adjust time as needed
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
      if (isValid) {
          var btn = $('form#checkOutForm button[type="submit"]');
          // alert('Form is valid! Proceeding with submission.');
          // window.location.href = 'orderProcess.php';
          btn.append(' <div class="spinner-border spinner-border-sm text-light" role="status"></div>');
          btn.attr('disabled', true); // Disable button

          let formAction = $(this).attr('action'); // Get form action URL
          let formData = $(this).serialize(); // Serialize form data

          let color = Cookies.get('color');
          let itemqty = Cookies.get('itemqty');
          formData += `&color=${encodeURIComponent(color)}&itemqty=${encodeURIComponent(itemqty)}`;

          
          $.ajax({
              url: formAction,
              type: 'POST',
              data: formData,
              success: function(response) {
                let result = JSON.parse(response);
                  // Optionally redirect to success page
                  // window.location.href = "success.html";
                  if(result.status){
                     if(result.payment == 'online'){
                        startPayment(result.orderDetails,result.mobile);
                     }else{
                         btn.find('.spinner-border').remove(); 
                         btn.attr('disabled', false); // Disable button             
                         window.location.href = "thankyou.php";
                     }
                  }
              },
              error: function(error) {
                  alert('Something went wrong!');
                  console.log(error);
                  btn.find('.spinner-border').remove(); 
                  btn.attr('disabled', false); // Disable button
              }
          });

          
      }
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

        $('#prepaidorder').text('₹'+discount); // Show discount amount
        $('#total').text('₹'+finalSum); // Show final amount
        $('.prepaidorderBox').css('display', 'block'); // Show discount box
    } else {
        // If Cash on Delivery is selected, reset to original subtotal
        $('#prepaidorder').text('0'); // No discount
        $('#total').text('₹'+subTotal); // Set total to original subtotal
        $('.prepaidorderBox').css('display', 'none'); // Hide discount box
    }
});




function startPayment(order_id, mobileNumber, customerName = "", customerEmail = "") {
 
  var options = {
      key: "rzp_live_wEoP58ZS6GW7Op", // Replace with your Razorpay API Key
      amount: 0, // Amount will be dynamically set in backend
      currency: "INR",
      name: "NoirÉlan",
      description: "Payment for your order",
      image: "https://xn--noirlan-eya.com/assets/images/logo/logo.PNG",
      order_id: order_id, // Order ID from backend
      prefill: {
          contact: mobileNumber
      },
      notes: {
          order_id: order_id,
          business: "NoirÉlan Luxury Store"
      },
      theme: {
          color: "#738276",
          backdrop_color: "#f4f4f4" // Light grey background
      },
      modal: {
          escape: false, // Prevent closing on Esc key
          animation: true // Enable smooth animation
      },
      retry: {
          enabled: true,
          max_count: 3 // Allow up to 3 retry attempts
      },
      send_sms_hash: true, // Enable SMS OTP verification
      handler: function (response) {
        window.location.href = "thankyou.php?order_id=" + order_id;
      },
      modal: {
          ondismiss: function () {
              alert("Payment was not completed!");
              var btn = $('form#checkOutForm button[type="submit"]');
            // alert('Form is valid! Proceeding with submission.');
            // window.location.href = 'orderProcess.php';
            btn.find('.spinner-border').remove(); 
            btn.attr('disabled', false); // Disable button
          }
      }
  };

  var rzp = new Razorpay(options);
  rzp.open();
}

    

});