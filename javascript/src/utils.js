/**
 * Utility Functions
 *
 * These functions map directly to Underscore or Lo-Dash.
 * Either library can be substituted and this file becomes
 * unnecessary.  One of those libraries is preferred,
 * but if you are not using one already, these satisfy the
 * minimum requirements of the library.
 */
var _ = (function(_){

	if (typeof _ != 'undefined') {
		return _;
	}

	return {
		mixin : function() {},
		extend : function(obj) {
			var objs = Array.prototype.slice.call(arguments, 1),
				len = objs.length;
			for (var i = 0; i < len; i++) {
				for (var prop in objs[i]) {
					obj[prop] = objs[i][prop];
				}
			}
			return obj;
		}
	};

})(_);
