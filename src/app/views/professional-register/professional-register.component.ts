import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { FileUploader } from "ng2-file-upload/ng2-file-upload";
import { NodeService } from "../../services/Nodeservice";
import { HomeNodeService } from "../../services/HomeNodeService";
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
const URL = "http://40.117.214.244:3010/api/profile/upload";
const profLicenseURL = "http://40.117.214.244:3010/api/professional/profLicense";
const driverLicenseURL = 'http://40.117.214.244:3010/api/professional/driverLicense';
const socialSecurityURL = 'http://40.117.214.244:3010/api/professional/profSocialSecurity';
const businessLicenseURL = 'http://40.117.214.244:3010/api/professional/businessLicense';
const insuranceURL = 'http://40.117.214.244:3010/api/professional/insuranceData';
@Component({
  selector: "app-professional-register",
  templateUrl: "./professional-register.component.html",
  styleUrls: ["./professional-register.component.scss"]
})
export class ProfessionalRegisterComponent implements OnInit {
  @ViewChild('tab') public tabs: NgbTabset;
  @ViewChild('license') license: any;
  @ViewChild('profLicense') profLicense: any;
  @ViewChild('businessLicense') businessLicense: any;
  @ViewChild('insuranceData') insuranceData: any;
  @ViewChild('clearImage') clearImage: any;
  public profileImgUploader: FileUploader = new FileUploader({ url: URL, itemAlias: "profileImage" });
  public profLicenseUploader: FileUploader = new FileUploader({ url: profLicenseURL, itemAlias: "profLicense" });
  public businessLicenseUploader: FileUploader = new FileUploader({ url: businessLicenseURL, itemAlias: "businessLicense" });
  public insuranceUploader: FileUploader = new FileUploader({ url: insuranceURL, itemAlias: "insuranceData" });
  public licenseUploader: FileUploader = new FileUploader({ url: driverLicenseURL, itemAlias: 'license' });
  public socialSecurityUploader: FileUploader = new FileUploader({ url: socialSecurityURL, itemAlias: 'profSocialSecurity' });
  professionalRegisterData: FormGroup;
  items: FormArray;
  professionalID: any;
  professionalData:any=[];
  isEditProf = false;
  multiAddress = false;
  submitted = false;
  justified: string = 'justified';
  showPreview = false;
  isUpload = false;
  isImage = false;
  Data: any = [];
  prof_ID = '';
  profileData: any;
  driverLicenseFiles: any = [];
  profLicenseFiles: any = [];
  socFiles: any = [];
  pdfPage: any = [];
  showPdf: boolean = false;
  page: number = 1;
  pdfSrc: string;
  category: string;
  saveProperty: boolean = false;
  //subCategory: string;
  prof_Category:string='';
  subCategoryList: any = [];
  primaryImage: any = [];
  user_name: any;
  user_id: any;
  place: any;
  center: any;
  position: any;
  address: any;
  maxFileSize = 1048576;
  isProf = false;
  profCategory: string;
  socData: boolean = false;
  driverLicenseData: boolean = false;
  profLicenseData: boolean = false;
  bussinessLicenseData: boolean = false;
  insData: boolean = false;
  showDriverLicense=false;
  showProfessionalLicense=false;
  showProfessionalBusiness=false;
  showProfessionalInsurance=false;
  professsionalDetails:any=[];
  professionalAddress: any = [];
  specialtyList = [
    { value: 1, label: "Architect" },
    { value: 2, label: "Landscaper" }
  ];

  categoryList = [
    "Accounting & Finance",
    "Construction",
    "Human Resources",
    "Information Technology",
    "Legal",
    "Logistics & Transportation",
    "Marketing, Advertising & Promotions",
    "Real Estate",
    "Telecommunications & Cable",
    "Principle Agent"
  ];

  baseCategory = [
    { id: 1, value: "Accounting & Finance" },
    { id: 2, value: "Construction" },
    { id: 3, value: "Human Resources" },
    { id: 4, value: "Information Technology" },
    { id: 5, value: "Legal" },
    { id: 6, value: "Logistics & Transportation" },
    { id: 7, value: "Marketing, Advertising & Promotions" },
    { id: 8, value: "Real Estate" },
    { id: 9, value: "Telecommunications & Cable" },
    { id: 10, value: "Principle Agent" },
    { id: 11, value: "Others" }
  ];

  subCategory = [
    { id: 2, value: "Architect" },
    { id: 2, value: "Landscape" },
    { id: 2, value: "Surveyor" },
    { id: 2, value: "Contractor" },
    { id: 2, value: "Engineer" },
    { id: 4, value: "Cybersecurity" },
    { id: 4, value: "Software development" },
    { id: 4, value: "IT Support" },
    { id: 4, value: "Systems analyst" }
  ];
  constructor(
    private fb: FormBuilder,
    private user: NodeService,
    private route: ActivatedRoute,
    public router: Router,
    private home: HomeNodeService
  ) { }
  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
        // this.isUser = true;
      }
    }
    this.route.queryParams
      .filter(params => params.Type)
      .subscribe(params => {
        this.profCategory = params.Type;
        this.isProf = true;
      });
    this.professionalRegisterData = this.fb.group({
      items: this.fb.array([]),
      UserId: [""],
      Id: [''],
      UserName: [''],
      Name: [''],
      homeAddress: [''],
      emailAddress: [''],
      faxNumber: [''],
      cellPhone: [''],
      homePhone: [''],
      insdate: [''],
      birthPlace: [''],
      homeTelePhone: [''],
      companyName: [''],
      businessAddress: [''],
      businessEmail: [''],
      telePhoneNumber: [''],
      bestTelePhone: [''],
      websiteName: [''],
      insName: [''],
      insTelePhoneNumber: [''],
      insAddress: [''],
      insuranceType: [''],
      insEmail: [''],
      Category: [''],
      SubCategory: [''],
      dunsNumber: [''],
      taxId: [''],
      insProvider: [''],
      profile_Img:[''],
      driver_License:[''],
      prof_License:[''],
      business_License:[''],
      ins_report:['']


    });
    this.route.queryParams
      .filter(params => params.prof_id)
      .subscribe(params => {
        this.professionalID = params.prof_id;
        this.isEditProf = true;
      });
    this.user.getProfbyId(this.professionalID).subscribe(
      profDetails => {
        let res = profDetails;
        this.professionalData = res[0];
        this.professsionalDetails=res[0];
        // this.prof_Category=this.professionalData.CATEGORY;
        this.professionalRegisterData.patchValue({
          UserId: this.professionalData.USER_ID,
          Id: this.professionalData.ID,
          UserName: this.professionalData.USERNAME,
          Name: this.professionalData.USERNAME,
          homeAddress: this.professionalData.HOME_ADDRESS,
          emailAddress: this.professionalData.EMAIL,
          faxNumber: this.professionalData.FAX_NUMBER,
          cellPhone: this.professionalData.CELL_NUMBER,
          homePhone: this.professionalData.HOME_PHONE_NUMBER,
          insdate: this.professionalData.INS_DATE,
          birthPlace: this.professionalData.PLACE,
          homeTelePhone: this.professionalData.HOME_TELEPHONE,
          companyName: this.professionalData.COMPANY_NAME,
          businessAddress: this.professionalData.BUSINESS_ADDRESS,
          businessEmail: this.professionalData.BUSINESS_EMAIL,
          telePhoneNumber: this.professionalData.PROF_TELEPHONE,
          bestTelePhone: this.professionalData.BEST_TELEPHONE,
          websiteName: this.professionalData.WEBSITE,
          insName: this.professionalData.INS_NAME,
          insTelePhoneNumber: this.professionalData.INS_TELEPHONE,
          insAddress: this.professionalData.INS_ADDRESS,
          insuranceType: this.professionalData.INS_TYPE,
          insEmail: this.professionalData.INS_EMAIL, 
          Category:this.professionalData.CATEGORY,         
          SubCategory: this.professionalData.SUBCATEGORY,
          dunsNumber: this.professionalData.DUNS_NUMBER,
          taxId: this.professionalData.TAXID,
          insProvider: this.professionalData.INSURANCE_PROVIDER,
          profile_Img:this.professionalData.IMG_NAME,
          driver_License:this.professionalData.DRIVER_LICENSE_REPORT,
          prof_License:this.professionalData.PROF_LICENSE_REPORT,
          business_License:this.professionalData.BUSINESS_LICENSE_REPORT,
          ins_report:this.professionalData.PROF_INSURANCE_REPORT
          
        });
        this.user.getProfessionalMultipleAddress(this.professionalID).subscribe(addrData => {
          let address = addrData;
          this.professionalAddress = address;
          if (address[0].status) {
          } else {
            if (this.professionalRegisterData.value.items.length > 0) {
              this.multiAddress = true;
            } else {
              this.editAddress();
            }
          }
        });
      });
    this.profileImgUploader.onAfterAddingFile = file => {
      if (file) {
        const reader = new FileReader();
        const imageFile: any = file.file.rawFile;
        this.isImage = true;
        let list = {};
        reader.onload = () => {
          list = {
            filename: imageFile.name,
            filetype: imageFile.type,
            value: (reader.result as string).split(",")[1]
          };
          this.primaryImage.push(list);
        };
        reader.readAsDataURL(imageFile);
        this.isUpload = true;
      }
    };
    this.profLicenseUploader.onAfterAddingFile = file => {
      if (file) {
        let img: any = document.querySelector("#profLicense");
        this.profLicenseData = true;
        if (typeof FileReader !== "undefined") {
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
            this.profLicenseFiles.push(list);
          };
          reader.readAsArrayBuffer(img.files[0]);
        }
      }
    };
    this.businessLicenseUploader.onAfterAddingFile = file => {
      if (file) {
        let img: any = document.querySelector("#businessLicense");
        this.bussinessLicenseData = true;
        if (typeof FileReader !== "undefined") {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
          };
          reader.readAsArrayBuffer(img.files[0]);
        }
      }
    };
    this.insuranceUploader.onAfterAddingFile = file => {
      if (file) {
        let img: any = document.querySelector("#insuranceData");
        this.insData = true;
        if (typeof FileReader !== "undefined") {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            list = {
              filename: img.name,
              filetype: img.type,
              // value : reader.result.split(',')[1]
            };
          };
          reader.readAsArrayBuffer(img.files[0]);
        }
      }
    };
    this.licenseUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#license");
        this.driverLicenseData = true;
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
            this.driverLicenseFiles.push(list);
          }
          if (img.files[0].size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
          } else {
            // alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };
    this.socialSecurityUploader.onAfterAddingFile = (file) => {
      if (file) {
        let img: any = document.querySelector("#profSocialSecurity");
        this.socData = true;
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
            this.socFiles.push(list);
          }
          if (img.size < this.maxFileSize) {
            reader.readAsArrayBuffer(img.files[0]);
            this.isUpload = true;
          } else {
            // alert("File size must be less that 1mb and more that 1kb!");
          }
        }
      }
    };
  }

  get f() {
    return this.professionalRegisterData.controls;
  }

  changeCategory($event) {
    this.subCategoryList = this.subCategory.filter(item => {
      return item.id == $event.id;
    });
  }
  createItem(): FormGroup {
    return this.fb.group({
      addAddress: ['']
    });
  }
  addItem() {
    this.multiAddress = true;
    this.items = this.professionalRegisterData.get('items') as FormArray;
    this.items.push(this.createItem());
  }
  editItem(value) {
    return this.fb.group({
      addAddress: value
    });
  }
  editAddress() {
    this.multiAddress = true;
    this.items = this.professionalRegisterData.get('items') as FormArray;
    for (var i = 0; i < this.professionalAddress.length; i++) {
      this.items.push(this.editItem(this.professionalAddress[i].PROF_ADDRESS));
    }
  }
  ProfessionalRegister() {
    this.submitted = true;
    // if (!this.isProf) {
    //   this.professionalRegisterData.patchValue({
    //     UserId: this.user_id
    //   });
    // } else {
    //   this.professionalRegisterData.patchValue({
    //     UserId: this.user_id,
    //     Category: "Priciple Agent"
    //   });
    // }
    if (this.professionalRegisterData.invalid) {
      return;
    } else {
      if(this.isEditProf){
        this.professionalRegisterData.patchValue({
          UserId: this.user_id,
          UserName: this.user_name,
          Id: this.professionalID         
        });
      }else{
        this.professionalRegisterData.patchValue({
          UserId: this.user_id,
          UserName: this.user_name,
          Id: 0
        });
      }     
      this.user
        .createProfessional(this.professionalRegisterData.value)
        .subscribe(
          data => {
            this.prof_ID = data;
            this.Data = data;
            const rows = this.Data;
            if (rows > 0) {
              if (!this.isEditProf) {
                this.profileImgUploader.setOptions({ additionalParameter: { ID: this.prof_ID, UserName: this.professionalRegisterData.value.UserName } });
                this.profileImgUploader.uploadAll();
                this.profileImgUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {                  
                };
              }else{
                if(this.isImage){
                  this.user.deleteProfessionalImage(this.professionalID).subscribe(data=>{
                    let res=data;         
                    this.profileImgUploader.setOptions({ additionalParameter: { ID: this.prof_ID, UserName: this.professionalRegisterData.value.Name } });
                    this.profileImgUploader.uploadAll();
                    this.profileImgUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {                  
                    };
                  });
                }else{

                }
               
              }
                if (this.profLicenseData) {
                  this.profLicenseUploader.setOptions({ additionalParameter: { ID: this.prof_ID, UserName: this.professionalRegisterData.value.UserName, user_id: this.user_id } });
                  this.profLicenseUploader.uploadAll();
                  this.profLicenseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {                    
                  };
                } 
                if (this.driverLicenseData) {
                  this.licenseUploader.setOptions({ additionalParameter: { ID: this.prof_ID, UserName: this.professionalRegisterData.value.UserName, user_id: this.user_id } });
                  this.licenseUploader.uploadAll();
                  this.licenseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                    // if (this.socData) {
                    //   this.socialSecurityUploader.setOptions({ additionalParameter: { ID: this.prof_ID, UserName: this.professionalRegisterData.value.UserName, user_id: this.user_id } });
                    //   this.socialSecurityUploader.uploadAll();
                    //   this.socialSecurityUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {                    
                    // };
                    // }
                  };
                } 
                if (this.bussinessLicenseData) {
                  this.businessLicenseUploader.setOptions({ additionalParameter: { ID: this.prof_ID, UserName: this.professionalRegisterData.value.UserName, user_id: this.user_id } });
                  this.businessLicenseUploader.uploadAll();
                  this.businessLicenseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {                    
                  };
                }
                if (this.insData) {
                  this.insuranceUploader.setOptions({ additionalParameter: { ID: this.prof_ID, UserName: this.professionalRegisterData.value.UserName, user_id: this.user_id } });
                  this.insuranceUploader.uploadAll();
                  this.insuranceUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {                                                      
                  
                  };
                } 
                if(this.isEditProf){
                  this.user.deleteProfessionalAddress(this.professionalID).subscribe(data => {
                    let res = data;
                    let address = {
                      profID: this.professionalID,
                      address: this.professionalRegisterData.value.items
                    }
                    console.log(address)
                    this.user.professionalAddress(address).subscribe(data => {
                      let res = data;        
                      alert("Created Successfully !!!");
                      this.router.navigate(["/operate/hire"]);                                  
                    });
                  });
                }else{
                  let address = {
                    profID: this.prof_ID,
                    address: this.professionalRegisterData.value.items
                  }
                  this.user.professionalAddress(address).subscribe(data => {
                    let res = data;
                    alert("Created Successfully !!!");
                    this.router.navigate(["/operate/hire"]);  
                  });
                }  
                                   
              // }
            }
          },
          error => {
            alert("Server Error");
            console.log(error);
          });
    }
  }

  preview() {
    if (this.professionalRegisterData.invalid) {
      alert("fill all the fields !!!");
    } else {
      this.showPreview = !this.showPreview;
      this.profileData = this.professionalRegisterData.value;
    }
  }
  clearPDF() {
    this.pdfSrc = "";
    this.showPdf = false;
  }

  clearPrimaryImage() {
    this.primaryImage = [];
    
  }
  businessInfoNext() {
    this.tabs.select('tab-ins');
    this.saveProperty = true;
  }
  insInfoNext() {
    // this.saveProperty = true;
  }
  personalInfoNext() {
    this.tabs.select('tab-business');
  }
  placeChanged(place) {
    this.place = place;
    this.center = place.geometry.location;
    this.address = place.formatted_address;
    const lng = place.geometry.location.lng();
    const lat = place.geometry.location.lat();
    this.position = [lat, lng];
  }
  beforeChange(event: NgbTabChangeEvent) {
    if (event.nextId === 'tab-preventchange2') {
      event.preventDefault();
    }
  }
  clearDriverLicense() {
    this.license.nativeElement.value = '';
  }
  clearInsurance() {
    this.insuranceData.nativeElement.value = '';
  }
  clearBusinessLicense() {
    this.businessLicense.nativeElement.value = '';
  }
  clearProfileImage() {
    this.primaryImage = [];
    this.clearImage.nativeElement.value = '';
  }
  clearSocFile() {
    this.socFiles = [];
  }
  clearProfessionalLicense() {
    this.profLicense.nativeElement.value = '';
  }
  viewDriverLicense(){
    this.ngOnInit();
    this.showDriverLicense=true;
  }
  viewProfessionalLicense(){
    this.ngOnInit();
    this.showProfessionalLicense=true;
  }
  viewBusinesLicense(){
    this.ngOnInit();
    this.showProfessionalBusiness=true;
  }
  viewProfessionalInsurance(){
    this.ngOnInit();
    this.showProfessionalInsurance=true;
  }
}
