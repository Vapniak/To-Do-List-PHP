<?php

class Checklist
{
    private $con;
    private $tableName = "checklist";

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function fetchAll()
    {
        $query = "SELECT * FROM $this->tableName ORDER BY status DESC, task;";

        $result = $this->con->query($query);

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function updateTaskStatus($id, $status)
    {
        $query = "UPDATE $this->tableName SET status = '$status' where id = '$id';";
        $this->con->query($query);
    }

    public function addTask($task)
    {
        $query = "INSERT INTO $this->tableName (status, task) VALUES (0, '$task');";
        $this->con->query($query);
    }

    public function deleteTask($id)
    {
        $query = "DELETE FROM $this->tableName WHERE id = '$id' LIMIT 1;";
        $this->con->query($query);
    }
}
