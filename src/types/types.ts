export type comic = {
    id: number | string,
    title: string,
    description: string,
    thumbnail: string,
    pageCount: number,
    price: number,
    languages: string,
}


export type character = {
    id: number | string,
    name: string,
    description: string,
    thumbnail: string,
    homepage: string,
    wiki: string,
    comics: string[]
}