
export interface IChar {
    id?: number,
    name?: string,
    description?: string,
    thumbnail?: any,
    homepage?: string,
    wiki?: string,
    urls: { type?: string, url: string }[],
    comics?: { items: [] }
}

export interface IComics {
    id: any;
    name: any;
    description: string | any[];
    thumbnail: { path: string; extension: string; };
    urls: { url: any; }[]; comics: { items: any; };
}

export interface IComicsList {
    data: { results: IComics[] },
    count: number,
    offset: number,
    limit: number,
    total: number
}

export interface IAllComicsList {
    id: number,
    title: string,
    description: string,
    pageCount: any,
    thumbnail: { path: string; extension: string; },
    name: any,
    textObjects: { language: any; }[],
    prices: { price: any; }[]
}




