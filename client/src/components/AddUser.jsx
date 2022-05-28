import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

function AddUser() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");
    const [ip, setIp] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function addclick() {
        if (name != "" && id != "" && phone != "" && ip != "") {
            if( /^\d+$/.test(id) == true && id.toString().length==9 && /^[0-9\b]+$/.test(phone)==true){

            
                let _data = {
                    Name: name,
                    ID: id,
                    Phone: phone,
                    IP: ip,
                };

                fetch(`/add`, {
                    method: "POST",
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                    body: JSON.stringify(_data),
                })
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.message == "ok") {
                            setOpen(false);
                            window.location.reload();
                        }else{
                            alert("Failed, The ID of this user already exists")
                        }
                    });
            }
        }else{
            alert("All parameters are required")
        }
    }

    return (
        <div style={{textAlign: "center"}}>
            <Button onClick={handleClickOpen}>Click here to add User</Button>
            <Dialog open={open} onClose={handleClose}>
                <form>
                    <DialogTitle>title</DialogTitle>
                    <DialogContent>
                        <DialogContentText>discription</DialogContentText>
                        <TextField required onInput={(e) => setName(e.target.value)} autoFocus margin="dense" id="name" label="Full Name" type="full-name" fullWidth variant="standard" />
                        <TextField helperText="9 digits." required onInput={(e) => setId(e.target.value)} autoFocus margin="dense" id="id" label="Id" type="text" fullWidth variant="standard" />
                        <TextField helperText="only digits." required onInput={(e) => setPhone(e.target.value)} autoFocus margin="dense" id="number" label="Phone number" type="tel" fullWidth variant="standard" />
                        <TextField required onInput={(e) => setIp(e.target.value)} autoFocus margin="dense" id="ip" label="IP address" type="txt" fullWidth variant="standard" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="outlined" onClick={() => addclick()}>
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
export default AddUser;
