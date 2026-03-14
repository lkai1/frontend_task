
const Divider = ({ title, Icon }) => {
    if (title && Icon) {
        return (
            <div className="mt-[10px]">
                <div className="flex flex-row">
                    <Icon className="fill-gray-300 h-[24px] mr-[3px]" />
                    <p className="text-gray-800 font-bold text-[16px]">{title}</p>
                </div>
                <div className="w-full h-[1px] bg-gray-200 mb-[2px]" />
            </div>
        )
    } else if (title) {
        return (
            <div className="mt-[10px]">
                <p className="text-gray-800 font-bold text-[16px]">{title}</p>
                <div className="w-full h-[1px] bg-gray-200 mb-[2px]" />
            </div>
        )
    }
    return <div className="w-full h-[1px] bg-gray-200 mt-[2px] mb-[2px]" />
}

export default Divider