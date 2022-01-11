import { locales } from './locales';
import { isValidKey } from '@core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'i18n'
})
export class TranslateLocalePipe implements PipeTransform {
    transform(keyname: string | number | symbol, version: string | number | symbol = 'zh-CN') {
        if (isValidKey(version, locales)) {
            if (isValidKey(keyname, locales[version])) {
                return locales[version][keyname] || '';
            } else {
                return '';
            }
        } else {
            return '';
        }
    }
}