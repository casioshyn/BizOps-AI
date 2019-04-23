import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';  
import { Router } from '@angular/router';

import { HomeNodeService } from '../../services/HomeNodeService';
import { NodeService } from '../../services/Nodeservice';
import { ProcessService } from '../../services/process.service';
import { DataroomService } from '../../services/dataroom.service';
@Component({
  selector: 'app-data-room',
  templateUrl: './data-room.component.html',
  styleUrls: ['./data-room.component.scss']
})
export class DataRoomComponent implements OnInit {
  sellerDocuments: any = [];
  user_name: any;
  user_id: any;
  Data: any = [];
  list: any = [];
  company_id: any;
  TransactionsList: any = [];
  currentTransaction: string;
  com_id: any;
  sellerData: any = [];
  showlicensePdf: boolean = false;
  showsocPdf: boolean = false;
  showlirPdf: boolean = false;
  showbankPdf: boolean = false;
  showcertPdf: boolean = false;
  showrpPdf: boolean = false;
  showfinPdf: boolean = false;
  showinrPdf: boolean = false;
  showndaPdf: boolean = false;
  showprPdf: boolean = false;
  preleasePdf: boolean = false;
  page: number = 1;
  sellerDocs: boolean = false;
  businessTitle: any;
  agentType = [{name:'Buyer Agent',value:'Buyer'},{name:'Seller Agent', value:'Seller'}];    
  pdfSrc: string;
  TransBusiness: any = [];
  isList: boolean;
  prof_id: any;
  user_role: string;
  isprofessional: boolean;
  userType: any;
  isBusinessSelected = false;
  personalInfoData: any;
  isNoPersonalData = false;
  buyerInfo = false;

  constructor(public home: HomeNodeService, private process: ProcessService, 
    private router: Router,private user: NodeService,
    private dataroom:DataroomService,) { }

  ngOnInit() {
   
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
       // this.isUser = true;
       if (sessionStorage.getItem("Selected_Company")) {
        let Details = JSON.parse(sessionStorage.getItem('Selected_Company'));
       // this.businessTitle = companyDetails.COMPANY_ID;
        this.company_id = Details.companyDetail.COMPANY_ID;
        this.userType = Details.userType;
        this.isBusinessSelected = true;
       // this.sellerTransaction();
       }
      }
    }

    // this.user.checkFirstUser(this.user_id).subscribe(
    //   userType=>{
    //     var res = userType;       
          if(this.userType == 1){
            this.user.getBizbyUser(this.user_id).subscribe(
              data => {
                var res = data;               
                this.sellerDocs = true;               
                if (res.length > 0) {
                  if (res[0].status) {
                    this.isList = false;
                  }
                  else {
                    this.list = res;
                    //this.company_id = this.list[0].COMPANY_ID;
                    this.sellerTransaction();
                  }
                }
                else {
                  alert('No Data');
                }
              },
              error => {
                alert('Server Error');
              });
          } 
          else if(this.userType == 2){
            this.home.getTransactions(this.user_id).subscribe(
              data => {
                var res = data;
                this.sellerDocs = true; 
                if (res.length > 0) {
                  if (res[0].status) {
                    this.isList = false;           
                  }
                  else {
                    this.TransactionsList = res;
                    this.isList = true;
                  //  this.currentTransaction = this.TransactionsList[0].COMPANY_ID;
                    this.changeTransaction();
                   
                  }
                } 
                this.dataroom.getBuyerInfo(this.user_id).subscribe( 
                  personalInfo=>{
                    var res = personalInfo;
                    if (res.length > 0) {
                      if (res[0].status) {
                         // this.isNoPersonalData = true;
                      } else {
                        this.personalInfoData = res; 
                        this.buyerInfo = true;
                      }
                    }
                  });         
              });
          }
          else {  
          //  this.isBusinessSelected = true;
            this.home.getProfessionalList().subscribe(data => {
              var professional_Mstr = data;
              var checkProfessional = professional_Mstr.filter(item => {
                return item.USER_ID == this.user_id;
              });
              if (checkProfessional.length > 0) {
                this.isBusinessSelected = true;
                this.isprofessional = true;
                this.prof_id = checkProfessional[0].ID;
                this.user_role = "Seller";
                this.onRoleChange();
              } else {
                this.isprofessional = false;
              }
            });           
          }     
      // });    

  }

  changeTransaction() {    
    this.TransBusiness = [];
    console.log(this.company_id);
    this.home.getTransBusiness(this.company_id).subscribe(
      data => {
        var res = data;
        if (res.length > 0) {
          if (res[0].status) {
          } else {
            this.TransBusiness = data;
            this.sellerData = data;
          }
        }
     });
  }

  sellerTransaction() {
    this.TransBusiness = [];
    // for (var i = 0; i < this.list.length; i++) {
    //   if (this.businessTitle == this.list[i].COMPANY_ID) {
    //       this.company_id = this.businessTitle;
    //   }
    // }
    this.home.getTransBusiness(this.company_id).subscribe(
      data => {
        //this.TransBusiness = data;
        let rows = data;
        this.sellerData = data;
        if (rows.length > 0) {
          if (rows[0].status) {
          }
          else {
            this.TransBusiness = data;
          }
        }
        else {
          alert('No Data');
        }
      });
  }

  onRoleChange() {   
    if (this.user_role == "Buyer") {  
      this.process.getProfBuyerList(this.prof_id).subscribe(profBuyerData=>{
        var res = profBuyerData;
           if (res.length > 0) {
          if (res[0].status) {
          } else {
            this.TransactionsList = res;
            this.company_id = this.TransactionsList[0].COMPANY_ID;
            this.changeTransaction();
          }
        } else {
          alert("No Data");
        }
      });
    } 
    else if (this.user_role == "Seller") {    
      this.process.getProfSellerList(this.prof_id).subscribe(profSellerData=>{
        var res = profSellerData;
           if (res.length > 0) {
          if (res[0].status) {
          } else {
            var filterdList = _.uniqBy(res, 'COMPANY_ID'); 
            this.TransactionsList = filterdList;   
            this.company_id = this.TransactionsList[0].COMPANY_ID;
            this.changeTransaction(); 
          }
        } else {
          alert("No Data");
        }
      });
    }
  }

  editBusiness(){
    this.router.navigate(['/sell/sell-reg'], { queryParams: { com_id: this.company_id } });
  }

  licenseReport() {
    if (this.sellerData[0].status) {
      alert("No Data")
    } else {
      this.showlicensePdf = true;
    }
  }
  hidelicenseReport() {
    this.showlicensePdf = false;
  }
  socReport() {
    if (this.sellerData[0].status) {
      alert("No Data")
    } else {
      this.showsocPdf = true;
    }
  }
  hidesocReport() {
    this.showsocPdf = false;
  }
  liReport() {
    if (this.sellerData[0].status) {
      alert("No Data")
    } else {
      this.showlirPdf = true;
    }
  }
  hideliReport() {
    this.showlirPdf = false;
  }
  bankReport() {
    if (this.sellerData[0].status) {
      alert("No Data");
    } else {
      this.showbankPdf = true;
    }
  }
  hidebankReport() {
    this.showbankPdf = false;
  }
  certReport() {
    if (this.sellerData[0].status) {
      alert("No Data")
    } else {
      this.showcertPdf = true;
    }
  }
  hidecertReport() {
    this.showcertPdf = false;
  }
  repReport() {
    if (this.sellerData[0].status) {
      alert("No Data")
    } else {
      this.showrpPdf = true;
    }
  }
  hiderepReport() {
    this.showrpPdf = false;
  }
  finReport() {
    if (this.sellerData[0].status) {
      alert("No Data")
    } else {
      this.showfinPdf = true;
    }
  }
  hidefinReport() {
    this.showfinPdf = false;
  }
  insReport() {
    if (this.sellerData[0].status) {
      alert("No Data")
    } else {
      this.showinrPdf = true;
    }
  }
  hideinsReport() {
    this.showinrPdf = false;
  }
  ndaReport() {
    if (this.sellerData[0].status) {
      alert("NO Data")
    } else {
      this.showndaPdf = true;
    }
  }
  hidendaReport() {
    this.showndaPdf = false;
  }
  preleaseReport() {
    if (this.sellerData[0].status) {
      alert("No Data")
    } else {
      this.preleasePdf = true;
    }
  }
  hidepreleaseReport() {
    this.preleasePdf = false;
  }
  beforeChange($event) {
    console.log($event);

  }

}
