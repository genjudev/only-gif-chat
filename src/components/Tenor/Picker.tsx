import * as React from "react";
import { getFromPattern, getTop8 } from "../../services/Tenor";
import ImageRaster from "./ImageRaster";

type Dims = [number, number];

type TGif = {
    preview: string;
    size: number;
    dims: Dims;
    url: string;
}

type TMedia = {
    gif: TGif
}

type TResponse = {
    id: string;
    title: string;
    content_description: string;
    content_rating: string,
    h1_title: string;
    media: TMedia[];

}

type Props = {
    onClick: (url: string) => void;
}

const Picker: React.FC<Props> = ({onClick}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [gifs, setGifs] = React.useState<any[]>([]);

    return <>
        <input ref={inputRef} type="text" onChange={(e) => {
             getFromPattern(e.target.value).then(({results}: {results: TResponse[]}) => {
            if(!results) return;
            const allGifs = results.map((res: any) => {
                return res.media[0]["gif"].url;
            });
            setGifs(allGifs);
        })}} /> <button onClick={() => {
            getTop8().then(({results}: {results: TResponse[]}) => {
                if(!results) return;
                const allGifs = results.map((res: any) => {
                    return res.media[0]["gif"].url;
                });
                setGifs(allGifs);
                if(inputRef.current !== null) {
                    inputRef.current.value = "";
                }
            });
        }}>Top 8</button>
        {gifs.length > 0 && <ImageRaster onClick={(url: string) => {
            onClick(url);
        }} gifs={gifs} />}
    </>
}

export default Picker;