import UsersList from "./components/UsersList"
import axios from "axios"
import { useEffect, useState } from "react"
import AddUser from "./components/AddUser"
import Divider from "./components/common/Divider"
import { API_BASE_URL } from "../api/config"

const App = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`)
        setUsers(response.data)
      } catch (err) {
        console.error("Failed to fetch users:", err)
        alert("Failed to load users. Make sure the backend is running on port 3001.")
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="h-full w-full">
      <AddUser users={users} setUsers={setUsers} />
      <Divider />
      <UsersList users={users} setUsers={setUsers} />
    </div>
  )
}

export default App
