<?php

class Database
{
    private $serverName;
    private $username;
    private $password;
    private $database;
    private $port;

    private $con = null;

    public function __construct()
    {
        $this->serverName = "db";
        $this->username = $_ENV["MYSQL_USERNAME"];
        $this->password = $_ENV["MYSQL_PASSWORD"];
        $this->database = $_ENV["MYSQL_DATABASE"];
        $this->port = $_ENV["MYSQL_PORT"];
    }
    public function getConnection()
    {
        if ($this->con != null) {
            return $this->con;
        }

        try {
            $con = new mysqli($this->serverName, $this->username, $this->password, $this->database, $this->port);
            if ($con->connect_error) {
                throw new Exception("Could not connect to database");
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        return $con;
    }
}
