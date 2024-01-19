"use client"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import listeUser from '@/app/(page)/user/page';
import Utils from '@/utils/utils';
import { useRouter } from "next/navigation";
import userService from '@/services/userService';
import React, { useState, useEffect } from 'react';
import { Table, Button } from "react-bootstrap";

const user = ({ listeUser }) => {

    const router = useRouter();

    const handleRedirect = () => {
        router.push('/user/add');
    };

    return (
        <>
            <h1>Gestion Collaborateur</h1>
            <div className="d-flex flex-column justify-content-center my-4">
                <div className="text-center my-4 mx-4">
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Manager</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {listeUser.map((user) => {
                                const editUser = () => {
                                    router.push(`/user/${user.id}`);
                                }
                                let id = user.id;
                                const deleteUser = () => {
                                    router.push(`/user/delete`)
                                };

                                let role = "";
                                if (user.role_id == 1) {
                                    role = "User"
                                } else if (user.role_id == 2) {
                                    role = "Gestion"
                                } else {
                                    role = "Super Admin"
                                }
                                const [managerUser, setManagerUser] = useState([]);
                                useEffect(() => {
                                    (async () => {
                                        const dataUser = await userService.loadManagerUser(user.manager_id);
                                        setManagerUser(dataUser);

                                    })();
                                }, []);


                                return (
                                    <tr key={user.id}>
                                        <td>
                                            {Utils.capitalizeFirstLetter(user.lastname)}
                                        </td>
                                        <td>
                                            {Utils.capitalizeFirstLetter(user.firstname)}
                                        </td>
                                        <td>
                                            {Utils.capitalizeFirstLetter(user.email)}
                                        </td>
                                        <td>
                                            {role}
                                        </td>
                                        <td>
                                            {managerUser.firstname + " " + managerUser.lastname}
                                        </td>

                                        <td>
                                            <button className="button_icon button_edit" id={user.id} onClick={editUser}>
                                                <EditIcon className="icon_edit" />
                                            </button>
                                            <button className="button_icon button_delete" onClick={deleteUser}>
                                                <DeleteIcon className="icon_delete" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <section className="d-flex justify-content-center mb-4">
                <button className="button_add" onClick={handleRedirect}>Ajouter un Collaborateur : <AddCircleIcon /></button>
                </section>
            </div>
        </>
    );


}

export default user;