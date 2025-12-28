<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$exam_id = $data["exam_id"] ?? "";
$question = $data["question"] ?? "";
$option_a = $data["option_a"] ?? "";
$option_b = $data["option_b"] ?? "";
$option_c = $data["option_c"] ?? "";
$option_d = $data["option_d"] ?? "";
$correct = $data["correct_option"] ?? "";

if (
  !$exam_id || !$question ||
  !$option_a || !$option_b ||
  !$option_c || !$option_d ||
  !$correct
) {
  echo json_encode(["success" => false, "message" => "Missing fields"]);
  exit;
}

$stmt = $conn->prepare(
  "INSERT INTO questions
   (exam_id, question, option_a, option_b, option_c, option_d, correct_option)
   VALUES (?, ?, ?, ?, ?, ?, ?)"
);

$stmt->bind_param(
  "issssss",
  $exam_id,
  $question,
  $option_a,
  $option_b,
  $option_c,
  $option_d,
  $correct
);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => $stmt->error]);
}
