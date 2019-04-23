import { Component, OnInit,Input,Output,EventEmitter, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeNodeService } from '../../services/HomeNodeService';
import { ProcessService } from '../../services/process.service';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { SellerService } from '../../services/seller.service';
const ndaURL = 'http://40.117.214.244:3010/api/upload/ndaData';
@Component({
  selector: 'app-seller-process-overview',
  templateUrl: './seller-process-overview.component.html',
  styleUrls: ['./seller-process-overview.component.scss']
})
export class SellerProcessOverviewComponent implements OnInit {
  @Input('sellerProcessOverView') public sellerProcessOverView : FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() edit_CompanyID:any;
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  public NDAUploader: FileUploader = new FileUploader({ url: ndaURL, itemAlias: 'ndaImage' });
  processMstr: any = [];
  ndaPdf=false;
  selectAction = 'Search Business';
  seller_processList: any = [];
  order_num: number;
  CompanyID: any;
  currentUser: any;
  user_name: any;
  user_id: any;
  ndaData=false;
  pdfSrc:any;
  showPdf=false;
  maxFileSize = 1048576;
  editCompany_ID:any;
  viewDocs=false;
  userBussinesslist:any=[];
  filteredList:any=[];
  constructor(private home: HomeNodeService, private process: ProcessService,public sell:SellerService) { }
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
    this.home.getProcessMstr().subscribe(
      processData => {
        this.processMstr = processData;
      });
      this.NDAUploader.onAfterAddingFile = (file) => {
        if (file) {
          let img: any = document.querySelector("#ndaImage");
          this.ndaData = true;
          if (typeof (FileReader) !== 'undefined') {
            let reader = new FileReader();
            let list = {};
            reader.onload = (e: any) => {
              this.pdfSrc = e.target.result;              
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
              alert("File size must be less that 1mb and more that 1kb!");
            }
          }
        }
      };
  }
  processAction(value) {
    console.log(value);
    this.selectAction = value;
  }
  selectProcess(value) {
    if (this.seller_processList.length == 0) {
      this.order_num = 1
    }
    else {
      this.order_num = this.order_num + 1;
    }
    // var process = this.processMstr.filter((item) => item.PROCESS_ID == value);
    var process = this.processMstr.filter((item) => item.STEP_NAME == value);
    if (process[0].STEP_NAME == 'List Business') {
      process[0].STEP_NAME = 'Search Business'
    }
    var _obj = {
      Order_num: this.order_num,
      Instruction: process[0].STEP_NAME,
    }
    this.seller_processList.push(_obj);
    console.log(this.seller_processList);
  }
  uploadNDA(){   
    if (this.ndaData) {
      if(this.edit_CompanyID!=undefined){
        this.NDAUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.NDAUploader.uploadAll();
        // }                                                                      
        this.NDAUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }else{
        this.NDAUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.NDAUploader.uploadAll();
        // }                                                                      
        this.NDAUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }     
    }  
  }
  saveSellerProcessOverViewInfo() {
    if(this.edit_CompanyID!=undefined){
      this.process.deleteProcess(this.edit_CompanyID).subscribe(data => {
        var res = data;    
      var processList = {
        companyId: this.edit_CompanyID,
        UserId: this.user_id,
        list: this.seller_processList
      }
      this.process.createBusinessProcess(processList).subscribe(
        data => {
          var res = data;
          if (res > 0) {
            alert("Created Successfully");
          
          }
        });   
    });
    }else{    
      var processList = {
        companyId: this.CompanyID,
        UserId: this.user_id,
        list: this.seller_processList
      }
      this.process.createBusinessProcess(processList).subscribe(
        data => {
          var res = data;
          if (res > 0) {
            alert("Created Successfully");
          }
        }); 
    } 
  }
  viewNDA(){
    this.ngOnInit();
    this.ndaPdf = true;

  }
}
