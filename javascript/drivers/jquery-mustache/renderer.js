(function($, Mustache, UniversalForms) {

	/**
	 * Hook into init to setup renderer options
	 */
	var fieldTemplates;
	UniversalForms.Form.on('init', function() {
		fieldTemplates = this.opts.fieldTemplates || {};
	});

	/**
	 * Attribute partial
	 */
	Mustache.compilePartial('attrs', '{{#attributes}} {{name}}="{{{value}}}"{{/attributes}}');
	var formatAttributes = function(attrs) {
		var attributes = [];
		for (var name in attrs) {
			attributes.push({
				name : name,
				value : attrs[name]
			});
		}
		return attributes;
	};

	/**
	 * Label partial
	 */
	Mustache.compilePartial('label', '{{#label}}<label for="{{name}}">{{label}}</label>{{/label}}');

	/**
	 * Format field information for multi template
	 */
	function formatMultiInput(field) {
		var obj = [];
		for (var val in field.options) {
			var opt = {
				label : field.options[val],
				value : val
			};
			switch (field.type) {
				case 'select' :
					opt.attributes = {};
					(field.value == val) ? opt.selected = ' selected="selected"' : null;
					break;
				case 'radio' :
				case 'checkbox' :
					opt.attributes = field.attributes;
					(field.value.indexOf(val) !== -1) ? opt.attributes.checked = ' checked="checked"' : null;
					break;
			}
			obj.push(opt);
		}
		field.options = obj;
		return field;
	}

	/**
	 * Form render methods
	 */
	var formMethods = {};

	formMethods.open = function() {
		var data = {
			attributes : []
		};
		data.attributes = formatAttributes(this.attributes);
		return Mustache.render('<form{{>attrs}}>', data);
	};

	formMethods.field = function(name) {
		return this.fields[name].render();
	};

	formMethods.close = function() {
		return Mustache.render('</form>');
	};

	formMethods.render = function($selector) {
		var $out = $(this.open() + this.close());
		this.eachField(function(field) {
			$out.append(this.field(field.name));
		});
		if (typeof $selector === 'string') {
			return $($selector).html($out);
		} else if ($selector instanceof $) {
			return $selector.html($out);
		} else {
			return $out;
		}
	};

	// Decorate Form prototype
	for (var method in formMethods) {
		UniversalForms.Form.prototype[method] = formMethods[method];
	};

	/**
	 * Field render methods
	 */
	var fieldMethods = {};

	fieldMethods.render = function() {
		if (typeof fieldTemplates[this.type] !== 'undefined') {
			var tmpl = fieldTemplates[this.type];
		} else if (typeof fieldTemplates['default'] !== 'undefined') {
			var tmpl = fieldTemplates['default'];
		}
		var data = this.serialize();
		data.attributes = formatAttributes(this.attributes);
		if (['select', 'radio', 'checkbox'].indexOf(this.type) !== -1) {
			data = formatMultiInput(data);
		}
		return Mustache.render(tmpl, data);
	};

	// Decorate Field prototype
	for (var method in fieldMethods) {
		UniversalForms.Field.prototype[method] = fieldMethods[method];
	};

})(jQuery, Mustache, UniversalForms);
