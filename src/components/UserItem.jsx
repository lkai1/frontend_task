import DeleteIcon from '../assets/delete_icon.svg?react'
import Divider from './common/Divider'
import LocationIcon from '../assets/location_icon.svg?react'
import CompanyIcon from '../assets/company_icon.svg?react'
import ContactIcon from '../assets/contact_icon.svg?react'

const UserItem = ({ user, deleteUser }) => {

    return (
        <div className="bg-white border-2 border-gray-200 m-[15px] w-[320px] p-[15px] rounded-[20px]">
            <div className="flex flex-row justify-between items-center">
                <p className="text-[15px] text-right text-white bg-orange-400 p-[10px] pb-[2px] pt-[2px] rounded-[5px]">
                    ID: {user.id}
                </p>
                <button
                    onClick={() => { deleteUser(user.id) }}
                    className="border-2 border-gray-200 p-[5px] flex justify-center items-center rounded-[100%] cursor-pointer">
                    <DeleteIcon className="w-5 h-5 fill-gray-400" />
                </button>
            </div>
            <p className="font-bold text-[20px] text-gray-800">
                {user.name}
            </p>
            <p className="text-gray-400">
                @{user.username}
            </p>
            <Divider title={"Contact"} Icon={ContactIcon} />
            <p className="text-gray-500">
                {user.email}
            </p>
            <p className="text-gray-500">
                {user.phone}
            </p>
            <a
                className="text-blue-400"
                href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                target="_blank"
                rel="noreferrer"
            >
                {user.website}
            </a>
            <Divider title={"Location"} Icon={LocationIcon} />
            <p className="text-gray-500">
                {user.address.suite}
            </p>
            <p className="text-gray-500">
                {user.address.street}
            </p>
            <p className="text-gray-500">
                {`${user.address.city}, ${user.address.zipcode}`}
            </p>
            <a
                className="text-blue-400"
                href={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}
                target="_blank"
                rel="noreferrer"
            >
                Google maps
            </a>
            <p className="text-gray-400 text-[12px]">
                {`${user.address.geo.lat}, ${user.address.geo.lng}`}
            </p>
            <Divider title={"Company"} Icon={CompanyIcon} />
            <p className="text-orange-400 text-[20px] text-center mt-[10px]">
                {user.company.name}
            </p>
            <p className="text-gray-400 italic m-[5px] text-center">
                {`"${user.company.catchPhrase}"`}
            </p>
            <p className="text-gray-500 mt-[10px] text-center">
                {user.company.bs}
            </p>
        </div>
    )
}

export default UserItem