import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';
import {Howl} from 'howler'
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';

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
  player: Howl = null;
  isPlaying = false;
  loading = false;
  progress = 0;

  @ViewChild('range',{static:false}) range:IonRange;
  constructor(
    private nativeAudio: NativeAudio,
    private media: Media
  ) { 

    
    
  }

  ngOnInit() {

    this.nativeAudio.preloadSimple('uniqueId1', this.track.url).then(()=>{
      console.log("OK")
    }, (err)=>{
      console.log(err)
    });

  }

  ionViewDidEnter(){
    

  }

  
  tooglePlayer(pause){
    this.isPlaying = !pause;
    if(pause){
      this.loading = false;
      this.nativeAudio.play('uniqueId1').then(()=>{
        console.log("playing")
      },err=>{
        console.log("error")
      });
    }
    else{
      this.loading = true;
      //this.player.play();
      this.nativeAudio.stop('uniqueId1').then(()=>{
        console.log("playing")
      },err=>{
        console.log("error")
      });
    }
  }

  next(){

  }

  prev(){

  }

  howlPlay(){

    const sound = new Howl({ src: this.track.url, usingWebAudio: false, html5: true, mute: false, loop: true, webAudio: false, volume: 1, })

    sound.play();
  }

  mediaPlay(){
    const file: MediaObject = this.media.create('file.mp3');
    file.play();
  }

  

}
