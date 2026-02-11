
class MarvelService {
    #apiBase = 'https://marvel-server-zeta.vercel.app/'
    #apiKey = 'd4eecb0c66dedbfae4eab45d312fc1df'
    #baseOffset = 0;
    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not find resource ${url},status: ${res.status}`);

        }

        return await res.json()
    }

    getAllCharacters =  async (offset = this.#baseOffset) => {
        const res = await this.getResource(`${this.#apiBase}characters?limit=9&offset=${offset}&apikey=${this.#apiKey}`);

        return res.data.results.map(this.#transformCharacter);
    }

    getCharacter =  async (id) => {
        const res = await this.getResource(`${this.#apiBase}characters/${id}?apikey=${this.#apiKey}`);
        return this.#transformCharacter(res)

    }

    #transformCharacter = (char) => {

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
}

export default MarvelService;