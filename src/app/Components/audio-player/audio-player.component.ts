import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';
import {Howl} from 'howler'

export interface Track{
  name:string;
  url:string;
}

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {

  @Input() track:Track = null;

  public isSeeking = false;

  player: Howl = null;
  isPlaying = false;
  loading = false;
  progress = 0;

  @ViewChild('range',{static:false}) range:IonRange;
  constructor() { 
    
  }

  ngOnInit() {
    
    this.player = new Howl({
      src:[this.track.url],
      html5:true,
      volume: 0.5,
      onplay:()=>{
        this.loading = false;
        this.isPlaying = true;
        this.updateProgress()
      },
      onend:()=>{
        console.log('onend')
      }
    })

    console.log(this.track.url)
    console.log("volumen seteado a:"+this.player.volume())
  }

  
  tooglePlayer(pause){
    this.isPlaying = !pause;
    if(pause){
      this.loading = false;
      this.player.pause();
    }
    else{
      this.loading = true;
      this.player.play();
    }
  }

  next(){

  }

  prev(){

  }

  seeking(){
    this.isSeeking= true;
  }

  seek(){
    this.isSeeking= false;
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue/100));
  }

  updateProgress(){
    if(!this.isSeeking){
      let seek = this.player.seek();
      this.progress = (seek / this.player.duration()) *100 || 0;
      console.log("Progreso: "+ this.progress)
      setTimeout(()=>{
        this.updateProgress();
      },1000)
    }
    
  }

}
