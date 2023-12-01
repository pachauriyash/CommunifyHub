//this is a sample page made for testing various features right now focusing on file upload using base64 encoding
import React, { useState } from 'react';


const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [decodedFile, setDecodedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        const base64Data = reader.result.split(',')[1];
        const newUploadedFile = {
          filename: selectedFile.name,
          base64Data: base64Data,
        };
        setUploadedFiles([...uploadedFiles, newUploadedFile]);
        setSelectedFile(null);
      };
    } else {
      console.log("No file selected.");
    }
  };

  const handleFileClick = (file) => {
    const { base64Data, filename } = file;
    const extension = filename.split('.').pop().toLowerCase();

    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif') {
      // Display images in a new tab
      const imageWindow = window.open('');
      imageWindow.document.write(`<img src="data:image/${extension};base64,${base64Data}" alt="${filename}" />`);
    } else if (extension === 'txt') {
      // Display plain text files in a new tab
      const textWindow = window.open('');
      const decodedContent = atob(base64Data);
      textWindow.document.write(`<pre>${decodedContent}</pre>`);
    } else if (extension === 'pdf') {
      // Display PDF files in a new tab
      //pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
      const pdfWindow = window.open('');
      pdfWindow.document.write(
        `<iframe width="100%" height="100%" src="data:application/pdf;base64,${base64Data}"></iframe>`
      );
    } else {
      // Handle other file types here or show an error message
      console.log(`Unsupported file type: ${extension}`);
    }
  };

  return (
    <div>
      <h2>File Upload Form</h2>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png, .gif"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>

      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index} onClick={() => handleFileClick(file)}>
            {file.filename}
          </li>
        ))}
      </ul>

      {decodedFile && (
        <div>
          <h3>Decoded File</h3>
          <pre>{decodedFile}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploadForm;
