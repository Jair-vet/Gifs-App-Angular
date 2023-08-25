import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {
    
    private _tagsHistory: string[] = []
    
    constructor() { }

    get tagsHistory() {
        return [...this._tagsHistory]
    }

    private organizedHistory( tag: string ){
        tag = tag.toLocaleLowerCase()

        if( this._tagsHistory.includes(tag) ){ // Si el TagHistory incluye el nuevo tag
            this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag ) // Filtro si hay uno igual
        }
        this._tagsHistory.unshift( tag ) // Inserto al inicio
        this._tagsHistory = this.tagsHistory.slice(0,10)

    }

    searchTag( tag: string ):void{

        if( tag.length === 0) return
        this.organizedHistory(tag)

        // this._tagsHistory.unshift( tag )  // Agregar el Tag
        // console.log( this.tagsHistory );
    }
}