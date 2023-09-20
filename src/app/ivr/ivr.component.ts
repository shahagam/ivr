import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-ivr',
  templateUrl: './ivr.component.html',
  styleUrls: ['./ivr.component.css']
})
export class IvrComponent {

  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  private timerInterval: any = null;
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  recording = false;
  audioPlaying = true;
  showRecordButton = true;
  showStopButton = false;
  showDeleteButton = false;
  showStopMessage = false;
  buttonText: string = "Start";
  selectedFrequency: string = 'once-a-day';
  isOpen = false;

  // isOpen = true;

  openSheet() {
    this.isOpen = true;
  }

  closeSheet() {
    this.isOpen = false;
  }


  

  async toggleRecording() {
    if (this.recording) {
      // If recording, stop recording and show delete button
      this.stopRecording();
      this.showStopButton = false;
      this.showDeleteButton = true;
    } else {
      // If not recording, start recording and hide delete button
      await this.startRecording();
      this.showRecordButton = false;
      this.showStopButton = true;
      this.showDeleteButton = false;
    }
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioElement.nativeElement.src = URL.createObjectURL(audioBlob);
        this.audioPlaying = false;
      };

      this.mediaRecorder.start();
      this.recording = true;
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.recording) {
      this.mediaRecorder.stop();
      this.recording = false;
      clearInterval(this.timerInterval);      
      this.showStopMessage = true;
    }
  }

  playAudio() {
    if (this.audioElement.nativeElement.src && !this.audioPlaying) {
      this.audioElement.nativeElement.play();
      this.audioPlaying = true;
    }
  }


  deleteAudio() {

    this.showRecordButton = true;
    this.showStopButton=false;

  }

  
}
