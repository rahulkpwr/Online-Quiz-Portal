<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$sql = "
  SELECT
    users.name AS user_name,
    exams.title AS exam_title,
    results.score,
    results.created_at
  FROM results
  JOIN users ON results.user_id = users.id
  JOIN exams ON results.exam_id = exams.id
  ORDER BY results.created_at DESC
";

$res = $conn->query($sql);

$results = [];
while ($row = $res->fetch_assoc()) {
  $results[] = $row;
}

echo json_encode($results);
