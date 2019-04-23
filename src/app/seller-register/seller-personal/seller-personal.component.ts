import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LandlordService } from '../../services/landlord.service';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { SellerService } from '../../services/seller.service';
const licenseURL = 'http://40.117.214.244:3010/api/upload/license';
const socialSecurityURL = 'http://40.117.214.244:3010/api/upload/social';
const profileUrl = 'http://40.117.214.244:3010/api/upload/userProfile'
@Component({
  selector: 'app-seller-personal',
  templateUrl: './seller-personal.component.html',
  styleUrls: ['./seller-personal.component.scss']
})
export class SellerPersonalComponent implements OnInit {
  maxFileSize = 1048576;
  public userProfileImageUploader: FileUploader = new FileUploader({ url: profileUrl, itemAlias: 'userProfile' });
  public licenseUploader: FileUploader = new FileUploader({ url: licenseURL, itemAlias: 'license',maxFileSize:this.maxFileSize });
  public socialSecurityUploader: FileUploader = new FileUploader({ url: socialSecurityURL, itemAlias: 'socialSecurity',maxFileSize:this.maxFileSize });
  @Input('sellPersonal') public sellPersonal: FormGroup;
  @Input('Company_Id') public com_id;
  @Input() edit_CompanyID: any;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('socialSecurity') socialSecurity: any;
  @ViewChild('license') license: any;
  public items: FormArray;
  check_id: any = [];   
  isUpload = false;
  userProfileImage: any = [];
  profileImage = false;
  ischeckID = false;
  submitted = false;
  user_name: any;
  user_id: any;
  isInitiated = false;
  multiAddress = false;
  isSocialDocs = false;
  isLicenseDocs = false;
  CompanyID: any;
  sellerAddress: any = [];
  currentUser: any;
  editCompany_ID: any;
  viewDocs = false;
  userBussinesslist: any = [];
  filteredList: any = [];
  showLicensePdf = false;
  showSocPdf = false;
  constructor(private fb: FormBuilder, private landlord: LandlordService, private sell: SellerService) {
  }
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
    this.socialSecurityUploader.onAfterAddingFile = (file) => {
      if (file) {
        this.isSocialDocs = true;
      }
    };

    this.licenseUploader.onAfterAddingFile = (file) => {
      if (file) {
        this.isLicenseDocs = true;
      }
    };
    this.userProfileImageUploader.onAfterAddingFile = (file) => {
      if (file) {
        console.log(file);
        this.profileImage = true;
        const reader = new FileReader();
        const imageFile: any = file.file.rawFile;
        let list = {};
        reader.onload = () => {
          list = {
            filename: imageFile.name,
            filetype: imageFile.type,
            value: (reader.result as string).split(',')[1]
          };
          this.userProfileImage.push(list);
        };
        if (imageFile.size < this.maxFileSize) {
          reader.readAsDataURL(imageFile);
          this.isUpload = true;
        } else {
          // alert("File size must be less that 1mb and more that 1kb!");
        }
      }
    };
    console.log(this.com_id);
    this.sell.getAddress(this.edit_CompanyID).subscribe(addrData => {
      let address = addrData;
      this.sellerAddress = address;
      console.log(this.sellerAddress);
      if (address[0].status) {
      } else {
        if (this.sellPersonal.value.items.length > 0) {
          this.multiAddress = true;
        } else {
          this.editAddress();
        }
      }
    });
  }
  get f() {
    return this.sellPersonal.controls;
  }
  createItem(): FormGroup {
    return this.fb.group({
      addAddress: ['']
    });
  }
  addItem() {
    this.multiAddress = true;
    this.items = this.sellPersonal.get('items') as FormArray;
    this.items.push(this.createItem());
  }
  editItem(value) {
    return this.fb.group({
      addAddress: value
    });

  }
  editAddress() {
    this.multiAddress = true;
    this.items = this.sellPersonal.get('items') as FormArray;
    for (var i = 0; i < this.sellerAddress.length; i++) {
      this.items.push(this.editItem(this.sellerAddress[i].SELLER_ADDRESS));
    }
  }
  uploadLicenseReport() {
    if (this.isLicenseDocs) {
      if (this.edit_CompanyID != undefined) {
        this.licenseUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.licenseUploader.uploadAll();
        // }                                                                      
        this.licenseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if (response == 'Uploaded Sucessfully') {
            alert("Uploaded Sucessfully")
          }
        };
      } else {
        this.licenseUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.licenseUploader.uploadAll();
        // }                                                                      
        this.licenseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if (response == 'Uploaded Sucessfully') {
            alert("Uploaded Sucessfully")
          }
        };
      }
    }
    else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  uploadSocReport() {
    if (this.isSocialDocs) {
      if (this.edit_CompanyID != undefined) {
        this.socialSecurityUploader.setOptions({ additionalParameter: { Company_ID: this.edit_CompanyID, USERNAME: this.user_name } });
        this.socialSecurityUploader.uploadAll();
        // }                                                                      
        this.socialSecurityUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if (response == 'Uploaded Sucessfully') {
            alert("Uploaded Sucessfully")
          }
        };
      } else {
        this.socialSecurityUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
        this.socialSecurityUploader.uploadAll();
        // }                                                                      
        this.socialSecurityUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if (response == 'Uploaded Sucessfully') {
            alert("Uploaded Sucessfully")
          }
        };
      }
    }else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  
  uploadProfileImage() {
    if (this.profileImage) {
      if (this.edit_CompanyID != undefined) {
        this.userProfileImageUploader.setOptions({ additionalParameter: { USER_ID: this.user_id, USERNAME: this.user_name } });
        this.userProfileImageUploader.uploadAll();
        // }                                                                      
        this.userProfileImageUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if (response == 'Uploaded Sucessfully') {
            alert("Uploaded Sucessfully")
          }
        };
      } else {
        this.userProfileImageUploader.setOptions({ additionalParameter: { USER_ID: this.user_id, USERNAME: this.user_name } });
        this.userProfileImageUploader.uploadAll();
        // }                                                                      
        this.userProfileImageUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          if (response == 'Uploaded Sucessfully') {
            alert("Uploaded Sucessfully")
          }
        };
      }
    }else{
      alert("File size must be less that 1mb and more that 1kb!");
    }
  }
  clearProfileImage() {
    this.userProfileImage = [];
  }
  clearSocialFile() {
    this.socialSecurity.nativeElement.value = '';
  }
  clearLicenseFile() {
    this.license.nativeElement.value = '';
  }
  saveSellerPersonalInfo() {
    this.submitted = true;
    if (this.sellPersonal.invalid) {
      alert('Please fill the fields !!!');
      return;
    } else {
      this.sellPersonal.patchValue({
        UserID: this.user_id,
      })
      this.landlord.insertPersonalInfo(this.sellPersonal.value).subscribe(
        data => {
          if (this.edit_CompanyID != undefined) {
            this.sell.deleteAddress(this.edit_CompanyID).subscribe(data => {
              let res = data;
              let address = {
                company_id: this.edit_CompanyID,
                user_id: this.user_id,
                address: this.sellPersonal.value.items
              }
              console.log(address)
              this.sell.multiAddress(address).subscribe(data => {
                let res = data;
                console.log(res);
                alert("Created Succsessfully");
              });
            });
          } else {
            let address = {
              company_id: this.CompanyID,
              user_id: this.user_id,
              address: this.sellPersonal.value.items
            }
            console.log(address)
            this.sell.multiAddress(address).subscribe(data => {
              let res = data;
              console.log(res);
              alert("Created Succsessfully");
            });
          }
        },
        error => {
          alert("Server Error Please Try After Sometime!!!");
          console.log(error);
        }
      );
    }
  }
  viewLicense() {
    this.ngOnInit();
    this.showLicensePdf = true;
  }
  viewSoc() {
    this.ngOnInit();
    this.showSocPdf = true;
  }
}
