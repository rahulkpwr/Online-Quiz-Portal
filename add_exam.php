<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$title = $data["title"] ?? "";
$category_id = $data["category_id"] ?? "";
$duration = $data["duration_minutes"] ?? "";

if ($title === "" || $category_id === "" || $duration === "") {
    echo json_encode([
        "success" => false,
        "message" => "Missing data"
    ]);
    exit;
}

$stmt = $conn->prepare(
    "INSERT INTO exams (title, category_id, duration_minutes)
     VALUES (?, ?, ?)"
);

$stmt->bind_param("sii", $title, $category_id, $duration);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "exam_id" => $conn->insert_id   // 🔥 THIS IS CRITICAL
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Insert failed"
    ]);
}

$stmt->close();
$conn->close();
