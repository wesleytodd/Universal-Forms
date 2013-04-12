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
				"label"      : "Field 3",
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
				"label"     : "Field 4",
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

## Core Libraries

The goal is to have both a `Form` and a `Field` class/object definition in each language supported.  These core libraries are intended to simply handle the instantiation and input/output of form elements.  For now I am thinking that the interfaces for these core libraries will look like:

	Form([form, [opts]])
	|- addField()
	|- removeField()
	|- serialize()
	|- unserialize(json)
	|- eachField(fnc[, context])
	|- attributes
	|- fields
	|- formJson
	|- opts

	Field(name, type, field[, opts])
	|- serialize()
	|- unserialize(json)
	|- name
	|- type
	|- value
	|- label
	|- attributes
	|- rules
	|- fieldJSON
	|- opts



## Drivers

Integration code for the Universal Forms standard can be packaged in the form of a driver.  Drivers are intended to be specific to a particular stack, and are the way to extend the core libraries with custom functionality.  A typical driver will implement a renderer and a validator which can integrate with the core libraries through either adding methods or inheritance depending on the language and needs.  For example, a javascript driver might be written as such:

```javascript
(function(UniversalForms) {

	UniversalForms.Form.render = function() {
		// Render the form
	};

	UniversalForms.Form.ajaxSubmit = function() {
		// Submit via ajax
	}

	UniversalForms.Field.validate = function() {
		// Validate the field
	}

})(UniversalForms);
```

## License

Copyright (c) 2013, Wes Todd
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR     CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
