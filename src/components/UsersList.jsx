import UserItem from "./UserItem"
import axios from "axios";
import { API_BASE_URL } from "../../api/config";

const UsersList = ({ users, setUsers }) => {

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/users/${id}`);
            setUsers(users.filter(u => u.id !== id));
        } catch (err) {
            console.error("Failed to delete user:", err);
        }
    };

    return (
        <div className="flex flex-row flex-wrap w-full justify-center">
            {users.map((user) => {
                return <UserItem key={user.id} user={user} deleteUser={deleteUser} setUsers={setUsers} />
            })}
        </div>
    )
}

export default UsersList