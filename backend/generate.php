<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "Invalid input"]);
    exit();
}

file_put_contents("user_input.json", json_encode($data));

$pythonOutput = shell_exec("python3 generate_portfolio.py");

echo json_encode(["portfolio" => $pythonOutput]);
?>
