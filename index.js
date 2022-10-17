startRecord.onclick = e => {
    startRecord.style.display = "none";
    stopRecord.style.display = "block";
  
  
    // This will prompt for permission if not allowed earlier
    navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {
        audioChunks = []; 
  
        rec = new MediaRecorder(stream);
  
        rec.ondataavailable = e => {
          audioChunks.push(e.data);
  
          if (rec.state == "inactive"){
  
            let blob = new Blob(audioChunks,{type:'audio/ogg; code=opus'});
            
            recordedAudio.src = URL.createObjectURL(blob);
            recordedAudio.controls=true;
            recordedAudio.autoplay=false;
            audioDownload.href = recordedAudio.src;
            audioDownload.download = 'mp3';
         }
        }
      rec.start();
      })
      .catch(e=>console.log(e));
  }

  stopRecord.onclick = e => {
    startRecord.style.display = "none";
    stopRecord.style.display = "none";
    playRecord.style.display = "block";
    removeAudio.style.visibility = "visible";
    audioDownload.style.visibility = "visible";
    rec.stop();
  }
  
  removeAudio.onclick = e => {
    recordedAudio.setAttribute("src", "");
    playRecord.style.display = "none";
    startRecord.style.display = "block";
    removeAudio.style.visibility = "hidden";
    audioDownload.style.visibility = "hidden";
  }
  
// Botão de play
  playRecord.onclick = e => {
    recordedAudio.play();
    document.getElementById("playRecord").classList.add("itsPlaying");
    setTimeout(() => {
      document.getElementById("playRecord").classList.remove("itsPlaying");
    }, 3000);
  }


