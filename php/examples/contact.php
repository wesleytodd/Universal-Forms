<?php

require('../src/wesleytodd/UniversalForms/Core/Form.php');
require('../src/wesleytodd/UniversalForms/Core/Field.php');

use \wesleytodd\UniversalForms\Core\Form;
use \wesleytodd\UniversalForms\Core\Field;

$json = '{
	"action" : "/examples/contact.php",
	"method" : "POST",
	"fields" : [
		{
			"name" : "name",
			"type" : "text",
			"label" : "Name",
			"rules" : ["required"]
		},
		{
			"name" : "email",
			"type" : "email",
			"label" : "Email",
			"value" : "wes@wesleytodd.com",
			"rules" : ["required", "email"]
		},
		{
			"name" : "message",
			"type" : "textarea",
			"label" : "Message",
			"rules" : ["required", "length[30,]"]
		}
	]
}';

try {
	$form = new Form($json);
	$form->addField('subject', 'text');

	//header('Content-type: text/json');
	var_dump($form->serialize(false));

} catch (Exception $e) {
	var_dump($e);
}