<?php
require '../vendor/autoload.php';

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->examensarbete->examensarbete;

$documents = $collection->find();

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
        <table>
            <ul>
                <?php foreach ($documents as $doc): ?>
                    <tr>
                        <td><?php echo $doc['_id']; ?></td>
                        <td><?php echo $doc['datetime']; ?></td>
                        <td><?php echo $doc['open']; ?></td>
                        <td><?php echo $doc['high']; ?></td>
                        <td><?php echo $doc['low']; ?></td>
                        <td><?php echo $doc['close']; ?></td>
                        <td><?php echo $doc['volume']; ?></td>
                    </tr>                
                <?php endforeach; ?>
            </ul>
        </table>
    </div>

</body>
</html>