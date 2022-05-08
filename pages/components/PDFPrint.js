import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export default function PDFPrint() {

	function generate() {
		let dateTaken = 'May 09, 2022'
		const pdf = new jsPDF();
		pdf.setProperties({
			title: "Result"
		});

		pdf.setFontSize(30)
		pdf.setFont(undefined, 'bold').text("Romar Desabille", 10, 20)
			.setFont(undefined, 'normal')

		pdf.setFontSize(10)
		pdf.text(`Date Taken ${dateTaken}`, 10, 30);

		pdf.setFont(undefined, 'bold').text(`Student Information`, 10, 40);

		autoTable(pdf, { html: '#my-table' })

		// Or use javascript directly:
		autoTable(pdf, {
			theme: 'grid',
			startY: 50,
			styles: {
				fontStyle: 'bold',
				textColor: 20,
				lineColor: 20,
			},
			body: [
				['Strand: ICT'],
				['Strand: ICT'],
				['Strand: ICT'],
			],
		})
		return pdf
	}

	function test(){
		generate().output('dataurlnewwindow')
	}

	function download(){
		generate().save('test.pdf')
	}

	return (
		<div>
			<button onClick={test}>Preview</button>
		</div>
	);
}
