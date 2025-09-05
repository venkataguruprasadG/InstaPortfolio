import jsPDF from 'jspdf'

export const generateResumePDF = async (userData: any, template: any) => {
  const pdf = new jsPDF()
  
  // Set font
  pdf.setFont('helvetica')
  
  // Header
  pdf.setFontSize(24)
  pdf.setTextColor(40, 40, 40)
  pdf.text(userData.name, 20, 30)
  
  pdf.setFontSize(12)
  pdf.setTextColor(100, 100, 100)
  pdf.text(userData.email, 20, 40)
  
  let yPosition = 60
  
  // Bio/Summary
  if (userData.bio) {
    pdf.setFontSize(16)
    pdf.setTextColor(40, 40, 40)
    pdf.text('Summary', 20, yPosition)
    yPosition += 10
    
    pdf.setFontSize(10)
    pdf.setTextColor(60, 60, 60)
    const bioLines = pdf.splitTextToSize(userData.bio, 170)
    pdf.text(bioLines, 20, yPosition)
    yPosition += (bioLines.length * 5) + 15
  }
  
  // Skills
  if (userData.skills.length > 0) {
    pdf.setFontSize(16)
    pdf.setTextColor(40, 40, 40)
    pdf.text('Skills', 20, yPosition)
    yPosition += 10
    
    pdf.setFontSize(10)
    pdf.setTextColor(60, 60, 60)
    pdf.text(userData.skills.join(' • '), 20, yPosition)
    yPosition += 20
  }
  
  // Experience
  const validExperience = userData.experience.filter((exp: any) => exp.company)
  if (validExperience.length > 0) {
    pdf.setFontSize(16)
    pdf.setTextColor(40, 40, 40)
    pdf.text('Experience', 20, yPosition)
    yPosition += 10
    
    validExperience.forEach((exp: any) => {
      pdf.setFontSize(12)
      pdf.setTextColor(40, 40, 40)
      pdf.text(exp.position, 20, yPosition)
      
      pdf.setFontSize(10)
      pdf.setTextColor(100, 100, 100)
      pdf.text(exp.duration, 150, yPosition)
      yPosition += 6
      
      pdf.setFontSize(10)
      pdf.setTextColor(60, 60, 60)
      pdf.text(exp.company, 20, yPosition)
      yPosition += 8
      
      if (exp.description) {
        const descLines = pdf.splitTextToSize(exp.description, 170)
        pdf.text(descLines, 20, yPosition)
        yPosition += (descLines.length * 4) + 10
      } else {
        yPosition += 10
      }
    })
  }
  
  // Education
  const validEducation = userData.education.filter((edu: any) => edu.institution)
  if (validEducation.length > 0) {
    pdf.setFontSize(16)
    pdf.setTextColor(40, 40, 40)
    pdf.text('Education', 20, yPosition)
    yPosition += 10
    
    validEducation.forEach((edu: any) => {
      pdf.setFontSize(12)
      pdf.setTextColor(40, 40, 40)
      pdf.text(edu.degree, 20, yPosition)
      
      pdf.setFontSize(10)
      pdf.setTextColor(100, 100, 100)
      pdf.text(edu.year, 150, yPosition)
      yPosition += 6
      
      pdf.setFontSize(10)
      pdf.setTextColor(60, 60, 60)
      pdf.text(edu.institution, 20, yPosition)
      yPosition += 15
    })
  }
  
  // Save the PDF
  pdf.save(`${userData.name.replace(/\s+/g, '_')}_Resume.pdf`)
}