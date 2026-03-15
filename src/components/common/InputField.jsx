
const InputField = ({ name, value, onChange, placeholder }) => {
    return <input
        className="border-2 border-gray-300 m-1.75 rounded-[5px] p-2 focus:border-gray-400 outline-none"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
}

export default InputField