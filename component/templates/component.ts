import { Component } from '@angular/core';
import { CompanyDependentService } from '@primavera/ngcore';

@Component({
    selector: '<%= nameCamelCase %>-component',
    templateUrl: './<%= nameCamelCase %>.component.html',
    styleUrls: ['./<%= nameCamelCase %>.component.scss']
})
export class <%= name %>Component {

    private testKey: string;

    //Sample constructor with companies service
    constructor(private companyDependentService : CompanyDependentService) {
        companyDependentService.getSelectCompany().subscribe(company =>
        {
            this.testKey = company.key;
        });
    }
}
