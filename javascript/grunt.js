module.exports = function(grunt){
	grunt.initConfig({
		watch : {
			files : ['core/*.js', 'drivers/*/*.js']
		},
		concat : {
			core : {
				src : ['core/field.js', 'core/form.js'],
				dest : 'build/universal-forms.core.js'
			},
			jquery : {
				src : ['core/field.js', 'core/form.js', 'drivers/jquery/renderer.js', 'drivers/jquery/validator.js'],
				dest : 'build/universal-forms.jquery.js'
			}
		},
		uglify : {
			builds : {
				files : {
					'build/universal-forms.core.min.js' : ['build/universal-forms.core.js'],
					'build/universal-forms.jquery.min.js' : ['build/universal-forms.jquery.js']
				}
			}
		},
		exServer : {
			port : 8000,
			root : '.'
		},
		mocha : {
			all : {
				src : ['core/test/index.html'],
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

	grunt.registerTask('build', 'concat uglify');

	grunt.registerTask('uglify', function() {
		var uglify = require('uglify-js'),
			fs = require('fs'),
			config = grunt.config.get('uglify');
		
		for (var group in config) {
			for (var outfile in config[group].files) {
				var res = uglify.minify(config[group].files[outfile]);
				fs.writeFileSync(outfile, res.code);
			}
		}
	});

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

	grunt.registerTask('new-plugin', 'Create a new plugin', function() {
		var done = this.async();

		var tmpl = [
			'(function(UniversalForms) {',
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
					description : 'Plugin name:'
				}
			}
		}, function(err, input) {
			var fs = require('fs'),
				path = require('path');

			fs.mkdirSync(path.join('plugins', input.name));
			fs.mkdirSync(path.join('plugins', input.name, 'examples'));
			fs.mkdirSync(path.join('plugins', input.name, 'test'));
			fs.writeFileSync(path.join('plugins', input.name, 'universal-forms-' + input.name + '.js'), tmpl);
			done();
		});

	});
};
