import { Component, OnInit,Input,Output,EventEmitter, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SellerService } from '../../services/seller.service';
import { HomeNodeService } from '../../services/HomeNodeService';
@Component({
  selector: 'app-seller-building',
  templateUrl: './seller-building.component.html',
  styleUrls: ['./seller-building.component.scss']
})
export class SellerBuildingComponent implements OnInit {
  @Input('sellerBuildingData') public sellerBuildingData : FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() edit_CompanyID:any;
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  CompanyID:any;
  currentUser:any;
  user_name:any;
  user_id:any;
  submitted = false;
  building_types:any=[];
  building_subtypes:any=[];
  subbuilding_types:any=[];
  editCompany_ID:any;
  constructor(public sell :SellerService,private home :HomeNodeService) { }
  ngOnInit() {
    if(sessionStorage.length){
      if(sessionStorage.getItem('BusinessID')){      
        this.CompanyID = JSON.parse(sessionStorage.getItem('BusinessID'));     
        this.sellerBuildingData.patchValue({ 
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
    this.home.getBuildingTypes().subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        this.building_types = data;
        console.log(this.building_types);
        this.home.getBuildingSubTypes().subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
            this.building_subtypes = data;
          });
      });  
  }
  get f() {
    return this.sellerBuildingData.controls;
  }
  changeBuildingType($event) {
    this.subbuilding_types = [];
    if ($event === undefined) { this.subbuilding_types = []; }
    this.subbuilding_types = this.building_subtypes.filter((item) => item.TYPE_ID === $event.TYPE_ID);
  }
  saveSellerBuildingInfo(){
    this.submitted = true;
    if (this.sellerBuildingData.invalid) {
      alert("Please fill the fields");
    }else{
      if(this.edit_CompanyID!=undefined){
        this.sellerBuildingData.patchValue({     
          CompanyId: this.edit_CompanyID  
        });
      }else{
        this.sellerBuildingData.patchValue({     
          CompanyId: this.CompanyID  
        });
      } 
      this.sell.saveSellerBuilding(this.sellerBuildingData.value).subscribe(data=>{
        let res = data;
        if(res>0){
          alert("Created Succsessfully");
          
        }
        console.log(res);
      });
    }   
  }
}
