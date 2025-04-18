<?php
require '../vendor/autoload.php';

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->examensarbete->aktier25;

$bucket = $client->examensarbete->selectGridFsBucket();

$documents = []; // Tom array som sökning insertas i

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['name'])) {
    $search = $_POST['name'];

    $image_search = str_replace(' ', '_', $search) . '.png'; // Bildfiler har _ istället för mellanrum

    // Sökning. regex och $options för att göra case insensitive och inte exakt
    $cursor = $collection->find([
        'stock_name' => ['$regex' => $search, '$options' => 'i']
    ]);

    // För varje aktie ska även respektive bild hämtas
    foreach ($cursor as $document) {
        try {
            $image_file = $bucket->findOne(['filename' => $image_search]);

            if ($image_file !== null) {
                $image_stream = $bucket->openDownloadStream($image_file['_id']);
                $image_data = stream_get_contents($image_stream);

                if ($image_data) {
                    $document['image_data'] = 'data:image/png;base64,' . base64_encode($image_data);
                }
            }
        }  catch (MongoDB\GridFS\Exception\FileNotFoundException $e) {
            // Error om bild inte finns
        }
        $documents[] = $document;
    }


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
        <form method="POST" class="centrera" id="searchform">
            <div>
                <h2>Browse stocks</h2>

                <div class="form">
                    <input type="text" name="name" id="stocksearch" placeholder="Stock Search">
                    <button type="submit" class="" id="stocksearchbutton">Search</button>
                </div>
            </div>
        </form>
    </div>

    <?php if (!empty($documents) && isset($documents[0]['image_data'])): ?>
            <div class="centrera">
                <img id="stock-image" src="<?php echo $documents[0]['image_data']; ?>" class="pricehistory" />
            </div>
    <?php endif; ?>  

    <div class="centrera">
        <table>
        <thead>
            <tr class="pad">
                <th>Stock name</th>
                <th>Datetime</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
            </tr>
        </thead>   
                <?php foreach ($documents as $doc): ?>
                    <tr class="pad">
                        <td><?php echo $doc['stock_name']; ?></td>
                        <td><?php echo $doc['datetime']; ?></td>
                        <td><?php echo $doc['open']; ?></td>
                        <td><?php echo $doc['high']; ?></td>
                        <td><?php echo $doc['low']; ?></td>
                        <td><?php echo $doc['close']; ?></td>
                        <td><?php echo $doc['volume']; ?></td>
                    </tr>                
                <?php endforeach; ?>
        </table>
    </div>

</body>
</html>