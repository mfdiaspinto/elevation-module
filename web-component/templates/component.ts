import { Component, OnInit } from '@angular/core';
import { PriWebComponentField, I18nService } from '@primavera/ngcore';

@Component({
    selector: '<%= nameCamelCase %>-component',
    templateUrl: './<%= nameCamelCase %>.component.html',
    styleUrls: ['./<%= nameCamelCase %>.component.scss']
})
export class <%= name %>Component extends PriWebComponentField implements OnInit {

    constructor(protected i18nService: I18nService) {
        super();
    }

    ngOnInit() {
        
        this.onModelLoaded.subscribe(o => {
            // TODO
        });

        this.onModelChanged.subscribe(o => {
            // TODO
        });

        this.onViewLoaded.subscribe(o => {
            // TODO
        });

        // update value to property 
        this.onValueChanged.emit({
            propertyName: "propertyToUpdate",
            detailName: undefined,
            value: "value"
        });
    }
}
