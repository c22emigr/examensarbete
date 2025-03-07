<?php
require '../vendor/autoload.php';

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->mydatabase->users;

$searchResult = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $searchResult = $collection->find(['name' => $name]);
}
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
                <h2>Aktiesök</h2>

                <div class="form">
                    <input type="text" name="" id="" placeholder="Aktiesök">
                    <button type="submit" class="" id="" onclick=""></button>
                </div>
            </div>
        </form>
    </div>

    <div>
        <ul>
            <?php foreach ($searchResult as $doc): ?>
                <li><?php echo "Namn: " . $doc['name'] . " - Email: " . $doc['email']; ?></li>
            <?php endforeach; ?>
        </ul>
    </div>

</body>
</html>