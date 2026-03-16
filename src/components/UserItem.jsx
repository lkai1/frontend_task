import { useState } from "react";
import DeleteIcon from '../assets/delete_icon.svg?react';
import Divider from './common/Divider';
import LocationIcon from '../assets/location_icon.svg?react';
import CompanyIcon from '../assets/company_icon.svg?react';
import ContactIcon from '../assets/contact_icon.svg?react';
import EditIcon from '../assets/edit_icon.svg?react';
import EditUserModal from './EditUserModal';

const UserItem = ({ user, deleteUser, setUsers }) => {
    const [editing, setEditing] = useState(false);

    return (
        <div className="bg-white border-2 border-gray-200 m-3.75 w-[320px] p-3.75 rounded-[20px]">
            <div className="flex flex-row justify-between items-center">
                <p className="text-[15px] text-right text-white bg-orange-400 p-2.5 pb-0.5 pt-0.5 rounded-[5px]">
                    ID: {user.id}
                </p>

                <div className="flex flex-row">
                    <button
                        data-cy="edit-user-btn"
                        onClick={() => setEditing(true)}
                        className="mr-2.5 border-2 border-gray-200 p-1.25 flex justify-center items-center rounded-[100%] cursor-pointer"
                    >
                        <EditIcon className="w-5 h-5 fill-gray-400" />
                    </button>
                    <button
                        data-cy="delete-user-btn"
                        onClick={() => deleteUser(user.id)}
                        className="border-2 border-gray-200 p-1.25 flex justify-center items-center rounded-[100%] cursor-pointer"
                    >
                        <DeleteIcon className="w-5 h-5 fill-gray-400" />
                    </button>
                </div>
            </div>

            <p className="font-bold text-[20px] text-gray-800">{user.name}</p>
            <p className="text-gray-400">@{user.username}</p>

            <Divider title={"Contact"} Icon={ContactIcon} />
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.phone}</p>
            <a
                className="text-blue-400"
                href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                target="_blank"
                rel="noreferrer"
            >
                {user.website}
            </a>

            <Divider title={"Location"} Icon={LocationIcon} />
            <p className="text-gray-500">{user.address.suite}</p>
            <p className="text-gray-500">{user.address.street}</p>
            <p className="text-gray-500">{`${user.address.city}, ${user.address.zipcode}`}</p>
            <a
                className="text-blue-400"
                href={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}
                target="_blank"
                rel="noreferrer"
            >
                Google maps
            </a>
            <p className="text-gray-400 text-[12px]">{`${user.address.geo.lat}, ${user.address.geo.lng}`}</p>

            <Divider title={"Company"} Icon={CompanyIcon} />
            <p className="text-orange-400 text-[20px] text-center mt-2.5">{user.company.name}</p>
            <p className="text-gray-400 italic m-1.25 text-center">"{user.company.catchPhrase}"</p>
            <p className="text-gray-500 mt-2.5 text-center">{user.company.bs}</p>

            {editing && (
                <EditUserModal
                    user={user}
                    setEditingUser={setEditing}
                    setUsers={setUsers}
                />
            )}
        </div>
    );
};

export default UserItem;