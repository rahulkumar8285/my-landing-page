<?php require_once('include/function.php'); 

$product =  get_all('product_reviews');
if(isset($product) && !empty($product)){
  foreach($product as $row){
?>
<div class="review-card">
    <div class="review-header">
        <div class="stars">
            <?php
                $rating = $row['rating'];
                for($i = 1; $i <= 5; $i++) {
                    if($rating >= $i) {
                        echo "★"; 
                    } else if($rating > $i-1) {
                        echo "★";
                    } else {
                        echo "☆";
                    }
                }
              ?>                  
        </div>
        <div class="verified-badge">● Verified Buyer</div>
    </div>
    <p class="review-text">
        <?= $row['product_details'] ?>
    </p>
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

