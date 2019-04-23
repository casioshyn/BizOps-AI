import { Component, OnInit,Input,Output,EventEmitter, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { SellerService } from '../../services/seller.service';
const premiseURL = 'http://40.117.214.244:3010/api/upload/prelease';
const bankReportURL = 'http://40.117.214.244:3010/api/upload/bankRep';
const licenseFinURL = 'http://40.117.214.244:3010/api/upload/licenseRep';
const certificatesURL = 'http://40.117.214.244:3010/api/upload/certificateRep';
const reportsURL = 'http://40.117.214.244:3010/api/upload/reportsRep';
const financialStatementsURL = 'http://40.117.214.244:3010/api/upload/finsRep';
const InsuranceURL = 'http://40.117.214.244:3010/api/upload/insuranceRep';
const ndaURL = 'http://40.117.214.244:3010/api/upload/ndaData';
@Component({
  selector: 'app-seller-financial',
  templateUrl: './seller-financial.component.html',
  styleUrls: ['./seller-financial.component.scss']
})
export class SellerFinancialComponent implements OnInit {
  maxFileSize = 1048576;
  @Input('sellerFinancialData') public sellerFinancialData : FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('bankReport') bankReport: any;
  @ViewChild('licenseReport') licenseReport: any;
  @ViewChild('certificate') certificate: any;
  @ViewChild('reports') reports: any;
  @ViewChild('finStatements') finStatements: any;
  @ViewChild('insurance') insurance: any;
  
  public premiseUploader: FileUploader = new FileUploader({ url: premiseURL, itemAlias: 'preLeaseImage' });
  public bankReportUploader: FileUploader = new FileUploader({ url: bankReportURL, itemAlias: 'bankPDF',maxFileSize:this.maxFileSize });
  public licenseReportUploader: FileUploader = new FileUploader({ url: licenseFinURL, itemAlias: 'licenseRep',maxFileSize:this.maxFileSize });
  public certificateUploader: FileUploader = new FileUploader({ url: certificatesURL, itemAlias: 'certificateRep',maxFileSize:this.maxFileSize });
  public reportsUploader: FileUploader = new FileUploader({ url: reportsURL, itemAlias: 'reports',maxFileSize:this.maxFileSize });
  public finStatementsUploader: FileUploader = new FileUploader({ url: financialStatementsURL, itemAlias: 'finState',maxFileSize:this.maxFileSize});
  public insuranceUploader: FileUploader = new FileUploader({ url: InsuranceURL, itemAlias: 'insurance',maxFileSize:this.maxFileSize });
  public NDAUploader: FileUploader = new FileUploader({ url: ndaURL, itemAlias: 'ndaImage' });
  
  priceList = [100000, 200000, 250000, 500000, 750000, 1000000, 2000000, 3000000, 4000000, 5000000];
  preData = false;
  pdfSrc:any;
  filteredList:any=[];
  showPdf=false;
  bankData=false;
  liReportData=false;
  certData=false;
  reportsdata=false;
  finsData=false;
  InsData=false;
  CompanyID:any;
  currentUser:any;
  user_name:any;
  user_id:any;
  submitted = false;
  editCompany_ID:any;
  userBussinesslist:any;
  showBankPdf:boolean = false;
  showLicenseReportPdf :boolean =false;
  showPremisePdf:boolean =false;
  showCertPdf:boolean =false;
  showReportsPdf:boolean = false;
  showFinsPdf:boolean =false;
  showInsPdf :boolean =false;
  viewDocs = false;
  @Input() edit_CompanyID:any;
  constructor(public sell :SellerService) { }
  ngOnInit() {    
    if(sessionStorage.length){
      if(sessionStorage.getItem('BusinessID')){      
        this.CompanyID = JSON.parse(sessionStorage.getItem('BusinessID'));  
        this.sellerFinancialData.patchValue({ 
          CompanyId: this.CompanyID
        });      
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
    this.premiseUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#preLeaseImage");
        this.preData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
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
    this.bankReportUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#bankPDF");
        this.bankData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
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
    this.licenseReportUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#licenseRep");
        this.liReportData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
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

    this.certificateUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#certificateRep");
        this.certData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
            //  this.pdfFiles.push(list);
          }
          console.log(img.files[0]);
          if (img.files[0].size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
          } else {
            // alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };

    this.reportsUploader.onAfterAddingFile = (file) => {
      if (file) {
        this.reportsdata = true;
        let img: any = document.querySelector("#reports");

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
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
    this.finStatementsUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#finState");
        this.finsData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
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
    this.insuranceUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#insurance");
        this.InsData = true;
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
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
  get f() {
    return this.sellerFinancialData.controls;
  }
  uploadbankReport(){
    if (this.bankData) {
      if(this.edit_CompanyID!=undefined){
        this.bankReportUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.bankReportUploader.uploadAll();
        // }                                                                      
        this.bankReportUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }else{
        this.bankReportUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.bankReportUploader.uploadAll();
        // }                                                                      
        this.bankReportUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }      
    }else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  uploadLicenseReport(){
    if (this.liReportData) {
      if(this.edit_CompanyID!=undefined){
        this.licenseReportUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.licenseReportUploader.uploadAll();
        // }                                                                      
        this.licenseReportUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }else{
        this.licenseReportUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.licenseReportUploader.uploadAll();
        // }                                                                      
        this.licenseReportUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }      
    }else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  uploadCertificateReport(){
    if (this.certData) {
      if(this.edit_CompanyID!=undefined){
        this.certificateUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.certificateUploader.uploadAll();
        // }                                                                      
        this.certificateUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }else{
        this.certificateUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.certificateUploader.uploadAll();
        // }                                                                      
        this.certificateUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }       
    }else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  uploadReportFile(){
    if (this.reportsdata) {
      if(this.edit_CompanyID!=undefined){
        this.reportsUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.reportsUploader.uploadAll();
        // }                                                                      
        this.reportsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }else{
        this.reportsUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.reportsUploader.uploadAll();
        // }                                                                      
        this.reportsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }
     
    }else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  uploadFinStatereport(){
    if (this.finsData) {
      if(this.edit_CompanyID!=undefined){
        this.finStatementsUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.finStatementsUploader.uploadAll();
        // }                                                                      
        this.finStatementsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }else{
        this.finStatementsUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.finStatementsUploader.uploadAll();
        // }                                                                      
        this.finStatementsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }     
    }else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  uploadInsReport(){
    if (this.InsData) {
      if(this.edit_CompanyID!=undefined){
        this.insuranceUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.insuranceUploader.uploadAll();
        // }                                                                      
        this.insuranceUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }else{
        this.insuranceUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.insuranceUploader.uploadAll();
        // }                                                                      
        this.insuranceUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }      
    }else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  saveSellerFinancialInfo(){
    this.submitted = true;
    if (this.sellerFinancialData.invalid) {
      alert("Please fill the fields");
    }else{
      if(this.edit_CompanyID!=undefined){
        this.sellerFinancialData.patchValue({     
          CompanyId: this.edit_CompanyID  
        });
      }else{
        this.sellerFinancialData.patchValue({     
          CompanyId: this.CompanyID  
        });
      }
     
      this.sell.saveSellerFinancial(this.sellerFinancialData.value).subscribe(data=>{
        let res = data;
        if(res>0){
          alert("Created Successfully");       
        }
        console.log(res);
      });
    }
    
  }
  viewBankData(){
    this.ngOnInit();
    this.showBankPdf = true;
  }
  viewLicenseReport(){
    this.ngOnInit();
    this.showLicenseReportPdf = true;
  }
  viewCertData(){
    this.ngOnInit();
    this.showCertPdf = true;
  }
  viewReport(){
    this.ngOnInit();
    this.showReportsPdf = true;
  }
  viewFinancialData(){
    this.ngOnInit();
    this.showFinsPdf = true;
  }
  viewInsData(){
    this.ngOnInit();
    this.showInsPdf = true;
  }
  clearBankReport() {
    this.bankReport.nativeElement.value = '';
  }
  clearLicenseReport() {
    this.licenseReport.nativeElement.value = '';
  }
  clearCertificateReport() {
    this.certificate.nativeElement.value = '';
  }
  ReportFile() {
    this.reports.nativeElement.value = '';
  }
  clearFinStatereport() {
    this.finStatements.nativeElement.value = '';
  }
  clearInsReport() {
    this.insurance.nativeElement.value = '';
  }
 
}
