<?php

namespace wesleytodd\UniversalForms\Core;

use IteratorAggregate;

class Form implements IteratorAggregate {

	/**
	 * Form attributes
	 *
	 * @var array
	 * @access protected
	 */
	protected $_attributes = array();

	/**
	 * Form fields
	 *
	 * @var array
	 * @access protected
	 */
	protected $_fields = array();

	/**
	 * Constructor
	 *
	 * @param string|array $form an array or json string UniversalForm declaration
	 * @param array $opts an array of other options
	 */
	public function __constructor($form, $opts) {
		if (is_string($form)) {
			$form = json_decode($form);
		}

		if (!isset($form['attributes'])) {
			$form['attributes'] = array();
		}
		$form['attributes']['id']     = $form['id'];
		$form['attributes']['method'] = $form['method'];
		$form['attributes']['action'] = $form['action'];

		$this->_attributes = $form['attributes'];

		foreach ($form['fields'] as $field) {
			$this->addField($field['name'], $field['type'], $field);
		}
	}

	/**
	 * Add a field to the form
	 *
	 * @param string|Field $name the field name or an instance of a field
	 * @param string $type the field type
	 * @param string|array $field the field declaration
	 * @param arrat $opts an array of options
	 */
	public function addField($name, $type = '', $field = array(), $opts = array()) {
		if ($name instanceof Field) {
			$this->_fields[$name->name] = $name;
			return $this;
		}

		$this->_fields[$name] = new Field($name, $type, $field, $opts);
		return $this;
	}

	/**
	 * Remove a field from the form
	 *
	 * @param string $name the field name
	 */
	public function removeField($name) {
		unset($this->_fields[$name]);
		return $this;
	}

	/**
	 * Implementing iterator interface
	 */
	public function getIterator() {
        return new ArrayIterator($this->_fields);
    }

}