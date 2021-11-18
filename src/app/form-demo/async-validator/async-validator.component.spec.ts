import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, AsyncValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AsyncValidatorComponent } from './async-validator.component';
import { UserValidators } from './user.validator';

describe('AsyncValidatorComponent', () => {
  let component: AsyncValidatorComponent;
  let fixture: ComponentFixture<AsyncValidatorComponent>;
  let userValid: UserValidators;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncValidatorComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [UserValidators]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncValidatorComponent);
    component = fixture.componentInstance;
    userValid = TestBed.get(UserValidators);
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('unit test Async Validation testing',fakeAsync(()=>{
    let username = component.asyncForm.controls['username'];

    username.setValue('Bret');

    fixture.detectChanges();

    spyOn(userValid, 'userValidator').and.callThrough();

    tick(1000);
    fixture.detectChanges();
    expect(username.hasError).toBeTruthy();

  }));

});
describe('testando com describe', () => {
  let component: AsyncValidatorComponent;
  let fixture: ComponentFixture<AsyncValidatorComponent>;
  let userValid: UserValidators;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncValidatorComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [UserValidators]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncValidatorComponent);
    component = fixture.componentInstance;
    userValid = TestBed.get(UserValidators);
    fixture.detectChanges();
  });


  fit('testando',fakeAsync(()=>{
    debugger
    let username = component.asyncForm.controls['username'];

    username.setValue('Bret');
   // username.setValue('mmm');
   // let val = {'userNameExists': true};
    fixture.detectChanges();
    const v = Validators.composeAsync([observableValidator(null)]);
  //const v = Validators.composeAsync([observableValidator({'userNameExists': true})])!;
    const teste = spyOn(userValid, 'userValidator').and.callThrough().and.returnValue(v);
    let t1 = teste.withArgs(username);
    let t2 = t1.and.returnValue(v);
   // teste.apply(null, username);
  //  fixture.detectChanges();
  //  console.log("logteste - "+ teste);
    tick(1000);
    fixture.detectChanges();
    expect(username.hasError).toBeTruthy();
   // tick(3000);
  //  fixture.whenStable().then(() => {
  //    fixture.detectChanges();
  //    expect(teste).toHaveBeenCalled();
  //  });


  }));
  fit('testando 1',fakeAsync(()=>{
   // debugger
    let username = component.asyncForm.controls['username'];

    username.setValue('jose');

    fixture.detectChanges();
    const v = Validators.composeAsync([observableValidator(null)]);
    const teste = spyOn(userValid, 'userValidator').and.callThrough().and.returnValue(v);
    teste.apply(null, username);
    fixture.detectChanges();
   console.log("logteste - "+ teste);
    tick(1000);
    fixture.detectChanges();
    expect(username.hasError).toBeTruthy;
    console.log("logtem erro? - "+ username.hasError);
    tick(3000);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(teste).toHaveBeenCalled();
    });


  }));

});
function c(c: AsyncValidatorFn): { [key: string]: any } {


  let d = (c: AsyncValidatorFn) => {
    return { 'userNameExists': true };
  };
  return d;

}
function observableValidator(response: {[key: string]: any}): AsyncValidatorFn {
  debugger
  return (c: AbstractControl) => {
    const res = c.value != 'expected' ? response : null;
    debugger
    return of(res);
  //  return of({ 'userNameExists': true });
  }
}
