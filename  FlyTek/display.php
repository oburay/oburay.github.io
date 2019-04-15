<?php
if (file_exists("mainlist.txt")&&file_exists("runagain.txt")) {
require_once("linklist.class.php");
$s=file_get_contents('mainlist.txt');
$a=unserialize($s);
$arr=$a->getList();

echo json_encode($arr);
}
?>