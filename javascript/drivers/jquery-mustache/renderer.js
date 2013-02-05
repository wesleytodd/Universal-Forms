(function($, Mustache, UniversalForms) {
	
	/**
	 * Form render methods
	 */
	var formMethods = {};

	formMethods.open = function() {
		
	};

	formMethods.field = function(name) {
		
	};

	formMethods.close = function() {
		
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
