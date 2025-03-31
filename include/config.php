
<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mystore";

$razorpay_config = array(
    'api_key' => 'rzp_test_Y2wy8t1wD1AFaA',
    'api_secret' => 'zSqRMpIa2ljBBpkieFYGmfLa',
);

// Create connection
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Set PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Connected successfully";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
