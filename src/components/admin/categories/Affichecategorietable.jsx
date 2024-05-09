import React, { useState, useMemo } from 'react'
import ReactLoading from 'react-loading';
import { useSelector } from "react-redux"
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { deleteCategorie } from "../../../features/categorieslice"
import { useDispatch } from "react-redux";
import { MaterialReactTable } from 'material-react-table'
import { Box } from '@mui/material';
import Editcategorie from './Editcategorie';
const Affichecategorietable = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const { categories, isLoading, error } = useSelector((state) => state.storecategories);
    const [categorie, setCategorie] = useState(null);

    const handleClose = () => {
        
        setShowModal(false);
        setCategorie(null);
    }

    const handleDelete = (id) => {
        if (window.confirm("supprimer categorie O/N")) {
            dispatch(deleteCategorie(id))
            .then((response)=>{
                toast(`Catégorie ${id} Supprimée`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                })
            .catch((error)=>{
                console.log(error)
            })
        }
        }
        const handleEdit = (item) => {
            setCategorie(item);
            setShowModal(true);
            
        };
    
        const columns = useMemo(
            () => [
                {
                    accessorKey: 'imagecategorie', //access nested data with dot notation
                    header: 'Image',
                    Cell: ({ cell }) => (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}
                        >
                            <img
                                alt=""
                                height={60}
                                src={cell.getValue()}
                                loading="lazy"
                                style={{ borderRadius: '20%' }}
                            /></Box>),
                },
                {
                    accessorKey: 'nomcategorie', //access nested data with dot notation
                    header: 'Nom des catégories',
                    size: 100,
                },

                {
                    accessorKey: '_id',
                    header: 'actions',
                    size: 100,
                    Cell: ({ cell, row }) => (
                        <div >
                            <Button
                                onClick={() => handleEdit(cell.row.original)}
                                size="md"
                                className="text-warning btn-link edit"
                            >
                                <i class="fa-solid fa-pen-to-square"></i>
                            </Button>
                            <Button
                                onClick={(e) => {
                                    handleDelete(cell.row.original._id);
                                }}
                                size="md"
                                className="text-danger btn-link delete"
                            >
                                <i className="fa fa-trash" />
                            </Button>
                        </div>
                    ),
                },
            ],
            [categories],
        );

        if (isLoading) return <center><ReactLoading type='spokes' color="red" height={'8%'} width={'8%'} /></center>
    if (error) return <p>Impossible d'afficher la liste des catégories...</p>
    return (
        <>
            <div>
                <MaterialReactTable columns={columns} data={categories} />;
            </div>

          {showModal && (
                <Editcategorie
                    show={showModal}
                    handleClose={handleClose}
                    cat={categorie}
                />
            )}
        </>
    )
}

export default Affichecategorietable