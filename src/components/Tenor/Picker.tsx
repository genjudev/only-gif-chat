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

const Picker: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [gifs, setGifs] = React.useState<any[]>([]);

    React.useEffect(() => {
        getTop8().then(({results}: {results: TResponse[]}) => {
            if(!results) return;
            console.log("DATA", results);
            const allGifs = results.map((res: any) => {
                return res.media[0]["gif"].url;
            });
            setGifs(allGifs);
        });
    },[])
    return <>
        <button onClick={() => setOpen(!open)}>Open</button>
        {open && <ImageRaster gifs={gifs} />}
    </>
}

export default Picker;