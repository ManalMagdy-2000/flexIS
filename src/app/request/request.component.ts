﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

<<<<<<< HEAD:src/app/request/request.component.ts
import { AccountService, AlertService, DepartmentService } from '@app/_services';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Department, Request } from '@app/_models';
=======
import { AccountService, AlertService, DepartmentService } from '../_services';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Department, Request } from '../_models';
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/request/request.component.ts
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'request.component.html' })
export class RequestComponent implements OnInit {
    departments = null;
    form: FormGroup;
    departmentID: string;
    requestID: string;
    offerID: string;
    isAddMode: boolean;
    department: Department;
    requests: Request[];
    loading = false;
    isResource = false;
    submitted = false;
    success = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private departmentService: DepartmentService,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}


    ngOnInit() {
        console.log(this.accountService.employeeValue);
        this.departmentService.getDepartmentById(this.accountService.employeeValue.department).subscribe(department => {
            this.department = department;
            this.requests = department.requests;
        });


        this.departmentID = this.accountService.employeeValue.department;
        // this.requestID = this.route.snapshot.params['requestID'];
        this.isAddMode = !this.departmentID;

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            description: ['', Validators.required],
            date: ['', Validators.required],
            time: ['', Validators.required],
            studentLevel: ['', Validators.required],
            numberOfStudents: ['', Validators.required],
            status: "NEW",
            resourceType: [''],
            resourceQuantity: [''],
            offers: [[]]
        });

        if (!this.isAddMode) {
            this.departmentService.getDepartmentById(this.departmentID)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    addResource() {
        this.isResource = true;
        console.log(this.isResource)
    }

    reset() {
        this.isResource = false;
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.form.value)
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }



        this.loading = true;

            this.addRequest();
        // } else {
        //     this.updateEmployee();
        // }

    }


    setID(requestID, offerID, status) {
        this.offerID = offerID;
        this.requestID = requestID;
        this.updateStatus(status);
    }

    private addOffer() {
        this.departmentService.addOffer(this.departmentID, this.requestID, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['/request'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateStatus(status: string) {
        this.departmentService.updateStatus(this.departmentID, this.requestID, this.offerID, status)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Status updated', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }



    private addRequest() {
        this.departmentService.addRequest(this.departmentID, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
                    this.success = true;
                    this.router.navigate(['/requests'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                    this.success = false;
                }
            });
    }

}
