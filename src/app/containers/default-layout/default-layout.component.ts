import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  navItems,
  sellerNav,
  buyerNav,
  professionalNav,
  adminNav,
  LandlordNav,
  TenantNav,
  leaseProfessionalNav
} from "./../../_nav";
import { NodeService } from "../../services/Nodeservice";
import { AdminService } from "../../services/admin.service";
import { LandlordService } from '../../services/landlord.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html"
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  // public navItems = navItems;
  usr_id:any;
  EditUserID:any;
  adminControl:any;
  isAdminControl=false;
  public navItems: any;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  user_name: string;
  user_id: string;
  isUser: boolean = false;
  isAdmin: boolean = false;
  public isCollapsed = false;
  public largeModal;
  adminData: any = [];
  admin: any;
  tranType: any;
  userRole: any;
  userChangeRole:any;
  companyID: number;
  selectedCompanyDetails: any;
  isCompanySelected = false;
  isBuySellTran = false;
  isLeaseTran = false;
  Role:any;
  userChangeRoles:any=[];
  transactionType = [
    { id: 1, value: "Buy Sell Transaction" },
    { id: 2, value: "Lease Transaction" },
    { id: 3, value: "Operate Transaction" }
  ];

  RoleList = [
    { tranType: 1, role:1, type:"Buy Sell Transaction",value: "Seller" },
    { tranType: 1, role:2, type:"Buy Sell Transaction", value: "Buyer" },
    { tranType: 1, role:3, type:"Buy Sell Transaction", value: "Professional" },

    { tranType: 2, role:1, type:"Lease Transaction", value: "Landlord" },
    { tranType: 2, role:2, type:"Lease Transaction", value: "Tenant" },
    { tranType: 2, role:3, type:"Lease Transaction", value: "Professional" },

    { tranType: 3, role:1, type:"Operate Transaction", value: "Owner" },
    { tranType: 3, role:2, type:"Operate Transaction", value: "Professional" },
    { tranType: 3, role:3, type:"Operate Transaction", value: "Products Supplier" }

    //{ id: 3, value: "Professional" },
  ];
  userRoleList = [
    { id: 1, role:1, value: "Professional" },
    { id: 1, role:2, value: "Landlord" },
    { id: 2, role:1, value: "Professional" }    
  ];
  userBusinessList: any;

  constructor(
    private user: NodeService,
    private router: Router,
    private adminUser: AdminService,
    private landlord: LandlordService,
    private route :ActivatedRoute
  ) {


    let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
    if (userdata) {
      this.isUser = true;
      this.user_name = userdata.USER_FIRSTNAME;
      this.user_id = userdata.ID;
      if (this.user_name.toLowerCase() == "admin") {
        this.isAdmin = true;
        this.navItems = adminNav;
      } else {
        this.isAdmin = false;
      }
    } else {
      this.isUser = false;
    }

    this.changes = new MutationObserver(mutations => {
      this.sidebarMinimized = document.body.classList.contains(
        "sidebar-minimized"
      );
    });
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  ngOnInit() {
    this.route.queryParams
    .filter(params => params.user_id)
    .subscribe(params => {
            this.usr_id = params.user_id;
            if(this.user_id != undefined){              
            } 
    });
    this.route.queryParams
    .filter(params => params.adminControl)
    .subscribe(params => {
            this.adminControl = params.adminControl;
            this.isAdminControl=true;
            if(this.user_id != undefined){              
            } 
    });
    if(this.user_id){
    sessionStorage.removeItem("Selected_Company");
    //sessionStorage.removeItem("Bizops_User");

    this.adminUser.getAdmin().subscribe(data => {
      this.adminData = data;
      this.admin = this.adminData[0].USER_FIRSTNAME;
      if (this.isAdmin == false) {
        this.user.checkFirstUser(this.user_id).subscribe(userType => {
          var res = userType;
          this.EditUserID=res[0].ID;
          if (res[0].ID == 1) {
            this.navItems = sellerNav;
          } else if (res[0].ID == 2) {
            this.navItems = buyerNav;
          } else if (res[0].ID == 3) {
            this.navItems = professionalNav;
          } else if (res[0].ID == 4) {
            this.navItems = LandlordNav;
          } else if (res[0].ID == 5) {
            this.navItems = TenantNav;
          } else {
            // this.navItems = LandlordNav
          }
        });
      }
    });
   }
  }
  tranTypeChange(event) {
    // this.Role = this.RoleList.filter(item => {
    //   return item.id == this.tranType;
    // });
    this.tranType = event.tranType;
    this.userRole = event.role;
    this.roleChange();
  }

  roleChange() {
    this.userBusinessList =[];
    this.companyID=null;
    if (this.tranType == 1) {
      
    //  this.isLeaseTran = true;
      if (this.userRole == 1) { //seller
        this.navItems = sellerNav;
        this.userChangeRoles = this.userRoleList.filter(item => {
          return item.id == this.userRole;
        });
        console.log(this.userChangeRoles)
        if(!this.isAdminControl){
        this.user.getBizbyUser(this.user_id).subscribe(userBusiness => {
          var res = userBusiness;
          if (res.length > 0) {
            if (res[0].status) {
            } else {
              this.userBusinessList = res;
            }
          } else {
            alert("No Data");
          }
        });
      }else{      
        this.user.getBizbyUser(this.usr_id).subscribe(userBusiness => {
          var res = userBusiness;
          if (res.length > 0) {
            if (res[0].status) {
            } else {
              this.userBusinessList = res;
            }
          } else {
            alert("No Data");
          }
        });
      }
      } else if (this.userRole == 2) { //buyer
        this.navItems = buyerNav;
        this.user.getSavedList(this.user_id).subscribe(buyerSavedList => {
          var buyer_res = buyerSavedList;
          if (buyer_res.length > 0) {
            if (buyer_res[0].status) {
            
            } else {              
              this.userBusinessList = buyer_res;
            }
          } else {
            alert("No Data");
          }
        });

      } else if (this.userRole == 3){ //professional
        this.navItems = professionalNav;
        this.router.navigate(["/tran/map",10, 3]);

      }

    } else if (this.tranType == 2) { 
        this.isLeaseTran = true;
        if (this.userRole == 1) { //landlord
          this.navItems = LandlordNav;
          this.landlord.getLeaseByUserID(this.user_id).subscribe(
            data => {
              var buyerRes = data;
              let rows = buyerRes;
              if (rows.length > 0) {
                if (rows[0].status) {
                } else {
                  this.userBusinessList = rows;
                }  
               
              } else {
                alert("No Data");
              }
            },
            error => {
              alert("Server Error");
            });
        } else if (this.userRole == 2) { //tenant
          this.navItems = TenantNav;
          this.landlord.getTenantLeaseList(this.user_id).subscribe(
            buyerSavedList => {
            var buyer_res = buyerSavedList;
            if (buyer_res.length > 0) {
              if (buyer_res[0].status) {
                //this.isList = false;
              } else {
               
                this.userBusinessList = buyer_res;
              
               
              }
            } else {
              alert("No Data");
            }              
          });
        } else if (this.userRole == 3) { //professional
          this.navItems = leaseProfessionalNav;
          this.router.navigate(["/lease-transaction/lease-map",10, 3]);

        }    
    }
  }
  userRoleChange(){
    this.user.checkFirstUser(this.user_id).subscribe(userType => {
      var res = userType;
      let rows = res;
      if(this.userChangeRole=='Professional'){
        if(rows.length > 0){
          if(rows[0].status){

          }else{
            if(res==3){
              alert("You already Professional")
            }else{
              this.router.navigate(['/professionalregister'])
            }
          }
        }
      }else if(this.userChangeRole=='Landlord'){
        if(rows.length>0){
          if(rows[0].status){

          }else{
            if(res==4){
              alert("You already Landlord")
            }else{
              this.router.navigate(['/form/landlord-register'])
            }
          }
        }
      }else{

      }      
    });
  }

  businessChange() {
    sessionStorage.removeItem("Selected_Company");

    this.isCompanySelected = true;
    this.selectedCompanyDetails = this.userBusinessList.filter(item => {
      return item.COMPANY_ID == this.companyID;
    });
    var data={
      userType: this.userRole,
      companyDetail: this.selectedCompanyDetails[0]
    }
    sessionStorage.setItem("Selected_Company",JSON.stringify(data));

    let companyDetails = JSON.parse(sessionStorage.getItem("Selected_Company"));
    this.router.navigate(["/tran/map",this.companyID, this.userRole]
    // , {
    //   queryParams: { comID: this.companyID }
    // }
    );
  }

  leaseBusinessChange() {
    sessionStorage.removeItem("Selected_Company");

    this.isCompanySelected = true;
    this.selectedCompanyDetails = this.userBusinessList.filter(item => {
      return item.BUS_ENT_ID == this.companyID;
    });
    var data={
      userType: this.userRole,
      companyDetail: this.selectedCompanyDetails[0]
    }
    sessionStorage.setItem(
      "Selected_Company",
      JSON.stringify(data)
    );

    let companyDetails = JSON.parse(sessionStorage.getItem("Selected_Company"));
    this.router.navigate(["/lease-transaction/lease-map",  this.companyID, this.userRole]
    //, 
    // {
    //   queryParams: { comID: this.companyID, userType:this.userRole }
    // }
    );
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
