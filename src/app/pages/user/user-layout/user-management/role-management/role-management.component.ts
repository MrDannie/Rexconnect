import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  isRoleCreating: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.isLoading = false;
    this.isPermissionsLoading = false;
    this.isRoleCreating = false;
    this.initializeForm();
  }

  makeRoleActive(parameter) {}

  clearSelection() {}

  addPermission(perameter) {}

  updatePermission(Parameter) {}

  createRole(parameter) {}

  updateRole(parameter) {}

  initializeForm() {
    this.createRoleForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      // description: ["", Validators.compose([Validators.required])],
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
