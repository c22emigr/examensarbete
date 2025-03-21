<?php
$servername = "localhost";
$username = "root";
$password = "";
$db_name = "examensarbete";
$conn = new mysqli($servername, $username, $password, $db_name);
if($conn->connect_error){
die(" failed".$conn->connect_error);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['name'])) {
    $search = $_POST['name'];

    $mariadb = "SELECT * FROM aktier WHERE stock_name LIKE ?";
    $stmt->bind_param("s", $search);
    $stmt->execute();

    $data = $stmt->get_result();
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
                <h2>Browse stocks</h2>

                <div class="form">
                    <input type="text" name="name" id="stocksearch" placeholder="Stock Search">
                    <button type="submit" class="" id="stocksearchbutton" onclick="">Search</button>
                </div>
            </div>
        </form>
    </div>

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
                <th>Value</th>
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