<?php
require('razorpay/Razorpay.php');
require_once('include/function.php');
use Razorpay\Api\Api;

// Get form data
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$address = $_POST['address'] ?? '';
$city = $_POST['city'] ?? '';
$state = $_POST['state'] ?? '';
$postalCode = $_POST['postalCode'] ?? '';
$paymentMethod = $_POST['paymentMethod'] ?? '';
$color = $_POST['color'] ?? '';
$itemqty = $_POST['itemqty'] ?? 1;

// Convert item quantity to integer
$itemqty = (int)$itemqty;

$productPriceList = [
    'pack of 1' => [
        'delPrice' => 399,
        'sellPrice' => 249,
    ],
    'pack of 4' => [
        'delPrice' => 1599,
        'sellPrice' => 899,
    ],
    'pack of 16' => [
        'delPrice' => 5999,
        'sellPrice' => 3499,
    ],
];

$color = strtolower($color);
$productPrice = $productPriceList[$color]['sellPrice'];

// Product price per unit
// $productPrice = 599;

// Calculate subtotal
$subTotal = $productPrice * $itemqty;

// Apply 5% discount for Online Payment
$discount = 0;

$result = [];
$lastOrderId = getLastOrderId();



if ($paymentMethod === 'Online Pay') {
    $discount = round($subTotal * 0.05); // 5% discount
    $finalPayamount = $subTotal - $discount;

    $api_key = 'rzp_live_wEoP58ZS6GW7Op';
    $api_secret = '7OTdm1YbFzItQLIOczW3JBoD';

    $api = new Api($api_key, $api_secret);
    
    // Create an order
    $order = $api->order->create([
        'amount' => $finalPayamount * 100, // Convert to paise
        'currency' => 'INR',
        'receipt' => $lastOrderId
    ]);
    // Get the order ID
    $order_id = $order->id ?? null; 
    $_POST['razerOrderId'] = $order_id;
    $_POST['paymentStatus'] = 'pending';
    createOrder($_POST);
    echo trim(json_encode(['status' => true, 'payment' => 'online', 'orderDetails' => $order_id , 'mobile'=> $phone ]));
    exit;
} else {
    createOrder($_POST);
    echo trim(json_encode(['status' => true, 'payment' => 'cod', 'orderDetails' => $lastOrderId]));
    exit;
}



