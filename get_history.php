<?php
include "db.php";

if (!isset($_GET['user_id'])) {
    echo json_encode([]);
    exit;
}

$user_id = intval($_GET['user_id']);

$sql = "
SELECT 
    results.id,
    results.score,
    results.total_questions,
    results.correct_answers,
    results.wrong_answers,
    results.created_at,
    exams.title AS exam_title
FROM results
INNER JOIN exams ON exams.id = results.exam_id
WHERE results.user_id = $user_id
ORDER BY results.created_at DESC
";

$res = $conn->query($sql);

$data = [];
if ($res) {
    while ($row = $res->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
