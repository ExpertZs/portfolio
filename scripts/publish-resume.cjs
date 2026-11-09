const {copyFileSync}=require('node:fs');
copyFileSync('resume/approved-resume.pdf','public/Zahidul_Islam_Resume.pdf');
console.log('Published the approved CV unchanged.');
