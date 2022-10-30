const {imageCutter} = require("./SubImages");
const {combineImagesToPDF} = require("./PDF");
const { generateSequence, getArrayOfSubImagesName } = require("./Numbering");
const { usingPDFActions } = require("./Combine");
const fs  = require("fs");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


///@NOTICE 
// scrollshot # 351 and 352 remains in input folder

(async () => {
	try {
        
        let gap = 14;
        let start = 1;
        let end;
        function increaseStartEnd() {
            start += gap
            end += gap
        }
        // let {end} = generateSequence(gap, start);
        
        //generate names
        // let SubImagesName = getArrayOfSubImagesName(start, end)

        ///NOTICE: THIS IS THE ONLY LINE THAT NEEDS TO BE CHANGED
        //we had 352 images, so 14 sub-images of 1 image.
        //352 * 14 = 4928
        //we want to generate 10 PDFs, so 4928 / 10 = 492.8 images per PDF
        
        //35 scroll shots divided into 14 sub-images of each then all those sub-images 
        //combined into a single PDFvwhich has 4 images on each page
        //this loop will run the total number of scrollshots i.e. 352
        for(let i = 1; i <= 350; i++){
            //returns start, end and gap
            let {end} = generateSequence(gap, start);
            console.log('start',start,' | end',end);
            //cut images

            //pick image one by one and cut into defined parts
            await imageCutter(gap,  start, end, `input/image${i}.jpg`)
            start = end + 1;
            // console.log(i);
        }
        //resetting start and gap for combination 
        start = 1
        gap = 490
        end = gap

        //delaying to avoide any inconsistency while picking sub-images for PDF
        await delay(500)
        let tempArr = [1,2,3,4,5,6,7,8,9,10]
        //================================================================================================
        if (!fs.existsSync('./PDF')){
            fs.mkdirSync('./PDF');
        }
        for(let i = 1; i <= tempArr.length; i++) {
            //give names to images in array
            let SubImagesName = getArrayOfSubImagesName(start, end)
            console.log('start',start,' | end', end)
            increaseStartEnd()
            await combineImagesToPDF(SubImagesName, `PDF/${i}.pdf`)            
        }
        console.log("PDF MERGE DONE")
        console.log('STARTING MARGIN');
        
        //================================================================================================
        if (!fs.existsSync('./FINAL')){
            fs.mkdirSync('./FINAL');
        }
        // add margins to generated PDFs
        for(let i = 9; i <= tempArr.length; i++) {
            await usingPDFActions(`PDF/${i}.pdf`, `FINAL/${i}.pdf`);
        }

		console.log("ALL DONE");
	} catch (error) {
		console.log(error);
	}
})();

module.exports = { delay };