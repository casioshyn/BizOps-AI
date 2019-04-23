import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { HomeNodeService } from '../../services/HomeNodeService';
import { NodeService } from '../../services/Nodeservice';

@Component({
  selector: 'app-professional-detail',
  templateUrl: './professional-detail.component.html',
  styleUrls: ['./professional-detail.component.scss']
})
export class ProfessionalDetailComponent implements OnInit {

  contactProfessional: FormGroup;
  prof_id: any;
  profData: any;
  isDetail = false;
  EditProfessionalID:any;
  user_name:any;
  user_id:any;
  professionalEditValue:any;
  isprofDetailId=false;

  constructor(private route: ActivatedRoute, public router: Router, private user: NodeService,
    private home: HomeNodeService, private fb: FormBuilder, ) { }

  ngOnInit() {
    this.contactProfessional = this.fb.group({
      FullName: ['', Validators.required],
      Phone: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      MessageBox: ['', Validators.required],
      profEmail: [''],
    });
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }
    }   
    this.route.queryParams
      .filter(params => params.prof_id)
      .subscribe(params => {
        this.prof_id = params.prof_id;
        this.isprofDetailId=true;
        this.user.getProfbyId(this.prof_id).subscribe(
          profDetails => {
            //   this.blockUI.stop();
            this.profData = profDetails[0];
            this.isDetail = true;
          });
      });
      if(!this.isprofDetailId){
        this.user.getProfIdByUserID(this.user_id).subscribe(data=>{
          let res=data;
          this.professionalEditValue=res[0].ID;
          this.user.getProfbyId(this.professionalEditValue).subscribe(
            profDetails => {
              //   this.blockUI.stop();
              this.profData = profDetails[0];
              this.isDetail = true;
            });
        });
      }      
  }
  professionalEdit(value){
    this.router.navigate(["/professionalregister"], {
      queryParams: { prof_id: value }
    });
  }
}
