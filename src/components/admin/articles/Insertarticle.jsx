import React, { useState } from 'react';
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import {createArticle} from "../../../features/articleslice"
import {getScategories} from "../../../features/scategorieslice";
import {useDispatch,useSelector} from "react-redux";
import { useEffect } from 'react';
import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {  toast } from 'react-toastify';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const Insertarticle =()=> {

  const [article,setArticle]=useState({})
  const [files, setFiles] = useState([]);
const [validated, setValidated] = useState(false);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const dispatch = useDispatch();
const {scategories,isLoading,error,success} = useSelector((state) =>state.storescategories);

useEffect(() => {
  dispatch(getScategories())
}, [dispatch])



const handlechange=(e)=>{
  
    setArticle({...article,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      
    //faire le add dans la BD
    dispatch(createArticle(article))
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
      toast("Article ajouté", {
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
    setArticle({})
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
 <h2>Ajouter un produit</h2>
</Modal.Header>
<Modal.Body>
<div className="container w-100 d-flex justify-content-center">
<div>
<div className='form mt-3'>
<Row className="mb-2">
<Form.Group as={Col} md="6" >
<Form.Label >Référence *</Form.Label>
<Form.Control
required
type="text"
placeholder="Référence"
name="reference"
value={article.reference}
onChange={(e)=>handlechange(e)}
/>
<Form.Control.Feedback type="invalid">
Saisir Référence Article
</Form.Control.Feedback>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Désignation *</Form.Label>
<Form.Control
required
type="text"
name="designation"
placeholder="Désignation"
value={article.designation}
onChange={(e)=>handlechange(e)}
/>
<Form.Control.Feedback type="invalid">
Saisir Désignation
</Form.Control.Feedback>
</Form.Group>
</Row>
<Row className="mb-2">
<Form.Group className="col-md-6">
<Form.Label>Marque *</Form.Label>
<InputGroup hasValidation>
<Form.Control
type="text"
required
name="marque"
placeholder="Marque"
value={article.marque}
onChange={(e)=>handlechange(e)}
/>
<Form.Control.Feedback type="invalid">
Marque Incorrecte
</Form.Control.Feedback>
</InputGroup>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Prix</Form.Label>
<Form.Control
type="number"
placeholder="Prix"
name="prix"
value={article.prix}
onChange={(e)=>handlechange(e)}
/>
</Form.Group>
</Row>
<Row className="mb-3">
<Form.Group className="col-md-6 ">
<Form.Label>
Qté stock<span className="req-tag">*</span>
</Form.Label>
<Form.Control
required
type="number"
name="qtestock"
value={article.qtestock}
onChange={(e)=>handlechange(e)}
placeholder="Qté stock"
/>
<Form.Control.Feedback type="invalid">
Qté stock Incorrect
</Form.Control.Feedback>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>S/Catégorie</Form.Label>
<Form.Control
required
as="select"
type="select"
name="scategorieID"
value={article.scategorieID}
onChange={(e)=>handlechange(e)}
>
<option></option>
{scategories.map((scat)=><option key={scat._id}
value={scat._id}>{scat.nomscategorie}</option>
)}
</Form.Control>
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

export default Insertarticle