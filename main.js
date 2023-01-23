function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult)
}

function modelLoaded(){
  console.log("O modelo foi carregado")
}

var previsaoResult = " ";

function gotResult(error, results){
  if (error){
    console.error(error);
  }
  else{
    if (results[0].confidence > 0.5 && (previsaoResult != results[0].label)){
      console.log(results)
      previsaoResult = results[0].label
      falaAPI = window.speechSynthesis;
      data = "O objeto detectado é:"+results[0].label
      utterThis = new SpeechSynthesisUtterance(data)
      falaAPI.speak(utterThis)
      document.getElementById("objetoNome").innerHTML = results[0].label
      document.getElementById("confidence").innerHTML = results[0].confidence.toFixed(2)
    }
  }
}