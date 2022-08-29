import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly _notificationService: NzNotificationService) { }

  public create(type: string, title: string, content: string = ''): void {
    this._notificationService.create(type, title, content, { nzPlacement: "bottomLeft", nzDuration: 3000 });
  }
}
