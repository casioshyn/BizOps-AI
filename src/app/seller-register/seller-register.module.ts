import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SellerPersonalComponent } from '../seller-register/seller-personal/seller-personal.component';
import { SellerBusinessComponent } from '../seller-register/seller-business/seller-business.component';
import { SellerFinancialComponent } from '../seller-register/seller-financial/seller-financial.component';
import { SellerBuildingComponent } from '../seller-register/seller-building/seller-building.component';
import { SellerPremisesComponent } from '../seller-register/seller-premises/seller-premises.component';
import { SellerAgentInfoComponent } from '../seller-register/seller-agent-info/seller-agent-info.component';
import { SellerTermsComponent } from '../seller-register/seller-terms/seller-terms.component';
import { SellerServicesComponent } from '../seller-register/seller-services/seller-services.component';
import { SellerProcessOverviewComponent } from '../seller-register/seller-process-overview/seller-process-overview.component';
import { SellerOtherDocsComponent } from '../seller-register/seller-other-docs/seller-other-docs.component';
import { SellerRegisterRoutingModule } from './seller-register.routing';
import { SellerRegComponent } from './seller-reg/seller-reg.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NguiMapModule} from '@ngui/map';
@NgModule({
 
  imports: [
    CommonModule,
    NgbModule,
    FileUploadModule,
    SellerRegisterRoutingModule,
    PdfViewerModule,    
    SharedModule,
    NguiMapModule.forRoot(
        {apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC56o9EoYPsP-K2SVVx6n4oC0ZfaM_Ay-0&libraries=visualization,places,drawing', 
         }),
  ],
  declarations: [
    SellerPersonalComponent, 
    SellerBusinessComponent, 
    SellerFinancialComponent, 
    SellerBuildingComponent, 
    SellerPremisesComponent, 
    SellerAgentInfoComponent, 
    SellerTermsComponent, 
    SellerServicesComponent, 
    SellerProcessOverviewComponent, 
    SellerOtherDocsComponent, SellerRegComponent
  ],
})
export class SellerRegisterModule { }
