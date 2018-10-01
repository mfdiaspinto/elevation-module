var Generator = require('yeoman-generator');

module.exports = class extends Generator {

	 // The name `constructor` is important here
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);			
	}
	
	writing() {

    var name = this.answers.name.charAt(0).toUpperCase() + this.answers.name.slice(1);

    var nameCamelCase = this.answers.name
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
		
		this.fs.copyTpl(
      this.templatePath('service.ts'),
      this.destinationPath(nameCamelCase + '/' + nameCamelCase + '.service.ts'),
			{         
        name: name,
        nameCamelCase: nameCamelCase
      }
    );

    try {
        var indexFile = this.fs.read("index.ts", {});
   
        var importsTag = "//ImportServices";
        var providersTag = "//ProvidersServices";
     
        if(indexFile.indexOf(importsTag) >= 0){
          
          var index = indexFile.indexOf(importsTag);

          indexFile = indexFile.slice(0, index + importsTag.length) + "\n import {" + name + "Service} from './" + nameCamelCase + "/" + nameCamelCase+ ".service';\n" + indexFile.slice(index + importsTag.length + Math.abs(0));
        }

        if(indexFile.indexOf(providersTag) >= 0){
          
          var index = indexFile.indexOf(providersTag);

          indexFile = indexFile.slice(0, index + providersTag.length) + "\n     { provide: "+name+"Service, useClass: "+name+"Service }," + indexFile.slice(index + providersTag.length + Math.abs(0));
        }
     
        this.fs.write("index.ts", indexFile);
    } catch(error) {
      this.log("can't find index.ts on project, add service to index.ts file.");
    }
	}
	
  paths() {
    this.destinationRoot();
    // returns '~/projects'

    this.destinationPath('index.js');
		// returns '~/projects/index.js'
		
		this.sourceRoot();
    // returns './templates'

    this.templatePath('index.js');
    // returns './templates/index.js'
  }	

	async prompting() {
    this.answers = await this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Service name:',
    }]);
  }	

  end() {
    this.log("Done!!");
  }
};