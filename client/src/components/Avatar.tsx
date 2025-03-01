import React from 'react'
import { Avatar as CAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
interface IAvatar {

    alt: string;
}
const Avatar: React.FC<IAvatar> = ({ alt }) => {
    return (
        <CAvatar>
            <AvatarImage src={""} />
            <AvatarFallback>{alt}</AvatarFallback>
        </CAvatar>
    )
}

export default Avatar