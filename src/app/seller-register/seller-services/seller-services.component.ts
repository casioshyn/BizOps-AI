import { Component, OnInit,Input,Output,EventEmitter, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader} from 'ng2-file-upload/ng2-file-upload';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-seller-services',
  templateUrl: './seller-services.component.html',
  styleUrls: ['./seller-services.component.scss']
})
export class SellerServicesComponent implements OnInit {
  @Input() edit_CompanyID:any;
  @Input('sellerServiceData') public sellerServiceData : FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  submitted = false;
  maxFileSize = 1048576;
  CompanyID:any;
  currentUser:any;
  user_name:any;
  user_id:any;  
  editCompany_ID:any;
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
        // this.editCompany_ID= JSON.parse(sessionStorage.getItem('EditBusinessID'));      
      }               
    }
  }
  get f() {
    return this.sellerServiceData.controls;
  }
  saveSellerServiceInfo(){
    this.submitted = true;
    if (this.sellerServiceData.invalid) {
      alert('Please fill the fields !!!');     
    }else{
      if(this.edit_CompanyID!=undefined){
        this.sellerServiceData.patchValue({     
          CompanyId: this.edit_CompanyID  
        });
      }else{
        this.sellerServiceData.patchValue({     
          CompanyId: this.CompanyID  
        });
      }
      
      this.sell.saveSellerService(this.sellerServiceData.value).subscribe(data=>{
        let res = data;
        if(res>0){
          alert("Created Successfully");
          
        }
        console.log(res);
      });
    }
    
  }

}
