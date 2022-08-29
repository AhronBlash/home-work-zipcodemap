import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { he_IL, NZ_I18N } from 'ng-zorro-antd/i18n';

const modules = [
    CommonModule,
    NzInputModule,
    NzFormModule,
    NzIconModule,
    NzButtonModule,
    NzSpinModule,
    NzNotificationModule
]

@NgModule({
    declarations: [],
    imports: [
       ...modules 
    ],
    providers: [
        {
            provide: NZ_I18N, useValue: he_IL,
        }
    ],
    exports: [
        ...modules
    ]
})
export class NgzorroModule { }
