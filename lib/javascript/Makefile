REPORTER = spec
test:
	@test/lib/mocha/bin/mocha --globals match --require should --reporter $(REPORTER)

prep-cov: clean
	@mkdir -p test/temp && cp module.js test/temp/
	@jscoverage test/temp test/coverage
	@chmod -R 755 test/coverage
	@rm -rf test/temp

test-cov: prep-cov
	@MODULE_COV=1 $(MAKE) -s test REPORTER=html-cov > test/coverage/index.html

clean:
	@rm -rf test/temp test/coverage

#mocha:
#	@git submodule add git://github.com/visionmedia/mocha.git test/lib/mocha

#browser: mocha
#	@git submodule add git://github.com/LearnBoost/expect.js.git test/lib/expect
#	@git submodule init && git submodule update
#	@cd test/lib/mocha && git config core.fileMode false
#	@cd test/lib/expect && git config core.fileMode false

#node: mocha
#	@git submodule addgit://github.com/visionmedia/should.js.git test/lib/should
#	@cd test/lib/mocha && npm update
#	@cd test/lib/mocha && git config core.fileMode false
#	@cd test/lib/should && git config core.fileMode false

closure:
	@java -jar ~/scripts/closure/compiler.jar --js module.js --js_output_file module.min.js
	@touch module.min.js.temp && echo "/* __MODULE__ | Version 0.1 | http://wesleytodd.com/ */" >> module.min.js.temp
	@cat module.min.js >> module.min.js.temp
	@cat module.min.js.temp > module.min.js
	@rm module.min.js.temp

.PHONY: test prep-cov test-cov clean mocha browser node closure
