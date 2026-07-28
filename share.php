<?php
header("Content-Type: application/json");

const MAX_SIZE = 50000; // 50 KB

$data = file_get_contents("php://input");

if ($data === false || strlen($data) > MAX_SIZE) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid data size"]);
    exit;
}


// Validate JSON
$json = json_decode($data, true);

if (!is_array($json)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON"]);
    exit;
}


// Example validation: only allow object-style localStorage values
foreach ($json as $key => $value) {
    if (!is_string($key)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid key"]);
        exit;
    }

    if (!is_string($value)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid value"]);
        exit;
    }
}

/*
// Generate random token
$token = rtrim(strtr(
    base64_encode(random_bytes(9)),
    '+/',
    '-_'
), '=');
*/

// Generate SHA-256 hash of canonical JSON
$hash = hash('sha256', json_encode($json));
$shorthash = substr(
    rtrim(strtr(base64_encode(hex2bin($hash)), '+/', '-_'), '='),
    0,
    8
);

// SQLite database
$db = new PDO("sqlite:shares.sqlite");

$db->setAttribute(
    PDO::ATTR_ERRMODE,
    PDO::ERRMODE_EXCEPTION
);


$db->exec("
CREATE TABLE IF NOT EXISTS shares (
    hash TEXT PRIMARY KEY,
	shorthash TEXT UNIQUE NOT NULL,
    data TEXT NOT NULL,
    created INTEGER NOT NULL
)
");

// 1. Check if this exact data already exists
$stmt = $db->prepare("
    SELECT shorthash
    FROM shares
    WHERE hash = :hash
");

$stmt->execute([
    ":hash" => $hash
]);

$existing = $stmt->fetch(PDO::FETCH_ASSOC);

if ($existing) {
    echo json_encode([
        "token" => $existing["shorthash"]
    ]);
    exit;
}

// 2. Generate a unique short ID
$length = 8;

do {
    $shorthash = substr(
        rtrim(strtr(base64_encode(hex2bin($hash)), '+/', '-_'), '='),
        0,
        $length
    );

    $stmt = $db->prepare("
        SELECT COUNT(*)
        FROM shares
        WHERE shorthash = :shorthash
    ");

    $stmt->execute([
        ":shorthash" => $shorthash
    ]);

    $exists = $stmt->fetchColumn() > 0;

    if ($exists) {
        $length += 2; // Make it longer if collision occurs
    }

} while ($exists);


// 3. Insert new share

$stmt = $db->prepare("
INSERT INTO shares
(hash, shorthash, data, created)
VALUES
(:hash, :shorthash, :data, :created)
");


$now = time();

$stmt->execute([
    ":hash" => $hash,
    ":shorthash" => $shorthash,
    ":data" => json_encode($json),
    ":created" => $now
]);


echo json_encode([
    "token" => $shorthash
]);
?>