import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
    
    public gifList: Gif[] = []

    private _tagsHistory:    string[] = []
    private apiKey:          string = '9x5Taajs8y4mn8aunBYfY6ECoUi4JVa7'
    private serviceUrl:      string = 'https://api.giphy.com/v1/gifs';
    
    constructor( private http: HttpClient ) { 
        this.loadLocalStorage()
    }

    get tagsHistory() {
        return [...this._tagsHistory]
    }

    private saveLocalStorage():void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory))
    }

    private loadLocalStorage():void {
        if( !localStorage.getItem('history') ) return // No Tenemos data

        this._tagsHistory = JSON.parse( localStorage.getItem('history')! )
    }

    // Si ya existe el tag entonces lo borramos del Final y lo insertamos al Inicio
    private organizedHistory( tag: string ){
        tag = tag.toLocaleLowerCase()

        if( this._tagsHistory.includes(tag) ){ // Si el TagHistory incluye el nuevo tag
            this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag ) // Filtro si hay uno igual
        }
        this._tagsHistory.unshift( tag ) // Inserto al inicio
        this._tagsHistory = this.tagsHistory.slice(0,10)
        this.saveLocalStorage()

    }

    searchTag( tag: string ):void{

        if( tag.length === 0) return
        this.organizedHistory(tag)

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag)

        this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
            .subscribe( resp => {

                this.gifList = resp.data
                // console.log({ gifs: this.gifList});
                
                
            })

        // const resp = fetch('https://api.giphy.com/v1/gifs/search?api_key=9x5Taajs8y4mn8aunBYfY6ECoUi4JVa7=valorant&limit=10')

        // this._tagsHistory.unshift( tag )  // Agregar el Tag
        // console.log( this.tagsHistory );
    }
}