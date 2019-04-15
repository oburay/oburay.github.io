<?php
if (file_exists("mainlist.txt")&&file_exists("runagain.txt")) {
	require_once("linklist.class.php");
session_start();
$s=file_get_contents('mainlist.txt');
$a=unserialize($s);

if ($a->find($_POST['name'],$_POST['refnum']))
	echo "Still reserved";
else
	echo "Does not exist!";
}else
{
	echo "List is empty";
}


?>