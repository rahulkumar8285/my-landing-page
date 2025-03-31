<?php
 require_once('./include/header.php');
 // Include the Razorpay PHP library
?>

<div class="container checkout-container">
    
    <div class="row">
        <!-- Left Side (Form) -->
        <div class="col-md-7">

        <form id="checkOutForm" action="orderProcess.php">
            <!-- Contact -->
            <h5>Contact</h5>
            <input type="text" class="form-control mb-3" 
                    id="phone" name="phone" 
                    placeholder="Phone Number" 
                    required 
                    maxlength="10" 
                    pattern="[0-9]{10}" 
                    title="Enter a valid 10-digit phone number"
                    oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10)">

       <input type="email" class="form-control mb-3" id="email" name="email" placeholder="Email (optional)">

            <!-- Delivery -->
            <h5>Delivery</h5>
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control mb-3" id="firstName" name="firstName" placeholder="First name" required>
                </div>
                <div class="col">
                    <input type="text" class="form-control mb-3" id="lastName" name="lastName" placeholder="Last name" required>
                </div>
            </div>

            <textarea class="form-control" id="address" name="address" placeholder="Address" rows="3" required></textarea>

            <div class="row mt-3">
                <div class="col">
                    <input type="text" class="form-control mb-3" id="city" name="city" placeholder="City" required>
                </div>
                <div class="col">
                    <input type="text" class="form-control mb-3" id="state" name="state" placeholder="State" required>
                </div>
                <div class="col">
                    <input type="text" class="form-control mb-3" id="postalCode" name="postalCode" placeholder="Postal Code" required>
                </div>
            </div>

            <!-- Payment Method -->
            <h5>Payment Method</h5>
            <spam id="paymentValidErr"></spam>
            <div class="payment-methods">
                <label>
                    <input type="radio" id="onlinePay" class="paymentMethod" name="paymentMethod" value="Online Pay" > &nbsp; Online Pay (Extra 5% Off with Your Order)
                </label>
                <label>
                    <input type="radio" id="cashOnDelivery" class="paymentMethod"  name="paymentMethod" value="Cash on Delivery"> &nbsp; Cash on Delivery
                </label>
            </div>

            <!-- Pay Now Button -->
            <button type="submit" class="btn btn-dark w-100">Buy Now</button>
        </form>

        </div>

        <!-- Right Side (Order Summary) -->
        <div class="col-md-5">
            <div class="order-summary">
                <h5>Order Summary</h5>
                <div class="d-flex align-items-center justify-content-between">
                    <div class="itemImage">
                        <div class="itmCount" id="finaCoun" ></div>
                        <img src="" id="checkout-img" alt="" height="100" >
                    </div>
                    <span>
                        Multi-color Water Proof Foldable Travel Duffel Bag With Pocket (Free Shipping)
                        <div class="">
                          Estimated delivery by <b class="deliverDate">22 March 2025</b>
                        </div>
                    </span>
                    
                </div>

                <input type="text" class="form-control mt-3" placeholder="Discount code">
                <button class="btn btn-outline-dark w-100 mt-2">Apply</button>
                <hr>
                <div class="d-flex justify-content-between">
                    <span>Order Total</span>
                    <span id="subTotal"></span>
                </div>

                <div class="prepaidorderBox" style="display:none" >
                    <div class="d-flex justify-content-between">
                        <span>Order discount <small>(GET 5% OFF PREPAID ORDER)</small></span>
                        <span id="prepaidorder"></span>
                    </div>
                </div>

                <hr>
                <div class="d-flex justify-content-between">
                    <span>Shipping</span>
                    <span>₹0</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span id="total"></span>
                </div>
            </div>
        </div>
    </div>
</div>

 <?php
  require_once('./include/footer.php');
 ?>
 <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

