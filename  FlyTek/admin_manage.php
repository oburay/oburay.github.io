<!DOCTYPE html>
<html>
<head>
	<title>Manage Booking | Admin</title>
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
		#mgbuttons
		{
			margin-top: -30px;
		}
		#cancel,#check
		{
			font-size: 1.1em;
			display: none;
			position: fixed;
			z-index: 1;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			overflow: auto;
			background-color: rgba(0,0,0,0.4);
			padding-top: 60px;
		}
		#cancel div,#check div
		{
			position: relative;
			top: 50px;
			border-radius: 10px;
			background-color: #fefefe;
		  	margin: 5% auto 15% auto; 
		  	border: 1px solid #888;
			width: 30%;
			min-width: 250px;
			height: 350px;
		}
		#mgbuttons input[type=button]
		{
		  color: black;
		  padding: 14px 20px;
		  margin: 8px 0;
		  border: none;
		  cursor: pointer;
		  width: 90%;
		  font-weight:bold;
		}
		#cancel input,#check input
		{
			font-size: 1.1em;
			position: relative;
			width: 90%;
			padding: 12px 20px;
			margin: 8px 20px;
			margin-right: 40px;
			display: inline-block;
			border: 1px solid #ccc;
			border-radius: 7px;
			box-sizing: border-box;
		}
		#cancel input[type=button],#check input[type=button]
		{
			border-style: none;
			 background-color: red;
			 width: 100px;
			 color: white;
			 font-weight:bold;
		}
		#cancel h2, #cancel h2
		{
			margin: 0;
		}
		
		
	</style>
</head>
<body>
	<div id="dialogZ">
		<center><h3></h3></center>
	</div>
	<div class="container-liquid">
		<header id="cont02">
		<span class="back" title="Back">
			<a href="admin.php" style="text-decoration: none; color:white;"><span class="fas fa-arrow-left"></span></a>
		</span>
		<center>
			<span class="fas fa-user-shield fa-3x" style="margin-top: 10px;"></span>
		</center>
	</header>
	</div>
	
	<section>
		<?php
				session_start();
				if (isset($_SESSION['admin'])&&isset($_SESSION['password'])) {
					echo "<center><div id='info' style='color:white;'><h2>Welcome! Admin.</br>What would you like to do?</h2></div></center>";
				}else
				{
					header("location:admin.php");
				}
			?>
		<div id="cancel">
		<center>
			<div>
				<span onclick="document.getElementById('cancel').style.display='none'" class="fas fa-times close" title="Close"></span><br>
			<h4>Enter passenger's details</h4>
			<label><b>Full name:</b></label><br>
				<input type="text" name="fullname" required="required" /><br>
				<label><b>Booking reference:</b></label><br>
				<input type="text" name="bkref"/>
				<center><input type="button" name="login" value="delete" onclick="document.getElementById('cancel').style.display='none'"></center>
			</div>
		</center>
		</div>
		<div id="check">
		<center>
			<div>
				<span onclick="document.getElementById('check').style.display='none'" class="fas fa-times close" title="Close"></span><br>
			<h4>Enter passenger's details</h4>
			<label><b>Full name:</b></label><br>
				<input type="text" name="fullname" required="required" /><br>
				<label><b>Booking reference:</b></label><br>
				<input type="text" name="bkref"/>
				<center><input type="button" name="login" value="check" onclick="document.getElementById('check').style.display='none'"></center>
			</div>
		</center>
		</div>
<center>
	<form id="mgbuttons">
			<input type="button" name="mgcancel" onclick="document.getElementById('cancel').style.display='block'" value="Cancel a reservation">
			<input type="button" name="mgcheck" value="Check whether ticket is reserved for a person" onclick="document.getElementById('check').style.display='block'">
			<input type="button" name="mgdisp" value="Display passengers">
			<input type="button" name="mgflight" value="Check flights status">
		</form>
</center>
		
	</section>
	<script type="text/javascript">
		$(document).ready(function(){
			$("#cancel input[value='delete']").click(
				function(){
					if($("#cancel input[name='fullname']").val()!="")
					{
						var ans="delete";
						$.ajax({
							type: 'POST',
							url: 'delete.php',
							data: {delete:ans,name:$("#cancel input[name='fullname']").val(),refnum:$("#cancel input[name='bkref']").val(),},
							success: function(response){
								if (response){
									$("#dialogZ").dialog({buttons:{"OK":function(){$(this).dialog("close");}}});
									$("#dialogZ").dialog("open");
									$('#dialogZ h3').html(response).css({
										"color":"orange",
									});
								}
								//setInterval(function(){$("#dialogZ").dialog("close");},3000);
						}
					});
					}else
					{
						$("#dialogZ").dialog({buttons:{"OK":function(){$(this).dialog("close");}}});
						$("#dialogZ").dialog("open");
						$('#dialogZ h3').html("Enter details!").css({
										"color":"red",
						});
					}
				});


			$("#check input[value='check']").click(function(){
					if($("#check input[name='fullname']").val()!="",$("#check input[name='bkref']").val()!=""){
						$.ajax({
							type: 'POST',
							url: 'check.php',
							data: {name:$("#check input[name='fullname']").val(),refnum:$("#check input[name='bkref']").val()},
							success: function(response){
								if (response){
									$("#dialogZ").dialog({buttons:{"OK":function(){$(this).dialog("close");}}});
									$("#dialogZ").dialog("open");
									$('#dialogZ h3').html(response).css({
										"color":"orange",
									});
								}
								//setInterval(function(){$("#dialogZ").dialog("close");},3000);
						}
					});
					}else
					{
						$("#dialogZ").dialog({buttons:{"OK":function(){$(this).dialog("close");}}});
						$("#dialogZ").dialog("open");
						$('#dialogZ h3').html("Enter details!").css({
										"color":"red",
						});
					}
					
			});
			$("input[name='mgdisp']").click(function(){
				window.open('disp_pass.php','_blank');
			});

			$("input[name='mgflight']").click(function(){
				window.open('flights.php','_blank');
			});
			

			$("#dialogZ").dialog({
				draggable:true,
				resizable:false,
				height:250,
				width:250,
				modal:true,
				show:10,
				hide:100,
				autoOpen:false
			});
		});
	</script>
</body>
</html>
