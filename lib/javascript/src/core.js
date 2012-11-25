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

	_.mixin({
		/**
		 * Helper: typeof
		 */
		t : function(v, t) {
			if(typeof t == 'undefined') t = 'undefined';
			return typeof v == t;
		},

		/**
		 * Helper: instanceof
		 */
		i : function(v, i) {
			return v instanceof i;
		},

		/**
		 * Helper: slice
		 */
		slice : function(arr, begin, end) {
			return Array.prototype.slice.call(arr, begin, end);
		}
	});

	/**
	 * Form Object Constructor
	 *
	 * @param options object A hash of form options, fields and validations rules
	 *
	 * This is the main interface for the library.  This object handles the state of the form
	 * and maintains an array of all fields.
	 */
	var Form = function(options) {

		// force instantiation of new object
		if (!_.i(this, Form)) return new Form(options);

		// setup internal vars
		this.attributes = {};
		this.fields = {};

		// setup options
		if (_.t(options)) options = {};

		// set common top level attributes
		options.attributes = _.extend(options.attributes || {}, {
			id     : options.id,
			method : options.method,
			action : options.action
		});

		// set each attribute individually
		for (var prop in options.attributes) {
			this.setAttr(prop, options.attributes[prop]);
		}

		// setup and process options.fields
		if (_.t(options.fields)) options.fields = [];

		var len = options.fields.length;
		for (var i = 0; i < len; i++) {
			this.addField(options.fields[i].name, options.fields[i]);
		};
		console.log(this);

	};

	/**
	 * Setter/Getter for attributes on the object
	 */
	Form.prototype.attr = function(attr, val) {
		if (_.t(val)) return this.getAttr(attr);
		return this.setAttr(attr, val);
	};

	/**
	 * Setter for atributes
	 */
	Form.prototype.setAttr = function(attr, val) {
		this.attributes[attr] = val;
	};

	/**
	 * Getter for attributes
	 */
	Form.prototype.getAttr = function(attr) {
		return this.attributes[attr];
	};

	/**
	 * Add a new field to the form
	 */
	Form.prototype.addField = function(name, options) {
		// If just a Field object was passed in, add it
		if (_.i(name, Field)) return this.fields[name.name] = name;

		// Otherwise, create a new field object and add it
		options = _.extend(options, {
			name : name
		})
		return this.fields[options.name] = Field(options);
	};

	/**
	 * Remove a field by name
	 */
	Form.prototype.removeField = function(name) {
		if (!_.t(this._fields[name])) this._fields[name] = null;
	};

	/**
	 * Render a full form
	 */
	Form.prototype.render = function() {
		var html = '';
		for (var field in this.fields) {
			html += this.fields[field].render();
		}
		return html;
	};

	/**
	 * Field Object Constructor
	 *
	 * The field object maintains the state of each individual field.
	 */
	var Field = function(options) {
		// setup a field here
		if (!_.i(this, Field)) return new Field(options);

		// require name
		if (_.t(options)) throw new TypeError('Field options must be supplied');
		if (_.t(options.name)) throw new TypeError('A name is required for all fields');
		if (_.t(options.type)) throw new TypeError('A type is required for all fields');

		// set rules array
		if (_.t(options.rules)) options.rules = [];
		else if (_.t(options.rules, Array)) throw new TypeError('the rules must be defined as an array');

		// set common top level attributes
		options.attributes = _.extend(options.attributes || {}, {
			name  : options.name,
			id    : options.id,
			type  : options.type,
			value : options.value
		});

		// setup template
		options.template = options.template || this.getTemplate();

		_.extend(this, {
			name       : options.name,
			type       : options.type,
			label      : options.label,
			attributes : options.attributes,
			template   : _.template(options.template),
			rules      : options.rules,
			extra      : options.extra,
			errors     : {}
		});
	};

	/**
	 * Find the template
	 */
	Field.prototype.getTemplate = function() {
		return '<label for="<%= name %>"><%= label %></label><input type="<%= type %>" name="<%= name %>" />';
	};

	/**
	 * Render field
	 */
	Field.prototype.render = function() {
		return this.template(this);
	};

	/**
	 * Set error on field
	 */
	Field.prototype.setError = function(message) {
		
	};

	/**
	 * Clear error
	 */
	Field.prototype.clearError = function(type) {
		
	}

	/**
	 * Run the validation rules on the field
	 */
	Field.prototype.validate = function() {
		
	};

	return {
		Form  : Form,
		Field : Field
	};
	
})(window._);
