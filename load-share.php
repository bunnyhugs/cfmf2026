<?php
header("Content-Type: application/json");

$shorthash = $_GET["share"] ?? "";

// Validate short ID format
if (!preg_match('/^[A-Za-z0-9_-]{8,12}$/', $shorthash)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid share ID"]);
    exit;
}

$db = new PDO("sqlite:shares.sqlite");

$db->setAttribute(
    PDO::ATTR_ERRMODE,
    PDO::ERRMODE_EXCEPTION
);


$stmt = $db->prepare("
SELECT data
FROM shares
WHERE shorthash = :shorthash
");


$stmt->execute([
    ":shorthash" => $shorthash
]);


$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    http_response_code(404);
    echo json_encode(["error" => "Share not found"]);
    exit;
}


echo $row["data"];

?>
