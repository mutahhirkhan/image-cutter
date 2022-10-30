// merge PDF's page # 1,2,3,4 into one page and page # 5,6,7,8 into another page
const fs = require("fs");
const { createPDF, addMarginPDF } = require("pdf-actions");
const { Blob } = require("buffer");


async function usingPDFActions(inputFilePath, outputFilePath) {
	//load file
	const img = fs.readFileSync(inputFilePath);
	
	//convert buffer to blob
	const blobFile = new Blob([img]);
	
	//load bloc on package
	const pdfDocument = await createPDF.PDFDocumentFromFile(blobFile);
	//add margins
	let addedMarginFile = await addMarginPDF(pdfDocument, [10, 10, 10, 10]);
	const pdfFile = await addedMarginFile.save();

	//write this to file
	fs.writeFileSync(outputFilePath, pdfFile);
	
	console.log("MARGINING DONE");
}

// usingPDFActions();


module.exports = { usingPDFActions };