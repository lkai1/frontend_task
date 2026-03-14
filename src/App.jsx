import UsersList from "./components/UsersList"
import axios from "axios"
import { useEffect, useState } from "react"
import AddUserForm from "./components/AddUserForm"
import Divider from "./components/common/Divider"

const App = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      setUsers(response.data)
    }
    fetchUsers()
  }, [])

  return (
    <div className="bg-blue-[#fafafa] h-full w-full">
      <AddUserForm users={users} setUsers={setUsers} />
      <Divider />
      <UsersList users={users} setUsers={setUsers} />
    </div>
  )
}

export default App
