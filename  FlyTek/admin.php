<!DOCTYPE html>
<html>
<head>
	<title>Login Interface</title>
	<style type="text/css">
		body
		{
			background-color: #DCDCDC;
			font-family: segoe ui light;
		}
		input{
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
		fieldset
		{
			border-radius: 10px;
		  background-color: #fefefe;
		  margin: 5% auto 15% auto; 
		  border-style: none;
		  width: 35%;
		  overflow: hidden;
		  height: 300px;
		}
		input[type=button]
		{
		  background-color: #4CAF50;
		  color: white;
		  padding: 14px 20px;
		  margin: 8px auto 20px auto;
		  border: none;
		  cursor: pointer;
		  width: 100px;
		}
		
		#headin
		{
			color: white;
			position: relative;
			font-family: segoe ui;
			top: -10px;
			margin:auto -20px 10px -20px;
			text-align: center;
			border-top-right-radius: 10px;
			border-top-left-radius: 10px;
		}
		#headin span
		{
			text-decoration: none;
			cursor: pointer;
			text-indent: -67px;
			position: absolute;
			margin-top: -5px;
			color: white;
			font-size: bold;
			display: inline;
		}
		label
		{
			position: relative;
			margin-left: 20px;
		}
		input[type=button]
		{
			font-size: 1.1em;
		}
	</style>
	<script type="text/javascript" src="jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="jquery-ui.min.js"></script>
	<link rel="stylesheet" type="text/css" href="jquery-ui.min.css">
</head>
<body>
	<section>
		<form id="FORM" method="post" style="min-width:700px;">
			
			<fieldset>
				<div id="headin" style="background-color:#000000da;height: 60px;">
		      	<span><h2>LOGIN FORM</h2></span>
				</div>
				<center><span id="wrong" style="margin-bottom:-50px;color:red;"></span></center>
				<label id="usr"><b>Username:</b></label><br>
				<input type="text" name="admin" required="required" /><br>
				<label><b>Password:</b></label><br>
				<input type="password" name="password" required="required"/>
				<center><input type="button" name="login" value="login"></center>
			</fieldset>
		</form>
	</section>
	<script type="text/javascript">
		$(document).ready(function(){
			$("input[name='login']").click(
				function(){
						var name=$("input[name='admin']").val();
						name=name.charAt(0).toUpperCase()+name.slice(1);
					if(name=="Admin" && $("input[name='password']").val()=="password")
					{
						var user=$("#FORM input[name='admin']").val();
						var pwd=$("#FORM input[name='password']").val();
						
						$.ajax({
							type: 'POST',
							url: 'adminsess.php',
							data: {admin:user,password:pwd},
							success: function(response){
								if(response){
									window.location.href="admin_manage.php";
								}
							}
						});
						
					}

					else {

						$("#wrong").html("Wrong credentials");
					}
				});

			
			$("#headin']").css({
				"width":"100%"
			});
			
		});
		
	</script>
</body>
</html>
