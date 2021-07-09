import { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../reducers/data-reducer';
import { RootState } from '../index';
import { Bar } from 'react-chartjs-2';
  
const Region: FunctionComponent = (props: any) => {

    const dispatch = useDispatch()
    const population = useSelector((state: RootState) => {return state.data.population})
    const names = useSelector((state: RootState) => {return state.data.name})
    const regionsNames = useSelector((state: RootState) => {return state.data.regionsNames})
    let regions_options: [] = regionsNames.map((element: string) => {return <option value={element}>{element}</option>})
    
    const data = {
        labels: names,
        datasets: [
          {
            label: '',
            data: population,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(10, 20, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        indexAxis: 'x',
        minBarLength: '3',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'right',
          },
          
          title: {
            display: false,
            text: '',
          },
        },
      };

    const onButtonClick = (type: string) => {
        dispatch(getData(type))
    }

    useEffect(() => {
        dispatch(getData('Asia'))
    }, []);
    
    
    
    return <div>
        <h1>Графики распределения населения по регионам</h1>
        <select className='select-css' onChange={e => onButtonClick(e.target.value)}>
          {regions_options}
        </select>
        <Bar type='bar' data={data} options={options} className='bar'/>
    </div>
}

export default Region