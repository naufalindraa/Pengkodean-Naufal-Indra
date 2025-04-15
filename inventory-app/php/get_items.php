<?php
include 'config.php';

$sql = "SELECT * FROM items ORDER BY created_at DESC";
$result = mysqli_query($conn, $sql);

$items = array();
while ($row = mysqli_fetch_assoc($result)) {
    $items[] = $row;
}

echo json_encode($items);
mysqli_close($conn);
?>