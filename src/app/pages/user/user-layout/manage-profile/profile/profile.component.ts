import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/helpers/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  permissions: any;
  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.getPermisions();
  }
  getPermisions() {
    this.permissions = this.storageService.getPermissions();
  }
}
