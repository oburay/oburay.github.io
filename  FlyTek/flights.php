<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<link rel="stylesheet" href="bootstrap.min.css">
	<link rel="styesheet" href="style.css">
	<script type="text/javascript" defer src="fontawesome-free-5.8.1-web\js\solid.js"></script>
	<script type="text/javascript" defer src="fontawesome-free-5.8.1-web\js\brands.js"></script>
	<script type="text/javascript" defer src="fontawesome-free-5.8.1-web\js\fontawesome.js"></script>
	<link rel="stylesheet" href="jquery-ui.min.css">
	<script src="jquery-3.3.1.min.js"></script>
	<script src="jquery-ui.min.js"></script>
	<script src="popper.js"></script>
	<script src="bootstrap.min.js"></script>
<style>
	body
{
	font-family: segoe ui light;
	height:100%;
	margin:0px;
	width:100%;
	min-width: 1000px;
overflow-x:hidden;
}
	
.fa-plane
{
	position: relative;
}
table
{
	border-collapse: collapse;
}
th
{
	border-left: gray 1px solid;
	padding: 10px;
}
td
{
	border-left: gray 1px solid;
	padding: 7px;
}/*
.ui-progressbar{
		display: inline-block;
	}
	tr td:nth-child(1),th:nth-child(1)
{
	border-left: rgb(0, 0, 0) 2px solid;
}
	*/
table{
	border: black 2px solid;
	border-left: gray 2px solid;
	width: 100%;
	margin-bottom:10%;
	
}

tr td:nth-child(1),th:nth-child(1)
{
	border-left: black 2px solid;
}
.back
{
	position: relative;
  float: left;
  margin:10px auto 0 10px;
  top: -5px;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
}
.back:hover,
.back:focus {
  color: black;
  cursor: pointer;
}
@media(max-width:1200px)
{
	body{
		overflow-x:auto;
	}
}

</style>
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
		<br>
		<div class="row">
			<div class="col">
			<?php
				session_start();
				if (isset($_SESSION['admin'])&&isset($_SESSION['password'])) {
					echo "<center><div id='info' style='color:black;'><h3></br>Observe the flights' status in real time.</h3></div></center><br>";
					if (isset($_POST['flight'])) {
						$_SESSION['flight']=$_POST['flight'];
					}
				}else
				{
					header("location:admin.php");
				
				}
			?>
			</div>
		</div>
		<div class="row">
			<div class="col-md-2 col-sm-2 col-lg-2"></div>
			<div class="col-lg-1 col-md-1 col-sm-1" >
				<span ><h4><b>Accra</b></h4><h6>Ghana</h4></span></div>
				<div class="col-lg-6 col-md-6 col-sm-6" >
					<div id="progress1" class="probar" style="width:100%; height:45px; margin-bottom: 30px;">
					<span class="fas fa-plane fa-2x"  style="color:purple;"></span>
				</div>
				</div>
			<div class="col-lg-2 col-md-2 col-sm-2"><span><h4><b>Lagos</b></h4><h6>Nigeria</h6></span></div>
		</div>
	<div class="row">
			<div class="col-md-2 col-sm-2 col-lg-2"></div>
			<div class="col-lg-1 col-md-1 col-sm-1">
				<span><h4><b>Lome</b></h4><h6>Togo</h4></span></div>
				<div class="col-lg-6 col-md-6 col-sm-6">
					<div id="progress2" class="probar" style="width:100%; height:45px; margin-bottom: 30px;">
					<span class="fas fa-plane fa-2x"  style="color:red;"></span>
				</div>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2"><span ><h4><b>Tokyo</b></h4><h6>Japan</h6></span></div>
		</div>
	<div class="row">
			<div class="col-md-2 col-sm-2 col-lg-2"></div>
			<div class="col-lg-1 col-md-1 col-sm-1">
				<span><h4><b>Cairo</b></h4><h6>Egypt</h4></span></div>
				<div class="col-lg-6 col-md-6 col-sm-6">
					<div id="progress3" class="probar" style="width:100%; height:45px; margin-bottom: 30px;">
					<span class="fas fa-plane fa-2x"  style="color:blue;"></span>
				</div>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2"><span ><h4><b>London</b></h4><h6>England</h6></span></div>
		</div>
		<div class="row">
				<div class="col-md-2 col-sm-2 col-lg-2"></div>
				<div class="col-lg-1 col-md-1 col-sm-1">
					<span><h4><b>Accra</b></h4><h6>Ghana</h4></span></div>
					<div class="col-lg-6 col-md-6 col-sm-6">
						<div id="progress4" class="probar" style="width:100%; height:45px; margin-bottom: 30px;">
						<span class="fas fa-plane fa-2x"  style="color:rgb(255, 251, 1);"></span>
					</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2">
					<span ><h4><b>Tokyo</b></h4><h6>Japan</h6></span></div>
			</div>
			<div class="row" style="margin-top:-10px;">
				<div class="col-md-4 col-sm-4 col-lg-4"></div>
				<div style="margin-right:4%;">
				<span style="float:left;"><b>Lome, </b>Togo</span>
				</div>
				<div style="margin-right:4%;">
				<span><b>Lagos, </b>Nigeria</span>
				</div>
				<div style="margin-right:4%;">
				<span><b>Cairo, </b>Egypt</span>
				</div>
				<div class="col-md-2 col-sm-2 col-lg-2">
				<span><b>London, </b>England</span>
				</div>
			</div>
		<div class="container">
			<div class="row" style="margin-top:10%;">
			<div class="col">
				<br>
				<center><h2>Today</h2></center>
				
				<table style="font-size:1.1em" cellpadding="10" cellspacing="5">
					<thead style="color:white;">
						<tr>
							<!--<th rowspan="2" style="border-bottom: black 0px solid;">Within</th>-->
							<th scope="col" colspan="2"><h3>K-C45</h3></th>
							<th scope="col" colspan="2"><h3>AJ360</h3></th>
							<th scope="col" colspan="2"><h3>XL89</h3></th>
							<th scope="col" colspan="2"><h3>SY-u34</h3></th>
						</tr>
				</thead>
				<tbody>
					<tr>
						<td>Accra to Lagos</td>
						<td>Lagos to Accra</td>
						<td>Lome to Tokyo</td>
						<td>Tokyo to Lome</td>
						<td>Cairo to London</td>
						<td>London to Cairo</td>
						<td id="transTo"></td>
						<td id="transFrom"></td>
					</tr>
					<tr>
						<td id="atl"></td>
						<td id="lta"></td>
						<td id="ltt"></td>
						<td id="ttl"></td>
						<td id="etl"></td>
						<td id="lte"></td>
						<td id="transX">Available</td>
						<td id="transY">Available</td>
					</tr>
					

					</tbody>
				</table>
			</div>
			</div>
		</div>
</div>
	
<script type="text/javascript">
	 $(function() {
	
		 var cnt=0;
		 var cnt2=0;
		 var cnt3=0;
		 var cnt4=0;
 	$("#progress1").progressbar({
		 value:3,
      complete:function(){
				$.ajax({
							type: 'POST',
							url: 'flights.php',
							data: {flight:fstatus},
						});
			}
    });
		$("#progress2").progressbar({
			value:6,
      complete:function(){
				$.ajax({
							type: 'POST',
							url: 'flights.php',
							data: {flight:fstatus},
						});
			}
    });

		$("#progress3").progressbar({
			value:1,
      complete:function(){
				$.ajax({
							type: 'POST',
							url: 'flights.php',
							data: {flight:fstatus},
						});
			}
		});
		
		$("#progress4").progressbar({
			value:2,
      complete:function(){
				$.ajax({
							type: 'POST',
							url: 'flights.php',
							data: {flight:fstatus},
						});
			}
    });

  	var adder=0.6;
		var adder2=0.6;
		var adder3=0.6;
		var adder4=0.6;
		var rot=0;
		var rot2=0;
		var rot3=0;
		var rot4=0;

		fstatus={atl,lta,ltt,ttl,etl,lte,transX,transY};
    function progress1() {
			var val = $("#progress1").progressbar("value")||0;
			$("#progress1").progressbar("value", val+adder );
			$("#progress1 .fa-plane").css({
				"margin-left":val*0.97+"%"
			});
     
				if(val==100||val==0)
				{
					cnt=cnt+1;
										
				}
				
			if (cnt%2==1) {
			$("#atl").html("Available").css({
					"color":"black"
				});
			
				fstatus.atl=$("#atl").html();
			$("#lta").html("Not available").css({
					"color":"red"
				});
				fstatus.lta=$("#lta").html();
			}else{
				$("#lta").html("Available").css({
					"color":"black"
				});
			
				fstatus.lta=$("#lta").html();
				$("#atl").html("Not available").css({
					"color":"red"
				});
				fstatus.atl=$("#atl").html();
			}
        setTimeout(progress1, 120 );
				if (val>99.4) {
					adder=-0.6;
				
					$("#progress1 .fa-plane").css({
				"transform":"rotate("+rot+"deg)"
				});rot=(rot+180)%360;
				}else if(val<0.6|| val==3) {
						adder=0.6;
						
					$("#progress1 .fa-plane").css({
					"transform":"rotate("+rot+"deg)"
					});
					
				}
			
		}

		function progress2() {
			var val = $("#progress2").progressbar("value");
			$("#progress2").progressbar("value", val+adder2 );
			$("#progress2 .fa-plane").css({
				"margin-left":val*0.97+"%"
			});
			if(val==100)
			{
					cnt2=cnt2+1;
				
			}else if (val==0) {
				cnt2=cnt2+1;
				
			}
			if (cnt2%2==1) {
		$("#ltt").html("Available").css({
					"color":"black"
				});
				fstatus.ltt=$("#ltt").html();
		$("#ttl").html("Not available").css({
			"color":"red"
		});
		fstatus.ttl=$("#ttl").html();
	}else{
		$("#ttl").html("Available").css({
					"color":"black"
				});
				fstatus.ttl=$("#ttl").html();
		$("#ltt").html("Not available").css({
			"color":"red"
		});
		fstatus.ltt=$("#ltt").html();
	}
        setTimeout(progress2, 80 );
				if (val>99.4) {
					adder2=-0.6;
					
					$("#progress2 .fa-plane").css({
				"transform":"rotate("+rot2+"deg)"
				});rot2=(rot2+180)%360;
				}else if(val<0.6 || val==6) {
						adder2=0.6;
					$("#progress2 .fa-plane").css({
					"transform":"rotate("+rot2+"deg)"
					});
					
				}
			
		}
		
		function progress3() {
			var val = $("#progress3").progressbar("value")||0;
			$("#progress3").progressbar("value", val+adder3 );
			$("#progress3 .fa-plane").css({
				"margin-left":val*0.97+"%"
			});
			if(val==100)
			{
					cnt3=cnt3+1;
				}else if (val==0) {
				cnt3=cnt3+1;
				
			}
			
			if (cnt3%2==1) {
			$("#etl").html("Available").css({
						"color":"black"
					});
					fstatus.etl=$("#etl").html();
			$("#lte").html("Not available").css({
				"color":"red"
			});
			
			fstatus.lte=$("#lte").html();
		}else{
			$("#lte").html("Available").css({
						"color":"black"
					});
					fstatus.lte=$("#lte").html();
			$("#etl").html("Not available").css({
				"color":"red"
			});
			fstatus.etl=$("#etl").html();
		}

        setTimeout(progress3, 120 );
				if (val>99.4) {
					adder3=-0.6;
					
					$("#progress3 .fa-plane").css({
				"transform":"rotate("+rot3+"deg)"
				});rot3=(rot3+180)%360;
				}else if(val<0.6||val==1) {
						adder3=0.6;
					$("#progress3 .fa-plane").css({
					"transform":"rotate("+rot3+"deg)"
					});
					
				}
		}


		function progress4() {
			var val = $("#progress4").progressbar("value")||0;
			$("#progress4").progressbar("value", val+adder4 );
			$("#progress4 .fa-plane").css({
				"margin-left":val*0.97+"%"
			});
			if(val==100)
			{
					cnt4=cnt4+1;
				}else if (val==0) {
				cnt4=cnt4+1;
				
			}
			switch (true) {
				case (val<20)&&(cnt4%2==0):
				$("#transTo").html("Lome-Lagos-Cairo-London-Tokyo").css({
							"color":"black"
						});
					
						fstatus.transX=$("#transTo").html();
						$("#transFrom").html("Tokyo-London-Cairo-Lagos-Lome-Accra").css({
							"color":"black"
						});
					
					fstatus.transY=$("#transFrom").html();
					$("#transY").html("Available").css({
								"color":"black"
							});
					break;

					case (val>20)&&(val<40)&&(cnt4%2==0):
					$("#transTo").html("Lagos-Cairo-London-Tokyo").css({
								"color":"black"
							});
					
						fstatus.transX=$("#transTo").html();
						$("#transFrom").html("Tokyo-London-Cairo-Lagos-Lome-Accra").css({
							"color":"black"
						});
					
					fstatus.transY=$("#transFrom").html();
					break;

					case (val>40)&&(val<60)&&(cnt4%2==0):
					$("#transTo").html("Cairo-London-Tokyo").css({
								"color":"black"
							});
					
						fstatus.transX=$("#transTo").html();
						$("#transFrom").html("Tokyo-London-Cairo-Lagos-Lome-Accra").css({
							"color":"black"
						});
					
					fstatus.transY=$("#transFrom").html();
					break;

					case (val>60)&&(val<80)&&(cnt4%2==0):
					$("#transTo").html("London-Tokyo").css({
								"color":"black"
							});
					
						fstatus.transX=$("#transTo").html();
						$("#transFrom").html("Tokyo-London-Cairo-Lagos-Lome-Accra").css({
							"color":"black"
						});
					
					fstatus.transY=$("#transFrom").html();
					break;

					case (val>80)&&(cnt4%2==0):
					$("#transTo").html("London-Tokyo").css({
								"color":"black"
							});
							$("#transX").html("Not available").css({
								"color":"red"
							});
						fstatus.transX=$("#transX").html();
						$("#transFrom").html("Tokyo-London-Cairo-Lagos-Lome-Accra").css({
							"color":"black"
						});
					
					fstatus.transY=$("#transFrom").html();
					break;
					
					case (val<100)&&(val>80)&&(cnt4%2==1):
					$("#transTo").html("Accra-Lome-Lagos-Cairo-London-Tokyo").css({
								"color":"black"
							});
					
						fstatus.transX=$("#transTo").html();
						$("#transFrom").html("London-Cairo-Lagos-Lome-Accra").css({
							"color":"black"
						});
					
					fstatus.transY=$("#transFrom").html();

					$("#transX").html("Available").css({
								"color":"black"
							});
						
					break;
					
					case (val<80)&&(val>60)&&(cnt4%2==1):
					$("#transTo").html("Accra-Lome-Lagos-Cairo-London-Tokyo").css({
								"color":"black"
							});
					
						fstatus.transX=$("#transTo").html();
						$("#transFrom").html("Cairo-Lagos-Lome-Accra").css({
							"color":"black"
						});
					
					fstatus.transY=$("#transFrom").html();
					break;

					case (val<60)&&(val>40)&&(cnt4%2==1):
					$("#transTo").html("Accra-Lome-Lagos-Cairo-London-Tokyo").css({
								"color":"black"
							});
					
						fstatus.transX=$("#transTo").html();
						$("#transFrom").html("Lagos-Lome-Accra").css({
							"color":"black"
						});
					
					fstatus.transY=$("#transFrom").html();
					break;
					case (val<40)&&(val>20)&&(cnt4%2==1):
					$("#transTo").html("Accra-Lome-Lagos-Cairo-London-Tokyo").css({
								"color":"black"
							});
					
						fstatus.transX=$("#transTo").html();
						$("#transFrom").html("Lome-Accra").css({
							"color":"black"
						});
					
					fstatus.transY=$("#transFrom").html();
					break;
					case (val<20)&&(cnt4%2==1):
					$("#transTo").html("Accra-Lome-Lagos-Cairo-London-Tokyo").css({
								"color":"black"
							});
						
						fstatus.transX=$("#transTo").html();
						$("#transFrom").html("Lome-Accra").css({
							"color":"black"
						});
						$("#transY").html("Not available").css({
								"color":"red"
							});
					fstatus.transY=$("#transY").html();
					break;
			}

			/*if (cnt4%2==1) {
			$("#transX").html("Available").css({
						"color":"black"
					});
					fstatus.transX=$("#transX").html();
			$("#transY").html("Not available").css({
				"color":"red"
			});
			fstatus.transY=$("#transY").html();
		}else{
			$("#transY").html("Available").css({
						"color":"black"
					});
					fstatus.transY=$("#transY").html();
			$("#transX").html("Not available").css({
				"color":"red"
			});
			fstatus.transX=$("#transX").html();
		}*/

        setTimeout(progress4, 500 );
				if (val>99.4) {
					adder4=-0.6;
					
					$("#progress4 .fa-plane").css({
				"transform":"rotate("+rot4+"deg)"
				});rot4=(rot4+180)%360;
				}else if(val<0.6||val==2) {
						adder4=0.6;
					$("#progress4 .fa-plane").css({
					"transform":"rotate("+rot4+"deg)"
					});
					
				}
		}

	progress1();
	progress2();
	progress3();
	progress4();
	
	$("tr:even").css({
					"background-color":"#b2e4ffff",
					"text-align":"center"
				});
						$("tr:odd").css({
					"background-color":"white",
					"text-align":"center"
				});
						
				$("th").css({
					"background-color":"#000000da"
			});

			


});
</script>


</body>
</html>