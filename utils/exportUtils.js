import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (data, elementId) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  pdf.setFontSize(24);
  pdf.setTextColor(0, 51, 102);
  pdf.text('BI Team Analysis Report', 20, 30);
  
  pdf.setFontSize(12);
  pdf.setTextColor(51, 51, 51);
  pdf.text(`Generated: ${currentDate}`, 20, 40);
  
  pdf.setFontSize(16);
  pdf.setTextColor(0, 51, 102);
  pdf.text('Current Team Composition', 20, 60);
  
  pdf.setFontSize(10);
  pdf.setTextColor(51, 51, 51);
  let yPosition = 70;
  
  data.roles.forEach((role, index) => {
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFont(undefined, 'bold');
    pdf.text(`${index + 1}. ${role.title}`, 20, yPosition);
    pdf.setFont(undefined, 'normal');
    
    const descLines = pdf.splitTextToSize(role.description, 170);
    yPosition += 7;
    descLines.forEach(line => {
      pdf.text(line, 25, yPosition);
      yPosition += 5;
    });
    yPosition += 5;
  });
  
  if (data.analysis) {
    if (yPosition > 200) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFontSize(16);
    pdf.setTextColor(0, 51, 102);
    pdf.text('Analysis Results', 20, yPosition + 10);
    yPosition += 20;
    
    pdf.setFontSize(14);
    pdf.text('Identified Gaps', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    data.analysis.currentGaps?.forEach(gap => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }
      
      const impactColor = gap.impact === 'High' ? [220, 53, 69] : 
                          gap.impact === 'Medium' ? [253, 126, 20] : [40, 167, 69];
      pdf.setTextColor(...impactColor);
      pdf.text(`[${gap.impact}]`, 25, yPosition);
      
      pdf.setTextColor(51, 51, 51);
      pdf.text(gap.area, 45, yPosition);
      yPosition += 5;
      
      const gapLines = pdf.splitTextToSize(gap.description, 150);
      gapLines.forEach(line => {
        pdf.text(line, 45, yPosition);
        yPosition += 5;
      });
      yPosition += 5;
    });
    
    if (yPosition > 200) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFontSize(14);
    pdf.setTextColor(0, 51, 102);
    pdf.text('Recommended New Roles', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    data.analysis.recommendedRoles?.forEach(role => {
      if (yPosition > 230) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(0, 102, 204);
      pdf.text(role.title, 25, yPosition);
      pdf.setFont(undefined, 'normal');
      yPosition += 5;
      
      pdf.setTextColor(51, 51, 51);
      const roleLines = pdf.splitTextToSize(role.description, 150);
      roleLines.forEach(line => {
        pdf.text(line, 25, yPosition);
        yPosition += 5;
      });
      
      pdf.text(`Priority: ${role.priority} | Timeline: ${role.timeframe}`, 25, yPosition);
      yPosition += 10;
    });
  }
  
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.text('© BCG - Business Intelligence Team Analyzer', 20, 280);
  
  pdf.save('bi-team-analysis.pdf');
};

export const exportToCSV = (data) => {
  const headers = ['Role Title', 'Description', 'Current Work', 'Skills Needed'];
  const rows = data.roles.map(role => [
    role.title,
    role.description.replace(/,/g, ';'),
    role.currentWork.replace(/,/g, ';'),
    role.skillsNeeded?.replace(/,/g, ';') || ''
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'bi-team-data.csv';
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (data) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'bi-team-analysis.json';
  link.click();
  URL.revokeObjectURL(url);
};