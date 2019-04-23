import { Component, OnInit,Input,Output,EventEmitter, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-seller-agent-info',
  templateUrl: './seller-agent-info.component.html',
  styleUrls: ['./seller-agent-info.component.scss']
})
export class SellerAgentInfoComponent implements OnInit {
  @Input('sellerAgentData') public sellerAgentData : FormGroup;
  @Input() edit_CompanyID:any;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  CompanyID:any;
  currentUser:any;
  user_name:any;
  user_id:any;
  submitted = false;
  editCompany_ID:any;  
  constructor(public sell:SellerService) { }
  ngOnInit() {
    if(sessionStorage.length){
      if(sessionStorage.getItem('BusinessID')){      
        this.CompanyID = JSON.parse(sessionStorage.getItem('BusinessID'));      
        this.sellerAgentData.patchValue({ 
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
        // this.editCompany_ID= JSON.parse(sessionStorage.getItem('EditBusinessID'));      
      }               
    }
  }
  get f() {
    return this.sellerAgentData.controls;
  }
  saveSellerAgentInfo(){
    this.submitted = true;
    if (this.sellerAgentData.invalid) {
      alert("Please fill the fields");
    }else{
      if(this.edit_CompanyID!=undefined){
        this.sellerAgentData.patchValue({     
          CompanyId: this.edit_CompanyID  
        });
      }else{
      this.sellerAgentData.patchValue({     
        CompanyId: this.CompanyID  
      });
    }
      this.sell.saveSellerAgent(this.sellerAgentData.value).subscribe(data=>{
        let res = data;
        if(res>0){
          alert("Created Successfully");
         
        }
        console.log(res);
      });
    }  
  }
}
