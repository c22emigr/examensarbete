<?php
require '../vendor/autoload.php';

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->mydatabase->users;

$searchResult = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $searchResult = $collection->find(['name' => $name]);
}
print_r($client->listDatabases());

$documents = $collection->find();

foreach ($documents as $doc) {
    echo "Datetime: " . $doc['datetime'] . "<br>";
}

echo "Datetime: " . $doc['datetime']->toDateTime()->format('Y-m-d H:i:s') . "<br>";


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    
    <title>Invest0iQ</title>
</head>

<body>
    <div>
        <img src="" alt="" class="svg">    
    </div>

    <div class="centrera">
        <h1>Invest0iQ</h1>
    </div>
    
    <div>
        <form method="POST" class="centrera">
            <div>
                <h2>Browse stocks</h2>

                <div class="form">
                    <input type="text" name="name" id="" placeholder="Stock Search">
                    <button type="submit" class="" id="" onclick="">Search</button>
                </div>
            </div>
        </form>
    </div>

    <div>
        <ul>
            <?php foreach ($searchResult as $doc): ?>
                <li><?php echo "id: " . $doc['_id'] . " - datetime: " . $doc['datetime']; ?></li>
            <?php endforeach; ?>
        </ul>
    </div>

</body>
</html>