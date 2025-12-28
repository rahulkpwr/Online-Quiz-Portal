<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$res = $conn->query("SELECT * FROM categories ORDER BY name");

$categories = [];
while ($row = $res->fetch_assoc()) {
  $categories[] = $row;
}

echo json_encode($categories);
