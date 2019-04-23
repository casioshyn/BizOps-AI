import { NgModule } from '@angular/core';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin.routing';
import { BusinessManagementComponent } from '../admin/business-management/business-management.component';
import { UserManagementComponent } from '../admin/user-management/user-management.component';
import { ManageBizAdminsComponent } from './manage-biz-admins/manage-biz-admins.component';
import { AdminNotificationComponent } from './admin-notification/admin-notification.component';
import { ManageLeaseComponent } from './manage-lease/manage-lease.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { NodeService } from '../services/Nodeservice';
// import { HomeNodeService} from '../services/HomeNodeService';
// import { AdminService } from '../services/admin.service';

@NgModule({
  imports: [  
    AdminRoutingModule, 
    PdfViewerModule,  
    TabsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    BusinessManagementComponent,   
    UserManagementComponent, ManageBizAdminsComponent, AdminNotificationComponent, ManageLeaseComponent,    
  ],
  providers: [
  
  ],
  
})
export class AdminModule { }
