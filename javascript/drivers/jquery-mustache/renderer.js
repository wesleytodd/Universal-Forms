(function($, Mustache, UniversalForms) {

	Mustache.compilePartial('attrs', '{{#attributes}} {{name}}="{{{value}}}"{{/attributes}}');

	/**
	 * Form render methods
	 */
	var formMethods = {};

	formMethods.open = function() {
		var data = {
			attributes : []
		};
		for (var name in this.attributes) {
			data.attributes.push({
				name : name,
				value : this.attributes[name]
			});
		}
		return Mustache.render(this.openTemplate || '<form{{>attrs}}>', data);
	};

	formMethods.field = function(name) {
		return this.fields[name].render();
	};

	formMethods.close = function() {
		return Mustache.render(this.closeTemplate || '</form>');
	};

	formMethods.render = function() {
		var out = '';
		out += this.open();
		this.eachField(function(field) {
			out += this.field(field.name);
		});
		out += this.close();
		return out;
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
		
	};

	// Decorate Field prototype
	for (var method in fieldMethods) {
		UniversalForms.Field.prototype[method] = fieldMethods[method];
	};

})(jQuery, Mustache, UniversalForms);
