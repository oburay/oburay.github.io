<?php
if (file_exists("mainlist.txt")&&file_exists("runagain.txt")) {
require_once("linklist.class.php");
session_start();
$s=file_get_contents('mainlist.txt');
$a=unserialize($s);
$arr=$a->getList();
$get=array();
$b=$a->find($_SESSION['name'],$_SESSION["refnum"]);
$i=0;

foreach ($arr as $key => $value){
	if ($b->data['flight']==$value['flight']){
		$get[$i]=$value['seat'];
	}
	/*switch ($b->data['seat']) {
		case 'K-C45':
		$get[$i]=$value['seat'];
		break;
		case 'AJ45':
		$get[$i]=$value['seat'];
		break;
		case 'XL89':
		$get[$i]=$value['seat'];
		break;
		case 'SY-u34':
		$get[$i]=$value['seat'];
		break;
	}*/
	
	$i++;
}
$get['mine']=$b->data['seat'];
echo json_encode($get);
}else
{
	echo "<h3>List is empty</h3.";
}
?>