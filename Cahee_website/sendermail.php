<?php
    $mail = $_POST['subscribe_mail'];

    $to = "dim8484@ukr.net"; 
	$date = date ("d.m.Y"); 
	$time = date ("h:i");
	$from = $email;
	$subject = "Cahee-subscribe request";
	
	$msg="
    Subscribe mail: $mail;	
    mail($to, $subject, $msg, "From: $from ");
?>
