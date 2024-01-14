import { Link, useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import Dialog from "../../Components/Dashboard/Dialog";
import Base from "../../Layouts/Base";
import useDialog from "../../Hooks/useDialog";
import CreateProduct from "../../Components/Dashboard/Users/CreateProduct";
import EditUser from "../../Components/Dashboard/Users/EditUser";
import { Inertia } from "@inertiajs/inertia";

export default function Index(props) {
    const [state, setState] = useState([]);
    const [data, setData] = useState(props.users);
    const [addDialogHandler, addCloseTrigger, addTrigger] = useDialog();
    const [UpdateDialogHandler, UpdateCloseTrigger, UpdateTrigger] =
        useDialog();
    const [destroyDialogHandler, destroyCloseTrigger, destroyTrigger] =
        useDialog();
    const openUpdateDialog = (user) => {
        setState(user);
        UpdateDialogHandler();
    };

    const openDestroyDialog = (user) => {
        setState(user);
        destroyDialogHandler();
    };

    const destroyUser = () => {
        Inertia.delete(route("users.destroy", state.id), {
            onSuccess: () => destroyCloseTrigger(),
        });
    };

    useEffect(() => {
        if (props.users !== null) {
            setData({ ...props.users });
        } else {
            setData({});
        }

        return () => {
            setData({});
        };
    }, []);

    return (
        <>
            <div className="container-fluid py-4">
                <Dialog trigger={addTrigger} title="Create New Product">
                    <CreateProduct close={addCloseTrigger} />
                </Dialog>

                <Dialog
                    trigger={UpdateTrigger}
                    title={`Update User: ${state.name}`}
                >
                    <EditUser model={state} close={UpdateCloseTrigger} />
                </Dialog>

                <Dialog
                    trigger={destroyTrigger}
                    title={`Delete User: ${state.name}`}
                >
                    <p>Are you sure to delete this user ?</p>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn bg-gradient-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            onClick={destroyUser}
                            className="btn bg-gradient-danger"
                        >
                            Delete
                        </button>
                    </div>
                </Dialog>

                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Products table</h6>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                        <button
                                            onClick={addDialogHandler}
                                            type="button"
                                            className="btn bg-gradient-success btn-block mb-3"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModalMessage"
                                        >
                                            Create New Product
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div
                                    className="table-responsive-xxl p-0"
                                    width="100%"
                                >
                                    <table
                                        className="table align-items-center justify-content-center mb-0"
                                        width="100%"
                                    >
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-centter">
                                                    #
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">
                                                    Product name
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">
                                                    description
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">
                                                    price
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">
                                                    weight
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data != null ? (
                                                Object.keys(data).map(
                                                    (id, index) => {
                                                        return (
                                                            <tr key={id}>
                                                                <td className="text-center">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="text-left">
                                                                    <div className="d-flex px-2">
                                                                        <div>
                                                                            <img
                                                                                src={
                                                                                    data[
                                                                                        id
                                                                                    ]
                                                                                        .image
                                                                                }
                                                                                className="avatar avatar-sm  me-3 "
                                                                            />
                                                                        </div>
                                                                        <div className="my-auto">
                                                                            <h6 className="mb-0 text-sm">
                                                                                {
                                                                                    data[
                                                                                        id
                                                                                    ]
                                                                                        .name
                                                                                }
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-left">
                                                                    <p className="text-sm font-weight-bold mb-0">
                                                                        {
                                                                            data[
                                                                                id
                                                                            ]
                                                                                .desc
                                                                        }
                                                                    </p>
                                                                </td>
                                                                <td className="text-left">
                                                                    <span className="text-xs font-weight-bold">
                                                                        {
                                                                            data[
                                                                                id
                                                                            ]
                                                                                .price
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td className="align-middle text-left">
                                                                    <div className="d-flex align-items-center text-left">
                                                                        <span className="text-xs font-weight-bold mb-0">
                                                                            {
                                                                                data[
                                                                                    id
                                                                                ]
                                                                                    .weight
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    className="align-middle text-center"
                                                                    width="10%"
                                                                >
                                                                    <div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                openUpdateDialog(
                                                                                    data[
                                                                                        id
                                                                                    ]
                                                                                )
                                                                            }
                                                                            className="btn btn-vimeo btn-icon-only mx-2"
                                                                        >
                                                                            <span className="btn-inner--icon">
                                                                                <i className="fas fa-pencil-alt"></i>
                                                                            </span>
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                openDestroyDialog(
                                                                                    data[
                                                                                        id
                                                                                    ]
                                                                                )
                                                                            }
                                                                            className="btn btn-youtube btn-icon-only"
                                                                        >
                                                                            <span className="btn-inner--icon">
                                                                                <i className="fas fa-trash"></i>
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <div></div>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => (
    <Base key={page} children={page} title={"Manage Products"} />
);
