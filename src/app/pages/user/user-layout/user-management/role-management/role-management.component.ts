import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { ValidationService } from 'src/app/core/validation.service';
import { IRole } from 'src/app/pages/shared/interfaces/Role';
import { ErrorHandler } from 'src/app/pages/shared/services/error-handler.service';
import { RoleManagementService } from 'src/app/pages/shared/services/role-management.service';

declare var $: any;

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {
  allRoles: any;
  permission;
  selectedRole;
  isLoading;
  allPermissions;
  createRoleForm: FormGroup;
  updateRoleForm: FormGroup;
  isPermissionsLoading: boolean;
  isRoleCreating: boolean;
  permissionChecked: boolean;
  selectedPermissions: any[] = [];
  permissionsToAdd: any = [];
  permissionToSend: any = [];
  validationMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private roleMgtService: RoleManagementService,
    private validationMessages: ValidationService,
    private errorHandler: ErrorHandler,
    private alertService: AlertService
  ) {
    this.validationMessage = this.validationMessages;
  }

  ngOnInit() {
    this.selectedRole = {};
    this.isLoading = false;
    this.isPermissionsLoading = false;
    this.isRoleCreating = false;
    this.initializeForm();
    this.getAllPermissions();
    this.getRoles();
  }

  getRoles() {
    this.isLoading = true;

    this.roleMgtService.getAllRoles().subscribe(
      (response) => {
        console.log('response from get all roles', response);
        this.allRoles = response['content'];
        this.makeRoleActive(this.allRoles[0]);
        this.isLoading = false;
      },
      (e) => {
        this.isLoading = false;
        this.errorHandler.customClientErrors('Failed to retrieve roles', e.error.error.code, e.error.error.responseMessage);
      }
    );
  }

  getAllPermissions() {
    this.isLoading = true;

    this.roleMgtService.getAllPermissions().subscribe(
      (response) => {
        console.log('PERMISSIONS GOTTEN', response);
        this.allPermissions = response;
        this.isLoading = false;
      },
      (e) => {
         this.isLoading = false;
        this.errorHandler.customClientErrors('Failed to retrieve permissions', e.error.error.code, e.error.error.responseMessage);
      }
    );
  }

  makeRoleActive(role: any) {
    console.log('Role', role);
    this.permissionChecked = false;
    this.selectedPermissions = [];
    console.log('selected is here role');
    this.allPermissions.forEach((genPerm) => {
      document.getElementById(genPerm)['checked'] = false;
    });

    this.selectedRole = role;

    this.selectedPermissions = this.selectedRole.permissions;
    console.log(this.selectedRole, 'selected is here role');

    this.updateRoleForm.controls['name'].setValue(this.selectedRole.name);

    if (this.selectedRole.permissions.length > 0) {
      this.selectedRole.permissions.forEach((perm) => {
        this.allPermissions.forEach((genPerm) => {
          if (genPerm === perm) {
            console.log(perm);
            document.getElementById(perm)['checked'] = true;
          }
        });
      });
    }
  }

  addPermission(permission: any) {
    console.log('current selected permissions', this.selectedPermissions);
    console.log('selected Permission', permission);
    if (this.permissionsToAdd.includes(permission)) {
      for (let i = 0; i < this.permissionsToAdd.length; i++) {
        if (this.permissionsToAdd[i] === permission) {
          this.permissionsToAdd.splice(i, 1);
          console.log(this.permissionsToAdd);
        }
      }
    } else {
      this.permissionsToAdd.push(permission);
      console.log(this.permissionsToAdd);
    }
  }

  createRole(formValue) {
    this.isRoleCreating = true;
    formValue.permissions = this.permissionsToAdd;
    this.roleMgtService.createRole(formValue).subscribe(
      (response: IRole) => {
        this.isRoleCreating = false;
        this.createRoleForm.reset();
        this.getRoles();
        $('#createRole').modal('hide');
        this.alertService.success('Role Created Successfully');
      },
      (e) => {
        this.isRoleCreating = false;
        this.isLoading = false;
        this.errorHandler.customClientErrors('Error occured in creating role', e.error.error.code, e.error.error.responseMessage);

      }
    );
  }

  updateRole(formValue) {
    this.isRoleCreating = true;
    formValue.permissions = this.permissionToSend;

    this.roleMgtService.updateRole(formValue, this.selectedRole.id).subscribe(
      (response: IRole) => {
        console.log('Response After Update Role', response);
        this.isRoleCreating = false;
         this.updateRoleForm.reset();
        this.getRoles();
        $('#updateRole').modal('hide');
       this.alertService.success('Role Updated Successfully');
      },
      (e) => {
        this.isRoleCreating = false;
         this.isLoading = false;
        this.errorHandler.customClientErrors('Error occured in updating role', e.error.error.code, e.error.error.responseMessage);

      }
    );
  }
  clearSelection() {}

  updatePermission(permission: any) {
    if (!this.permissionChecked) {
      this.permissionToSend = JSON.parse(
        JSON.stringify(this.selectedPermissions)
      );
    }
    if (this.permissionToSend.includes(permission)) {
      //console.log("there", this.permissionToSend);

      for (let i = 0; i < this.permissionToSend.length; i++) {
        if (this.permissionToSend[i] === permission) {
          this.permissionToSend.splice(i, 1);
          console.log(this.permissionToSend);
        }
      }
    } else {
      //console.log("not there");

      this.permissionToSend.push(permission);
      console.log(this.permissionToSend);
    }
    this.permissionChecked = true;
    //console.log(this.permissionToSend);
    //console.log(this.selectedPermissions);
  }

  initializeForm() {
    this.createRoleForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      // description: ['', Validators.compose([Validators.required])],
    });
    this.updateRoleForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      // name: [
      //   { value: '', disabled: true },
      //   Validators.compose([Validators.required]),
      // ],
      // description: ["", Validators.compose([Validators.required])],
    });
  }

  showRolePopupMessage() {
    console.log('popup');
    const popup = document.getElementById('rolePopup');
    popup.classList.toggle('show');
  }
}
