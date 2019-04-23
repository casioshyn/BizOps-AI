import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NodeService } from "../../services/Nodeservice";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"]
})
export class ServicesComponent implements OnInit {
  user_role;
  isBuyer: boolean;
  isBuyerCheck = false;

  isUserResponse =false;
  isExistingBuyer = false;
  isSeller: boolean;
  isExistingSeller = false;
  isSellerCheck = false;
  isAddExisting = false;
  user_name: any;
  user_id: any;
  Data: any;
  List: any;
  isList: boolean = false;
  isUser = false;
  buyerList: any;
  sellerList: any;
  showService = false;
  selected_TranId: any;
  citySize = ["Buyer", "Seller"];
  services_list: any;

  valuationService: any = [];
  accountingService: any = [];
  legalService: any = [];
  brokerService: any = [];
  constructionService: any = [];
  insuranceService: any;
  isServiceList = false;

  userPropertyList: any;
  isUserPropList = false;
  selected_ComId: any;
  isUSerProfRespose :false;
  userProfResponse:any;
  userProfessionalDetails:any=[];
  constructor(private user: NodeService, public router: Router,private route: ActivatedRoute,) {}

  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
        this.isUser = true;
      }
    }
    this.route.queryParams
    .filter(params => params.res)
    .subscribe(params => {
      this.isUserResponse =true;
      this.userProfResponse = params.res;  

      this.isSeller = false;
    });
    this.user.getBizbyUser(this.user_id).subscribe(
      userPropertyList => {
        let rows = userPropertyList;
        if (rows.length > 0) {
          if (rows[0].status) {
            this.isUserPropList = false;
          } else {
            this.userPropertyList = rows;
            this.isUserPropList = true;
          }
        } else {
          alert("No Data");
        }
        this.user.getSavedList(this.user_id).subscribe(buyerSavedList => {
          this.Data = buyerSavedList;
          if (this.Data.length > 0) {
            if (this.Data[0].status) {
              this.isList = false;
            } else {
              this.buyerList = this.Data;
              this.isList = true;
            }
          } else {
            alert("No Data");
          }
          this.user.checkFirstUser(this.user_id).subscribe(
            userType=>{
              var res = userType;             
                if(res[0].ID == 1){
                  this.isSeller =true;
                  this.isExistingSeller = true;
                } else if(res[0].ID == 2){
                  this.isBuyer = true; 
                  this.isExistingBuyer = true;                
                }
                this.user.getuserProf().subscribe(data=>{
                  let res = data;
                  if(this.isUserResponse){
                    this.userProfResponse =true; 
                    this.isSeller =false;
                  }                                
                  this.userProfessionalDetails = res;
                  console.log(this.userProfessionalDetails);
                });                
            });


        });
      },
      error => {
        alert("Server Error");
      }
    );
  }

  onRoleChange(value) {
    //this.user_role = value;
    if (this.user_role == "Buyer") {
      this.isBuyer = true;
      this.isExistingBuyer = true;
      this.isSeller = false;
      this.isExistingSeller =false;
    }
    else if (this.user_role == "Seller") {
      this.isSeller = true;
      this.isBuyer = false;
      this.isExistingBuyer =false;
      this.isExistingSeller = true;
    }
  }

  changeType() {
    this.isAddExisting = true;
  }

  changeProfessional(value) {
    this.router.navigate(["/operate/hire"], {
       queryParams: { ComId: value, service:'Principle Agent', type: "add" } });
  }
  updateProf(value) {
    this.router.navigate(["/operate/hire"], {
      queryParams: { ComId: value, service: 'Principle Agent', type: "update" }
    });
  }

  

  changeBuyerProf(value){
    this.router.navigate(["/operate/hire"], {
       queryParams: { tran_id: value, service:'Principle Agent', type: "add" } });
  }
  updateBuyerProf(value) {
    this.router.navigate(["/operate/hire"], {
      queryParams: { tran_id: value, service: 'Principle Agent', type: "update" }
    });
  }

  viewBizServices(value) {
    if (value == this.selected_ComId) {
      this.selected_ComId = "";
    } else {
      this.services_list = [];
      this.valuationService = [];
      this.accountingService = [];
      this.insuranceService = [];
      this.legalService = [];
      this.brokerService = [];
      this.constructionService = [];
      this.selected_ComId = value;
      var post = {
        ComId: value,
        UserId: this.user_id
      };
      this.user.getBizServices(post).subscribe(data => {
        var res = data;
        if (res.length > 0) {
          this.services_list = res;
          // this.valuationService = this.services_list.filter()
          this.valuationService = this.services_list.filter(item => {
            return item.SERVICE_TYPE == "valuation";
          });

          this.accountingService = this.services_list.filter(item => {
            return item.SERVICE_TYPE == "accounting";
          });

          this.legalService = this.services_list.filter(item => {
            return item.SERVICE_TYPE == "legal";
          });

          this.brokerService = this.services_list.filter(item => {
            return item.SERVICE_TYPE == "broker";
          });

          this.constructionService = this.services_list.filter(item => {
            return item.SERVICE_TYPE == "construction";
          });

          this.insuranceService = this.services_list.filter(item => {
            return item.SERVICE_TYPE == "insurance";
          });

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
      this.valuationService = [];
      this.accountingService = [];
      this.insuranceService = [];
      this.legalService = [];
      this.brokerService = [];
      this.constructionService = [];

      this.selected_TranId = value;
      var post = {
        TranId: value,
        UserId: this.user_id
      };
      this.user.getServices(post).subscribe(data => {
        var res = data;
        if (res.length > 0) {
          this.services_list = res;
          // this.valuationService = this.services_list.filter()
          this.valuationService = this.services_list.filter(item => {
            return item.SERVICE_TYPE == "valuation";
          });

          this.accountingService = this.services_list.filter(item => {
            return item.SERVICE_TYPE == "accounting";
          });

          this.legalService = this.services_list.filter(item => {
            return item.SERVICE_TYPE == "legal";
          });

          this.brokerService = this.services_list.filter(item => {
            return item.SERVICE_TYPE == "broker";
          });

          this.constructionService = this.services_list.filter(item => {
            return item.SERVICE_TYPE == "construction";
          });

          this.insuranceService = this.services_list.filter(item => {
            return item.SERVICE_TYPE == "insurance";
          });

          this.isServiceList = true;
        }
      });
    }
  }

  addService(value, value1) {
    this.router.navigate(["/operate/hire"], {
      queryParams: { tran_id: value, service: value1, type: "add" }
    });
  }

  changeService(value, value1) {
    this.router.navigate(["/operate/hire"], {
      queryParams: { tran_id: value, service: value1, type: "update" }
    });
  }

  removeService(value, value1, value2) {
    //this.router.navigate(['/hire'], { queryParams: { tran_id: value, service: value1, type:'remove'} });
    var post = {
      Prof_Id: value2,
      User_Id: this.user_id,
      Tran_Id: value,
      service: value1
    };

    this.user.removeProfessional(post).subscribe(data => {
      var res = data;
      if (res) {
        alert("removed Successfully!!!");
        this.addServices(value);
      }
    });
  }

  addBizService(value, value1) {
    this.router.navigate(["/operate/hire"], {
      queryParams: { ComId: value, service: value1, type: "add" }
    });
  }

  changeBizService(value, value1) {
    this.router.navigate(["/operate/hire"], {
      queryParams: { ComId: value, service: value1, type: "update" }
    });
  }

  removeBizService(value, value1, value2) {
    var post = {
      Prof_Id: value2,
      User_Id: this.user_id,
      ComId: value,
      service: value1
    };

    this.user.removeBizProf(post).subscribe(data => {
      var res = data;
      if (res) {
        alert("removed Successfully!!!");
        this.addServices(value);
      }
    });
  }
  addNewServices(){
    this.router.navigate(['/home/buy']);
  }
  existingServices(){
    this.isBuyerCheck = true;
    this.isExistingBuyer =false;
  }
  addSellerService(){
    this.router.navigate(['/operate/hire'],{
      queryParams: { UserId: this.user_id} });
  }
  existingSellerServices(){
    this.isSellerCheck =true;
    this.isExistingSeller =false;
  }
}
