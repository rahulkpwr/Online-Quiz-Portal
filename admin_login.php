<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  echo json_encode(["error" => "No input received"]);
  exit;
}

$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

if ($username === "" || $password === "") {
  echo json_encode(["error" => "Username or password missing"]);
  exit;
}

$stmt = $conn->prepare(
  "SELECT id, username FROM admins WHERE username = ? AND password = ?"
);

if (!$stmt) {
  echo json_encode(["error" => $conn->error]);
  exit;
}

$stmt->bind_param("ss", $username, $password);
$stmt->execute();

$result = $stmt->get_result();

if ($admin = $result->fetch_assoc()) {
  echo json_encode([
    "success" => true,
    "admin" => $admin
  ]);
} else {
  echo json_encode([
    "success" => false,
    "error" => "Invalid admin credentials"
  ]);
}
