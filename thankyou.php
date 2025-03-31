<?php
    require_once('./include/header.php');
    
    if (isset($_GET['order_id']) && !empty($_GET['order_id'])) {
        $orderId =  $_GET['order_id'];
        $paymentStatus = 'Paid'; 
        orderUpdate($orderId, $paymentStatus);
    }

 ?>

    <div class="order-confirmation-container">
        <div class="order-confirmation-card">
            <div class="order-confirmation-icon">
                ✔
            </div>
            <h5 class="fw-bold">Your Order is Confirmed,</h5>
            <p class="text-muted">We'll notify you as soon as your order is shipped</p>
        </div>
    </div>

<?php
  require_once('./include/footer.php');
 ?>