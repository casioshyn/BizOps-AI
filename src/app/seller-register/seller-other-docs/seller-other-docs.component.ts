import { Component, OnInit,Input,Output,EventEmitter, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { SellerService } from '../../services/seller.service';
const libilURL = 'http://40.117.214.244:3010/api/upload/libil';
const retireURL = 'http://40.117.214.244:3010/api/upload/retirePlan';
const keyContactURL = 'http://40.117.214.244:3010/api/upload/keyConract';
const federalURL = 'http://40.117.214.244:3010/api/upload/federal';
@Component({
  selector: 'app-seller-other-docs',
  templateUrl: './seller-other-docs.component.html',
  styleUrls: ['./seller-other-docs.component.scss']
})
export class SellerOtherDocsComponent implements OnInit {
  @Input('sellerOtherDocs') public sellerOtherDocs : FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('liabilities') liabilities: any;
  @ViewChild('retirementPlan') retirementPlan: any;
  @ViewChild('keyContractPlan')keyContractPlan : any;
  @ViewChild('federal')federal : any;
  maxFileSize = 1048576;
  public federalPlanUploader: FileUploader = new FileUploader({ url: federalURL, itemAlias: 'federalImage',maxFileSize:this.maxFileSize });
  public keyContractPlanUploader: FileUploader = new FileUploader({ url: keyContactURL, itemAlias: 'keyContractImage',maxFileSize:this.maxFileSize });
  public liabilitiesUploader: FileUploader = new FileUploader({ url: libilURL, itemAlias: 'libilsImage',maxFileSize:this.maxFileSize });
  public retirementPlanUploader: FileUploader = new FileUploader({ url:retireURL, itemAlias: 'retirePlanImage',maxFileSize:this.maxFileSize });
  CompanyID:any;
  currentUser:any;
  user_name:any;
  user_id:any;
  submitted = false;  
  federalPlanData=false;
  keyContractData=false;
  liblsData=false;
  retirePlanData = false;
  editCompany_ID:any;
  showLibilsPdf:boolean=false;
  showRetirePlanPdf :boolean =false;
  showKeyContractPdf :boolean =false;
  showCompliancePdf :boolean =false;
  viewDocs=false;
  userBussinesslist:any=[];
  filteredList:any=[];
  @Input() edit_CompanyID:any;
  constructor(private sell:SellerService) { }
  ngOnInit() {
    if(sessionStorage.length){
      if(sessionStorage.getItem('BusinessID')){      
        this.CompanyID = JSON.parse(sessionStorage.getItem('BusinessID'));       
      }
      if(sessionStorage.getItem('Bizops_User')){      
        this.currentUser = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = this.currentUser.USER_FIRSTNAME;       
        this.user_id = this.currentUser.ID;
       // this.isUser = true;       
      }    
      if (sessionStorage.getItem('EditBusinessID')) {
        this.viewDocs=true;
        // this.editCompany_ID= JSON.parse(sessionStorage.getItem('EditBusinessID'));      
      }
      this.sell.getBussinessByUserID(this.user_id).subscribe(
        data => {
          var res = data;
          if (res.length > 0) {
            if (res[0].status) {
  
            } else {
              this.userBussinesslist = res; 
              this.filteredList = this.userBussinesslist.filter(item => {
                return item.COMPANY_ID == this.edit_CompanyID;
              });                
            }
          }
        });             
    }
    this.federalPlanUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#federalImage");
       this.federalPlanData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            //this.pdfSrc = e.target.result;
            //this.showPdf = true;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
            //  this.pdfFiles.push(list);
          }
          if (img.files[0].size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
          } else {
            // alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };
this.keyContractPlanUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#keyContractImage");
        this.keyContractData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
          // this.pdfSrc = e.target.result;
          // this.showPdf = true;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
            //  this.pdfFiles.push(list);
          }
          if (img.files[0].size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
          } else {
            // alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };
this.liabilitiesUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#libilsImage");
       this.liblsData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            //this.pdfSrc = e.target.result;
            //this.showPdf = true;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
            //  this.pdfFiles.push(list);
          }
          if (img.files[0].size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
          } else {
            // alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };
this.retirementPlanUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#retirePlanImage");
        this.retirePlanData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
           // this.pdfSrc = e.target.result;
           // this.showPdf = true;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
            //  this.pdfFiles.push(list);
          }
          if (img.files[0].size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
          } else {
            // alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };
  }
  saveSellerOtherDocsInfo(){
    
  }
  uploadLibilsReport(){
    if (this.liblsData) {
      if(this.edit_CompanyID!=undefined){
        this.liabilitiesUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.liabilitiesUploader.uploadAll();
        // }                                                                      
        this.liabilitiesUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }else{
        this.liabilitiesUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.liabilitiesUploader.uploadAll();
        // }                                                                      
        this.liabilitiesUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }     
    }else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  uploadRetirePlanReport(){
    if (this.retirePlanData) {
      if(this.edit_CompanyID!=undefined){
        this.retirementPlanUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.retirementPlanUploader.uploadAll();
        // }                                                                      
        this.retirementPlanUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }else{
        this.retirementPlanUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.retirementPlanUploader.uploadAll();
        // }                                                                      
        this.retirementPlanUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }     
    }else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  uploadKeyContractReport(){
    if (this.keyContractData) {
      if(this.edit_CompanyID!=undefined){
        this.keyContractPlanUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.keyContractPlanUploader.uploadAll();
        // }                                                                      
        this.keyContractPlanUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }else{
        this.keyContractPlanUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.keyContractPlanUploader.uploadAll();
        // }                                                                      
        this.keyContractPlanUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }     
    }else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  uploadComplianceReport(){
    if (this.federalPlanData) {
      if(this.edit_CompanyID!=undefined){
        this.federalPlanUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.federalPlanUploader.uploadAll();
        // }                                                                      
        this.federalPlanUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }else{
        this.federalPlanUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.federalPlanUploader.uploadAll();
        // }                                                                      
        this.federalPlanUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }     
    }else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  viewLibilsData(){
    this.ngOnInit();
    this.showLibilsPdf = true;
  }
  viewRetirePlandata(){
    this.ngOnInit();
    this.showRetirePlanPdf = true;
  }
  viewKeyContractData(){
    this.ngOnInit();
    this.showKeyContractPdf = true;
  }
  viewComplianceData(){
    this.ngOnInit();
    this.showCompliancePdf = true;
  }
  clearLibilsReport() {
    this.liabilities.nativeElement.value = '';
  }
  clearKeyContractReport() {
    this.keyContractPlan.nativeElement.value = '';
  }
  clearComplianceReport() {
    this.federal.nativeElement.value = '';
  }
  clearRetirePlanReport() {
    this.retirementPlan.nativeElement.value = '';
  }
}
