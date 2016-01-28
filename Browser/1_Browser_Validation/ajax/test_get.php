<?php
// if data are received via GET, with index of 'test'
if (isset($_GET['test'])) {
    $str = $_GET['test'];             // get data
    echo "The string '<i>".$str."</i>' contains ". strlen($str). ' characters and '. str_word_count($str, 0). ' words.';
}
?>