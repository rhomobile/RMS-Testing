<?php
// if data are received via POST, with index of 'test'
if (isset($_POST['test'])) {
    $str = $_POST['test'];             // get data
    echo "The string: '<i>".$str."</i>' contains ". strlen($str). ' characters and '. str_word_count($str, 0). ' words.';
}
?> 