import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Page } from 'src/app/models/page.enum';

@Component({
  selector: 'app-bottom-header',
  templateUrl: './bottom-header.component.html',
  styleUrls: ['./bottom-header.component.scss'],
})
export class BottomHeaderComponent implements OnInit {

  @Input() activePage;
  navigationItems: NavigationItem[] = [
    {
      page: Page.control,
      url: 'control',
      icon: 'game-controller-outline',
    },
    {
      page: Page.home,
      url: 'home',
      icon: 'home-outline',
    },
    {
      page: Page.settings,
      url: 'settings',
      icon: 'settings-outline',
    },
  ];

  get page() { return Page; }

  constructor(
    private navController: NavController
  ) {}

  ngOnInit() {
    this.activePage = Page.home;
  }

  navigate(url: string, page: Page) {
    this.navController.navigateForward([url]);
    this.activePage = page;
  }

}

export interface NavigationItem {
  page: Page;
  url: string;
  icon: string;
}
