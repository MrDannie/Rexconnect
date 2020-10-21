import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { ValidationService } from 'src/app/core/validation.service';
import { IRole } from 'src/app/pages/shared/interfaces/Role';
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
  validationMessage: ValidationService;

  constructor(
    private formBuilder: FormBuilder,
    private roleMgtService: RoleManagementService,
    private validationMessages: ValidationService
  ) {}

  ngOnInit() {
    this.validationMessage = this.validationMessages
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
      (error) => {
        console.log('cannot retreive error', error);
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
      (error) => {
        console.log('CANNOT GET PERMISSIONS', error);
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
    console.log('herer');
    this.isRoleCreating = true;
    formValue.permissions = this.permissionsToAdd;
    console.log(formValue);
    this.roleMgtService.createRole(formValue).subscribe(
      (response: IRole) => {
        console.log('Response After Create Role', response);
        this.isRoleCreating = false;
        this.createRoleForm.reset();
        this.getRoles();
        $('#createRole').modal('hide');
        // this.alertService.success('Role created successfully', true);
      },
      (error) => {
        this.isRoleCreating = false;
        console.log('Error in Creating Roles', error);
        //  this.alertService.error(error.error.message, false);
        this.isLoading = false;
      }
    );
  }

  updateRole(formValue) {
    this.isRoleCreating = true;
    formValue.permissions = this.permissionToSend;
    console.log('Edit Form Vlaues', formValue);

    this.roleMgtService.updateRole(formValue, this.selectedRole.id).subscribe(
      (response: IRole) => {
        console.log('Response After Update Role', response);
        this.isRoleCreating = false;
        this.updateRoleForm.reset();
        this.getRoles();
        $('#updateRole').modal('hide');
        // this.alertService.success('Role created successfully', true);
      },
      (error) => {
        this.isRoleCreating = false;
        console.log('Error in Updating Roles', error);
        //  this.alertService.error(error.error.message, false);
        this.isLoading = false;
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
      name: [
        { value: '', disabled: true },
        Validators.compose([Validators.required]),
      ],
      // description: ["", Validators.compose([Validators.required])],
    });
  }
}
