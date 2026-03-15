
const Divider = ({ title, Icon }) => {
    if (title && Icon) {
        return (
            <div className="mt-2.5">
                <div className="flex flex-row">
                    <Icon className="fill-gray-300 h-6 mr-0.75" />
                    <p className="text-gray-800 font-bold text-[16px]">{title}</p>
                </div>
                <div className="w-full h-px bg-gray-200 mb-0.5" />
            </div>
        )
    } else if (title) {
        return (
            <div className="mt-2.5">
                <p className="text-gray-800 font-bold text-[16px]">{title}</p>
                <div className="w-full h-px bg-gray-200 mb-0.5" />
            </div>
        )
    }
    return <div className="w-full h-px bg-gray-200 mt-0.5 mb-0.5" />
}

export default Divider