import { UserDataService } from "@angular-monorepo/services";
import { NgOptimizedImage } from "@angular/common";
import { Component, inject } from "@angular/core";

@Component({
  selector: "app-user-photo",
  imports: [NgOptimizedImage],
  templateUrl: "./user-photo.component.html",
  styleUrl: "./user-photo.component.scss",
})
export class UserPhotoComponent {
  protected readonly _userDataService = inject(UserDataService);
  defaultPhoto =
    "https://flower.elevateegy.com/uploads/8627d52c-f36a-4613-bade-c16244d9bad1-High_resolution_wallpaper_background_ID_77701218231.jpg";

  ngOnInit() {
    this._userDataService.loadUserInfo();
  }

  getInitials(): string {
    const username = this._userDataService.userName()?.trim() || "";
    const parts = username.split(" ").filter(Boolean);

    const first = parts[0]?.charAt(0)?.toUpperCase() || "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.charAt(0)?.toUpperCase() : "";

    return `${first}${last}`;
  }
}
