import * as React from "react";
import Image from "./Image";

type Props = {
    gifs: string[];
    onClick: (url: string) => void;
}

const ImageRaster: React.FC<Props> = ({gifs, onClick}) => {
    return <>
        <ul>
            {gifs.map(gif => <li key={gif} onClick={() => onClick(gif)}><Image url={gif} width={220} height={220} /></li>)}
        </ul>
    </>
}

export default ImageRaster