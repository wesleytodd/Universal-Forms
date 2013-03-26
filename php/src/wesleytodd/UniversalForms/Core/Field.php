<?php

namespace wesleytodd\UniversalForms\Core;

class Field {
	
	/**
	 * Field attributes
	 *
	 * @var array
	 * @access public
	 */
	public $attributes = array();

	/**
	 * Field rules
	 *
	 * @var array
	 * @access public
	 */
	public $rules = array();

	/**
	 * Constructor
	 *
	 * @param string $name the field name
	 * @param string $type the field type
	 * @param string|array $field the field declaration
	 * @param arrat $opts an array of options
	 */
	public function __constructor($name, $type, $field = array(), $opts) {

		if (isset($field['rules'])) {
			$this->rules = $field['rules'];
		}

		if (!isset($field['attributes'])) {
			$field['attributes'] = array();
		}
		$field['attributes']['name'] = $name;

		if (!in_array($type, array('textarea', 'select'))) {
			$field['attributes']['type'] = $type;
			$field['attributes']['value'] = $value;
		}

		$this->name       = $name;
		$this->type       = $type;
		$this->value      = (isset($field['value'])) ? $field['value'] : '';
		$this->label      = (isset($field['label'])) ? $field['label'] : '';
		$this->attributes = $field['attributes'];

		if (in_array($type, array('select', 'radio', 'checkbox'))) {
			$this->options = $field['options'];
		}

	}
	
}