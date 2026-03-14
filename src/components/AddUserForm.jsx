import { useState } from "react"
import InputField from "./common/InputField"
import Divider from "./common/Divider"
import AddUserIcon from '../assets/addUser_icon.svg?react'

const AddUserForm = ({ users, setUsers }) => {

    const emptyForm = {
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
                lat: "",
                lng: ""
            }
        },
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }
    }

    const [form, setForm] = useState(emptyForm)

    const addUser = (user) => {
        setUsers([...users, user])
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleNestedChange = (e, parent) => {
        setForm({ ...form, [parent]: { ...form[parent], [e.target.name]: e.target.value } })
    }

    const handleGeoChange = (e) => {
        setForm({ ...form, address: { ...form.address, geo: { ...form.address.geo, [e.target.name]: e.target.value } } })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

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
            form.company.bs

        if (!allFilled) {
            alert("Please fill in all the fields.")
            return
        }

        addUser({ ...form, id: Number(users[users.length - 1].id) + 1 })
        setForm(emptyForm)
    }

    return (
        <div className="bg-white border-2 border-gray-200 m-[20px] p-[15px] pt-[5px] rounded-[20px] flex flex-row">


            <form
                className="flex flex-row flex-wrap justify-center items-center w-full"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-row justify-between items-center w-full m-[10px]">
                    <p className="font-bold text-[24px] text-gray-800">
                        Add new user
                    </p>
                    <button type="submit"
                        className="rounded-[10px] bg-blue-500 p-[8px] text-white text-[15px] font-bold cursor-pointer flex flex row"
                    >
                        <AddUserIcon className="fill-white h-[22px] mr-[5px]" />
                        <p className="text-[16px]">Add user</p>
                    </button>
                </div>
                <Divider />
                <InputField name="name" value={form.name} onChange={handleChange} placeholder="Name" />
                <InputField name="username" value={form.username} onChange={handleChange} placeholder="Username" />
                <InputField name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                <InputField name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
                <InputField name="website" value={form.website} onChange={handleChange} placeholder="Website" />

                <InputField name="street" value={form.address.street} onChange={(e) => handleNestedChange(e, "address")} placeholder="Street" />
                <InputField name="suite" value={form.address.suite} onChange={(e) => handleNestedChange(e, "address")} placeholder="Suite" />
                <InputField name="city" value={form.address.city} onChange={(e) => handleNestedChange(e, "address")} placeholder="City" />
                <InputField name="zipcode" value={form.address.zipcode} onChange={(e) => handleNestedChange(e, "address")} placeholder="Zipcode" />
                <InputField name="lat" value={form.address.geo.lat} onChange={handleGeoChange} placeholder="Latitude" />
                <InputField name="lng" value={form.address.geo.lng} onChange={handleGeoChange} placeholder="Longitude" />

                <InputField name="name" value={form.company.name} onChange={(e) => handleNestedChange(e, "company")} placeholder="Company name" />
                <InputField name="catchPhrase" value={form.company.catchPhrase} onChange={(e) => handleNestedChange(e, "company")} placeholder="Company catchphrase" />
                <InputField name="bs" value={form.company.bs} onChange={(e) => handleNestedChange(e, "company")} placeholder="Company bs" />
            </form>
        </div>
    )
}

export default AddUserForm