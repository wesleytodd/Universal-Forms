# Universal Forms #

> ... But the forms which enter into and go out of her are the likenesses of real existences modelled after their patterns in a wonderful and inexplicable manner....

*[Universal Forms](http://en.wikipedia.org/wiki/Theory_of_Forms)*

## The Idea ##

Universal Forms is a set of libraries that attempts to break down the barriers between languages and implementations.  By representing web forms in JSON, and providing a standardized format for declaring validation rules, field types and other form related data, I hope to standardize the way HTML forms are handled.  In the future this should enable integration between front-end display, in-line validation and back-end validation using a single form definition format and common interface.

## Language Support ##

I am going to start with JavaScript, PHP and Go.  But hopefully in the future I will get someone who can port it to Ruby, Python or any of the other languages used to create web apps.

## The Universal Format ##

	{
		"id"         : "form-id",
		"method"     : "POST",
		"action"     : "/submit",
		"attributes" : {
			"class" : "exampleClass"
		},
		"fields"     : [
			{
				"name"  : "field1",
				"id"    : "field1",
				"type"  : "text",
				"label" : "Field 1",
				"value" : "Example",
				"rules" : [
					"required",
					"alpha"
				]
			},
			{
				"name"       : "field2",
				"id"         : "field2",
				"type"       : "textarea",
				"label"      : "Field 2",
				"attributes" : {
					"cols" : "20",
					"rows" : "10"
				},
				"rules"     : [
					"length[50,]"
				]
			},
			{
				"name"       : "field3",
				"id"         : "field3",
				"type"       : "select",
				"label"      : "Field 3"
				"options"    : {
					""  : "Select One",
					"1" : "One",
					"2" : "Two",
					"3" : "Three"
				},
				"rules" : [
					"required"
				]
			},
			{
				"name"       : "field4",
				"id"         : "field4",
				"type"       : "password",
				"label"     : "Field 4"
				"rules"      : [
					"required"
				]
			},
			{
				"name"       : "field5",
				"id"         : "field5",
				"type"       : "password",
				"rules"      : [
					"matches[field4]"
				]
			}
		]
	}

## Templates

Each implementation will be accompanied by a set of templates following this structure:

- wrap
- input
- radio
- checkbox
- select
- textarea
- button







