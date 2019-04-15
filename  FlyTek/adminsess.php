<?php
session_start();
if ($_SERVER["REQUEST_METHOD"]=="POST") {
	$_SESSION['admin']=$_POST['admin'];
	$_SESSION['password']=$_POST['password'];
	echo "successful";
}
?>