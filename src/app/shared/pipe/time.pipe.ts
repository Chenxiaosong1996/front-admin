declare var moment: any;
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'moment'
})
export class TranslateTimePipe implements PipeTransform {
    transform(time: string | Date, reg: string = 'YYYY-MM-DD HH:mm') {
        return moment(time).format(reg)
    }
}