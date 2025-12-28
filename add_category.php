<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$name = trim($data["name"] ?? "");

if ($name === "") {
  echo json_encode(["success" => false, "error" => "Category name required"]);
  exit;
}

$stmt = $conn->prepare(
  "INSERT INTO categories (name) VALUES (?)"
);

if (!$stmt) {
  echo json_encode(["success" => false, "error" => $conn->error]);
  exit;
}

$stmt->bind_param("s", $name);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode([
    "success" => false,
    "error" => "Category already exists"
  ]);
}
