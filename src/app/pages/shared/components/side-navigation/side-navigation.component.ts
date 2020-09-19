import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  openNav() {
    // document.getElementById('toggler').style.transition = 'left ease-in 0.4s';
    document.getElementById('mySidebar').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
    document.getElementById('forward').style.display = 'none';
    document.getElementById('switcher').style.display = 'block';

    document.getElementById('toggler').style.left = '-3rem';
    document.getElementById('mySidebar').style.transition =
      '0.3s ease-in-out all';
    document.getElementById('toggler').style.transition =
      '0.01s ease-in-out all';

    document.getElementById('toggler').style.background =
      "#ffffff url('../../../../../assets/icons/chevron_left.svg') no-repeat center";
    //document.getElementById('menu_list').style.transition = 'ease-in 8s';
    document.getElementById('menu_list').style.display = 'flex';
    document.getElementById('sidebar_logo').style.display = 'flex';
    document.getElementById('backward').style.display = 'block';
  }

  closeNav() {
    // document.getElementById('toggler').style.transition = 'left ease-in s';
    document.getElementById('mySidebar').style.width = '3rem';
    document.getElementById('toggler').style.left = '-4rem';
    document.getElementById('switcher').style.display = 'none';
    document.getElementById('toggler').style.background =
      "#ffffff url('../../../../../assets/icons/chevron_right.svg') no-repeat center";
    //setTimeout(() => {
    // document.getElementById('menu_list').style.display = 'none';
    // document.getElementById('sidebar_logo').style.display = 'none';
    //  }, 400);
    document.getElementById('main').style.marginLeft = '4rem';
    document.getElementById('backward').style.display = 'none';
    document.getElementById('forward').style.display = 'block';
    document.getElementById('mySidebar').style.transition =
      '0.2s ease-in-out all';
    document.getElementById('toggler').style.transition =
      '0.01s ease-in-out all';
  }
}
