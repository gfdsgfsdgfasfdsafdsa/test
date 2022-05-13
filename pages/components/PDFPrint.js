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
		pdf.setFont(undefined, 'bold').text("CourseMe", startY, 20)
			.setFont(undefined, 'normal')

		pdf.setFontSize(12)
		pdf.setFont(undefined, 'bold').text(`Name: `, startY, 27);
		pdf.setFont(undefined, 'normal').text(`Student name`, startY+15, 27);

		pdf.setFont(undefined, 'bold').text(`Date: `, startY, 34);
		pdf.setFont(undefined, 'normal').text(`${dateTaken}`, startY+13, 34);

		var spaceInfo = 48;
		

		pdf.setFontSize(18)
		pdf.setFont(undefined, 'bold').text(`Student Information`, startY, spaceInfo);

		pdf.setFontSize(12)
		pdf.setFont(undefined, 'bold').text(`Strand: `, startY, spaceInfo+8);
		pdf.setFont(undefined, 'normal').text(`ICT`, startY+17, spaceInfo+8);

		pdf.setFont(undefined, 'bold').text(`Age: `, startY, spaceInfo+15);
		pdf.setFont(undefined, 'normal').text(`17`, startY+12, spaceInfo+15);

		pdf.setFont(undefined, 'bold').text(`School from: `, startY, spaceInfo+22);
		pdf.setFont(undefined, 'normal').text(`STI`, startY+28, spaceInfo+22);

		pdf.setFont(undefined, 'bold').text(`Gender: `, startY, spaceInfo+29);
		pdf.setFont(undefined, 'normal').text(`Male`, startY+19, spaceInfo+29);

		var spaceExam = spaceInfo+45; 

		pdf.setFontSize(18)
		pdf.setFont(undefined, 'bold').text(`Exam Result`, startY, spaceExam);

		/* pdf.setFontSize(12)
		pdf.setFont(undefined, 'normal').text(`English: `, startY, 47+spaceExam);
		pdf.setFont(undefined, 'normal').text(`15`, startY+20, 47+spaceExam);

		pdf.setFont(undefined, 'normal').text(`Science: `, startY, 54+spaceExam);
		pdf.setFont(undefined, 'normal').text(`17`, startY+20, 54+spaceExam);

		pdf.setFont(undefined, 'normal').text(`Math: `, startY, 61+spaceExam);
		pdf.setFont(undefined, 'normal').text(`17`, startY+20, 61+spaceExam); */

		autoTable(pdf, { html: '#my-table' })

		// Or use javascript directly:
		autoTable(pdf, {
			theme: 'grid',
			startY: spaceExam+5,
			styles: {
				fontStyle: 'bold',
				textColor: 20,
				lineColor: 20,
			},
			head: [['Subject', 'Score']],
			body: [
				['English', '35/35'],
				['Math', '35/35'],
				['Science', '35/35'],
			],
			bodyStyles: { fontStyle: 'normal' },
			columnStyles: { 
				0: { cellWidth: 60 },
			 },
		})


		var spaceRecommendCourse = spaceExam + (4*10) + 10;

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

		var checkCountCharCourse = false;


		var spaceRegression = spaceRecommendCourse + (4*10) + 10; //3 rank line + table header = 4

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
