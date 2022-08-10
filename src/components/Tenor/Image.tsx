import * as React from "react";

type Props = {
    url: string;
    width: number;
    height: number;
    alt?: string;
}

const Image: React.FC<Props> = ({url, width, height, alt}) => {
    return <img src={url} alt={alt || ""} style={{ width: width+"px", height: height+"px"}} />
}

export default Image;