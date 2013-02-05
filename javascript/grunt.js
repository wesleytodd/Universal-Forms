module.exports = function(grunt){
	grunt.initConfig({
		watch : {
			files : ['./examples']
		},
		exServer : {
			port : 8000,
			root : '.'
		},
		mocha : {
			all : {
				src : ['test/browser/index.html'],
				options : {
					run : true
				}
			}
		},
		simplemocha : {
			all : { 
				src : ['test/node/node-renderer.js'],
				options : {
					globals : ['should'],
					timeout : 3000,
					ui : 'bdd',
					reporter : 'list'
				}
			},
		}
	});

	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-simple-mocha');

	grunt.registerTask('example-server', 'Start an server for the examples.', function(){

		var exServer = grunt.config.get('exServer');

		grunt.log.writeln('Starting server on port ' + exServer.port)

		var static = require('node-static');
		var fileServer = new static.Server(exServer.root);
		require('http').createServer(function (request, response) {
			request.addListener('end', function () {
				grunt.log.writeln(request.headers.host + ' ' + request.url);
				fileServer.serve(request, response);
			});
		}).listen(exServer.port);

	});

	grunt.registerTask('examples', 'example-server watch');

	grunt.registerTask('new-driver', 'Create a new driver', function() {
		var done = this.async();

		var tmplRenderer = [
			'(function(UniversalForms) {',
			'',
			'	/**',
			'	 * Form render methods',
			'	 */',
			'	var formMethods = {};',
			'',
			'	formMethods.open = function() {',
			'',
			'	};',
			'',
			'	formMethods.field = function(name) {',
			'',
			'	};',
			'',
			'	formMethods.close = function() {',
			'',
			'	};',
			'',
			'	formMethods.render = function() {',
			'		var out = \'\';',
			'		out += this.open();',
			'		this.eachField(function(field) {',
			'			out += this.field(field.name);',
			'		});',
			'		out += this.close();',
			'		return out;',
			'	};',
			'',
			'	// Decorate Form prototype',
			'	for (var method in formMethods) {',
			'		UniversalForms.Form.prototype[method] = formMethods[method];',
			'	};',
			'',
			'	/**',
			'	 * Field render methods',
			'	 */',
			'	var fieldMethods = {};',
			'',
			'	fieldMethods.render = function() {',
			'',
			'	};',
			'',
			'	// Decorate Field prototype',
			'	for (var method in fieldMethods) {',
			'		UniversalForms.Field.prototype[method] = fieldMethods[method];',
			'	};',
			'',
			'})(UniversalForms);'
		].join('\n');
		
		var prompt = require('prompt');
		prompt.message = '['.white + '?'.green + ']'.white + ' ';
		prompt.delimiter = '';
		prompt.start();
		prompt.get({
			properties : {
				name : {
					description : 'Driver name:'
				}
			}
		}, function(err, input) {
			var fs = require('fs'),
				path = require('path');

			fs.mkdirSync(path.join('drivers', input.name));
			fs.mkdirSync(path.join('drivers', input.name, 'examples'));
			fs.mkdirSync(path.join('drivers', input.name, 'test'));
			fs.writeFileSync(path.join('drivers', input.name, 'renderer.js'), tmplRenderer);
			fs.writeFileSync(path.join('drivers', input.name, 'validator.js'), '');
			done();
		});

	});
};
