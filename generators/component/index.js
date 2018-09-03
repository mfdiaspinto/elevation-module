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