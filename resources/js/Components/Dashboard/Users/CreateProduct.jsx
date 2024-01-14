import { useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";

export default function CreateUser({ close }, props) {

    const { data, setData, post, reset, errors } = useForm({
        name: "",
        desc: "",
        price: "",
        weight: "",
        image: "",
    });


    const onChange = (e) => {
        e.target.id == "image"
            ? setData({ ...data, [e.target.id]: e.target.files[0]})
            : setData({ ...data, [e.target.id]: e.target.value });
    };

    const onSubmit = (e) => {

        e.preventDefault();
        post(route("users.product-add"), {
            data,
            onSuccess: () => {
                reset(), close();
            },
        });
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="name" className="col-form-label">
                            Product name:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={data.name}
                            onChange={onChange}
                            id="name"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc" className="col-form-label">
                            Product description:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="desc"
                            value={data.desc}
                            onChange={onChange}
                            id="desc"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.desc}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="price" className="col-form-label">
                            Price:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="price"
                            value={data.price}
                            onChange={onChange}
                            id="price"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.price}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight" className="col-form-label">
                            Weight:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="weight"
                            value={data.weight}
                            onChange={onChange}
                            id="weight"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.weight}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="image" className="col-form-label">
                            Image:
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={onChange}
                            id="image"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.image}
                            </div>
                        )}
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn bg-gradient-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button type="submit" className="btn bg-gradient-primary">
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}
