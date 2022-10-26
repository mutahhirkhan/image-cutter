// merge PDF's page # 1,2,3,4 into one page and page # 5,6,7,8 into another page
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { createPDF, addMarginPDF } = require("pdf-actions");

function usingPDFKIT() {
	const doc = new PDFDocument();
	const pdfDoc = new PDFDocument();

	const input = fs.createReadStream("combined.pdf");
	const output = fs.createWriteStream("output.pdf");
	input.pipe(output);

	pdfDoc.on("pageAdded", () => {
		pdfDoc.switchToPage(pdfDoc.pageCount - 1);
		pdfDoc.image("combined.pdf", {
			fit: [pdfDoc.page.width, pdfDoc.page.height],
			align: "center",
			valign: "center",
            
		});
	});

	pdfDoc.on("end", () => {
		output.end();
	});

	pdfDoc.end();

	console.log("DONE");
}

async function usingPDFActions() {
	var img = fs.readFileSync('combined.pdf');

	// const input = fs.createReadStream("combined.pdf");
	const pdfDocument = await createPDF.PDFDocumentFromFile(img);
	// let doc = await addMarginPDF(pdfDocument, [10, 10, 10, 10]);
	// doc.pipe(fs.createWriteStream("output.pdf"));
	
	console.log("DONE");
}

usingPDFActions();


// usingPDFKIT()
module.exports = { usingPDFKIT };