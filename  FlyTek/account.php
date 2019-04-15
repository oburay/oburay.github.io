<?php
	require_once("linklist.class.php");
	
	$fp=fopen("runagain.txt","a");
	$str=file_get_contents("runagain.txt");
	settype($str,"integer");
	if (!$str) {
	$fp=fopen("runagain.txt","w");
	fwrite($fp, "1");
	$Main_list=new LinkList();
	$s=serialize($Main_list);
	file_put_contents('mainlist.txt', $s);
	}
	$s=file_get_contents('mainlist.txt');
	$a=unserialize($s);
	
	

	$fly_from=$_POST['fly_from'];
	$fly_to=$_POST['fly_to'];
	$depart_date=$_POST['depart_date'];
	$return_date=$_POST['return_date'];
	$username=filter_var($_POST['username'], FILTER_SANITIZE_STRING);
	$age=$_POST['age'];
	$refnum=$a->getRef()+1;
	$refnum=str_pad((string)$refnum,3,"0",STR_PAD_LEFT);
	switch ($fly_from.$fly_to) {
		case "AccraLagos":
		case "LagosAccra":
		$refnum="K-C45".$refnum;
		break;
		case "LomeTokyo":
		case "TokyoLome":
		$refnum="AJ360".$refnum;
		break;
		case "CairoLondon":
		case "LondonCairo":
		$refnum="XL89".$refnum;
		break;
		default:
		$refnum="SY-u34".$refnum;
		break;
	}
	
	$email=$_POST['email'];
	$phone=$_POST['phone'];
	$class=$_POST['class'];
	$seatnum=NULL;
	

	/*if($arr)
	{
		for ($i=0; $i < count($arr); $i++) { 
			
				if($arr[$i]==$Data)
				{
					$ans=1;
					break;
				}
		}
	}*/

	
		try {
		$arr1=explode("/",$depart_date);
		$arr2=($return_date!="never") ? $arr2=explode("/", $return_date): "never";
		
		$dep=new dateTime($arr1[2]."-".$arr1[0]."-".$arr1[1]);
		if ($arr2!="never") {
			$ret=new dateTime($arr2[2]."-".$arr2[0]."-".$arr2[1]);
		}

		$retVal = ((int)$username) ? false : $username ;
		
		if(filter_var($age, FILTER_VALIDATE_INT)&&$age<=150&&$retVal&&filter_var($email, FILTER_VALIDATE_EMAIL)&&filter_var($phone, FILTER_VALIDATE_FLOAT)&&strlen($phone)==10)
		{

			$Data = array('name'=>$username,'age'=>$age,'email'=>$email,'phone'=>$phone,'fly_from' => $fly_from,'fly_to'=>$fly_to ,'depart_date'=>$depart_date,'return_date'=>$return_date,'class'=>$class,'seat'=>$seatnum,'refnum'=>$refnum,'flight'=>substr($refnum,0,strlen($refnum)-3));

			$arr=$a->getList();
			$ans=0;
			if ($arr) {
				for ($i=0; $i < count($arr); $i++) { 
					if (count(array_intersect_assoc($arr[$i], $Data))>9) {
						$ans=1;
						break;
					}	
				}
				
			}
			if (!$ans) {
			$a->insert($Data);
			echo "Done!<br>Your booking reference is<br>{$refnum}";
			}else{
				echo "<br>Already exists!";
			}
		}else
		{
			echo "<br>Ivalid input(s)";
		}
		}catch (Exception $e) {
		echo "<br>Ivalid input(s)";
		}

	$s=serialize($a);
	file_put_contents('mainlist.txt', $s);
	fclose($fp);
?>