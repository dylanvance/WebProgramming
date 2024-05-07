<?php

$API_KEY = "270e579a"; // API key (string) provided by Open Movie DataBase (i.e., "ab123456")

session_start(); // Connect to the existing session

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function displaySearchForm()
{
	require_once './templates/search_form.html';
}

function displaySearchResults($searchString)
{	
	$results = file_get_contents('http://www.omdbapi.com/?apikey='.$GLOBALS['API_KEY'].'&s='.urlencode($searchString).'&type=movie&r=json');
    $resultsArray = json_decode($results, true)["Search"];
    require_once './templates/results_form.html';
}

function processPageRequest()
{
	if (!array_key_exists("displayName", $_SESSION)) {
        header('Location: ./logon.php');
		die();
    }

    if (!$_POST) {
        displaySearchForm();
    }

    if (array_key_exists("keyword", $_POST)) {
        displaySearchResults($_POST["keyword"]);
    }
}

?>