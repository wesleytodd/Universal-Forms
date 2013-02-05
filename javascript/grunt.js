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

			fs.mkdir(path.join('drivers', input.name), function() {
				fs.mkdirSync(path.join('drivers', input.name, 'examples'));
				fs.mkdirSync(path.join('drivers', input.name, 'test'));
				fs.writeFileSync(path.join('drivers', input.name, 'renderer.js'), '');
				fs.writeFileSync(path.join('drivers', input.name, 'validator.js'), '');
				done();
			});
		});

	});
};
