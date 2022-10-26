const imagesToPdf = require("images-to-pdf")
// const {delay} = require("./index")

async function combineImagesToPDF(imageArr, outputName) {
    // await delay(1000);
    //convert images to combined PDF
    await imagesToPdf(imageArr, outputName);
    console.log("IMAGES TO PDF DONE");
}

module.exports = { combineImagesToPDF }