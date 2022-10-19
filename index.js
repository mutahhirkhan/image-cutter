//import jimp
const jimp = require("jimp");

///create new sub-images of the original image, this script only cut vertically, where noOfSubImages is the noOfRows 
///@param: noOfSubImages: number of sub-images to be created
///@param: imageToLoad: name of the image to be loaded
///@param: startingNameNumber: starting number of the sub-image name
///@param: EndingNameNumber: ending number of the sub-image name
///@return: directly write to current directory
async function imageCutter(noOfSubImages = 13, imageToLoad = "img.jpg", startingNameNumber = 1, EndingNameNumber = 13) {
	//throw error if counting is not correct
	//minus 1 in noOfSubimages because we are also subtracting startingNameNumber e.g.
	//if 50 images have been done, and need to generate 13 more images, then startingNameNumber=51, EndingNameNumber=63
	//so noOfSubImages=13 then (63-51 == 13-1)
	if (EndingNameNumber - startingNameNumber != noOfSubImages - 1) throw new Error("number with sub-images counts mismatch");

	//load image to cut
	let image1 = await jimp.read(imageToLoad);

	let imageArr = [];
	//create array of images clones till noOfSubImages times
	for (let i = 0; i < noOfSubImages; i++) {
		imageArr.push(image1.clone());
	}

	//get height and width of output single image, 1 pixel is subtracted due to 0 -> 1 indexing
	//single image height will be total height divided by number of sub-images
	let singleImageHeight = parseInt(image1.getHeight() / noOfSubImages);
	let singleImageWidth = parseInt(image1.getWidth());

	//crop these images into defined equale parts
	///@params: x, y, width, height
	///@param x: starting x-axis position of the crop
	///@param y: starting y-axis position of the crop
	///@param width: width of the cropped image
	///@param height: height of the cropped image
	imageArr.forEach((img, index) => {
		img.crop(0, singleImageHeight * index, singleImageWidth, singleImageHeight);
	});

	//write the cropped images to current directory
	imageArr.forEach((img, index) => img.write(`img${startingNameNumber + index}.jpg`));
}

(async () => {
	try {
		await imageCutter(14, "img.jpg", 51, 64);
		console.log("DONE");
	} catch (error) {
		console.log(error);
	}
})();
