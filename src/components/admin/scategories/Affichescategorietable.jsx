import React, { useState, useMemo } from 'react'
import ReactLoading from 'react-loading';
import { useSelector } from "react-redux"
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Editscategorie from './Editscategorie';
import { deleteScategorie } from '../../../features/scategorieslice';

const Affichescategorietable = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const { scategories, isLoading, error } = useSelector((state) => state.storescategories);
    const [scategorie, setScategorie] = useState(null);

    const handleClose = () => {
        
        setShowModal(false);
        setScategorie(null);
    }
    const handleDelete = (id, nom) => {
        if (window.confirm("supprimer Sous Categorie O/N")) {
            dispatch(deleteScategorie(id))
            .then((response)=>{
                toast(`Sous Categorie ${nom} Supprimée`, {
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
            setScategorie(item);
            setShowModal(true);
            
        };
        const columns = useMemo(
            () => [
                {
                    accessorKey: 'imagescategorie', //access nested data with dot notation
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
                    accessorKey: 'nomscategorie', //normal accessorKey
                    header: 'Nom sous Catégories',
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
                                    handleDelete(cell.row.original._id, cell.row.original.nomscategorie);
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
            [scategories],
        );
        if (isLoading) return <center><ReactLoading type='spokes' color="red" height={'8%'} width={'8%'} /></center>
    if (error) return <p>Impossible d'afficher la liste des sous catégories...</p>
    return (
        <>
            <div>
                <MaterialReactTable columns={columns} data={scategories} />;
            </div>

            {showModal && (
                <Editscategorie
                    show={showModal}
                    handleClose={handleClose}
            scat={scategorie}
                />
            )}
        </>
    )
}

export default Affichescategorietable