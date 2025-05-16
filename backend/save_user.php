<?php
$conn = new mysqli("localhost", "root", "", "portfolio_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$sql = "INSERT INTO users (name, profession, about, skills, projects) 
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $data['name'], $data['profession'], $data['about'], $data['skills'], $data['projects']);
$stmt->execute();

echo json_encode(["success" => "User data saved"]);
$conn->close();
?>
