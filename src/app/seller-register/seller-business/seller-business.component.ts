import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../../services/equipment.service';
import { HomeNodeService } from '../../services/HomeNodeService';
import { SellerService } from '../../services/seller.service';
import { MailService } from '../../services/mail.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { NodeService } from '../../services/Nodeservice';
const URL = 'http://40.117.214.244:3010/api/upload';

const SECURL = 'http://40.117.214.244:3010/api/upload/multi';
@Component({
  selector: 'app-seller-business',
  templateUrl: './seller-business.component.html',
  styleUrls: ['./seller-business.component.scss']
})
export class SellerBusinessComponent implements OnInit {
  @Input('sellerBusinessData') public sellerBusinessData: FormGroup;
  @Input() secondaryImages:any=[];
  @Input() edit_CompanyID:any;
  @Output() getsecImg:EventEmitter<any>=new EventEmitter<any>();
  @Output() tabActive:EventEmitter<any>=new EventEmitter<any>();
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  maxFileSize = 1048576;
  public primaryImageUploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'PrimaryImage',maxFileSize:this.maxFileSize });
  public SecondaryImageUploader: FileUploader = new FileUploader({ url: SECURL, itemAlias: 'SecondaryImage',maxFileSize:this.maxFileSize });
  Company_ID: any;
  CompanyID: any;
  editCompany_ID:any;
  submitted = false;
  place: any;
  center: any;
  position: any;
  address: any;
  currentUser: any;
  user_name: any;
  user_id: any;
  list: any = [];
  baseCategoryList: any = [];
  childCategoryList: any = [];
  subchildCategoryList: any = [];
  stateList: any = [];
  countyList: any = [];
  building_types: any = [];
  building_subtypes: any = [];
  processMstr: any = [];
  citiesList: any = [];
  subcategoryList: any = [];
  subChildList: any = [];
  isProf = false;
  priImage = false;
  primaryImage: any = [];
  //maxFileSize = 1048576;
  isUpload = false;
  secImage = false;
  editImage=false;
  img=true;
  sec_Images:any=[];
  SecondaryImageData: any = [];
  companyStatus = ['Running', 'Dormant'];
  selectProfessionalStatus = ['Bizops Professionals', 'Create New Professionals'];
  employeesCount = ['1-10', '11-25', '26-50', '51-100', '101-200', '200+'];
  priceList = [100000, 200000, 250000, 500000, 750000, 1000000, 2000000, 3000000, 4000000, 5000000];
  companyTypeList = ['Sole Proprietorship', 'Partnership', 'Private Limited', 'Public Limited', 'Trust', 'Co-Operative'];
  sellTypeList = [{ name: 'Sell', value: 0 }, { name: 'Lease', value: 1 }];
  constructor(private fb: FormBuilder, private router: Router, public home: HomeNodeService,
    public equip: EquipmentService, public sell: SellerService, private route: ActivatedRoute,private user:NodeService,
    public mail: MailService) { }
  ngOnInit() {    
    if(this.secondaryImages.length==0){
      this.getsecImg.emit();   
    }else{
      this.img=true;
    }
    if (sessionStorage.length) {
      if (sessionStorage.getItem('Bizops_User')) {
        this.currentUser = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = this.currentUser.USER_FIRSTNAME;
        this.user_id = this.currentUser.ID;
      }
      if (sessionStorage.getItem('EditBusinessID')) {
       
        // this.editCompany_ID= JSON.parse(sessionStorage.getItem('EditBusinessID'));      
      }
     
    }
    this.primaryImageUploader.onAfterAddingFile = (file) => {
      if (file) {
        console.log(file);
        this.priImage = true;
        const reader = new FileReader();
        const imageFile: any = file.file.rawFile;
        let list = {};
        reader.onload = () => {
          list = {
            filename: imageFile.name,
            filetype: imageFile.type,
            value: (reader.result as string).split(',')[1]
          };
          this.primaryImage.push(list);
        };
        if (imageFile.size < this.maxFileSize) {
          reader.readAsDataURL(imageFile);
          this.isUpload = true;
        } else {
        alert("File size must be less that 1mb and more that 1kb!");
        }
      }
    };

    this.SecondaryImageUploader.onAfterAddingFile = (file) => {
      if (file) {
        this.secImage = true;
        const reader = new FileReader();
        const imageFile: any = file.file.rawFile;
        let list = {};
        this.isUpload = true;
        reader.onload = () => {
          list = {
            filename: imageFile.name,
            filetype: imageFile.type,
            value: (reader.result as string).split(',')[1]
          };
          this.SecondaryImageData.push(list);
        };
        if (imageFile.size < this.maxFileSize) {
          reader.readAsDataURL(imageFile);
         
        } else {
         // alert("File size must be less that 1mb and more that 1kb!");
        }
      }
    };
    // this.user.getImage(this.editCompany_ID).subscribe(
    //   data => {       
    //     //   this.blockUI.stop();
    //     const secImgList = data;
    //     if (secImgList.length > 0) {
    //       this.img = true;
    //       this.sec_Images = secImgList;
    //     } else {
    //       this.img = false;
    //     }
    this.home.getProductList().subscribe(
      data => {
        this.list = data;
        this.home.getBaseCategory().subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
            this.baseCategoryList = data;
            this.home.getChildCategory().subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              data => {
                this.childCategoryList = data;
                this.home.getSubchildCategory().subscribe(
                  // tslint:disable-next-line:no-shadowed-variable
                  data => {
                    this.subchildCategoryList = data;
                    this.home.getStateList().subscribe(
                      // tslint:disable-next-line:no-shadowed-variable
                      data => {
                        this.stateList = data;
                        this.home.getCountyList().subscribe(
                          // tslint:disable-next-line:no-shadowed-variable
                          data => {
                            this.countyList = data;
                            this.home.getBuildingTypes().subscribe(
                              // tslint:disable-next-line:no-shadowed-variable
                              data => {
                                this.building_types = data;
                                console.log(this.building_types);
                                this.home.getBuildingSubTypes().subscribe(
                                  // tslint:disable-next-line:no-shadowed-variable
                                  data => {
                                    this.building_subtypes = data;
                                    this.home.getProcessMstr().subscribe(
                                      // tslint:disable-next-line:no-shadowed-variable
                                      processData => {
                                        this.processMstr = processData;

                                        this.home.getProfessional(this.user_id).subscribe(
                                          data => {
                                            var res = data;
                                            if (res.length > 0) {
                                              if (res[0].status) { }
                                              else {
                                                var Mstr_Data = res;
                                                if (Mstr_Data[0].USER_ID == this.user_id) {
                                                  this.isProf = true;
                                                }
                                              }

                                            }
                                            else { alert('No Data'); }
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      },
      error => {
        alert('Server Error');
      });
    // });
  }
  get f() {
    return this.sellerBusinessData.controls;
  }
  placeChanged(place) {  
  
      this.place = place;
      this.center = place.geometry.location;
      this.address = place.formatted_address;
      const lng = place.geometry.location.lng();
      const lat = place.geometry.location.lat();
      this.position = [lat, lng];
  
      this.sellerBusinessData.patchValue({
        Latitude: this.position[0],
        Longitude: this.position[1],
        Address: this.address,
      });  
  }

  changeState($event) {
    // tslint:disable-next-line:max-line-length
    if ($event === undefined) { this.citiesList = []; }
    else { this.citiesList = this.countyList.filter((item) => item.state_code === $event.state_code); }
  }
  clearPrimaryImage(){
    this.primaryImage = [];
  }
  clearSecondaryImage(){
    this.SecondaryImageData = [];
  }
  changeCategory($event) {
    this.subcategoryList = [];
    this.subChildList = [];
    // tslint:disable-next-line:max-line-length
    if ($event === undefined) { this.subcategoryList = []; this.subChildList = []; }
    else { this.subcategoryList = this.childCategoryList.filter((item) => item.cid === $event.cid); }
  }
  changesubCategory($event) {
    this.subChildList = [];
    if ($event === undefined) { this.subChildList = []; } else { this.subChildList = this.subchildCategoryList.filter((item) => item.subid === $event.subcid); }
  }
  saveSellerBusinessInfo() {
    this.submitted = true;
    if (this.sellerBusinessData.invalid) {
      alert("Please fill the fields!!!");
    }else{
      sessionStorage.removeItem('BusinessID');     
      if(this.edit_CompanyID!=undefined){
        this.sellerBusinessData.patchValue({
          userId: this.user_id,
          CompanyId:this.edit_CompanyID       
        });
      }else{
        this.sellerBusinessData.patchValue({
          userId: this.user_id, 
          CompanyId:0        
        });
      }   
      console.log(this.sellerBusinessData.value);
      this.sell.saveSellerBusiness(this.sellerBusinessData.value).subscribe(data => {
        let res = data;
        console.log(res);
        this.Company_ID = res;
        this.CompanyID = this.Company_ID;
        sessionStorage.setItem('BusinessID', JSON.stringify(this.Company_ID));
        if (res > 0) {
          alert("Created Successfully"); 
          this.tabActive.emit('tabActivte');
          if(this.edit_CompanyID!=undefined){
            this.primaryImageUploader.setOptions({
              additionalParameter: { Company_ID: this.edit_CompanyID }
            });
          }else{
            this.primaryImageUploader.setOptions({
              additionalParameter: { Company_ID: this.CompanyID }
            });
          }       
          if (this.primaryImage.length > 0) {
            if (this.priImage) {
              this.primaryImageUploader.uploadAll();
              this.primaryImageUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {               
                if (this.SecondaryImageData.length > 0) {
                  if(this.edit_CompanyID!=undefined){
                    this.user.deleteSecImages(this.edit_CompanyID).subscribe(
                      data => {
                        let res  = data;
                        if (this.secImage) {                          
                            this.SecondaryImageUploader.setOptions({
                              additionalParameter: { Company_ID: this.edit_CompanyID }
                            });                                          
                          this.SecondaryImageUploader.uploadAll();
                          this.SecondaryImageUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                          };
                        }
                      });
                  }else{
                    this.user.deleteSecImages(this.CompanyID).subscribe(
                      data => {
                        let res  = data;
                        if (this.secImage) {                          
                            this.SecondaryImageUploader.setOptions({
                              additionalParameter: { Company_ID: this.CompanyID }
                            });                                          
                          this.SecondaryImageUploader.uploadAll();
                          this.SecondaryImageUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                          };
                        }
                      });
                  }
                 
                }
              };
            } else{
              // alert('invalid')
            }
          }
        }
      });
    }    
  } 
}
