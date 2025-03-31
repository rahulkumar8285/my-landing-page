<?php
    require_once('./include/header.php');
    $orderId =  $_GET['order_id'];

    if (empty($orderId)) {
        echo '<script>
                alert("Something went wrong!"); 
                window.location.href = "/";
              </script>';
        exit;
    } else {
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