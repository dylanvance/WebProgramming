/* 
* Script used for Text Analyzer page.
* Author: Dylan Vance.
*/

/*
* Function that gets called onsubmit.
* Splits text into an array, calls each function, 
* retrieves textArea and label objects, and updates HTML.
*/
function analyzeText() {
    // Get Text Area Object
    let textArea = document.getElementById("analyze_area");

    // Split value of text area into an array of words
    let textArray = textArea.value.split(" ");

    // Trim any white space leftover from split
    for (let i = 0; i < textArray.length; i++) {
        textArray[i].trim();
    }

    // Call word count
    let word_count = wordCount(textArray);

    // Get word count label
    let wordCountLabel = document.getElementById("word_count");
    
    // Update word count label HTML
    wordCountLabel.innerHTML = "Word Count: " + word_count;

    // Call unqiue word count
    let unique_word_count = uniqueWordCount(textArray);

    // Get unique word count label
    let uniqueWordCountLabel = document.getElementById("unique_word");

    // Update unique word count label HTML
    uniqueWordCountLabel.innerHTML = "Unique Words: " + unique_word_count;

    // Call long word count
    let long_word_count = longWordCount(textArray);

    // Get long word count label
    let longWordCountLabel = document.getElementById("long_word");

    // Update long word count label HTML
    longWordCountLabel.innerHTML = "Long Words: " + long_word_count;

    // Call sentence count
    let sentence_count = sentenceCount(textArray);

    // Get sentence count label
    let sentenceCountLabel = document.getElementById("sentence_count");

    // Update sentence count label HTML
    sentenceCountLabel.innerHTML = "Sentence Count: " + sentence_count;

    // Call number count
    let number_count = numberCount(textArray);

    // Get number count label
    let numberCountLabel = document.getElementById("number_count");

    // Update number count label HTML
    numberCountLabel.innerHTML = "Number Count: " + number_count;

    // Call most frequent word
    let frequent_word = mostFrequentWord(textArray);

    // Get most frequent word label
    let frequentWordLabel = document.getElementById("frequent_word");

    // Update most frequent word label HTML
    frequentWordLabel.innerHTML = "Most Frequent Word: " + frequent_word;

    return false;
}


/*
* Returns the word count.
*/
function wordCount(array) {
    // The word count is just the length of the array.
    return array.length;
}


/*
* Using the dictionary function, returns the unique word count.
*/
function uniqueWordCount(array) {
    let dict = generateDictionary(array);
    // The unique word count is just the length of the dictionary.
    return Object.keys(dict).length;
}


/*
* Using the dictionary function, returns the count of words 5 characters or longer.
*/
function longWordCount(array) {
    let dict = generateDictionary(array);
    count = 0;
    for (key in dict) {
        if (key.length >= 5) {
            count += 1; 
        }
    }
    return count;
}


/*
* Loops through the array detecting periods at the end of words.
* Returns the sentence count.
*/
function sentenceCount(array) {
    let sentence_count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].endsWith(".")) {
            sentence_count += 1;
        }
    }
    return sentence_count;
}


/*
* Loops through the array testing if each word isNAN.
* Returns the number count.
*/
function numberCount(array) {
    count = 0;
    for (let i = 0; i < array.length; i++) {
        if (!isNaN(array[i])) {
            count += 1;
        }
    }
    return count;
}


/*
* Using the dictionary function, returns the most frequent word.
*/
function mostFrequentWord(array) {
    let dict = generateDictionary(array);
    let freq = "";
    let max = 0;
    for (key in dict) {
        if (dict[key] > max) {
            max = dict[key];
            freq = key;
        }
    }
    return freq;
}


/*
* Helper function that generates a dictionary of the words in the array (numbers not included).
* Each key in the dictionary is a unique word, all are lowercased to be case insensitive.
* The value paired to each key is the count of that unique word.
*/
function generateDictionary(array) {
    let dict = new Object();
    for (let i = 0; i < array.length; i++) {
        if (array[i].toLowerCase() in dict) {
            if (isNaN(array[i].toLowerCase())) {
                dict[array[i].toLowerCase()] += 1;
            }
        }
        else {
            if (isNaN(array[i].toLowerCase())) {
                dict[array[i].toLowerCase()] = 1;
            }
        }
    }
    return dict;
}