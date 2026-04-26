const fs = require('fs');
let dataBuffer = fs.readFileSync('c:\\Users\\surve\\Downloads\\hasanul-portfolio\\COMPREHENSIVE_STRATEGY.pdf');

async function run() {
    try {
        const pdfModule = await import('pdf-parse');
        const pdf = pdfModule.default || pdfModule;
        const pdfFunc = typeof pdf === 'function' ? pdf : pdf.default;
        let data = await pdfFunc(dataBuffer);
        console.log("PDF TEXT START");
        console.log(data.text);
        console.log("PDF TEXT END");
    } catch (e) {
        console.error(e);
    }
}
run();
