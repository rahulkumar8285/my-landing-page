<?php
 require_once('config.php');

function get_all($table) 
{
    global $conn;    
    try {
        $stmt = $conn->prepare("SELECT * FROM $table");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        return "Error: " . $e->getMessage();
    }
}    


function getReviewData($table, $limit = 10, $offset = 0) 
{
    global $conn;    
    try {
        $stmt = $conn->prepare("SELECT * FROM $table LIMIT :limit OFFSET :offset");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        return "Error: " . $e->getMessage();
    }
}  

function getLastOrderId() {
    global $conn;    

    try {
        // Fetch the last order ID (assumes order_id column stores values like "NL-0001")
        $query = "SELECT paymentOrderId FROM orders ORDER BY id DESC LIMIT 1";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $lastId = $stmt->fetchColumn();

        if ($lastId) {
            // Extract the numeric part from the last ID (e.g., "NL-0001" → "0001")
            preg_match('/(\d+)$/', $lastId, $matches);
            $numPart = isset($matches[1]) ? (int) $matches[1] : 0;

            // Increment the numeric part
            $newNum = $numPart + 1;

            // Format the new order ID (ensuring 4-digit format, e.g., "NL-0002")
            $newOrderId = 'NL-' . str_pad($newNum, 4, '0', STR_PAD_LEFT);
        } else {
            // If no previous orders exist, start with "NL-0001"
            $newOrderId = 'NL-0001';
        }

        return $newOrderId; // Return without stopping script execution

    } catch (PDOException $e) {
        die("Error: " . $e->getMessage()); // Show error if query fails
    }
}



function createOrder($postData) {
    global $conn;    

    try {

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


        // Get last order ID and generate a new one
        $lastOrderId = getLastOrderId($conn);
        // Calculate Order Total
        $quantity = (int) $postData['itemqty'];
        // $productPrice = 599; // Fixed product price
        $color = strtolower($postData['color']);
        $productPrice = $productPriceList[$color]['sellPrice'];

        $subTotal = $productPrice * $quantity;
        $discount = ($postData['paymentMethod'] === 'Online Pay') ? round($subTotal * 0.05) : 0;
        $total = $subTotal - $discount;

        // Prepare SQL query to insert order details
        $query = "INSERT INTO orders 
            (phone, email, firstName, lastName, address, city, state, postalCode, color, subTotal, Total, qnty, orderType, paymentStatus, paymentOrderId, razerOrderId, create_at) 
            VALUES 
            (:phone, :email, :firstName, :lastName, :address, :city, :state, :postalCode, :color, :subTotal, :Total, :qnty, :orderType, :paymentStatus, :paymentOrderId, :razerOrderId, NOW())";

        $stmt = $conn->prepare($query);

        // Bind parameters
        $stmt->bindParam(':phone', $postData['phone']);
        $stmt->bindParam(':email', $postData['email']);
        $stmt->bindParam(':firstName', $postData['firstName']);
        $stmt->bindParam(':lastName', $postData['lastName']);
        $stmt->bindParam(':address', $postData['address']);
        $stmt->bindParam(':city', $postData['city']);
        $stmt->bindParam(':state', $postData['state']);
        $stmt->bindParam(':postalCode', $postData['postalCode']);
        $stmt->bindParam(':color', $postData['color']);
        $stmt->bindParam(':subTotal', $subTotal);
        $stmt->bindParam(':Total', $total);
        $stmt->bindParam(':qnty', $quantity);
        $stmt->bindParam(':orderType', $postData['paymentMethod']);
        $stmt->bindParam(':paymentStatus', $postData['paymentStatus']);
        $stmt->bindParam(':paymentOrderId', $lastOrderId); // FIXED: Assign the correct order ID
        $stmt->bindParam(':razerOrderId', $postData['razerOrderId']); // Razorpay order ID

        // Execute the query
        if ($stmt->execute()) {
            return ['status' => true, 'order_id' => $lastOrderId, 'amount' => $total];
        } else {
            return ['status' => false, 'message' => 'Order creation failed'];
        }
    } catch (PDOException $e) {
        return ['status' => false, 'error' => $e->getMessage()];
    }
}



function orderUpdate($orderId, $paymentStatus) {
    global $conn;

    try {
       
        // Update the payment status
        $updateQuery = "UPDATE orders SET paymentStatus = :paymentStatus WHERE razerOrderId = :orderId";
        $updateStmt = $conn->prepare($updateQuery);
        $updateStmt->bindParam(':paymentStatus', $paymentStatus);
        $updateStmt->bindParam(':orderId', $orderId);

        if ($updateStmt->execute()) {
            return ['status' => true, 'message' => 'Payment status updated successfully'];
        } else {
            return ['status' => false, 'message' => 'Failed to update payment status'];
        }

    } catch (PDOException $e) {
        return ['status' => false, 'error' => $e->getMessage()];
    }
}




?>


