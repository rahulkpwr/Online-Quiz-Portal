<?php
include "db.php";

if (!isset($_GET['exam_id'])) {
    echo json_encode(null);
    exit;
}

$exam_id = intval($_GET['exam_id']);
$res = $conn->query(
    "SELECT duration_minutes FROM exams WHERE id = $exam_id"
);

if ($res && $res->num_rows > 0) {
    echo json_encode($res->fetch_assoc());
} else {
    echo json_encode(null);
}
