import { Component, signal , inject, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Speech} from './speech';

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
      localStorage.setItem('speakeasy-notes', JSON.stringify(this.savedNotes()));
    });
  }

  toogleRecording(){
    if(this.speech.isListening()){

    }
  }

  saveNote(){
    if(!this.speech.text()) return;

    const newNote: Note= {
      id: crypto.randomUUID(),
      content: this.speech.text(),
      date: new Date()
    };

    this.savedNotes.update(notes => [newNote,...notes]);
    this.speech.text.set('');
  }

  deleteNote(id:string){
    this.savedNotes.update(notes=> notes.filter(n=> n.id !== id));
  }

  copyNote(text:string){
    navigator.clipboard.writeText(text);
    alert('copied');
  }

  loadNotes(): Note[]{
    const data = localStorage.getItem('speackeasy-notes');
    return data? JSON.parse(data) : [];
  }
}
