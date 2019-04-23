import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerPersonalComponent } from './seller-personal/seller-personal.component';
import { SellerBusinessComponent } from './seller-business/seller-business.component';
import { SellerFinancialComponent } from './seller-financial/seller-financial.component';
import { SellerBuildingComponent } from './seller-building/seller-building.component';
import { SellerPremisesComponent } from './seller-premises/seller-premises.component';
import { SellerAgentInfoComponent } from './seller-agent-info/seller-agent-info.component';
import { SellerTermsComponent } from './seller-terms/seller-terms.component';
import { SellerServicesComponent } from './seller-services/seller-services.component';
import { SellerProcessOverviewComponent } from './seller-process-overview/seller-process-overview.component';
import { SellerOtherDocsComponent } from './seller-other-docs/seller-other-docs.component';
import { SellerRegComponent } from './seller-reg/seller-reg.component';
const routes: Routes = [
    { path: 'sell-personal',  component: SellerPersonalComponent },
    { path: 'sell-business',  component: SellerBusinessComponent },
    { path: 'sell-financial',  component: SellerFinancialComponent },
    { path: 'sell-building',  component: SellerBuildingComponent },
    { path: 'sell-premises',  component: SellerPremisesComponent },
    { path: 'sell-agentInfo',  component: SellerAgentInfoComponent },
    { path: 'sell-terms',  component: SellerTermsComponent },
    { path: 'sell-services',  component: SellerServicesComponent },
    { path: 'sell-processoverview',  component: SellerProcessOverviewComponent },
    { path: 'sell-otherdocs',  component: SellerOtherDocsComponent },
    { path: 'sell-reg',  component: SellerRegComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRegisterRoutingModule { }
