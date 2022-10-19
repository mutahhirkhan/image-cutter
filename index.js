//import jimp
const jimp = require('jimp');
//load jimp
async function fn() {

    let image1 = await jimp.read('img.jpg');
    let image2 = image1.clone();
    let image3 = image1.clone();
    let image4 = image1.clone();


    console.log('starting postion',parseInt(((image1.getHeight()-1)/4)*1))
    console.log('starting postion',parseInt(((image1.getHeight()-1)/4)*2))
    console.log('starting postion',parseInt(((image1.getHeight()-1)/4)*3))
    console.log('starting postion',parseInt(((image1.getHeight()-1)/4)*4))
    console.log("height:", image1.getHeight());
    
    let singleImageHeight = parseInt((image1.getHeight()-1)/4);
    let singleImageWidth = image1.getWidth();
    //crop these images into 4 equale parts
    
    image1.crop(0, 0, parseInt(singleImageWidth), singleImageHeight);
    image2.crop(0, parseInt(((image2.getHeight()-1)/4)*1), singleImageWidth, singleImageHeight);
    image3.crop(0, parseInt(((image3.getHeight()-1)/4)*2), singleImageWidth, singleImageHeight);
    image4.crop(0, parseInt(((image4.getHeight()-1)/4)*3),singleImageWidth, singleImageHeight);
        
    
    image1.write('img1c.jpg');
    image2.write('img2c.jpg');
    image3.write('img3c.jpg');
    image4.write('img4c.jpg');
}
(async () => {

    await fn()
})()