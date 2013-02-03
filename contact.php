<?php
$ret = array();

# if we have a _POST variable set, send the email
if (isset($_POST['your_message']) && isset($_POST['your_email']) && isset($_POST['your_name'])) {
  if (!strlen($_POST['your_message'])) {
    $ret['status'] = "ERROR";
    $ret['notice'] = "Please provide a message";
  }
  if (!filter_var($_POST['your_email'], FILTER_VALIDATE_EMAIL)) {
    $ret['status'] = "ERROR";
    $ret['notice'] = "Please provide a valid email address";
  }
  if (!strlen($_POST['your_name'])) {
    $ret['status'] = "ERROR";
    $ret['notice'] = "Please provide your name";
  }

  if (empty($ret)) {
    $config = parse_ini_file('gunther.conf');

    $from = $config['from_email']; 
    $headers = "From: " . $from . "\r\n";

    $message = "User name: " . $_POST['your_name'];
    $message .= "\nUser email: " . $_POST['your_email'];
    $message .= "\nMessage: \n" . $_POST['your_message'];

    mail($config['to_email'], "Web Inquiry!",
      strip_tags($message), $headers);

    $ret['status'] = "OK";
    $ret['notice'] = "Thanks for the note! We'll get back to you on that ASAP.";
  }
}
else {
  $ret['status'] = "ERROR";
  $ret['notice'] = "We're sorry. There was a problem processing your request.";
}

echo json_encode($ret);
exit();

