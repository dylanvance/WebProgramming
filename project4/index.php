<?php

$EMAIL_ID = 598621256; // 9-digit integer value (i.e., 123456789)
$API_KEY = "270e579a"; // API key (string) provided by Open Movie DataBase (i.e., "ab123456")

session_start(); // Connect to the existing session

require_once '/home/common/php/dbInterface.php'; // Add database functionality
require_once '/home/common/php/mail.php'; // Add email functionality
require_once '/home/common/php/p4Functions.php'; // Add Project 4 base functions

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function addMovieToCart($imdbID)
{	
	$exists = movieExistsInDB($imdbID);
	if ($exists == 0) {
		$result= file_get_contents('http://www.omdbapi.com/?apikey='.$GLOBALS['API_KEY'].'&i='.$imdbID.'&type=movie&r=json');
		$m = json_decode($result, true);
		$movieId = addMovie($m['imdbID'], $m['Title'], $m['Year'], $m['Rated'], $m['Runtime'], $m['Genre'], $m['Actors'], $m['Director'], $m['Writer'], $m['Plot'], $m['Poster']);
		addMovieToShoppingCart($_SESSION['userId'], $movieId);
		displayCart();
	}
}

function displayCart()
{
	$movies = getMoviesInCart($_SESSION["userId"]);
    require_once './templates/cart_form.html';
}

function processPageRequest()
{
	if (!array_key_exists("displayName", $_SESSION)) {
        header('Location: ./logon.php');
		die();
    }

	if (array_key_exists("action", $_GET)) {
		
		if ($_GET["action"] == "add") {
			addMovieToCart($_GET['imdb_id']);
			header('Location: ./index.php');
		}
		
		if ($_GET["action"] == "remove") {
			removeMovieFromCart($_GET['movie_id']);
			header('Location: ./index.php');
		}
		
	}
	else {
		displayCart();
	}
	
}

function removeMovieFromCart($movieID)
{	
	$result = removeMovieFromShoppingCart($_SESSION["userId"], $movieID);
	if ($result) {
		header('Location: ./index.php');
	}
}

?>