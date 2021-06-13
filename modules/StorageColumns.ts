export class StorageColumns{
    constructor(){
    }
    public static addColumnsToStorage(columns: any){
    window.localStorage.setItem('columns', JSON.stringify(columns))
    }
    public static getColumnsFromStorage(){
       return JSON.parse(window.localStorage.getItem('columns')!)
    }
    public static updateColumnFromStorage(columns: any){
        window.localStorage.setItem('columns', JSON.stringify(columns))
    }
}