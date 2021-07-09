import { api } from '../api/api'

let initialState:{type: string, regionsNames: Array<string>, name: Array<string>, population: Array<number>} = {
    type: '',
    regionsNames: ["Asia", "Europe", "Africa", "Oceania", "Americas", "Polar"],
    name: [],
    population: []
}

const dataReducer = (state = initialState, action: {type: string , regionsNames: Array<string>, name: Array<string>, population: Array<number>}) => {
    return {
        ...state,
        type: action.type,
        name: action.name,
        population: action.population,
    }
}

export const pickRegion = (type: string , regionsNames: Array<string>, name: Array<string>, population: Array<number>) => {
    return {
        type,
        regionsNames,
        name,
        population,
    }
}

export const getData = (type: string) => (dispatch: any) => {
    let name: Array<string> = []
    let population: Array<number> = []
    let result = api.fetchData(type)
    result.then(
        response => response.map((element: { name: string, population: number } ) => 
        (name.push(element.name), population.push(element.population)))
    ).then(response => {
        if (response.length > 0) {
            dispatch(pickRegion(type, initialState.regionsNames, name, population))
        }
    })
}



export default dataReducer