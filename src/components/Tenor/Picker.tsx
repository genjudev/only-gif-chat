import * as React from "react";
import { getTop8 } from "../../services/Tenor";
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
    const [open, setOpen] = React.useState(false);
    const [gifs, setGifs] = React.useState<any[]>([]);

    React.useEffect(() => {
        getTop8().then(({results}: {results: TResponse[]}) => {
            if(!results) return;
            const allGifs = results.map((res: any) => {
                return res.media[0]["gif"].url;
            });
            setGifs(allGifs);
        });
    },[])
    return <>
        <button onClick={() => setOpen(!open)}>Open</button>
        {open && <ImageRaster onClick={onClick} gifs={gifs} />}
    </>
}

export default Picker;