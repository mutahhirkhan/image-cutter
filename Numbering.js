function generateSequence(gapping = 14, startingIndex = 1) {
	return { gap: gapping, start: startingIndex, end: startingIndex + gapping - 1 };
}

function getArrayOfSubImagesName(start = 1, end = 14) {
    let arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(`output/img${i}.jpg`);
    }
    console.log("NUMBERING DONE");
    return arr;
}

module.exports = { generateSequence, getArrayOfSubImagesName };