import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHeaderRoutingModule } from './admin-header-routing.module';
import { AdminHeaderComponent } from './admin-header.component';

@NgModule({
    declarations: [AdminHeaderComponent],
    imports: [CommonModule, AdminHeaderRoutingModule],
    exports: [AdminHeaderComponent]
})
export class AdminHeaderModule {}
