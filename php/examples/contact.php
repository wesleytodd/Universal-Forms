<?php

require('../src/wesleytodd/UniversalForms/Core/Form.php');
require('../src/wesleytodd/UniversalForms/Core/Field.php');

use \wesleytodd\UniversalForms\Core\Form as Form;
use \wesleytodd\UniversalForms\Core\Field as Field;

$json = '{
	"action" : "/examples/contact.php",
	"method" : "POST",
	"fields" : [
		{
			"name" : "name",
			"type" : "text",
			"rules" : ["required"]
		},
		{
			"name" : "email",
			"type" : "email",
			"rules" : ["required", "email"]
		},
		{
			"name" : "message",
			"type" : "textarea",
			"rules" : ["required", "length[30,]"]
		}
	]
}';

$form = new Form($json);

echo "<pre>";
var_dump($form);