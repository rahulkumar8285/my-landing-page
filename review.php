<?php require_once('include/function.php'); 

$product =  get_all('product_reviews');
if(isset($product) && !empty($product)){
  foreach($product as $row){
?>
<div class="review-card">
    <div class="review-header">
        <div class="stars">
        <?php
            $rating = $row['rating']; // Fetch rating from database
            $fullStars = floor($rating); // Count of full stars (e.g., 4 for 4.5)
            $halfStar = ($rating - $fullStars) >= 0.5 ? true : false; // Check if half star is needed

            // Print stars
            for ($i = 1; $i <= 5; $i++) {
                if ($i <= $fullStars) {
                    echo "<span style='color: gold;'>★</span>"; // Full Star
                } elseif ($halfStar && $i == $fullStars + 1) {
                    echo "<span style='color: gold;'>☆</span>"; // Half Star (adjusted for display)
                    $halfStar = false; // Ensure only one half-star appears
                } else {
                    echo "<span style='color: #ccc;'>★</span>"; // Empty Star (Gray)
                }
            }
        ?>            
        </div>
        <div class="verified-badge">● Verified Buyer</div>
    </div>
    <p class="review-text">
        <?= $row['product_details'] ?>
    </p>

         
    <?php  if(!empty($row['productImage'])) { ?>
                    <div class="reviewer-image">
                        <img src="assets/images/product-review/<?= $row['productImage'] ?>.jpg" height="80" width="auto"  
                        alt="Reviewer Image" class="reviewer-img" >
                    </div>
                  <?php } ?>
                  
    <div class="reviewer-info">
        <strong><?= $row['full_name'] ?></strong><br>
        <?= date( 'd-m-Y', strtotime($row['created_at'])); ?>
    </div>
</div>
<hr>
<?php
  }
}

?>

