<!DOCTYPE html>
<html>
<head>
	<title>Select A Seat</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<style type="text/css">
		body
		{
			background-color: #DCDCDC;
			font-family: segoe ui light;
		}
		
		.close {
		  position: relative;
		  float: right;
		  margin-right: 10px;
		  top: -5px;
		  color: #000;
		  font-size: 30px;
		  font-weight: bold;
		}

		.close:hover,
		.close:focus,#mbuttons span.close:hover {
		  color: red;
		  cursor: pointer;
		}
		
				/* Customize the label (the container) */
		.radiogrp {
		  
		  position: relative;
		  padding-left: 35px;
		  margin-bottom: 12px;
		  cursor: pointer;
		  font-size: 22px;
		  -webkit-user-select: none;
		  -moz-user-select: none;
		  -ms-user-select: none;
		  user-select: none;
		}

		
		.radiogrp input {
		  position: absolute;
		  opacity: 0;
		  cursor: pointer;
		  height: 0;
		  width: 0;
		}

		
		.checkmark {
		  position: absolute;
		  top: 0;
		  left: 0;
		  height: 25px;
		  width: 25px;
		  background-color: #eee;
		  border-radius: 50%;
		}
		.radiogrp input:disabled ~ .checkmark
		{
			background-color: red;
		}

		.radiogrp:hover input ~ .checkmark {
		  background-color: #ccc;
		}

	
		.radiogrp input:checked ~ .checkmark {
		  background-color: #2196F3;
		}

	
		.checkmark:after {
		  content: "";
		  position: absolute;
		  display: none;
		}

		.radiogrp input:checked ~ .checkmark:after {
		  display: block;
		}

		.radiogrp .checkmark:after {
		  top: 9px;
		  left: 9px;
		  width: 8px;
		  height: 8px;
		  border-radius: 50%;
		  background: white;
		}
		label
		{
			color: white;
		}
		#left
		{
			float: left;
		}
		#right
		{
			margin-top: -640px;
			float: right;
		}
		#mid
		{
			margin: auto auto auto 27%;
			left: -300px;
		}
		table
		{
			border-collapse: collapse;
		}
		#cockpit
		{
			position: relative;
			top: 40px;
			background-color: #4a4a4a;
			border-top-right-radius: 50%;
			border-top-left-radius: 50%;
			width: 700px;
			max-width: 700px;
			height: 500px;
			padding: 20px;
			margin: auto auto auto auto;
		}
		#plane
		{
			position: relative;
			top: -300px;
			background-color: #4a4a4a;
			border-top-right-radius: 100px;
			border-top-left-radius:100px;
			width: 700px;
			max-width: 700px;
			height: 700px;
			padding: 20px;
			margin: auto auto auto auto;
		}
		#seats
		{
			position: relative;
			
		}
		#num
		{
			position: relative;
			top: 40px;
			background-color: white;
			height:45px;
			width: 300px;
			padding-top: 10px;
		}
		input[name=done]
		{
			position: relative;
			border-style: none;
			background-color: black;
			width: 90px;
			height: 40px;
			font-size: 1.1em;
			top: 50px;
			color: white;
			border-radius: 7px;
		}
		@media(max-width: 400px)
		{

			#right
			{
				margin-top: -317px;
				
			}

		}
	</style>
	<script type="text/javascript" src="jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="jquery-ui.min.js"></script>
	<link rel="stylesheet" type="text/css" href="jquery-ui.min.css">
</head>
<body>
	<section>
		<?php
			session_start();
			if ($_SESSION['refnum']&&$_SESSION['name']) {
				echo "<center><div id='info'><h2>{$_SESSION['name']}, you can make your choice.</h2></div></center>";
			}else
			{
				header("location:first.html");
			}
		?>
		<div id="cockpit">
			<center>
			<div id="num">
			</div>
			
		</center>
			<center>
				<input type="button" name="done" value="waiting...">
			</center>
		</div>
		<div id="plane">
			<div id="seats">
				<table id="left">
				<tbody></tbody>
				</table>
				
				<table id="mid">
					<tbody></tbody>
				</table>
				
				<table id="right">
					<tbody></tbody>
				</table>
			</div>
		</div>
	</section>

	<script type="text/javascript">
		count=1;
		
		for (var i =0; i < 39; i=i+2) {
			
				$("#left tbody").append("<tr></tr>");
				$("#left tr:last-child").append("<td><label class='radiogrp' >"+(i+1).toString()+"<input type='radio' name='seatnum' value="+(i+1).toString()+">  <span class='checkmark'></span></label></td><td><label class='radiogrp' >"+(i+2).toString()+"<input type='radio' name='seatnum' value="+(i+2).toString()+">  <span class='checkmark'></span></label></td>");
		}

		for (var i =39; i <117; i=i+4) {
			$("#mid tbody").append("<tr></tr>");
				$("#mid tr:last-child").append("<td><label class='radiogrp' >"+(i+1).toString()+"<input type='radio' name='seatnum' value="+(i+1).toString()+">  <span class='checkmark'></span></label></td><td><label class='radiogrp'>"+(i+2).toString()+"<input type='radio' name='seatnum' value="+(i+2).toString()+">  <span class='checkmark'></span></label></td><td><label class='radiogrp'>"+(i+3).toString()+"<input type='radio' name='seatnum' value="+(i+3).toString()+">  <span class='checkmark'></span></label></td><td><label class='radiogrp' >"+(i+4).toString()+"<input type='radio' name='seatnum' value="+(i+4).toString()+">  <span class='checkmark'></span></label></td>");
		}

		for (var i =117; i <156 ; i=i+2) {
			$("#right tbody").append("<tr></tr>");
				$("#right tr:last-child").append("<td><label class='radiogrp' style='margin-left:20px;'>"+(i+1).toString()+"<input type='radio' name='seatnum' value="+(i+1).toString()+">  <span class='checkmark'></span></label></td><td><label class='radiogrp' style='margin-left:20px;'>"+(i+2).toString()+"<input type='radio' name='seatnum' value="+(i+2).toString()+">  <span class='checkmark'></span></label></td>");
		}
		
		$(document).ready(function(){
			$("input[name='seatnum']").click(function()
				{
					var event=this.value;
					$.ajax({
						type: 'POST',
						url: 'seat.php',
						data: {seat:event},
						dattype:'string',
						success: function(response){
								$('#num').css({
									"display":"block",
								});
								$('#num').html("Your seat number is now: <b>"+event.toString()+"</b>").css({
									"color":"#a02c2c",
									"font-size":"1.2em"
								});
							$("input[type='button']").val(response);
							$("input[type='button']").css({"background-color":"green"});
					}
				});
				});

			$.getJSON("already.php",function(data){
			
				$.each(data,function(keys,values)
					{
						if (values && keys!="mine"){
							$(".radiogrp input[value="+values+"]").prop("disabled",true);
						}
				});
				$("input[value="+data.mine+"] ~ span").css({"background-color":"#ffb600"});
				if (data.mine) {
					$('#num').html("Your current seat number is: <b>"+data.mine+"</b>").css({
									"color":"#a02c2c",
									"font-size":"1.2em"
								});
				}
				
			});
			$("input[name='done']").click(function(){
				window.location.href="manage.php";
			});

			
		});
	</script>
</body>
</html>
<?php
if(file_exists("mainlist.txt")&&file_exists("runagain.txt"))
{
require_once("linklist.class.php");
session_start();
$s=file_get_contents('mainlist.txt');
$a=unserialize($s);
if (!$a->find($_SESSION['name'],$_SESSION['refnum'])){
	header("location:first.html");
}

$s=serialize($a);
file_put_contents('mainlist.txt', $s);
}

?>