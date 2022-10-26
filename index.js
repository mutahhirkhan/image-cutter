const {imageCutter} = require("./SubImages");
const {combineImagesToPDF} = require("./PDF");
const { generateSequence, getArrayOfSubImagesName } = require("./Numbering");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
	try {
        const gap = 14;
        let start = 1;
        let {end} = generateSequence(gap, start);
        
        //generate names
        let SubImagesName = getArrayOfSubImagesName(start, end)

        // for(let i = 1; i <= 35; i++){
        //     let {end} = generateSequence(gap, start);
        //     console.log(start, end);
        //     //cut images
        //     await imageCutter(gap,  start, end, `input/check${i}.jpg`)
        //     start = end + 1;
        //     console.log(i);
        // }
        // start = 1

        await delay(500)
        
        //give names to images in array
        SubImagesName = getArrayOfSubImagesName(start, 480)
        console.log(SubImagesName);
		await combineImagesToPDF(SubImagesName, "combined1.pdf")
        
        // SubImagesName = getArrayOfSubImagesName(57, 112)
        // console.log(SubImagesName);
		// await combineImagesToPDF(SubImagesName, "combined2.pdf")
        // SubImagesName = getArrayOfSubImagesName(113, 168)
        // SubImagesName = getArrayOfSubImagesName(start, end)

        //convert images to combined PDF

		console.log("ALL DONE");
	} catch (error) {
		console.log(error);
	}
})();

module.exports = { delay };