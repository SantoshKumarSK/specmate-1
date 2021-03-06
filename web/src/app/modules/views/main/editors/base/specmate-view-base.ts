import 'rxjs/add/operator/switchMap';
import { OnInit } from '@angular/core';
import { SpecmateDataService } from '../../../../data/modules/data-service/services/specmate-data.service';
import { NavigatorService } from '../../../../navigation/modules/navigator/services/navigator.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfirmationModal } from '../../../../notification/modules/modals/services/confirmation-modal.service';
import { Url } from '../../../../../util/url';
import { IContainer } from '../../../../../model/IContainer';
import { TranslateService } from '@ngx-translate/core';

export abstract class SpecmateViewBase implements OnInit {

    protected abstract get isValid(): boolean;

    constructor(
        protected dataService: SpecmateDataService,
        protected navigator: NavigatorService,
        protected route: ActivatedRoute,
        protected modal: ConfirmationModal,
        protected translate: TranslateService) {}

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                return this.dataService.readElement(Url.fromParams(params));
            })
            .subscribe((element: IContainer) => {
                this.onElementResolved(element);
            });
    }

    protected abstract onElementResolved(element: IContainer): void;
}
