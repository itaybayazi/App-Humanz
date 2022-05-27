import React, { useState } from "react";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Card, Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Users from "../Users";
import "./MyTable.css";

const NUMBER_PER_PAGE = 10;

function MyTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchUser, setSearchUser] = useState(" ");

    const prop = {
        currentPage: currentPage,
        searchUser: searchUser,
    };

    return (
        <React.Fragment >
    
             

            <input onInput={(e) => {setSearchUser(e.target.value); setCurrentPage(1)}} type="text" placeholder="Search.." name="search" />

            <br />
            <br />
            <Card  style={{textAlignVertical: "center", textAlign: "center", width: "78rem" }}>
                <TableContainer style={{textAlign: "center",}}>
                    <Table style={{textAlign: "center",}} sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Full name</TableCell>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Phone number</TableCell>
                                <TableCell align="center">IP address</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Users prop={prop}></Users>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Pagination
                    size="small"
                    page={currentPage}
                    count={Math.ceil(30001 / NUMBER_PER_PAGE)}
                    onChange={(event, page) => setCurrentPage(page)}
                    variant="outlined"
                    shape="rounded"
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        paddingTop: 10,
                    }}
                />
            </Card> 
        </React.Fragment>
    );
}
export default MyTable;
