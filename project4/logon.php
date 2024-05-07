<?php

$EMAIL_ID = 598621256; // 9-digit integer value (i.e., 123456789)

require_once '/home/common/php/dbInterface.php'; // Add database functionality
require_once '/home/common/php/mail.php'; // Add email functionality
require_once '/home/common/php/p4Functions.php'; // Add Project 4 base functions

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function authenticateUser($username, $password) 
{
	$info = validateUser($username, $password);

	if ($info == NULL) {
		return false;
	}
	else {
		session_start();
		$_SESSION["userId"] = $info[0];
		$_SESSION["displayName"] = $info[1];
		$_SESSION["emailAddress"] = $info[2];
		return true;
	}
}

function displayLoginForm($message = "") 
{
	require_once './templates/logon_form.html';
}

function processPageRequest()
{
	if(session_status() == PHP_SESSION_ACTIVE)
	{
		session_destroy();
	}

	if (!$_POST) {
		displayLoginForm();
	}
	
	if (array_key_exists("action", $_POST)) {
		if ($_POST["action"] == "login") {
			$value = authenticateUser($_POST["username"], $_POST["password"]);

			if ($value == true) {
				header('Location: ./index.php');
				die();
			}
			else {
				displayLoginForm("Incorrect username or password. Please try again");
			}
		}
	}
}

?>
