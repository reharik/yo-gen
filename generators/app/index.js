/**
 * Created by parallels on 9/2/15.
 */
var Generators = require("yeoman-generator"),
    Chalk = require("chalk"),
    Fs = require("fs");


module.exports = Generators.Base.extend({
    prompting: function(){
        var done = this.async();

        Fs.readdir(this._sourceRoot.replace("/app/templates", ""), function(err, files){
            this.log(Chalk.bold.yellow("Available commands"));

            for(var i=0; i<files.length; i++){
                if(files[i] !== "app"){
                    this.log(Chalk.bold.green("yo ") +  files[i]);
                }
            }
            done();
        }.bind(this));
    }
});