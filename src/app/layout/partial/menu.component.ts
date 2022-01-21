import { Component, Input } from '@angular/core';

@Component({
  selector: 'layout-menu',
  template: `<ul class="my-menu" nz-menu [nzMode]="mode" [nzTheme]="theme" [nzInlineCollapsed]="isCollapsed">
  <ng-container *ngTemplateOutlet="menuTpl; context: { $implicit: menus }"></ng-container>
  <ng-template #menuTpl let-menus>
    <ng-container *ngFor="let menu of menus">
      <li *ngIf="!menu.children" nz-menu-item nzMatchRouter [nzDisabled]="menu.disabled">
        <a [routerLink]="menu.link">
          <i nz-icon [nzType]="menu.icon" *ngIf="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </a>
      </li>
      <li
        *ngIf="menu.children"
        nz-submenu
        nzMatchRouter
        [nzOpen]="menu.open"
        [nzTitle]="menu.title"
        [nzIcon]="menu.icon"
        [nzDisabled]="menu.disabled"
      >
        <ul>
          <ng-container *ngTemplateOutlet="menuTpl; context: { $implicit: menu.children }"></ng-container>
        </ul>
      </li>
    </ng-container>
  </ng-template>
  </ul>`,
})
export class LayoutMenuComponent {
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() mode: 'vertical' | 'horizontal' | 'inline' = 'inline';
  @Input() isCollapsed: boolean = false
  @Input() menus: any[] = [];
}



