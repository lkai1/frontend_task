import UsersList from "./components/UsersList"
import axios from "axios"
import { useEffect, useState } from "react"
import AddUser from "./components/AddUser"
import Divider from "./components/common/Divider"

const App = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3001/api/users")
      setUsers(response.data)
    }
    fetchUsers()
  }, [])

  return (
    <div className="bg-blue-[#fafafa] h-full w-full">
      <AddUser users={users} setUsers={setUsers} />
      <Divider />
      <UsersList users={users} setUsers={setUsers} />
    </div>
  )
}

export default App
