
export const api = {

    async fetchData (type: string): Promise<any> {
        const result = await fetch('https://restcountries.eu/rest/v2/region/' + type)
        const region: [] = await result.json()
        return region
    }
    
}



