import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {
    
    private _tagsHistory:    string[] = []
    private apiKey:          string = '9x5Taajs8y4mn8aunBYfY6ECoUi4JVa7'
    private serviceUrl:      string = 'https://api.giphy.com/v1/gifs';
    
    constructor( private http: HttpClient ) { }

    get tagsHistory() {
        return [...this._tagsHistory]
    }

    // Si ya existe el tag entonces lo borramos del Final y lo insertamos al Inicio
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

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag)

        this.http.get(`${ this.serviceUrl }/search`, { params })
            .subscribe( resp => {
                console.log(resp);
                
            })

        // const resp = fetch('https://api.giphy.com/v1/gifs/search?api_key=9x5Taajs8y4mn8aunBYfY6ECoUi4JVa7=valorant&limit=10')

        // this._tagsHistory.unshift( tag )  // Agregar el Tag
        // console.log( this.tagsHistory );
    }
}