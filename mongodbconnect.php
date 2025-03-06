<?php
require 'vendor/autoload.php'; // Ladda in Composer-autoloadern

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->test->users;

$result = $collection->insertOne(['name' => 'Testanvändare', 'email' => 'test@example.com']);
echo "Ny användare skapad med ID '{$result->getInsertedId()}'";
?>
