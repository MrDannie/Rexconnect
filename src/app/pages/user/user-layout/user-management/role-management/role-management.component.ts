import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'protractor';
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
  selectedRole: any = {};
  isLoading;
  allPermissions;
  createRoleForm: FormGroup;
  updateRoleForm: FormGroup;
  isPermissionsLoading: boolean;
  isRoleCreating: boolean;
  permissionChecked: boolean;
  // selectedPermissions: any[] = [];
  selectedPermissionsToAdd: any = [];
  permissionsToUpdate: any = [];
  validationMessage: any;
  deletingRole: boolean;

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
    $('#updateModal').modal({
      backdrop: 'static',
      keyboard: false,
    });
    // this.selectedRole = {};
    this.isLoading = false;
    this.isPermissionsLoading = false;
    this.isRoleCreating = false;

    this.initializeForm();
    this.selectedPermissionsToAdd = [];

    this.allRoles = [];
    this.allPermissions = [];

    this.getAllPermissions();
    this.getRoles();

    this.permissionChecked = false;
    console.log('PErmisssion Array', this.selectedPermissionsToAdd);
  }

  getRoles() {
    this.isLoading = true;

    this.roleMgtService.getAllRoles().subscribe(
      (response) => {
        this.allRoles = response['content'];
        this.makeRoleActive(this.allRoles[0]);
        this.isLoading = false;
        console.log('ALL ROLES GOTEEN NOW', this.allRoles);
      },
      (e) => {
        this.isLoading = false;
        this.errorHandler.customClientErrors(
          'Failed to retrieve roles',
          e.error.error.code,
          e.error.error.responseMessage
        );
      }
    );
  }

  getAllPermissions() {
    this.isLoading = true;

    this.roleMgtService.getAllPermissions().subscribe(
      (response) => {
        console.log('GETALLPERMISIONS', response);

        this.allPermissions = response;
        this.isLoading = false;
      },
      (e) => {
        this.isLoading = false;
        this.errorHandler.customClientErrors(
          'Failed to retrieve permissions',
          e.error.error.code,
          e.error.error.responseMessage
        );
      }
    );
  }

  makeRoleActive(role: any) {
    this.permissionChecked = false;
    this.selectedPermissionsToAdd = [];
    this.allPermissions.forEach((genPerm) => {
      document.getElementById(genPerm)['checked'] = false;
    });

    this.selectedRole = role;

    this.selectedPermissionsToAdd = this.selectedRole.permissions;

    this.updateRoleForm.controls['name'].setValue(this.selectedRole.name);

    if (this.selectedRole.permissions.length > 0) {
      this.selectedRole.permissions.forEach((perm) => {
        this.allPermissions.forEach((genPerm) => {
          if (genPerm === perm) {
            document.getElementById(perm)['checked'] = true;
          }
        });
      });
    }
  }

  createRole(formValue) {
    console.log(
      'Selct permissions length',
      this.selectedPermissionsToAdd.length
    );

    if (this.selectedPermissionsToAdd.length < 1) {
      this.alertService.info('Cant create role with empty permissions', true);
      return;
    }

    this.isRoleCreating = true;
    formValue.permissions = this.selectedPermissionsToAdd;
    this.roleMgtService.createRole(formValue).subscribe(
      (response: IRole) => {
        this.isRoleCreating = false;

        // Empty array
        this.selectedPermissionsToAdd = [];
        this.createRoleForm.reset();

        this.getRoles();
        $('#createRole').modal('hide');

        this.alertService.success('Role Created Successfully');
      },
      (e) => {
        this.isRoleCreating = false;
        this.isLoading = false;
        this.errorHandler.customClientErrors(
          'Error occured in creating role',
          e.error.error.code,
          e.error.error.responseMessage
        );
      }
    );
  }

  updateRole(formValue) {
    if (this.permissionsToUpdate.length < 1) {
      this.alertService.info('Cant update role with empty permissions', true);
      return;
    }

    this.isRoleCreating = true;
    formValue.permissions = this.permissionsToUpdate;

    this.roleMgtService.updateRole(formValue, this.selectedRole.id).subscribe(
      (response: IRole) => {
        this.isRoleCreating = false;
        this.updateRoleForm.reset();
        this.getRoles();
        $('#updateRole').modal('hide');
        this.alertService.success('Role Updated Successfully');
      },
      (e) => {
        this.isRoleCreating = false;
        this.isLoading = false;
        this.errorHandler.customClientErrors(
          'Error occured in updating role',
          e.error.error.code,
          e.error.error.responseMessage
        );
      }
    );
  }
  clearSelection() {
    if (this.selectedPermissionsToAdd.length > 0) {
      this.allPermissions.forEach((genPerm) => {
        document.getElementById(genPerm)['checked'] = false;
        // console.log("cleared");
      });
      this.selectedPermissionsToAdd = [];
    }
  }

  updatePermission(permission: any) {
    if (this.permissionsToUpdate.includes(permission)) {
      for (let i = 0; i < this.permissionsToUpdate.length; i++) {
        if (this.permissionsToUpdate[i] === permission) {
          this.permissionsToUpdate.splice(i, 1);
        }
      }
    } else {
      this.permissionsToUpdate.push(permission);
    }
    this.permissionChecked = true;
  }

  addPermission(permission: any) {
    if (this.selectedPermissionsToAdd.includes(permission)) {
      for (let i = 0; i < this.selectedPermissionsToAdd.length; i++) {
        if (this.selectedPermissionsToAdd[i] === permission) {
          this.selectedPermissionsToAdd.splice(i, 1);
        }
      }
    } else {
      this.selectedPermissionsToAdd.push(permission);
    }
  }

  editHandler() {
    console.log('SELCTED ROLE', this.selectedRole);

    this.updateRoleForm.setValue({
      name: this.selectedRole.name || '',
    });

    this.clearSelection();
    this.permissionsToUpdate = JSON.parse(
      JSON.stringify(this.selectedRole.permissions)
    );
    if (this.permissionsToUpdate.length > 0) {
      this.permissionsToUpdate.forEach((perm) => {
        this.allPermissions.forEach((genPerm) => {
          if (genPerm === perm) {
            console.log(perm);
            document.getElementById(perm + 'aa')['checked'] = true;
          }
        });
      });
    }
  }

  deleteRole(roleId) {
    this.deletingRole = true;
    console.log('ROLE TO DELTE', roleId);
    this.roleMgtService.deleteRole(roleId).subscribe(
      (response) => {
        console.log('ROLE DELETED', response);
        this.alertService.success('Role Deleted Successfully', true);
        this.getRoles();
        this.deletingRole = false;
        $('#deleteRoleModal').modal('hide');
        console.log('LOVE');
      },
      (error) => {
        this.alertService.error(error);
        this.deletingRole = false;
      }
    );
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
