export interface IEnvironment { 
    apiUrl: string;
    assestPath: string;
    server?: IAppModuleConfig
}

export interface IAppModuleConfig { 
    isAdmin?: boolean;
    isAnonymous?: boolean;
}