<?php
    $name = $_POST['registration_name'];
    $email = $_POST['registration_email'];
	$phone = $_POST['registration_phone'];
    $text = $_POST['registration_information'];

    $to = "dim8484@ukr.net"; 
	$date = date ("d.m.Y"); 
	$time = date ("h:i");
	$from = $email;
	$subject = "Cahee request";
	
	$msg="
    Registration name: $name;
    Registration email: $email;
    Registration phone: $phone;
    Registration text: $text"; 	
    mail($to, $subject, $msg, "From: $from ");
?>
