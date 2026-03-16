import { useState } from "react";
import axios from "axios";
import InputField from "./common/InputField";
import Divider from "./common/Divider";
import CloseIcon from '../assets/delete_icon.svg?react';
import { API_BASE_URL } from "../../api/config";

const EditUserModal = ({ user, setEditingUser, setUsers }) => {

    const [form, setForm] = useState(user);

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
            form.name &&
            form.username &&
            form.email &&
            form.phone &&
            form.website &&
            form.address.street &&
            form.address.suite &&
            form.address.city &&
            form.address.zipcode &&
            form.address.geo.lat &&
            form.address.geo.lng &&
            form.company.name &&
            form.company.catchPhrase &&
            form.company.bs;

        if (!allFilled) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.put(`${API_BASE_URL}/users/${user.id}`, form);
            setUsers(prev => prev.map(u => u.id === user.id ? response.data : u));
            setEditingUser(false);
        } catch (err) {
            console.error("Failed to update user:", err);
            alert("Failed to update user.");
        }
    };

    return (
        <div data-cy="edit-user-modal" className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-2.5">
            <div className="bg-white p-2 w-full max-w-md rounded-[20px] overflow-hidden relative">
                <div className="p-5 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-[20px] font-bold text-gray-800">Edit User</p>
                        <button
                            onClick={() => setEditingUser(false)}
                            className="border-2 border-gray-200 p-1.5 flex justify-center items-center rounded-full cursor-pointer"
                        >
                            <CloseIcon className="w-5 h-5 fill-gray-400" />
                        </button>
                    </div>
                    <Divider />
                    <form className="flex flex-col gap-2.5 mt-2.5" onSubmit={handleSubmit}>
                        <label className="text-gray-700 text-[14px] font-medium">Name</label>
                        <InputField data-cy="input-name" value={form.name} onChange={(e) => handleChange(["name"], e.target.value)} placeholder="Name" />

                        <label className="text-gray-700 text-[14px] font-medium">Username</label>
                        <InputField data-cy="input-username" value={form.username} onChange={(e) => handleChange(["username"], e.target.value)} placeholder="Username" />

                        <label className="text-gray-700 text-[14px] font-medium">Email</label>
                        <InputField data-cy="input-email" value={form.email} onChange={(e) => handleChange(["email"], e.target.value)} placeholder="Email" />

                        <label className="text-gray-700 text-[14px] font-medium">Phone</label>
                        <InputField data-cy="input-phone" value={form.phone} onChange={(e) => handleChange(["phone"], e.target.value)} placeholder="Phone" />

                        <label className="text-gray-700 text-[14px] font-medium">Website</label>
                        <InputField data-cy="input-website" value={form.website} onChange={(e) => handleChange(["website"], e.target.value)} placeholder="Website" />

                        <Divider title="Address" />
                        <label className="text-gray-700 text-[14px] font-medium">Street</label>
                        <InputField data-cy="input-street" value={form.address.street} onChange={(e) => handleChange(["address", "street"], e.target.value)} placeholder="Street" />

                        <label className="text-gray-700 text-[14px] font-medium">Suite</label>
                        <InputField data-cy="input-suite" value={form.address.suite} onChange={(e) => handleChange(["address", "suite"], e.target.value)} placeholder="Suite" />

                        <label className="text-gray-700 text-[14px] font-medium">City</label>
                        <InputField data-cy="input-city" value={form.address.city} onChange={(e) => handleChange(["address", "city"], e.target.value)} placeholder="City" />

                        <label className="text-gray-700 text-[14px] font-medium">Zipcode</label>
                        <InputField data-cy="input-zipcode" value={form.address.zipcode} onChange={(e) => handleChange(["address", "zipcode"], e.target.value)} placeholder="Zipcode" />

                        <label className="text-gray-700 text-[14px] font-medium">Latitude</label>
                        <InputField data-cy="input-latitude" value={form.address.geo.lat} onChange={(e) => handleChange(["address", "geo", "lat"], e.target.value)} placeholder="Latitude" />

                        <label className="text-gray-700 text-[14px] font-medium">Longitude</label>
                        <InputField data-cy="input-longitude" value={form.address.geo.lng} onChange={(e) => handleChange(["address", "geo", "lng"], e.target.value)} placeholder="Longitude" />

                        <Divider title="Company" />
                        <label className="text-gray-700 text-[14px] font-medium">Company Name</label>
                        <InputField data-cy="input-company-name" value={form.company.name} onChange={(e) => handleChange(["company", "name"], e.target.value)} placeholder="Company Name" />

                        <label className="text-gray-700 text-[14px] font-medium">Catchphrase</label>
                        <InputField data-cy="input-catchphrase" value={form.company.catchPhrase} onChange={(e) => handleChange(["company", "catchPhrase"], e.target.value)} placeholder="Catchphrase" />

                        <label className="text-gray-700 text-[14px] font-medium">BS</label>
                        <InputField data-cy="input-bs" value={form.company.bs} onChange={(e) => handleChange(["company", "bs"], e.target.value)} placeholder="BS" />

                        <button data-cy="save-changes-btn" type="submit" className="cursor-pointer mt-2.5 bg-blue-500 text-white p-2.5 rounded-[10px] font-bold">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;