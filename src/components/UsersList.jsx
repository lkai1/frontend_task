import UserItem from "./UserItem"

const UsersList = ({ users, setUsers }) => {

    const deleteUser = (userId) => {
        setUsers(users.filter((user) => { return user.id !== userId }))
    }

    return (
        <div className="flex flex-row flex-wrap w-full justify-center">
            {users.map((user) => {
                return <UserItem key={user.id} user={user} deleteUser={deleteUser} />
            })}
        </div>
    )
}

export default UsersList