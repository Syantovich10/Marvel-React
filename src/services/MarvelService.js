import {useHttp} from "../hooks/http.hook";



const useMarvelService = ()  =>{
    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://marvel-server-zeta.vercel.app/'
    const _apiKey = 'd4eecb0c66dedbfae4eab45d312fc1df'
    const _baseOffset = 0;

    const getAllCharacters =  async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter =  async (id) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
        return _transformCharacter(res)

    }

    const _transformCharacter = (char) => {

        const data = char.data ? char.data.results[0] : char;

        return {
            id: data.id,
            name: data.name,
            description: data.description ? `${data.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,
            homepage: data.urls[0].url,
            wiki: data.urls[1].url,
            comics: data.comics.items
        }
    }

    const _transformComics =  (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description ? `${comic.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            pageCount: comic.pageCount,
            price: comic.prices[0].price,
            languages: comic.textObjects.languages,
        }
    }

    const getAllComics = async (offset = _baseOffset, limit = 9) =>{
        const res = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic,};


}



export default useMarvelService;