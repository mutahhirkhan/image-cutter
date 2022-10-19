//import jimp
const jimp = require('jimp');

async function imageCutter(noOfSubImages = 13) {
    //load image to cut
    let image1 = await jimp.read('img.jpg');
    let imageArr = [];
    //create array of images clones till noOfSubImages times
    for (let i = 0; i < noOfSubImages; i++) {
        imageArr.push(image1.clone());
    }

    //get height and width of output single image, 1 pixel is subtracted due to 0 -> 1 indexing
    //single image height will be total height divided by number of sub-images
    let singleImageHeight = parseInt((image1.getHeight())/noOfSubImages);
    let singleImageWidth = parseInt(image1.getWidth());

    //crop these images into defined equale parts
    ///@params: x, y, width, height
    ///@param x: starting x-axis position of the crop
    ///@param y: starting y-axis position of the crop
    ///@param width: width of the cropped image
    ///@param height: height of the cropped image
    imageArr.forEach((img, index) => {
        img.crop(0, (singleImageHeight*index), singleImageWidth, singleImageHeight);
    })

    //write the cropped images to current directory
    imageArr.forEach((img, index) => {
        img.write(`img${index+1}-cropped.jpg`)
    })
}

(async () => {
    try {
        await imageCutter(13)
        console.log("DONE");
    } catch (error) {
        console.log(error)
    }
})()