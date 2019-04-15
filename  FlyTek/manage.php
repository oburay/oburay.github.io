<!DOCTYPE html>
<html>
<head>
	<title>Manage Booking</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<meta name="author" content="Group7">
	
	<script type="text/javascript" src="jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="jquery-ui.min.js"></script>
	<link rel="stylesheet" type="text/css" href="jquery-ui.min.css">
	<script type="text/javascript" defer src="fontawesome-free-5.8.1-web\js\solid.js"></script>
	<script type="text/javascript" defer src="fontawesome-free-5.8.1-web\js\fontawesome.js"></script>
	<script src="popper.js"></script>
 	<script href="bootstrap.min.js"></script>
	<link rel="stylesheet" href="bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="mgCSS.css">

	<style type="text/css">
		#info
		{
			top: -20px;
			color:white;
		}
		#infobox
		{
			text-shadow:0 1px 0 lightgray;
			box-shadow:0 0 20px black;
			background-color:rgb(255, 245, 245);
			height: 1020px;
			border-radius:7px;
			padding:20px;
			text-align:center;
		}
		#infobox h5
		{
			font-weight:bold;
			margin-top:20px;
			margin-bottom:0px;
			color: rgb(133, 0, 44);
		}
		input[type=button]
		{
			font-weight:bold;
		}
	</style>
</head>
<body>
	<div class="container-liquid">
		<header id="cont02">
		<span class="back" title="Back">
			<a href="index.html" style="text-decoration: none; color:white;"><span class="fas fa-arrow-left"></span></a>
		</span>
		<center>
			<span class="fa fa-user fa-2x" style="margin-top: 7px;"></span>
			<h4><b>Manage Booking</b></h4>
		</center>
	</header>
	</div>
	
	<section>
			<div id="dialogZ">
				<center><h3></h3></center>
			</div>
			<?php
				session_start();
				require_once("linklist.class.php");
				$s=file_get_contents('mainlist.txt');
				$a=unserialize($s);
				$arr=$a->getList();
				$get=array();
				$b=$a->find($_SESSION['name'],$_SESSION["refnum"]);
				
				if ($_SESSION['refnum']) {
					echo "</br><center><div id='info'><h4>Welcome! {$_SESSION['name']} with booking reference {$_SESSION['refnum']}.</br>What would you like to do?</h4></div></center>";
				}else
				{
					header("location:index.html");
				}
			?>
		<form id="mgbuttons">
			<input type="button" name="mgcancel" value="Cancel reservation">
			<input type="button" name="mgseat" onclick="window.location.href='seatnum.php'" value="Select seat number">
			<input type="button" name="mginfo"  value="View Info">			
		</form>
	</section>
	<div class="container" style="margin-top:10%;display:none; margin-bottom:10%;" id="infocont">
		<br>
		<div class="row">
			<div class="col-md-4"></div>
			<div class="col-md-4" style="color:black; font-size:1.4em">
				<div id="infobox">
					<div style="border-style:none;border-bottom:black 2px solid;">
						<h2>Flight Info</h2>
					</div>
					
						<?php
							echo "<h5>Full name:</h5>";
							echo $b->data['name'];
							echo "<h5>Age:</h5>";
							echo $b->data['age'];
							echo "<h5>Email:</h5>";
							echo  $b->data['email'] ;
							echo "<h5>Phone:</h5>";
							echo  $b->data['phone'] ;
							echo "<h5>Departure airport:</h5>";
							echo  $b->data['fly_from'] ;
							echo "<h5>Arrival airport:</h5>";
							echo  $b->data['fly_to'] ;
							echo "<h5>Departing on:</h5>";
							echo  $b->data['depart_date'] ;
							echo "<h5>Returning on:</h5>";
							echo  $b->data['return_date'] ;
							echo "<h5>Class:</h5>";
							echo  $b->data['class'] ;
							echo "<h5>Seat number:</h5>";
							echo  $b->data['seat'] ;
							echo "<h5>Booking reference:</h5>";
							echo  $b->data['refnum'] ;
							echo "<h5>Flight ID:</h5>";
							echo  $b->data['flight'];

						?>
				</div>
			</div>
		</div>
		
	</div>
	<script type="text/javascript">
		$(document).ready(function(){
			$("#dialogZ").dialog({
				draggable:true,
				resizable:false,
				height:250,
				width:250,
				modal:true,
				show:10,
				hide:100,
				autoOpen:false,
				buttons:{
					"YES":function(){
						$.ajax({
							type: 'POST',
							url: 'delete.php',
							data: {yes:"yes"},
							success: function(response){
								if (response!="first.html") {
									$('#dialogZ h3').html(response).css({
									"color":"orange",
									});
									$("#dialogZ").dialog({buttons:{"OK":function(){$(this).dialog("close");}}});
									$("#dialogZ").dialog("open");
								setInterval(function(){window.location.href='first.html';},1000);
								}else{
									window.location.href='first.html';
								}
							
								}
								
							});
						},
					"CANCEL":function(){
						$(this).dialog("close");
					}
				}
			});
			$("#mgbuttons input[name='mgcancel']").click(function(){
				$("#dialogZ").dialog("open");
				$('#dialogZ h3').html("Do you really want to do this?").css({
					"color":"red",
				});
			});
			$("input[name='mginfo']").click(function(){
				$("#infocont").toggle();
				if($("input[name='mginfo']").val()=="View Info")
				{
					$("input[name='mginfo']").val("Close Info");
				}else{
					$("input[name='mginfo']").val("View Info");
				}
			});
			
		});
		
		
	</script>
</body>
</html>
