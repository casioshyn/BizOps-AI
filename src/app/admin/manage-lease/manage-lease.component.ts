import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NodeService } from '../../services/Nodeservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-lease',
  templateUrl: './manage-lease.component.html',
  styleUrls: ['./manage-lease.component.scss']
})
export class ManageLeaseComponent implements OnInit {
  @ViewChild('closeProcess') closeProcess: ElementRef;
  allBusiness: any = [];
  user_request:any;
  p:any;
  BusinessData: any = [];
  id_view: any;
  id_edit: any;
  id_hide: any;
  id_publish: any;
  Data: any;
  values: any;
  user_name:any;
  user_id:any;
  edit_user:any;
  notificationId:any;
  userDetail:any=[];
  showPDF = false;
  constructor(private admin: AdminService, private router: Router, private user: NodeService) { }
  ngOnInit() {
    if(sessionStorage.length){
      if(sessionStorage.getItem('Bizops_User')){
        let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }        
    }
    this.admin.getAllLeaseBusiness().subscribe(data => { this.allBusiness = data; this.BusinessData = data });
  }
  viewId(id) {
    this.id_view = id;
  }
  editId(id,value) {
    this.id_edit = id;
    this.edit_user = value;
    console.log(value)
  }
  hideId(id) {
    this.id_hide = id;
  }
  publishId(id) {
    this.id_publish = id;
  }
  view(value) {
    this.router.navigate(['/home/detail'], { queryParams: { com_id: value } });
  }

  hide(value) {  
    let id = { bus_id: value }
    this.admin.hideLeaseProduct(id).subscribe(
      data => {

        this.Data = data;
        if (this.Data == 1) {
          this.router.navigate(['/lease']);
        } else {
          alert('No Data');
        }
      },
      error => {
        alert('Server Error' + error);
      });
  }
  edit(value,value1) {
    console.log(value1);
    // this.router.navigate(["/form/landlord-register"], { queryParams: { biz_id: value } });
    this.router.navigate(["/form/landlord-register"], { queryParams: { biz_id: value,user_id:value1 } });
  }
  notifyId(id){
    this.notificationId = id;
  }
  notify(value){
    this.userDetail = [];
    this.closeProcess.nativeElement.click();
    console.log(value);
    this.userDetail = this.allBusiness.filter((item)=>{
     return item.BUS_ENT_ID == value; 
    });
    console.log(this.userDetail)
   }
  publish(value) {

    let id = { bus_id: value }
    this.admin.publishLeaseProduct(id).subscribe(
      data => {
        this.Data = data;
        if (this.Data == 1) {
          this.router.navigate(['/lease']);
        } else {
          alert('No Data');
        }
      },
      error => {
        alert('Server Error' + error);
      });
  }
  onSearchChange(searchValue) {
    if (searchValue == '') {
      this.allBusiness = this.BusinessData;    }
    else{
      this.allBusiness = this.BusinessData.filter((item) => {
        return item.ADDRESS.toLowerCase() === searchValue.toLowerCase();
      });
    }
  }
  landlordDocument(){
    if(this.userDetail[0].LANDLORD_AUTH_REPORT!=null){
      if(!this.showPDF){
        this.showPDF =true;
        }else{
          this.showPDF =false;
        }
    }else{
      alert("No Data");
    }   
  }
}
