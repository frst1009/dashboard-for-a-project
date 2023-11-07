import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, TablePagination } from '@mui/material';

function MainComponent() {
  const [items, setItems] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [file, setFile] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);

 
  useEffect(() => {
    const fetchItems = async () => {
      const authToken = 'Uk9MRV9USUNLRVQ6VElDS0VUXzE4MmJiZTMyNWY0N2ZhMmQ3MjE0ZjNlNjZkNzQzNzkwYTIzYTYwOTE=';
      const headers = {
        Authorization: `Basic ${authToken}`,
      };
      try {
        const response = await axios.get('https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/382b3102-ffba-422e-8711-d7f330fb5468/children',{headers});
        setItems(response.data.list.entries);
        console.log(response.data.list.entries)
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []); 

  
  const createFolder = async () => {
    try {
      const authToken = 'Uk9MRV9USUNLRVQ6VElDS0VUXzE4MmJiZTMyNWY0N2ZhMmQ3MjE0ZjNlNjZkNzQzNzkwYTIzYTYwOTE=';
      const headers = {
        Authorization: `Basic ${authToken}`,
      };
      const folderMetadata = {
        nodeType: 'cm:folder',
        name: folderName,
        properties: {
          "cm:title": '',
          "cm:description": ''
        }
      };
  
      const payload = {
        ...payload,
        folderMetadata
      };
  
      const response = await axios.post('https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/3e62330a-5c62-4f1c-9c9e-cc4e9a60663a/children', payload,{headers});
      console.log('Folder created:', response.data);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', fileToUpload);

    try {
      const authToken = "Basic Uk9MRV9USUNLRVQ6VElDS0VUXzE4MmJiZTMyNWY0N2ZhMmQ3MjE0ZjNlNjZkNzQzNzkwYTIzYTYwOTE="; 
      const headers = {
        Authorization: authToken,
      };
      const formData = new FormData();
      formData.append('file', file);
              const response = await axios.post("https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/c61bcbd6-b2dc-4c46-8b88-0e6e57b094f2/children?autoRename=true&include=allowableOperations", formData, {headers});
      ;
      console.log('File uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <section className="dash">
    <div className="dash-header">
      <img
        className="dash-logo"
        src="https://1curd3ms.trials.alfresco.com/assets/images/alfresco-logo-flower.svg"
        alt=""
      />
      <p className="dash-logo-name">Alfresco Digital Workspace</p>
    </div>
    <div className="dash-body">
      <div className="dash-left-view">
        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button className="dash-button" onClick={createFolder}>Create Folder</button>
        <input type="file" onChange={(e) => setFileToUpload(e.target.files[0])} />
        <button className="dash-button" onClick={uploadFile}>Upload File</button>
      </div>
    <YourComponent items={items}/>
     </div>
   </section>
  );
   };

export default MainComponent;


const YourComponent = ({ items }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedItems = items.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <div style={{width:"100%"}}>
      <TableContainer style={{width:"100%"}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Modified By</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.entry.name}</TableCell>
                <TableCell>{item.entry.createdByUser.displayName}</TableCell>
                <TableCell>{item.entry.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={items.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};
