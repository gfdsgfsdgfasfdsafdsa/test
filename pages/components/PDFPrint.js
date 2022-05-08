import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export default function PDFPrint() {

	function generate() {

		let dateTaken = 'May 09, 2022'
		const pdf = new jsPDF();

		let startY = 15;
		let finalY = pdf.lastAutoTable.finalY;

		pdf.setProperties({
			title: "Result"
		});

		 

		pdf.setFontSize(30)
		pdf.setFont(undefined, 'bold').text("Romar Desabille", startY, 20)
			.setFont(undefined, 'normal')

		pdf.setFontSize(10)
		pdf.text(`Date Taken ${dateTaken}`, startY, 25);

		pdf.setFontSize(18)
		pdf.setFont(undefined, 'bold').text(`Student Information`, startY, 40);

		pdf.setFontSize(12)
		pdf.setFont(undefined, 'normal').text(`Strand: `, startY, 47);
		pdf.setFont(undefined, 'normal').text(`ICT`, startY+20, 47);

		pdf.setFont(undefined, 'normal').text(`Age: `, startY, 54);
		pdf.setFont(undefined, 'normal').text(`17`, startY+20, 54);

		pdf.setFont(undefined, 'normal').text(`School: `, startY, 61);
		pdf.setFont(undefined, 'normal').text(`STI`, startY+20, 61);

		pdf.setFont(undefined, 'normal').text(`Gender: `, startY, 68);
		pdf.setFont(undefined, 'normal').text(`Male`, startY+20, 68);


		var spaceExam = 10*4; //3 lines for subject + exam result title = 4

		pdf.setFontSize(18)
		pdf.setFont(undefined, 'bold').text(`Exam Result`, startY, 40+spaceExam);

		pdf.setFontSize(12)
		pdf.setFont(undefined, 'normal').text(`English: `, startY, 47+spaceExam);
		pdf.setFont(undefined, 'normal').text(`15`, startY+20, 47+spaceExam);

		pdf.setFont(undefined, 'normal').text(`Science: `, startY, 54+spaceExam);
		pdf.setFont(undefined, 'normal').text(`17`, startY+20, 54+spaceExam);

		pdf.setFont(undefined, 'normal').text(`Math: `, startY, 61+spaceExam);
		pdf.setFont(undefined, 'normal').text(`17`, startY+20, 61+spaceExam);


		var spaceRecommendCourse = 68+spaceExam+5;

		pdf.setFontSize(18);
		pdf.setFont(undefined, 'bold').text(`Course Recommended`, startY, spaceRecommendCourse);

		autoTable(pdf, { html: '#my-table' })

		// Or use javascript directly:
		autoTable(pdf, {
			theme: 'grid',
			startY: spaceRecommendCourse+5,
			styles: {
				fontStyle: 'bold',
				textColor: 20,
				lineColor: 20,
			},
			head: [['Rank', 'Courses']],
			body: [
				['1', 'BSIT, BSBA-FM, BSHM, BSED, BSCA, BSCRIM'],
				['2', 'BPED, BSMT'],
				['3', 'BSNED'],
			],
			headerStyles: { halign: 'center',},
			bodyStyles: { halign: 'center', fontStyle: 'normal' },
			columnStyles: { 1: { halign: 'left' } },
		})

		var spaceRegression = spaceRecommendCourse + (4*10) + 6; //3 rank line + table header = 4

		pdf.setFontSize(18);
		pdf.setFont(undefined, 'bold').text(`Regression Model`, startY, spaceRegression);

		pdf.setFontSize(12);
		pdf.setFont(undefined, 'normal').text(`y = B0 + B1(English) + B2(Math) + B3(Science)`, startY, spaceRegression + 10);
		pdf.setFont(undefined, 'normal').text(`y = -1.8207657603852567e-14 + (1.000000000000002*6) + \r\n (1.0000000000000022*16) + (0.9999999999999959*10)`, startY, spaceRegression + 20);
		pdf.setFont(undefined, 'normal').text(``, startY, spaceRegression + 30);
		pdf.setFont(undefined, 'normal').text(`y = 32`, startY, spaceRegression + 35);


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
