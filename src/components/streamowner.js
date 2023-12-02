import React, { useState,useEffect } from 'react';
import axios from 'axios';
import PostCard from './postcardowned';
import PopupComponent from './popuptoupdateclass';
import { useDropzone } from 'react-dropzone'; // Import react-dropzone
const StreamComponent = (props) => {

  // console.log(props);
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  const [showPopup, setShowPopup] = useState(false); // State to toggle the visibility of the popup

  //changes for file upload
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [showFileUpload, setShowFileUpload] = useState(false); // State to control the visibility of the file upload popup
  // Function to toggle the file upload popup
  const toggleFileUpload = () => {
    setShowFileUpload(!showFileUpload);
  };
  // Function to handle file selection
  const handleFileSelect = (acceptedFiles) => {
    // In this example, we're only allowing a single file to be selected
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
    toggleFileUpload();
  };
  // Use the useDropzone hook to handle file selection
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileSelect, // Specify the function to handle file drops
    accept: '.pdf, .doc, .docx', // Specify the allowed file types (PDF, DOC, DOCX, etc.)
    multiple: false, // Allow only one file to be selected at a time
  });



// console.log(posts);
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Send the content to the server
  //   try {
  //       const response = await axios.post(`${process.env.REACT_APP_PATH_URL}/class/${props.classData._id}/feed`, { content },{
  //       withCredentials: true,
  //     });
  //     // Update the posts state with the new post data at the beginning
  //     console.log(response);
  //   setPosts([response.data.post, ...posts]);
  //     // Clear the content after successful submission
  //     setContent('');
  //   } catch (error) {
  //     console.error('Error posting content:', error);
  //   }
  // };
// Function to handle form submission (including file upload)
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  // Append the content to the FormData
  formData.append('content', content);

  // Append the file (if selected) to the FormData
  if (selectedFile) {
    formData.append('file', selectedFile);
  }
// Check if both content and file are empty
if (!content && !selectedFile) {
  // Show an alert to the user
  alert('Please enter content or select a file before submitting.');
  return; // Exit the function to prevent further execution
}
  try {
    // Send the combined FormData in a single POST request
    const response = await axios.post(
      `${process.env.REACT_APP_PATH_URL}/class/${props.classData._id}/feed`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      }
    );

    // Handle the server response as needed
    // console.log(response);

    // Clear the selected file
    setSelectedFile(null);
    setPosts([response.data.post, ...posts]);
    // Clear the content after successful submission
    setContent('');
  } catch (error) {
    console.error('Error posting content:', error);
  }
};


  useEffect(() => {
    if (props.classData) {
      // Fetch the posts from the server
      const fetchPosts = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_PATH_URL}/class/${props.classData._id}/feed`,
            { withCredentials: true }
          );
          setPosts(response.data.posts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      fetchPosts();
    }
  }, [props.classData]);

  const handleDeletePost = async (postId) => {
    try {
      // Send a request to delete the post
      await axios.delete(`${process.env.REACT_APP_PATH_URL}/posts/${props.classData._id}/feed/${postId}`, {
        withCredentials: true,
      });
  
      // Update the posts state by removing the deleted post
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  //these two are for updating class toggle
  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };
  const handleUpdateClassDetails = (updatedDetails) => {
    props.updateClassDetails(updatedDetails);
  };


  if (props.classData === null) {
    return <div className="class-page-data"></div>;
  }
  

  return (
    <div className="class-page-data">
      <div className="class-details-owned">
        <h1>{props.classData.classTitle}</h1>
        <div className='class-detail-detail'>
        <p><b>Community Description: </b>{props.classData.classDesc}</p>
        <p><b>Community Code: </b>{props.classData.classCode}</p>
        <p><b>Community Type: </b>{props.classData.classSection}</p>
        </div>
        <div className='class-detail-update'>
        <button  onClick={handlePopupToggle}>Edit Info</button>
        </div>
        {showPopup && <PopupComponent updateClassDetails={handleUpdateClassDetails} classData={props.classData}onClose={handlePopupToggle}/>}
      </div>
      <div className="feedandassignment">
        <div className="feed feed-for-owner">
          <h2>Feed</h2>
          <div className='new-post'>
          {/* File Upload Popup */}

      {showFileUpload && (
        <div className="popup">
      <div className="popup-content">
        <div className="popup-header">
         <h2>Upload File</h2>
          <button className="close-button" onClick={toggleFileUpload}>
            X
          </button>
        </div>
        <div className="popup-body">
        <div {...getRootProps()} className="file-upload-container">
          <label htmlFor="fileInput" className="file-upload-label" style={{
    border: '2px dashed #007bff',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
  }} >
            <p>Drag and drop a file here, or click to select a file (e.g., PDF, DOC).</p>
          </label>
          <input {...getInputProps()} id="fileInput" style={{ display: 'none' }} />
            </div>
        </div>
        <div className="popup-footer">
        </div>
      </div>
    </div>
      )}

      <form onSubmit={handleSubmit}>
            <textarea
               value={content}
               onChange={handleContentChange}
               onClick={(e) => e.target.style.height = 'auto'}
               onFocus={(e) => e.target.style.height = 'auto'}
               onBlur={(e) => e.target.style.height = 'inherit'}
               placeholder="Enter your post content"
              >
              </textarea>
              
               {/* File Upload Section */}
               
            
                <div className="selected-file">
                  {selectedFile && (
                    <div className='selected-file-header'>
                      <b>Selected File: </b> {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                      
                      <button className="selected-file-delete" onClick={() => setSelectedFile(null)}>Remove</button></div>

                  )}
                </div>
                <div className='selected-file-update'> 
                {/* Attachment Button */}
            
            <button onClick={(e) => {
                e.preventDefault();
                toggleFileUpload();
            }}> Attachment</button>
            </div>
              <div className='post-detail'>
            <button type="submit">Post</button>
            
            
            </div>
            
          </form>

          
          </div>
          
          <ul>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} user={props.userdata} onDeletePost={handleDeletePost} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StreamComponent;
