<?php
$servername = "localhost";
$username = "root";
$password = "";
$db_name = "examensarbete";
$conn = new mysqli($servername, $username, $password, $db_name);
if($conn->connect_error){
die(" failed".$conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['name'])) {
    $raw_search = $_POST['name']; // Wildcard search
    $search = "%" . $raw_search . "%";
    $image_search = str_replace(' ', '_', $raw_search) . '.png'; // Bildfiler har _ istället för mellanrum

    $stmt = $conn->prepare("SELECT * FROM aktier WHERE stock_name LIKE ?");
    $stmt->bind_param("s", $search);
    $stmt->execute();

    $data = $stmt->get_result();

    $image_stmt = $conn->prepare("SELECT image_data FROM bilder WHERE filename = ?");
    $image_stmt->bind_param("s", $image_search);
    $image_stmt->execute();
    $image_result = $image_stmt->get_result();

    $image_base64 = null;

    if ($image_row = $image_result->fetch_assoc()) {
        $image_data = $image_row['image_data'];
        $image_base64 = 'data:image/png;base64,' . base64_encode($image_data); 
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
                    <button type="submit" class="" id="stocksearchbutton" onclick="">Search</button>
                </div>
            </div>
        </form>
    </div>

    <?php if (!empty($image_base64)): ?>
            <div class="centrera">
                <img src="<?php echo $image_base64; ?>" class="pricehistory" />
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
            <?php if (isset($data)): ?>
                <?php while ($row = $data->fetch_assoc()): ?>
                    <tr class="pad">
                        <td><?php echo $row['stock_name']; ?></td>
                        <td><?php echo $row['datetime']; ?></td>
                        <td><?php echo $row['open']; ?></td>
                        <td><?php echo $row['high']; ?></td>
                        <td><?php echo $row['low']; ?></td>
                        <td><?php echo $row['close']; ?></td>
                        <td><?php echo $row['volume']; ?></td>
                    </tr>                
                <?php endwhile; ?>
            <?php endif; ?>
        </table>
    </div>

</body>
</html>