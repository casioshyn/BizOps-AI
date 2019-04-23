import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { LandlordService } from '../../services/landlord.service';
import { SellerService } from '../../services/seller.service';
import { NodeService } from '../../services/Nodeservice';
@Component({
  selector: 'app-seller-reg',
  templateUrl: './seller-reg.component.html',
  styleUrls: ['./seller-reg.component.scss']
})
export class SellerRegComponent implements OnInit {
  @ViewChild('tab') public tabs: NgbTabset;
  sellerRegForm: FormGroup;
  disabled=true;
  company_id: any;
  agentInfo: any = [];
  businessID: any;
  CompanyID: any;
  currentUser: any;
  BUS_ID: any;
  Biz_ID: string;
  user_name: any;
  user_id: any;
  isSellerAddress = false;
  edit_id: any;
  sellerAddress: any = [];
  isFirstTime = true;
  userBussinesslist: any;
  isRedirected = false;
  EditCompanyID: any;
  buildingInfo: any = [];
  financialInfo: any = [];
  premisesInfo: any = [];
  servicesInfo: any = [];
  termsInfo: any = [];
  sec_Images:any=[];
  isImageId=false;
  constructor(private fb: FormBuilder, private landlord: LandlordService,
    private route: ActivatedRoute, private sell: SellerService,private user:NodeService) { }
  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem('BusinessID')) {      
        this.CompanyID = JSON.parse(sessionStorage.getItem('BusinessID'));
      }
      if (sessionStorage.getItem('Bizops_User')) {
        this.currentUser = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = this.currentUser.USER_FIRSTNAME;
        this.user_id = this.currentUser.ID;
        // this.isUser = true;       
      }
      // if(sessionStorage.getItem('EditBusinessID')){            
      //   this.EditCompanyID = JSON.parse(sessionStorage.getItem('EditBusinessID'));     
      // }

    }

    this.route.queryParams
      .filter(params => params.com_id)
      .subscribe(params => {
        console.log(params);
        this.isRedirected = true;
        //this.loadBizData(params.biz_id)
        this.edit_id = params.com_id;
        this.company_id = this.edit_id;
      });
    this.sellerRegForm = this.fb.group({
      sellPersonal: this.fb.group({
        items: this.fb.array([]),
        UserID: [''],
        Name: ['', Validators.required],
        HomeAddress: ['', Validators.required],
        Email: ['', Validators.required],
        FaxNumber: [''],
        CellPhone: [''],
        HomePhone: [''],
        DOB: [''],
        BirthPlace: [''],
        HomeNum1: [''],
        HomeNum2: [''],
        UserType: [1],
        Profile_Img:['']
      }),
      sellerBusinessData: this.fb.group({
        userId: [''],
        CompanyId: [''],
        Title: ['', Validators.required],
        State: ['', Validators.required],
        County: ['', Validators.required],
        Price: [''],
        Description: ['', Validators.required],
        Category: ['', Validators.required],
        SubCategory: ['', Validators.required],
        SubChildCategory: [''],
        CmpType: ['', Validators.required],
        SellType: ['', Validators.required],
        EmpCount: [''],
        YoutubeUrl: ['', Validators.required],
        Latitude: [''],
        Longitude: [''],
        Address: ['', Validators.required],
        ZipCode: [''],
        prime_img: [''],
       
        
      }),
      sellerFinancialData: this.fb.group({
        CompanyId: [''],
        Expense: ['', Validators.required],
        Revenue: ['', Validators.required],
        CashFlow: ['', Validators.required]
      }),
      sellerBuildingData: this.fb.group({
        CompanyId: [''],
        BuildingType: ['', Validators.required],
        BuildingSubTypes: ['', Validators.required],
        BuildingSize: ['', Validators.required],
        builtYear: ['', Validators.required],
        restRoom: ['', Validators.required],
        buildingZone: ['', Validators.required],
        buildingPark: ['', Validators.required],
      }),
      sellerPremiseData: this.fb.group({
        CompanyId: [''],
        totalAreaSize: ['', Validators.required],
        rentDetail: ['', Validators.required],
        industryDetail: ['', Validators.required],
        zoningDetail: ['', Validators.required],
      }),
      sellerAgentData: this.fb.group({
        CompanyId: [''],
        accountant: ['', Validators.required],
        attorney: ['', Validators.required],
        bussinessBrokerDetails: ['', Validators.required],
      }),
      sellerServiceData: this.fb.group({
        CompanyId: [''],
        valuation: ['', Validators.required],
        accounting: ['', Validators.required],
        legal: ['', Validators.required],
        escrow: ['', Validators.required],
      }),
      sellerTermsData: this.fb.group({
        CompanyId: [''],
        saleAmount: ['', Validators.required],
        whySell: ['', Validators.required],
        desiredTime: ['', Validators.required],
        fees: ['', Validators.required],
      }),
      sellerProcessOverView: this.fb.group({
      }),
      sellerOtherDocs: this.fb.group({
      }),
    })
    this.sell.getBussinessByUserID(this.user_id).subscribe(
      data => {
        var res = data;
        if (res.length > 0) {
          if (res[0].status) {

          } else {
            this.userBussinesslist = res;
            if (!this.isRedirected) {
              this.isFirstTime = false;
            } else {
              this.loadBizData(this.edit_id);
            }
          }
        }
      });


  }
  get f() {
    return this.sellerRegForm.controls;
  }
  talkBack(e: any) {
    if (e.COMPANY_ID) {
      this.Biz_ID = e.Biz_ID;
      this.sellerRegForm.patchValue({
        business: {
          BizID: this.Biz_ID
        },
        building: {
          BizID: this.Biz_ID
        },
        premises: {
          BizID: this.Biz_ID
        },
        terms: {
          BizID: this.Biz_ID
        }
      });
      this.tabs.select(e.tab);
    } else {
      this.tabs.select(e);
    }
  }
  change() {
    alert('Cooooll !!!')
  }
  getSecImages(){ 
    if(this.isRedirected){
      this.user.getImage(this.edit_id).subscribe(
        data => { 
          this.sec_Images=data;
        });
    }if(this.isImageId){
      this.user.getImage(this.EditCompanyID).subscribe(
        data => { 
          this.sec_Images=data;
        });
    }
  }
  creteNewSell() {
    sessionStorage.removeItem('EditBusinessID');
  }
  tabActivate(){
    this.disabled=false;
  }
  loadBizData(value) {
    sessionStorage.removeItem('EditBusinessID');
    console.log(value);
    this.company_id = value;
    sessionStorage.setItem('EditBusinessID', JSON.stringify(this.company_id));
    this.disabled=false; 
    this.isImageId=true;
    this.EditCompanyID = JSON.parse(sessionStorage.getItem('EditBusinessID'));   
    this.sell.getAgentInfo(this.EditCompanyID).subscribe(data => {
      let agentResult = data;
      this.agentInfo = agentResult[0];
      this.sell.getBuildingInfo(this.EditCompanyID).subscribe(data => {
        let buildingResult = data;
        this.buildingInfo = buildingResult[0];
        this.sell.getFinancialInfo(this.EditCompanyID).subscribe(data => {
          let financialResult = data;
          this.financialInfo = financialResult[0];
          this.sell.getPremisesInfo(this.EditCompanyID).subscribe(data => {
            let premiseResult = data;
            this.premisesInfo = premiseResult[0];
            this.sell.getServicesInfo(this.EditCompanyID).subscribe(data => {
              let serviceResult = data;
              this.servicesInfo = serviceResult[0];
              this.sell.getTermsInfo(this.EditCompanyID).subscribe(data => {
                let termsResult = data;
                this.termsInfo = termsResult[0];
                var filteredList = this.userBussinesslist.filter(item => {
                  return item.COMPANY_ID == value;
                });
                var loadData = filteredList[0];
                this.sellerRegForm.patchValue({
                  sellPersonal: {
                    UserID: loadData.USER_ID,
                    Name: loadData.NAME,
                    HomeAddress: loadData.HOME_ADDRESS,
                    Email: loadData.EMAIL,
                    FaxNumber: loadData.FAX_NUMBER,
                    CellPhone: loadData.CELL_NUMBER,
                    HomePhone: loadData.HOME_NUMBER,
                    DOB: loadData.DOB,
                    BirthPlace: loadData.BIRTH_PLACE,
                    HomeNum1: loadData.HOME_NUM_1,
                    HomeNum2: loadData.HOME_NUM_2,
                    UserType: loadData.USER_TYPE,
                    Profile_Img:loadData.USER_PROFILE_IMAGE
                  },
                  sellerBusinessData: {
                    CompanyId: loadData.COMPANY_ID,
                    userId: loadData.USER_ID,
                    Title: loadData.TITLE,
                    State: loadData.STATE,
                    County: loadData.COUNTY,
                    Flag: loadData.PUBLISHED,
                    Price: loadData.PRICE,
                    Description: loadData.LONG_DESC,
                    Category: loadData.CATEGORY,
                    SubCategory: loadData.SUBCATEGORY,
                    SubChildCategory: loadData.SUBCHILD,
                    CmpType: loadData.COMPANY_TYPE,
                    SellType: loadData.SELL_TYPE,
                    EmpCount: loadData.EMPLOYEE_COUNT,
                    YoutubeUrl: loadData.YOUTUBE_URL,
                    Latitude: loadData.LATITUDE,
                    Longitude: loadData.LONGITUDE,
                    Address: loadData.ADDRESS,
                    ZipCode: loadData.ZIPCODE,
                    prime_img: loadData.IMG_NAME
                  },
                  sellerFinancialData: {
                    CompanyId: this.financialInfo.COMPANY_ID,
                    Expense: this.financialInfo.EXPENSE,
                    Revenue: this.financialInfo.ANNUAL_REVENUE,
                    CashFlow: this.financialInfo.CASH_FLOW,
                  },
                  sellerBuildingData: {
                    CompanyId: this.buildingInfo.COMPANY_ID,
                    BuildingType: this.buildingInfo.BUILDING_TYPE,
                    BuildingSubTypes: this.buildingInfo.BUILDING_SUBTYPE,
                    BuildingSize: this.buildingInfo.BUILDING_SIZE,
                    builtYear: this.buildingInfo.BUILT_YEAR,
                    restRoom: this.buildingInfo.NO_OF_RESTROOMS,
                    buildingZone: this.buildingInfo.BUILDING_ZONE,
                    buildingPark: this.buildingInfo.PARKING,
                  },
                  sellerPremiseData: {
                    CompanyId: this.premisesInfo.COMPANY_ID,
                    totalAreaSize: this.premisesInfo.PRE_SIZE,
                    rentDetail: this.premisesInfo.RENT,
                    industryDetail: this.premisesInfo.INDUSTRY_SPECIFIC,
                    zoningDetail: this.premisesInfo.ZONING,
                  },
                  sellerAgentData: {
                    CompanyId: this.agentInfo.COMPANY_ID,
                    accountant: this.agentInfo.ACCOUNTANT,
                    attorney: this.agentInfo.ATTORNEY,
                    bussinessBrokerDetails: this.agentInfo.BUSINESS_BROKER,
                  },
                  sellerServiceData: {
                    CompanyId: this.servicesInfo.COMPANY_ID,
                    valuation: this.servicesInfo.VALUATION,
                    accounting: this.servicesInfo.ACCOUNTING,
                    legal: this.servicesInfo.LEGAL,
                    escrow: this.servicesInfo.ESCROW,
                  },
                  sellerTermsData: {
                    CompanyId: this.termsInfo.COMPANY_ID,
                    saleAmount: this.termsInfo.SALE_AMOUNT,
                    whySell: this.termsInfo.WHY_SELLING,
                    desiredTime: this.termsInfo.DESIRED_TIME_TO_CLOSE,
                    fees: this.termsInfo.FEES,
                  },
                  sellerProcessOverView: {
                  },
                  sellerOtherDocs: {
                  },
                });
                this.isFirstTime = true;
              });
            });
          });
        });
      });
    });
  }
  personalInfoNext() {
    this.tabs.select('2');
  }
  bussinessInfoNext() {
    this.tabs.select('1'); 
    if(this.disabled==true){
      alert("Bussiness Entity must be filled")
    }   
  }
  financialInfoNext() {
    this.tabs.select('3');
  }
  buildingInfoNext() {
    this.tabs.select('4');
  }
  premiseInfoNext() {
    this.tabs.select('5');
  }
  equipmentInfoNext() {
    this.tabs.select('tab-agent');
  }
  agentInfoNext() {
    this.tabs.select('6');
  }
  serviceInfoNext() {
    this.tabs.select('7');
  }
  termsInfoNext() {
    this.tabs.select('8');
  }
  processInfoNext() {
    this.tabs.select('9');
  }
  otherDocsInfoNext() {
    this.tabs.select('tab-professional');
  }
}
