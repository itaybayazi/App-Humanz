import React, { useState, useEffect } from "react";
import getUsersData from "./getUsersData";
import { TableCell, TableRow, Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@material-ui/core";

const NUMBER_PER_PAGE = 10;

function Users(props) {
    const [data, setData] = useState([]);
    const {currentPage ,searchUser} = props.prop;


    useEffect(getUser, []);

    function getUser() {
        getUsersData().then((u) => {
            setData(u);
            console.log("getUser function =>");
            console.log(u);
        });
    }

    function DeleteUser(id) {
        fetch(`/delete/${id}`, {
            method: "DELETE",
        }).then((result) => {
            result.json().then((data) => {
                getUser();
            });
        });
    }


 


    return (
        <React.Fragment>
           
            {data.filter(e => {
                if(searchUser!=''){
                    return e.Name.toUpperCase().includes(searchUser.toUpperCase());
                }
                if(searchUser==''||searchUser==null){
                    return e;
                }
            }).slice(currentPage * NUMBER_PER_PAGE - NUMBER_PER_PAGE, currentPage * NUMBER_PER_PAGE) 
            .map((element, index) => (
                <TableRow key={index}>
                    <TableCell align="center">{element.Name} </TableCell>
                    <TableCell align="center">{element.ID} </TableCell>
                    <TableCell align="center">{element.Phone} </TableCell>
                    <TableCell align="center">{element.IP} </TableCell>
                    <TableCell align="center">
                        <IconButton onClick={() => DeleteUser(element.ID)} aria-label="delete" 
                              style={{color:'red'}}  size="large">
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ))}


        </React.Fragment>
    );
}
export default Users;
