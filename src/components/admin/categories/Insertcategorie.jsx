import React, { useState } from 'react';
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import {createCategorie} from "../../../features/categorieslice"
import {useDispatch,useSelector} from "react-redux";
import { useEffect } from 'react';
import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {  toast } from 'react-toastify';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const Insertcategorie =()=> {

    const [categorie,setCategorie]=useState({})
  const [files, setFiles] = useState([]);
const [validated, setValidated] = useState(false);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const dispatch = useDispatch();



const handlechange=(e)=>{
  
    setCategorie({...categorie,[e.target.name]:e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      
    //faire le add dans la BD
    dispatch(createCategorie(categorie))
    if(error!=null){
      toast("Erreur de suppression", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,progress: undefined,
      })
    }
    if(success!=null) {
        console.log("Insert OK");
        toast("Catégorie ajoutée", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,progress: undefined,
        })
        handleReset()
    setValidated(false);
    
    }
    
    }
    setValidated(true);
    }

    const handleReset=()=>{
        setCategorie({})
        setFiles([])
        handleClose()
        }
        const serverOptions = () => { console.log('server pond');

        return {
            process: (fieldName, file, metadata, load, error, progress, abort) => {
                console.log(file)
              const data = new FormData();
              
              data.append('file', file);
      data.append('upload_preset', 'oumaima');
      data.append('cloud_name', 'dcex70obk');
      data.append('public_id', file.name);
      
      fetch('https://api.cloudinary.com/v1_1/dcex70obk/image/upload', {
        method: 'POST',
        body: data,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Upload successful:', data);
        setArticle({...article,imageart:data.url}) ;
        load(data);
      })
      .catch(error => {
        console.error('Upload failed:', error);
        abort();
      });
            },
          };
        };

        return (
            <div >
            <nav className="navbar navbar-expand-lg navbar-dark ">
                    <div className="container-fluid">
                    <Button
             onClick={handleShow}
            className="btn btn-outline-light"
            
             style={{float: 'left','margin':10,'left':10,fontFamily:'Arial'}}>
            <i className="fa-solid fa-circle-plus"></i>
            &nbsp;
            Nouveau
            </Button>
                       
                    </div>
                  </nav>

                  <Modal show={show} onHide={handleClose}>
 <Form noValidate validated={validated} onSubmit={handleSubmit}>
<Modal.Header closeButton>
 <h2>Ajouter une categorie</h2>
</Modal.Header>
<Modal.Body>
<div className="container w-100 d-flex justify-content-center">
<div>
<div className='form mt-3'>
<Row className="mb-2">
<Form.Group as={Col} md="12" >
<Form.Label >Nom de la catégorie *</Form.Label>
<Form.Control
required
type="text"
placeholder="Nom de la catégorie"
name="nomcategorie"
value={categorie.nomcategorie}
onChange={(e)=>handlechange(e)}
/>
<Form.Control.Feedback type="invalid">
Saisir Nom de la catégorie
</Form.Control.Feedback>
</Form.Group>
</Row>

<div style={{ width: "80%", margin: "auto", padding: "1%" }}>
     <FilePond
                   files={files}
                   acceptedFileTypes="image/*"
                   onupdatefiles={setFiles}
                   allowMultiple={true}
                   server={serverOptions()}
                   name="file"
                      
          />
    </div>    


</div>
</div>
</div>
</Modal.Body>
<Modal.Footer>
<Button type="submit">Enregistrer</Button>
<Button type="button" className="btn btn-warning"onClick={()=>handleReset()}>Annuler</Button>
</Modal.Footer>
</Form>
</Modal>
</div>
  )

}

export default Insertcategorie