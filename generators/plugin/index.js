var Generators = require("yeoman-generator"),
	Chalk = require("chalk"),
	Fs = require("fs");
var JSON = require('JSON');


var spawn = require('child_process').spawn;

var options = {
	appName: "",
	path:"",
	ports:[]
};

module.exports = Generators.Base.extend({

	promptName: function () {
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'name',
			message: 'Your project name',
			default: this.appname
		}, function (answers) {
			this.log("name: " + answers.name);
			options.appName = answers.name;
			done();
		}.bind(this));
	},

	promptPackageName: function () {
		var done = this.async();
		var packageName = options.appName.indexOf('_')>0 ? options.appName.split('_')[1].toLowerCase() : options.appName.toLowerCase();
		this.prompt({
			type: 'input',
			name: 'packageName',
			message: 'Your package name',
			default: packageName
		}, function (answers) {
			this.log("name: " + answers.packageName);
			options.packageName = answers.packageName;
			done();
		}.bind(this));
	},

	promptPort1: function(){
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'port',
			message: 'Expose ports (first port). one space if not needed',
			default: '3000'
		}, function (answers) {
			this.log("first port: " + answers.port);
			if(answers.port.length > 1) {
				options.ports.push(answers.port);
			}
			done();
		}.bind(this));
	},

	promptPort2: function(){
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'port',
			message: 'Expose ports (debug port). . one space if not needed',
			default: '5858'
		}, function (answers) {
			this.log("debug port: " + answers.port);
			if(answers.port.length > 1) {
				options.ports.push(answers.port);
			}
			done();
		}.bind(this));
	},

	writing: function () {
		this.fs.copy(
			this.templatePath("tests/mocha.opts"),
			this.destinationPath("tests/mocha.opts")
		);
		this.fs.copy(
			this.templatePath("babelhook.js"),
			this.destinationPath("babelhook.js")
		);
		this.fs.copy(
			this.templatePath(".gitignore"),
			this.destinationPath(".gitignore")
		);
		this.fs.copyTpl(
			this.templatePath("docker-compose.yml.template"),
			this.destinationPath("docker-compose.yml"),
			options
		);
		this.fs.copyTpl(
			this.templatePath("Dockerfile"),
			this.destinationPath("Dockerfile"),
			options
		);
		this.fs.copyTpl(
			this.templatePath("package.json"),
			this.destinationPath("package.json"),
			options
		);
		this.fs.copyTpl(
			this.templatePath("README.md"),
			this.destinationPath("README.md"),
			options
		);
		this.fs.copyTpl(
			this.templatePath("tests/index.js"),
			this.destinationPath("tests/index.js"),
			options
		);
		this.fs.copyTpl(
			this.templatePath("src/index.js"),
			this.destinationPath("src/index.js"),
			options
		);
	},
	end: function(){
		spawn('git', ['init'],{ stdio: 'inherit' });
		spawn('git',  ['add', '--all'],{ stdio: 'inherit' });
		spawn('git', ['commit', '-m', '"initial commit from generator"'],{ stdio: 'inherit' });
		spawn('docker-compose', ['up'],{ stdio: 'inherit' });
	}
});