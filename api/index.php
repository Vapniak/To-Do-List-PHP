<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once 'database.php';
include_once 'checklist.php';

$database = new Database();
$db = $database->getConnection();
$checklistObj = new Checklist($db);



$method = $_SERVER['REQUEST_METHOD'];


if ($method == 'POST') {
    // problems with axios not sending post data properrly idk why
    $task = $_GET["task"];
    $checklistObj->addTask($task);
    echo json_encode(array("message" => "Task added"));
} else if ($method == 'GET') {
    echo json_encode($checklistObj->fetchAll());
} else if ($method == "PUT") {
    $id = $_GET["id"];
    $status = $_GET["status"];
    $checklistObj->updateTaskStatus($id, $status);
    echo json_encode(array("message" => "Task updated"));
} else if ($method == "DELETE" && $_GET["id"]) {
    $id = $_GET["id"];
    $checklistObj->deleteTask($id);
    echo json_encode(array("message" => "Task deleted"));
}
