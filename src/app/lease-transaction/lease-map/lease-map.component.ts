import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { NodeService } from "../../services/Nodeservice";
import { HomeNodeService } from "../../services/HomeNodeService";
import { BuyerService } from "../../services/buyer.service";
import { ProcessService } from "../../services/process.service";
import { LandlordService } from '../../services/landlord.service';
import * as _ from 'lodash';
@Component({
  selector: "app-map",
  templateUrl: "./lease-map.component.html",
  styleUrls: ["./lease-map.component.scss"]
})
export class LeaseMapComponent implements OnInit {
  user_name: any;
  user_id: any;
  isUser = false;
  isList = false;
  sellerList: any;
  businessList: any;
  companyId: any;

  buyerListBiz: any = [];
  isComSelected = false;
  isbuyerList = false;

  valuationService: any = [];
  accountingService: any = [];
  legalService: any = [];
  brokerService: any = [];
  constructionService: any = [];
  insuranceService: any;
  isServiceList = false;

  showService = false;
  selected_TranId: any;
  selected_ComId: any;
  seller_services: any;
  services_list: any;
  isprofessional = false;
  professionalList: any;
  tranId: any;
  // citySize = ["Buyer", "Seller"];
  agentType = [{name:'Landlord Agent',value:'Landlord'},{name:'Tenant Agent', value:'Tenant'}];  
  user_role;
  isBuyer: boolean;
  isSeller: boolean;
  isSellerTran = false;

  CheckList: any = [];
  isProcess = false;
  isTenantLogin = false;
  isLandlordLogin = false;

  prof_id: any;
  process_TranId:any;
  moreBuyer=false;
  userType:any;

  constructor(
    private user: NodeService,
    public router: Router,
    private home: HomeNodeService,
    private buyer: BuyerService,
    private process: ProcessService,
    private route: ActivatedRoute, 
    private landlord: LandlordService,

  ) {
    this.route.params.subscribe(params => {
      this.companyId = +params['comID'];
      this.userType = +params['userType'];//Unable to read id and id2 values   
     
     if(this.companyId){ this.ngOnInit();}
    });
    console.log('Lease-map');
  }

  ngOnInit() { 
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
        this.isUser = true;
        if(sessionStorage.getItem("Selected_Company")){
          let Details = JSON.parse(sessionStorage.getItem('Selected_Company'));
          this.companyId = Details.companyDetail.BUS_ENT_ID;
          this.userType = Details.userType;
        }       
     //   this.changeCompany();
      }
    }
    // this.route.queryParams
    // .filter(params => params.user_id)
    // .subscribe(params => {
    //         this.user_id = params.user_id;
    //         if(this.user_id != undefined){
    //           // this.user_id = true;
    //         } 
    // });
    // this.route.queryParams
    // .filter(params => params.comID)
    // .subscribe(params => {
    //         this.companyId = params.comID;
    //         this.userType = params.userType;
    //         if(this.user_id != undefined){
    //           // this.user_id = true;
    //         } 
    // });
     

    // this.landlord.getLeaseType(this.user_id).subscribe(
    //   userType=>{
    //     var res = userType;       
          if(this.userType == 1){ // Landlord
            this.isLandlordLogin = true;
            this.landlord.getTenantInterestList(this.user_id)
             .subscribe(buyerInterestList => {
              let res = buyerInterestList;
              if (res.length > 0) {
                if (res[0].status) {
                  this.isList = false;
                } else {
                  this.sellerList = res;
                //  this.companyId = this.sellerList[0].BUS_ENT_ID;
                  this.changeCompany();
                }
              }
              // this.landlord.getLeaseByUserID(this.user_id).subscribe(
              //   data => {
              //     var buyerRes = data;
              //     let rows = buyerRes;
              //     if (rows.length > 0) {
              //       if (rows[0].status) {
              //       } else {
              //         this.businessList = rows;
              //       }  
                   
              //     } else {
              //       alert("No Data");
              //     }
              //   },
              //   error => {
              //     alert("Server Error");
              //   });

              });            
          } 
          else if(this.userType == 2){ // Tenant
            this.isTenantLogin = true;
            this.landlord.getTenantLeaseList(this.user_id).subscribe(
              buyerSavedList => {
              var buyer_res = buyerSavedList;
              if (buyer_res.length > 0) {
                if (buyer_res[0].status) {
                  //this.isList = false;
                } else {
                  this.isSellerTran = true;
                  this.sellerList = buyer_res;
               //   this.companyId = this.sellerList[0].BUS_ENT_ID;
                  this.changeCompany();
                }
              } else {
                alert("No Data");
              }              
            });
          }          
          else  { // Professional
            this.home.getProfessionalList().subscribe(data => {
              var professional_Mstr = data;
              var checkProfessional = professional_Mstr.filter(item => {
                return item.USER_ID == this.user_id;
              });
              if (checkProfessional.length > 0) {
                this.isprofessional = true;
                this.prof_id = checkProfessional[0].ID;
                this.user_role = "Landlord";
                this.onRoleChange();
              } else {
                this.isprofessional = false;
              }
            });
          } 

      // });      
  }

  onRoleChange() {  
    if (this.user_role == "Landlord") {
      this.isBuyer = true;
      this.isSeller = false;
      this.professionalList = [];    
      this.landlord.getProfLandlordList(this.prof_id).subscribe(
        profBuyerData=>{
        var res = profBuyerData;
           if (res.length > 0) {
          if (res[0].status) {
          } else {
            var filterdList = _.uniqBy(res, 'TRAN_ID');
            this.professionalList = filterdList;
            this.tranId = this.professionalList[0].TRAN_ID;
            this.changeTransaction();
          }
        } else {
          alert("No Data");
        }
      });
    } 
    else if (this.user_role == "Tenant") {
      this.isSeller = true;
      this.isBuyer = false;
      this.professionalList = [];     

      this.landlord.getProfTenantList(this.prof_id).subscribe(
        profSellerData=>{
        var res = profSellerData;
           if (res.length > 0) {
          if (res[0].status) {
          } else {
            var filterdList = _.uniqBy(res, 'TRAN_ID');
            this.professionalList = filterdList;
            this.tranId = this.professionalList[0].TRAN_ID;
            this.changeTransaction();
          }
        } else {
          alert("No Data");
        }
      });
    }
  }

  changeCompany() {
    this.isProcess = false;
    this.isComSelected = true;
    this.buyerListBiz = [];

    var companyList = this.sellerList.filter(item => {
      return item.BUS_ENT_ID == this.companyId;
    });

    if (companyList.length > 0) {
      this.isbuyerList = true;
      if(!this.moreBuyer){
        var split={}
            split = companyList[0];
            this.buyerListBiz.push(split);
      }
      else{
        this.buyerListBiz = companyList;

      }    

    } else {
      this.isbuyerList = false;
    }
  }

  moreBuyerDetails(){
    this.buyerListBiz = [];
    this.moreBuyer = !this.moreBuyer;
    if(this.isprofessional){
      this.changeTransaction();
    }
    else{
      this.changeCompany();
    }
  }

  viewProcess() {
    this.isProcess = true;   
  }

  toggleVisibility(value) {
    this.CheckList.find(item => item.ORDER_NUM == value).STATUS = 1;
  }

  updateProcess() {
    var post = {
      TRAN_ID: this.CheckList[0].TRAN_ID
    };
    this.process.deleteProcessbyTran(post).subscribe(deleteData => {
      var res = deleteData;
      if (res > 0) {
        this.process.updateBuyerProcess(this.CheckList).subscribe(data => {
          var res = data;
          if (res > 0) {
            alert("Updated Successully!!!");
          }
        });
      }
    });
  }

  navigateProfDetail(value) {
    this.router.navigate(["/professional-detail"], {
      queryParams: { prof_id: value }
    });
  }

  changeTransaction() {
    this.buyerListBiz = [];
    this.isComSelected = true;   
    var post = {
      TranId: this.tranId
    }
    this.landlord.getDetailsbyLeaseTran(post).subscribe(tranDetails=>{
      var res = tranDetails;
      if (res.length > 0) {
        if (res[0].status) {
          this.isbuyerList = false;
        } else {
          this.isbuyerList = true;
          // this.buyerListBiz = tranDetails;
           if(!this.moreBuyer){
            var split={}
            split = tranDetails[0];
            this.buyerListBiz.push(split);
           
       }
       else{
         this.buyerListBiz = tranDetails;
 
       }
        }
      } else {
        alert("No Data");
      }

    });
  
  }

  viewBizServices(value) {
    if (value == this.selected_ComId) {
      this.selected_ComId = "";
    } else {
      this.seller_services = [];
      this.selected_ComId = value;
        var post = {
          ComId: value,
          UserId: this.user_id
        };
      this.user.getBizServices(post).subscribe(data => {
        var res = data;
        if (res.length > 0) {
          this.seller_services = res;
          this.isServiceList = true;
        }
      });
    }
  }

  addServices(value) {
    if (value == this.selected_TranId) {
      this.selected_TranId = "";
    } else {
      this.services_list = [];
      this.selected_TranId = value;
      var post = {
        TranId: value,
        UserId: this.user_id
      };
      this.user.getServices(post).subscribe(data => {
        var res = data;
        if (res.length > 0) {
          this.services_list = res;
          this.isServiceList = true;
        }
      });
    }
  }

  processTran(value){
    if (value == this.process_TranId) {
      this.process_TranId = "";
    } else {
      this.CheckList = [];
      this.process_TranId = value;

      if(this.isprofessional){        
        var companyList = this.buyerListBiz.filter(item => {
          return item.TRAN_ID == this.process_TranId;
        });

        var post = {
          TranId: value,
          ComId: companyList[0].COMPANY_ID
        };
      } else{
        var post = {
          TranId: value,
          ComId: this.companyId
        };
      }
   

    this.process.getProcessbyTran(post).subscribe(processData => {
      var res = processData;
      if (res.length > 0) {
        if (res[0].status) {
          this.process
            .getProcessbyCmp(this.companyId)
            .subscribe(getCmpProcess => {
              var res = getCmpProcess;
              if (res.length > 0) {
                if (res[0].status) {
                  //this.isList = false;
                } else {
                  // this.CheckList = res;

                  for (let i = 0; i < res.length; i++) {
                    var _obj = {
                      TRAN_ID: value,
                      ORDER_NUM: res[i].ORDER_NUM,
                      STEPS: res[i].STEPS,
                      STATUS: 0,
                      USER_ID: this.user_id
                    };
                    this.CheckList.push(_obj);
                  }
                  // this.isList = true;
                }
              } else {
                alert("No Data");
              }
            });
        } else {
          this.CheckList = res;
        }
      } else {
        alert("No Data");
      }
    });
  }
}
  
}
