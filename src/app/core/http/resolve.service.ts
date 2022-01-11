import { environment } from '@env/environment';

export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
    return key in object;
}

export function resolveUrl(version: string | number | symbol) {
    if (isValidKey(version, environment.api)) {
        return environment.api[version]
    } else {
        return environment.api['v1']
    }
}

export function defaultUrl() {
    return resolveUrl(environment.api.default)
}

export function resolveUrlV2() {
    return resolveUrl('v2')
}