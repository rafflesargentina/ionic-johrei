import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';
import {Howl} from 'howler'
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
  file: MediaObject
  player: Howl = null;
  isPlaying = false;
  loading = false;
  progress = 0;

  @ViewChild('range',{static:false}) range:IonRange;
  constructor(
    private media: Media
  ) { 
    
  }

  ngOnInit() {
   /* console.log(this.track.url)
    this.player = new Howl({
      src:[this.track.url],
      html5:true,
      onplay:()=>{
        this.loading = false;
        this.isPlaying = true;
        this.updateProgress()
      },
      onend:()=>{
        console.log('onend')
      }
    })*/
    this.file = this.media.create(this.track.url);

    console.log(this.track.url)

    this.file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes


    this.file.onSuccess.subscribe(() => console.log('Action is successful'));

  this.file.onError.subscribe(error => console.log('Error!', error));

  let duration = this.file.getDuration();
  
  this.file.getCurrentPosition().then((position) => {
    console.log(position);
    
    this.progress = (position / duration) *100 || 0;
  });


  }

  
  tooglePlayer(pause){
    this.isPlaying = !pause;
    if(pause){
      this.loading = false;
      this.file.play();
    }
    else{
      this.loading = true;
      //this.player.play();
      this.file.stop();
    }
  }

  next(){

  }

  prev(){

  }

  seek(){
    console.log("!!!!")
    let newValue = +this.range.value;
    let duration = this.file.getDuration();
  //  this.player.seek(duration * (newValue/100));

    this.file.seekTo(duration * (newValue/100));

  }

 /* updateProgress(){
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) *100 || 0;
    setTimeout(()=>{
      this.updateProgress();
    },1000)
  }*/

}
