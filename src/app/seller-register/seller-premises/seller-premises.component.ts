import { Component, OnInit,Input,Output,EventEmitter, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader} from 'ng2-file-upload/ng2-file-upload';
import { SellerService } from '../../services/seller.service';
const premiseURL = 'http://40.117.214.244:3010/api/upload/prelease';
@Component({
  selector: 'app-seller-premises',
  templateUrl: './seller-premises.component.html',
  styleUrls: ['./seller-premises.component.scss']
})
export class SellerPremisesComponent implements OnInit {
  submitted = false;
  showPremisePdf = false;
  maxFileSize = 1048576;
  CompanyID:any;
  currentUser:any;
  user_name:any;
  user_id:any;
  preData=false;
  editCompany_ID=false;
  viewDocs=false;
  filteredList:any=[];
  userBussinesslist:any=[];
  public premiseUploader: FileUploader = new FileUploader({ url: premiseURL, itemAlias: 'preLeaseImage',maxFileSize:this.maxFileSize });
  @Input('sellerPremiseData') public sellerPremiseData : FormGroup;
  @Input() edit_CompanyID:any;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('premise') premise: any;
  constructor(public sell:SellerService) { }
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
        this.viewDocs = true;
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
          this.showPremisePdf=true;
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {          
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };           
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
    return this.sellerPremiseData.controls;
  }
  uploadLeaseReport(){
    if (this.preData) {
      if(this.edit_CompanyID!=undefined){
        this.premiseUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.premiseUploader.uploadAll();
        // }                                                                      
        this.premiseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }else{
        this.premiseUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.premiseUploader.uploadAll();
        // }                                                                      
        this.premiseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if(response=='Uploaded Sucessfully'){
            alert("Uploaded Sucessfully")
          }
        };
      }    
    }
    else {
      alert("File size must be less that 1mb and more that 1kb!");
     }
  }
  saveSellerPremiseInfo(){
    this.submitted = true;
    if (this.sellerPremiseData.invalid) {
      alert('Please fill the fields !!!');     
    }else{
      if(this.edit_CompanyID!=undefined){
        this.sellerPremiseData.patchValue({     
          CompanyId: this.edit_CompanyID  
        });
      }else{
        this.sellerPremiseData.patchValue({     
          CompanyId: this.CompanyID  
        });
      }     
      this.sell.saveSellerPremise(this.sellerPremiseData.value).subscribe(data=>{
        let res = data;
        if(res>0){
          alert("Created Successfully");          
        }
        console.log(res);
      });
    }   
  }
  viewPremiseData(){
    this.ngOnInit();
    this.showPremisePdf = true;
  
  }
  clearLeaseReport(){
    this.premise.nativeElement.value = '';
  } 
}
