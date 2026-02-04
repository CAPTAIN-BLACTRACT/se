import { Component, signal , inject, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Speech} from './speech.ts';

interface Note{
  id: string;
  content: string;
  date: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  speech = inject(Speech);

  savedNotes= signal<Note[]>(this.loadNotes());

  constructor(){
    effect(()=>{
      localStorage.setItem('speakeasy-notes', JSON.stringigy(this.savedNotes()));
    });
  }

  toogleRecording(){
    if(this.speech.isListening()){

    }
  }
}
