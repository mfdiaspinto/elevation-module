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
      this.templatePath('component.css'),
      this.destinationPath(nameCamelCase+ '/' + nameCamelCase + '.component.css'),
			{         
        name: name,
        nameCamelCase: nameCamelCase
			}
		);
		
		this.fs.copyTpl(
      this.templatePath('component.html'),
      this.destinationPath(nameCamelCase + '/' + nameCamelCase + '.component.html'),
			{         
        name: name,
        nameCamelCase: nameCamelCase
			}
		);
		
		this.fs.copyTpl(
      this.templatePath('component.ts'),
      this.destinationPath(nameCamelCase + '/' + nameCamelCase + '.component.ts'),
			{         
        name: name,
        nameCamelCase: nameCamelCase
      }
    );

    try {
        var indexFile = this.fs.read("index.ts", {});
   
        var importsTag = "//ImportComponents";
        var exportsTag = "//ExportComponents";
        var declarationsComponentsTag = "//DeclarationsComponents";
        var entryComponents = "//ModuleExportComponents";

        if(indexFile.indexOf(importsTag) >= 0){
          
          var index = indexFile.indexOf(importsTag);

          indexFile = indexFile.slice(0, index + importsTag.length) + "\n import {" + name + "Component} from './" + nameCamelCase + "/" + nameCamelCase+ ".component';\n" + indexFile.slice(index + importsTag.length + Math.abs(0));
        }

        if(indexFile.indexOf(exportsTag) >= 0){
          
          var index = indexFile.indexOf(exportsTag);

          indexFile = indexFile.slice(0, index + exportsTag.length) + "\n export {" + name + "Component} from './" + name + "/" + nameCamelCase+ ".component';\n" + indexFile.slice(index + exportsTag.length + Math.abs(0));
        }

        if(indexFile.indexOf(declarationsComponentsTag) >= 0){
          
          var index = indexFile.indexOf(declarationsComponentsTag);

          indexFile = indexFile.slice(0, index + declarationsComponentsTag.length) + "\n " + name + "Component,\t" + indexFile.slice(index + declarationsComponentsTag.length + Math.abs(0));
        }

        if(indexFile.indexOf(entryComponents) >= 0){
          
          var index = indexFile.indexOf(entryComponents);

          indexFile = indexFile.slice(0, index + entryComponents.length) + "\n " + name + "Component,\t" + indexFile.slice(index + entryComponents.length + Math.abs(0));
        }


        this.fs.write("index.ts", indexFile);
    } catch(error) {
      this.log("can't find index.ts on project, add component to index.ts file.");
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
      message : 'Component name:',
    }]);
  }	

  end() {
    this.log("Add", this.answers.name, "Component on NgModule!");
  }
};