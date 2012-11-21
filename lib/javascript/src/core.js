/*
 * Universal Forms
 * http://wesleytodd.com/
 *
 * Version 0.1
 *
 * Basic Usage:
 *
 */
var UniversalForm = (function(_) {

	/**
	 * Helper: typeof
	 */
	var _t = function(v, t) {
		if(typeof t == 'undefined') t = 'undefined';
		return typeof v == t;
	};

	/**
	 * Helper: instanceof
	 */
	var _i = function(v, i) {
		return v instanceof i;
	};

	/**
	 * Helper: slice
	 */
	var _slice = function(arr, begin, end) {
		return Array.prototype.slice.call(arr, begin, end);
	};

	/**
	 * Helper: extend
	 */
	var _extend = (!_t(_)) ? _.extend : function(obj) {
		var objs = _slice(arguments, 1),
			len = objs.length;
		for (var i = 0; i < len; i++) {
			for (var prop in objs[i]) {
				obj[prop] = objs[i][prop];
			}
		}
		return obj;
	};


	var Form = function(options) {

		// Force instantiation of new object
		if (!_i(this, Form)) return new Form(options);

		// Setup options
		if (!_t(options)) options = {};

		// Setup internal vars
		this._attributes = {};
		this._fields = [];

	};

	Form.prototype.attr = function(attr, val) {
		if (!_t(val)) return this.getAttr(attr);
		return this.setAttr(attr, val);
	}

	Form.prototype.setAttr = function(attr, val) {
		this._attributes[attr] = val;
	}

	Form.prototype.getAttr = function(attr) {
		return this._attributes[attr];
	}

	Form.prototype.addField = function(name, options) {
		if (!_i(name, Field)) this._fields[name.name] = name;
		this._fields[name] = Field(_extend(options, {
			name : name
		}));
	}

	Form.prototype.removeField = function(name) {
		if (!_t(this._fields[name])) this._fields[name] = null;
	}

	
	var Field = function(options) {
		// setup a field here
		if (!_i(this, Field)) return new Field(options);
	}


	return Form;
	
})(window._);
