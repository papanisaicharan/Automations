import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css']
})
export class BusinessFormComponent implements OnInit {
  recipeForm: FormGroup;
  result: string = "";
  constructor() { }

  ngOnInit() {
    this.initForm();
    this.recipeForm.get('feinFormControl').valueChanges.subscribe((value: string) => {
      if(value){
        const strLen = value.toString().length;
        // console.log(value);
        if(value.toString().length == 3){
          if(value.toString().indexOf('-') == -1){
          this.recipeForm.get('feinFormControl').setValue(value.toString().substr(0,2)+'-'+value.toString().substr(2));
          this.recipeForm.get('feinFormControl').updateValueAndValidity();
          }
        }
        if(value.toString.length > 3){
          this.recipeForm.get('feinFormControl').setValue(value.toString().split("-").join("-"));
          this.recipeForm.get('feinFormControl').updateValueAndValidity();
        }
      }
    })
    this.recipeForm.get('mobileFormControl').valueChanges.subscribe((value: string) => {
      if(value){
        const strLen = value.toString().length;
        // console.log(value);
        if(strLen == 4){
          if(value.toString().indexOf('-') == -1){
          this.recipeForm.get('mobileFormControl').setValue(value.toString().substr(0,strLen-1)+'-'+value.toString().substr(strLen-1));
          this.recipeForm.get('mobileFormControl').updateValueAndValidity();
          }
        }
        if(strLen == 8){
          if(value.toString().indexOf('-') == 3 && value.toString().lastIndexOf('-') == 3){
            this.recipeForm.get('mobileFormControl').setValue(value.toString().substr(0,strLen-1)+'-'+value.toString().substr(strLen-1));
            this.recipeForm.get('mobileFormControl').updateValueAndValidity();
          }
        }
      }
    })
  }

  // onKeyUp(event){
  //   console.log(event.target.value.toString().length);
  //   // this.recipeForm.get('feinFormControl').setValue(123)
  //   // if(event.target.value.toString().includes)
  //   if(event.target.value.toString().length == 3){
  //     this.recipeForm.get('feinFormControl').setValue(event.target.value.toString().substr(0,2) + '-'+ event.target.value.toString().substr(2) );
  //   }
  //   if(event.target.value.toString().length > 3){
  //     this.recipeForm.get('feinFormControl').setValue(event.target.value.toString().split("-").join('-'));
  //   }
  // }

  entityList = [
    'Religious Organization',
    'Corporation',
    'Government Entity',
    'Individual',
    'Joint Venture',
    'LLC',
    'Non Or Not For Profit Crop',
    'Other',
    'Partnership',
    'Trust/Estate'];

    matcher = new MyErrorStateMatcher();

    onSubmit(){
      console.log(this.recipeForm.value);
      this.result = JSON.stringify(this.recipeForm.value);
    }

    private initForm() {  
      let emailFormControl;
      let yearStartedFormControl;
      let websiteAddressFormControl;
      let feinFormControl;

      // Url pattern : https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    this.recipeForm = new FormGroup({
        emailFormControl: new FormControl('', [Validators.email]),
        yearStartedFormControl: new FormControl('',[Validators.required, this.yearValidator.bind(this)]),
        websiteAddressFormControl: new FormControl('',[Validators.pattern('^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}$')]),
        feinFormControl: new FormControl('',[Validators.pattern("^[0-9]{2}-[0-9]{7}$")]),
        entityFormControl : new FormControl('',[]),
        lastNameFormControl: new FormControl('',[Validators.pattern('^[a-zA-Z]{1,50}$')]),
        firstNameFormControl: new FormControl('',[Validators.pattern('^[a-zA-Z]{1,50}$')]),
        mobileFormControl: new FormControl('',[Validators.pattern("^[0-9]{3}-[0-9]{3}-[0-9]{4}$")])
      });
    }
    
    // phoneNumberValidation(control: FormControl):{[s:string]: boolean}{
    //   if(control.value != null || control.value == ""){
    //     if(control.value == "") return {phonenumber: false};
    //     if(control.value.length < 12 ){
    //       return {phonenumber: true};
    //     }
    //   }
    //   return null;
    // }
  
    yearValidator(control: FormControl):{[s:string]: boolean}{
      // this have to rturn null if every thing works fine
      const dt = new Date();
      let result = {
        minlength: false,
        lessthancurrentyear: false,
        greaterthan1900: false
      };

      let flag = false;

      if(control.value >= 1900){
        result.greaterthan1900 = true;
      }

      if(control.value <=  dt.getFullYear()){
        // console.log("it is greater"+ control.value + dt.getFullYear())
        result.lessthancurrentyear  = true;
      }
      
      if(control.value != null){
        if(control.value.toString().length >= 4){
          result.minlength = true;
        }
      }

      if(!result.minlength || !result.lessthancurrentyear || !result.greaterthan1900){
        flag = true;
      }

      // console.log(result,flag);
      if(flag){
        return result;
      }
      return null;
      
    }

    onFeinChange(){
      console.log('hello')
    }

}
