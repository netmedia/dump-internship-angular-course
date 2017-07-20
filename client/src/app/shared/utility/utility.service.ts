import { Injectable }           from '@angular/core';
import { ConfigService }        from '../../app-config.service';
import { Observable }           from 'rxjs/Rx';

@Injectable()
export class UtilService {

  constructor(
    private configService: ConfigService
  ) {}

  public setYearOffset(yearOffset: number): Date {
    return new Date(new Date().setFullYear(new Date().getFullYear() + yearOffset))
  }
}