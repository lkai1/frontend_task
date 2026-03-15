import { useState } from "react";
import InputField from "./common/InputField";
import Divider from "./common/Divider";
import AddUserIcon from '../assets/addUser_icon.svg?react';
import CloseIcon from '../assets/delete_icon.svg?react';
import axios from "axios";

const AddUser = ({ users, setUsers }) => {
    const emptyForm = {
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
        address: { street: "", suite: "", city: "", zipcode: "", geo: { lat: "", lng: "" } },
        company: { name: "", catchPhrase: "", bs: "" }
    };

    const [form, setForm] = useState(emptyForm);
    const [open, setOpen] = useState(false);

    const handleChange = (path, value) => {
        setForm(prev => {
            const newState = { ...prev };
            let temp = newState;
            for (let i = 0; i < path.length - 1; i++) {
                temp[path[i]] = { ...temp[path[i]] };
                temp = temp[path[i]];
            }
            temp[path[path.length - 1]] = value;
            return newState;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allFilled =
            form.name && form.username && form.email && form.phone && form.website &&
            form.address.street && form.address.suite && form.address.city && form.address.zipcode &&
            form.address.geo.lat && form.address.geo.lng &&
            form.company.name && form.company.catchPhrase && form.company.bs;

        if (!allFilled) {
            alert("Please fill in all the fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/api/users", form);
            setUsers([...users, response.data]);
            setForm(emptyForm);
            setOpen(false);
        } catch (err) {
            console.error("Failed to create user:", err);
            alert("Failed to create user, check console for details.");
        }
    };

    return (
        <div className="m-5">
            <div className="bg-white border-2 border-gray-200 p-4 rounded-[20px] flex justify-between items-center">
                <p className="text-[30px] text-gray-800 font-bold" style={{ fontFamily: 'AntonSC, sans-serif' }}>
                    Users App Task
                </p>
                <button
                    className="cursor-pointer flex items-center gap-2 bg-blue-500 text-white p-2 rounded-[10px] font-bold"
                    onClick={() => setOpen(true)}
                >
                    <AddUserIcon className="h-5.5 fill-white" />
                    Add user
                </button>
            </div>

            {open && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-2.5">
                    <div className="bg-white w-full max-w-md rounded-[20px] p-5 max-h-[90vh] overflow-y-auto relative">
                        <div className="flex justify-between items-center mb-3">
                            <p className="text-[20px] font-bold text-gray-800">Add User</p>
                            <button
                                onClick={() => setOpen(false)}
                                className="border-2 border-gray-200 p-1.5 flex justify-center items-center rounded-full cursor-pointer"
                            >
                                <CloseIcon className="w-5 h-5 fill-gray-400" />
                            </button>
                        </div>
                        <Divider />

                        <form className="flex flex-col gap-2.5 mt-2.5" onSubmit={handleSubmit}>
                            <label className="text-gray-700 text-[14px] font-medium">Name</label>
                            <InputField value={form.name} onChange={e => handleChange(["name"], e.target.value)} placeholder="Name" />

                            <label className="text-gray-700 text-[14px] font-medium">Username</label>
                            <InputField value={form.username} onChange={e => handleChange(["username"], e.target.value)} placeholder="Username" />

                            <label className="text-gray-700 text-[14px] font-medium">Email</label>
                            <InputField value={form.email} onChange={e => handleChange(["email"], e.target.value)} placeholder="Email" />

                            <label className="text-gray-700 text-[14px] font-medium">Phone</label>
                            <InputField value={form.phone} onChange={e => handleChange(["phone"], e.target.value)} placeholder="Phone" />

                            <label className="text-gray-700 text-[14px] font-medium">Website</label>
                            <InputField value={form.website} onChange={e => handleChange(["website"], e.target.value)} placeholder="Website" />

                            <Divider title="Address" />
                            <label className="text-gray-700 text-[14px] font-medium">Street</label>
                            <InputField value={form.address.street} onChange={e => handleChange(["address", "street"], e.target.value)} placeholder="Street" />

                            <label className="text-gray-700 text-[14px] font-medium">Suite</label>
                            <InputField value={form.address.suite} onChange={e => handleChange(["address", "suite"], e.target.value)} placeholder="Suite" />

                            <label className="text-gray-700 text-[14px] font-medium">City</label>
                            <InputField value={form.address.city} onChange={e => handleChange(["address", "city"], e.target.value)} placeholder="City" />

                            <label className="text-gray-700 text-[14px] font-medium">Zipcode</label>
                            <InputField value={form.address.zipcode} onChange={e => handleChange(["address", "zipcode"], e.target.value)} placeholder="Zipcode" />

                            <label className="text-gray-700 text-[14px] font-medium">Latitude</label>
                            <InputField value={form.address.geo.lat} onChange={e => handleChange(["address", "geo", "lat"], e.target.value)} placeholder="Latitude" />

                            <label className="text-gray-700 text-[14px] font-medium">Longitude</label>
                            <InputField value={form.address.geo.lng} onChange={e => handleChange(["address", "geo", "lng"], e.target.value)} placeholder="Longitude" />

                            <Divider title="Company" />
                            <label className="text-gray-700 text-[14px] font-medium">Company Name</label>
                            <InputField value={form.company.name} onChange={e => handleChange(["company", "name"], e.target.value)} placeholder="Company Name" />

                            <label className="text-gray-700 text-[14px] font-medium">Catchphrase</label>
                            <InputField value={form.company.catchPhrase} onChange={e => handleChange(["company", "catchPhrase"], e.target.value)} placeholder="Catchphrase" />

                            <label className="text-gray-700 text-[14px] font-medium">BS</label>
                            <InputField value={form.company.bs} onChange={e => handleChange(["company", "bs"], e.target.value)} placeholder="BS" />

                            <button type="submit" className="cursor-pointer mt-2.5 bg-blue-500 text-white p-2.5 rounded-[10px] font-bold">
                                Create User
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddUser;