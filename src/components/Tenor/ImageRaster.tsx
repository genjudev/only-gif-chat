import * as React from "react";
import Image from "./Image";

type Props = {
    gifs: string[]
}

const ImageRaster: React.FC<Props> = ({gifs}) => {
    return <>
        <ul>
            {gifs.map(gif => <li key={gif}><Image url={gif} width={220} height={220} /></li>)}
        </ul>
    </>
}

export default ImageRaster