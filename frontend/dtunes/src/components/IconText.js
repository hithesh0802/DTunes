import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const IconText=({iconName, displayText, active, targetLink,onClick}) =>{
    return(
        <Link className="block" to={targetLink}>
            <div className="flex items-center justify-start cursor-pointer" onClick={onClick}>
                <div className="py-2 px-2 ml-3">
                    <Icon 
                        icon={iconName}
                        color={active? "white": "gray"}
                        fontSize={27}
                    />
                </div>
                <div className={`${ active ? "text-white": "text-gray-500"} text-base font-semibold hover:text-white`}>
                    {displayText}
                </div>
            </div>
        </Link>
    )
}

export default IconText;