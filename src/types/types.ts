
export interface IChar {
    name: string,
    description: string,
    thumbnail: string,
    homepage: string,
    wiki: string,
    comics: any,
    id?: number
}

export interface IComics {
    id: any;
    name: any;
    description: string | any[];
    thumbnail: { path: string; extension: string; };
    urls: { url: any; }[]; comics: { items: any; };
}