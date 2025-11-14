import React, { useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const [resumes, setResumes] = useState([]);

  const submit = (e) => {
    e.preventDefault();

    if (!name || !email || !file) {
      alert("Please fill all fields");
      return;
    }

    const newResume = {
      name,
      email,
      fileName: file.name,
      uploadDate: new Date().toLocaleString(),
      fileURL: URL.createObjectURL(file), // temporary frontend link
    };

    setResumes([...resumes, newResume]);

    setName("");
    setEmail("");
    setFile(null);
  };

  return (
    <div className="dash-container">
      
     
      <div className="upload-card">
        <h2>Upload Resume</h2>

        <form onSubmit={submit}>
          <div className="input-group">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          <div className="input-group">
            <label>Upload Resume (PDF/DOCX)</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>

          <button type="submit" className="upload-btn">
            Upload
          </button>
        </form>
      </div>

      
      <div className="table-card">
        <h2>Uploaded Resumes</h2>

        {resumes.length === 0 ? (
          <p className="no-data">No resumes uploaded yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Resume File</th>
                <th>Upload Date</th>
                <th>Download</th>
              </tr>
            </thead>

            <tbody>
              {resumes.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.fileName}</td>
                  <td>{r.uploadDate}</td>
                  <td>
                    <a className="download-btn" href={r.fileURL} download>
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
