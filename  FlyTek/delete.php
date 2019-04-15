<?php
if (file_exists("mainlist.txt")&&file_exists("runagain.txt")) {
require_once("linklist.class.php");
session_start();
$s=file_get_contents('mainlist.txt');
$a=unserialize($s);
if (isset($_POST['yes'])&&$_POST['yes']=='yes') {
	if($a->find($_SESSION['name'],$_SESSION["refnum"]))
	{
		$a->deleteLink($_SESSION["name"],$_SESSION["refnum"]);
		$_SESSION["name"]=NULL;
		$_SESSION["refnum"]=NULL;
		echo "Success!";
	}else{
		echo "first.html";
	}
}elseif(isset($_POST['delete'])&&$_POST['delete']=='delete'){
	if($a->find($_POST['name'],$_POST['refnum']))
	{
		$a->deleteLink($_POST["name"],$_POST["refnum"]);
		if (isset($_SESSION["name"])&&isset($_SESSION["refnum"])) {
			$_SESSION["name"]=NULL;
			$_SESSION["refnum"]=NULL;
		}
		
		echo "Success!";
	}
	else{
		echo "Not available!";
	}
}elseif (isset($_POST['cls'])) {
		system("del mainlist.txt runagain.txt");
		echo "<center><h3>SUCCESS</h3></center>";
}else
{
	echo "Check again";
}
$s=serialize($a);
file_put_contents('mainlist.txt', $s);
}else
{
	echo "<h3>List is empty!</h3.";
}
?>