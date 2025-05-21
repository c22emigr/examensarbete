<?php
require '../vendor/autoload.php';

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->examensarbete->aktier1000;

$bucket = $client->examensarbete->selectGridFsBucket();

$documents = []; // Tom array som sökning insertas i

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['name'])) {
    $search = $_POST['name'];

    $image_search = str_replace(' ', '_', $search);
    $image_search = rtrim($image_search, '.');
    $image_search = str_replace(',', '', $image_search);
    $image_search .= '.png';

    error_log("Filename generated: " . $image_search); // <--- Logga till PHP error log

    // Sökning. La till datetime ordning
    $cursor = $collection->find(
        ['stock_name' => $search],
        ['sort' => ['datetime' => 1]] // 1 = stigande, -1 = fallande
    );

    $imageCollection = $client->examensarbete->bilder;

    foreach ($cursor as $document) {
        // Hämta bild från vanlig MongoDB-kollektion, inte GridFS
        $imageDoc = $imageCollection->findOne(['filename' => $image_search]);

        if ($imageDoc && isset($imageDoc['image'])) {
            $document['image_data'] = 'data:image/png;base64,' . base64_encode($imageDoc['image']->getData());
        }

        $documents[] = $document;
    }


    // För varje aktie ska även respektive bild hämtas
    // foreach ($cursor as $document) {
    //     // try {
    //     //     $image_file = $bucket->findOne(['filename' => $image_search]);

    //     //     if ($image_file !== null) {
    //     //         $image_stream = $bucket->openDownloadStream($image_file['_id']);
    //     //         $image_data = stream_get_contents($image_stream);

    //     //         if ($image_data) {
    //     //             $document['image_data'] = 'data:image/png;base64,' . base64_encode($image_data);
    //     //         }
    //     //     }
    //     // }  catch (MongoDB\GridFS\Exception\FileNotFoundException $e) {
    //     //     // Error om bild inte finns
    //     // }
    //     $documents[] = $document;
    // }


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
                        <td><?php echo date('Y-m-d', $doc['datetime']->toDateTime()->getTimestamp()); ?></td>
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