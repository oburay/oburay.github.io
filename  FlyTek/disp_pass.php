
<!DOCTYPE html>
<html>
<head>
	<title>Welcome Admin</title>
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
	<link rel="stylesheet" type="text/css" href="dispCSS.css">
	<style type="text/css">
		input[name=cls]
		{
			margin:20px;
			background-color: red;
			color:white;
			width: 100px;
			height: 50px;
			border-style: none;
			border-radius: 7px;
			font-size: 1.1em;
		}
			section
		{
			margin-top: -60px;
		}
				
	</style>
	<script type="text/javascript">
		$(document).ready(function(){
			$.getJSON("display.php",function(data){
				var num=0;
				$.each(data,function(keys,values)
					{
						num++;
						$("#dispData tbody").append("<tr><td>"+num+"</td></tr>");
						$.each(values,function(key,value){
							$("#dispData tbody tr:last-child").append("<td>"+value+"</td>");
					});
				});
				$("tr:even").css({
					"background-color":"#b2e4ffff",
					"text-align":"center"
				});
						$("tr:odd").css({
					"background-color":"white",
					"text-align":"center"
				});
						
					});
					$("th").css({
					"background-color":"#000000da"
			});


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
							data: {cls:"yes"},
							success:function(response)
								{
									if (response) {
										$("#dialogZ").dialog({buttons:{"OK":function(){$(this).dialog("close");window.location.href="disp_pass.php"}}});
									$("#dialogZ").dialog("open");
									$('#dialogZ h3').html(response).css({
										"color":"orange",
									});
									}
								}						
							});
						$(this).dialog("close");
						},
					"CANCEL":function(){
						$(this).dialog("close");
					}
				}
			});
			$("input[name='cls']").click(function(){
				$("#dialogZ").dialog("open");
				$('#dialogZ h3').html("Do you really want to do this?").css({
					"color":"red",
				});
			});
	});
		
	</script>
</head>
<body>
	<div class="container-liquid">
			<header id="" style="background-color:red;height:70px;">
		<span class="back" title="Back">
			<a href="admin_manage.php" style="text-decoration: none; color:white;"><span class="fas fa-arrow-left"></span></a>
		</span>
		<center>
			<span class="fas fa-user-shield fa-3x" style="margin-top: 10px;color:white;"></span>
		</center>

	</header>
	</div>

	<?php
		session_start();
		if (isset($_SESSION['admin'])&&isset($_SESSION['password'])) {
			echo "<center><div id='info' style='color:purple;'></br><h4>This is the data table containing information about the passengers.</h4></div></center>";
		}else
		{
			header("location:admin.php");
		}
	?>
	<section id="sec01">
			<div id="dialogZ">
				<center><h3></h3></center>
			</div>
		<table id="dispData" style="border: #000000da 2px solid">
			<thead style="color: white;">
				<tr>
				<th>No.</th>
				<th>Full name</th>
				<th>Age</th>
				<th>Email</th>
				<th>Phone</th>
				<th>Flying from</th>
				<th>Flying to</th>
				<th>Departing on</th>
				<th>Returning on</th>
				<th>Class</th>
				<th>Seat number</th>
				<th>Booking Refrence</th>
				<th>Flight ID</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<center>
			<input type="button" name="cls" value="Reset">
		</center>
	</section>
</body>

</html>
