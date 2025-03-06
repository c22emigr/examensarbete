<?php
try {
$conn = new MongoDB\Driver\Manager("mongodb://localhost:27017");
} catch (MongoDBDriverExceptionException $e) {
echo 'Failed connection!<br /><br />';
echo $e->getMessage();
exit();
}
?>
