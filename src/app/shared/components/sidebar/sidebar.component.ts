import { Component } from '@angular/core';
import { SearchBoxComponent } from 'src/app/gifs/components/search-box/search-box.component';
import { Gif } from 'src/app/gifs/interfaces/gifs.interfaces';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService: GifsService ) { }
  
  get tags() {
    return this.gifsService.tagsHistory
    
  }
  public gifs: Gif[] = []

  searchTag( tag: string ) {
    this.gifsService.searchTag( tag )
  }
  

}


