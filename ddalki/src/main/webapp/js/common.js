





/*움직이는 배경*/
/* Define Background Class */ 

/*백그라운드, 생성자 함수와 메서드*/
function Background(assetObj,canvasElement){
   this.assetObj = assetObj; 
   this.canvasSize = {width: canvasElement.width, height: canvasElement.height};   //Canvas Size
   this.canvasContext = canvasElement.getContext('2d');  //Canvas Context
   this.spritesX = 0;                                                                                       //Image X Position 
}
 
Background.prototype.startAnimation = function(){ 
  //Clear Canvas  
  this.canvasContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
 
  //Draw Background Image
  var drawX = this.spritesX * this.assetObj.bgImage.width;
  var drawWidth = this.assetObj.bgImage.width - drawX;
  this.canvasContext.drawImage(this.assetObj.bgImage, 
                    drawX, 0, drawWidth, this.assetObj.bgImage.height, 
                    0, 0, drawWidth, this.assetObj.bgImage.height);     
    
   //Fill Cut Out area
  if(drawWidth < this.assetObj.bgImage.width) {
        var fillDrawWidth = this.assetObj.bgImage.width - drawWidth;
        this.canvasContext.drawImage(this.assetObj.bgImage, 
                          0, 0, fillDrawWidth, this.assetObj.bgImage.height, 
                          drawWidth, 0, fillDrawWidth, this.assetObj.bgImage.height);
    } 
    
    this.spritesX = (this.spritesX + this.assetObj.spritesRate) % 1;
} 

/*기타 프로그램 로직*/
var fps = 30;            //frame per second
var background;        //Character Instance 
var canvasElement;    //Canvas Element
var asset;                 //Asset Image Ojbect    
 
function init(){ 
 //canvasElement = document.getElementsByTagName("body"); 
 canvasElement = document.getElementById("wow"); 
  
 //Create Asset Image Ojbect
 asset = new Image(); 
 asset.src = '../img/bg.jpg';       
 //Assign Imgae Load Event
 asset.onload = onAssetLoadComplete;  
}
 
function onAssetLoadComplete(){ 
 //Create Custom Asset Object 
 var assetObj = {bgImage:asset, spritesRate:0.01}; 
 //Create Character Instance    
 background = new Background(assetObj,canvasElement);
 //Run Game Loop     
 setInterval(animationLoop, 1000 / fps); 
}
function animationLoop(){
  background.startAnimation();
}
 
window.addEventListener("load", init, false);