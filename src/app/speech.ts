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


  constructor(){
    this.initRecognition();
  }

  initRecognition(){
    if ('webkitSpeechRecognition' in window){
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continue= true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onStart()=()=> this.isListening.set(true);
      this.recognition.onEnd()=()=> this.isListening.set(false);

      this.recognition.onerror = (event:any)=>{
        this.error.set(event.error);
        this.isListening.set(false);
      };

      this.recognition.onresult = (event:any)=>{
        let interinTranscript = '';
        let finalTranscript ='';

        for(let i=event.resultIndex; i<event.results.length; ++i){
          if(event.results[i].isFinal){
            finalTranscript+= event.results[i][0].transcript;

          }else{
            interimResults+= event.results[i][0].transcript;
          }
        }

        this.text.set(finalTranscript || interinTranscript);
      };

    }else{
      this.error.set('Browser Not Supported');


    }
  }

  start(){
    this.text.set('');
    this.recognition?.start();
  }
  stop(){
    this.recognition?.stop();
  }
}
