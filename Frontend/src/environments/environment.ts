import { IEnvironment } from "./environment.interface";

export function mergeNewSetting(key: any, value: any): void { 
    environment[key as keyof typeof environment] = value;
}

export let environment: IEnvironment = {
    apiUrl: 'https://localhost:44309/api/',
    assestPath: '/assets'
}

