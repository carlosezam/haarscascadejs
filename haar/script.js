
window.onload = function(){
    console.log('onload()')
    let cvutils = new Utils('error-output')

    // callback hell !!
    cvutils.loadOpenCv( function(){

        let cascadeFile = 'haarcascade_frontalface_default.xml';

        cvutils.createFileFromUrl( cascadeFile, cascadeFile, function(){
            setTimeout(function(){
                document.getElementById('loading').style.display = 'none';
                onSetupReady();
            }, 100);
        })
        
    })
}


function onSetupReady(){
    
    let imgElement = document.getElementById("imageSrc")
    let inputElement = document.getElementById("fileInput");
    inputElement.addEventListener("change", (e) => {
      imgElement.src = URL.createObjectURL(e.target.files[0]);
    }, false);

    imgElement.onload = function(){

        let src = cv.imread(imgElement);
        let img = new cv.Mat();
        cv.cvtColor(src,img, cv.COLOR_RGB2GRAY);
        
        let faces = new cv.RectVector();
        let faceCascade = new cv.CascadeClassifier();
        
        faceCascade.load('haarcascade_frontalface_default.xml');
        
        let msize = new cv.Size(0,0);
        
        //faceCascade.detectMultiScale(img, faces, 1.1, 3, 0, msize, msize);
        faceCascade.detectMultiScale(img, faces, 1.1, 3, 0, msize, msize);
        
        for( let i = 0; i < faces.size(); ++i){
            console.log({i});
        }
        cv.imshow('canvasOutput', img);
        src.delete();
        img.delete();
    }
}