import { Injectable,signal } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class Speech {

  recognition: any;
  isListening= signal(false);
  text = signal('');
  error =  signal('');

  private initialized = false;



  initRecognition(){
    if ('webkitSpeechRecognition' in window){
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous= true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart=()=> this.isListening.set(true);
      this.recognition.onend=()=>{ this.isListening.set(false);

        if(this.initialized){
          this.recognition.start();
        }
      };

      this.recognition.onerror = (event:any)=>{
        this.error.set(event.error);
        this.isListening.set(false);
      };

      this.recognition.onresult = (event:any)=>{
        let interimTranscript = '';
        let finalTranscript ='';

        for(let i=event.resultIndex; i<event.results.length; ++i){
          if(event.results[i].isFinal){
            finalTranscript+= event.results[i][0].transcript;

          }else{
            interimTranscript+=event.results[i][0].transcript;
          }
        }

        this.text.set(finalTranscript || interimTranscript);
      };

    }else{
      this.error.set('Browser Not Supported');


    }
  }

  start(){
    if(this.isListening()) return;

    if(!this.recognition){
      this.initRecognition();
    }

    this.text.set('');
    this.initialized=true;
    this.recognition?.start();
  }
  stop(){
    this.initialized=false;
    this.recognition?.stop();
  }
}
