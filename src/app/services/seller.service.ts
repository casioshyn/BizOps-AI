import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class SellerService {

  apiRoot = 'http://40.117.214.244:3010';
  
  constructor(private http: Http) { }

  getBizbyid(id) {
    const url = `${this.apiRoot}/api/getUserBiz/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getAddress(id) {
    const url = `${this.apiRoot}/api/getAddress/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getImage(id) {
    const url = `${this.apiRoot}/api/getImage/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  createBiz(details) {
    const url = `${this.apiRoot}/api/createBiz`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }
  multiAddress(details) {
    const url = `${this.apiRoot}/api/multiAddress`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }  
  deleteAddress(id) {
    const url = `${this.apiRoot}/api/deleteAddress/` + id
    return this.http.delete(url)
      .map((res: Response) => res.json());
  }
  saveSellerBusiness(details) {
    const url = `${this.apiRoot}/api/createSellerBusiness`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }
  saveSellerFinancial(details) {
    const url = `${this.apiRoot}/api/createSellerFinancial`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }
  saveSellerBuilding(details) {
    const url = `${this.apiRoot}/api/createSellerBuilding`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }
  saveSellerPremise(details) {
    const url = `${this.apiRoot}/api/createSellerPremise`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }
  saveSellerAgent(details) {
    const url = `${this.apiRoot}/api/createSellerAgent`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }
  saveSellerService(details) {
    const url = `${this.apiRoot}/api/createSellerService`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }
  saveSellerTerms(details) {
    const url = `${this.apiRoot}/api/createSellerTerms`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }  
  getBussinessByUserID(id){
    const url = `${this.apiRoot}/api/getbiz-user/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }  
  getAgentInfo(id){
    const url = `${this.apiRoot}/api/getbiz-agent/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getBuildingInfo(id){
    const url = `${this.apiRoot}/api/getbiz-building/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getFinancialInfo(id){
    const url = `${this.apiRoot}/api/getbiz-financial/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getPremisesInfo(id){
    const url = `${this.apiRoot}/api/getbiz-premises/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getServicesInfo(id){
    const url = `${this.apiRoot}/api/getbiz-services/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getTermsInfo(id){
    const url = `${this.apiRoot}/api/getbiz-terms/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
     }
 
}
