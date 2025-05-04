
<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mystore";


// $servername = "localhost";
// $username = "u961445218_mystore";
// $password = "y5DaI]&N";
// $dbname = "u961445218_mystore";



$razorpay_config = array(
    'api_key' => 'rzp_live_wEoP58ZS6GW7Op',
    'api_secret' => '7OTdm1YbFzItQLIOczW3JBoD',
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
