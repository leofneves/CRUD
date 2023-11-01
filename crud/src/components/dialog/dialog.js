import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from "axios";

export default function FormDialog(props) {
    
    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.name,
        cost: props.cost,
        category: props.category,
    });

    const handleEditGame = () => { //Função para Editar
        Axios.put("http://localhost:3001/edit", {
            id: editValues.id,
            name: editValues.name,
            cost: editValues.cost,
            category: editValues.category,
        });
        handleClose();
        document.location.reload();
    };

    const handleDeleteGames = () => { //Função para Deletar
        Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
        handleClose();
        document.location.reload();
    };

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChageValues = value => {
        setEditValues(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    };

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Editar</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome do jogo"
                    defaultValue={props.name}
                    onChange={handleChageValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="cost"
                    label="Preço"
                    defaultValue={props.cost}
                    onChange={handleChageValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="category"
                    label="Categoria"
                    defaultValue={props.category}
                    onChange={handleChageValues}
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDeleteGames} color="primary">
                    Excluir
                </Button>
                <Button onClick={handleEditGame} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
