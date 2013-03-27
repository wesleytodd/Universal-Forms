<?php

namespace wesleytodd\UniversalForms\Core;

use Serializable;
use JsonSerializable;

class Field implements JsonSerializable, Serializable {
	
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
	public function __construct($name, $type, $field = array()) {
		if (is_string($field)) {
			$field = json_decode($field);
		}
		$field->name = $name;
		$field->type = $type;
		$this->unserialize(json_encode($field));
	}

	/**
	 * Implementing serializeable serialize
	 */
	public function serialize($asJSON = false) {
		if ($asJSON) {
			return json_encode($this);
		} else {
			return $this->jsonSerialize();
		}
	}

	/**
	 * Implementing serializeable unserialize
	 */
	public function unserialize($data) {
		$field = json_decode($data);

		if (isset($field->rules)) {
			$this->rules = $field->rules;
		}

		if (!isset($field->attributes)) {
			$field->attributes = array();
		}
		$field->attributes['name'] = $field->name;

		$this->name       = $field->name;
		$this->type       = $field->type;
		$this->value      = (isset($field->value)) ? $field->value : '';
		$this->label      = (isset($field->label)) ? $field->label : '';
		$this->attributes = $field->attributes;

		if (!in_array($field->type, array('textarea', 'select'))) {
			$this->attributes['type'] = $field->type;
			$this->attributes['value'] = $field->value;
		}

		if (in_array($field->type, array('select', 'radio', 'checkbox'))) {
			$this->options = $field->options;
		}
	}

	/**
	 * Implementing jsonSerialize
	 */
	public function jsonSerialize() {
		return array(
			'name' => $this->name,
			'type' => $this->type,
			'label' => $this->label,
			'value' => $this->value,
			'rules' => $this->rules
		);
	}

	public function __toString(){
		return $this->serialize();
	}
	
}