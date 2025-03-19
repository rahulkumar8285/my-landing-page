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





?>


