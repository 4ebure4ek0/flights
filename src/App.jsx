import { useEffect, useState } from "react"
import Filters from "./components/filters"
import FlightList from "./components/flightsList"
import data from './mocks/flights.js'

function App() {
    const [filteredData, setFilteredData] = useState(data.result.flights)
    const [filters, setFilters] = useState({
        sorted: 0,
        transfers: {
            one: false,
            none: false
        },
        price: {
            from: 0,
            to: 1000000
        },
        airlines: {}
    })

    useEffect(() => {
        let airlines = []
        if(filters.transfers.one && filters.transfers.none){
            airlines = data.result.bestPrices.DIRECT.bestFlights.concat(data.result.bestPrices.ONE_CONNECTION.bestFlights)
        } else if(filters.transfers.one){
            airlines = data.result.bestPrices.ONE_CONNECTION.bestFlights
        } else if(filters.transfers.none){
            airlines = data.result.bestPrices.DIRECT.bestFlights
        }
        else{
            airlines = data.result.bestPrices.DIRECT.bestFlights.concat(data.result.bestPrices.ONE_CONNECTION.bestFlights)
        }
        airlines.forEach(el => el.checked = false)
        setFilters({ ...filters, airlines: airlines })
        console.log(airlines)
    }, [filters.transfers])

    useEffect(() => {
        let flights = data.result.flights
//<=============================================================================================================================>
//фильтр по авиакомпании
        let airlines = []
        Object.values(filters.airlines)
            .filter((el) => el.checked)
            .forEach((el) => airlines.push(el.carrier.uid))
        console.log(airlines)
        console.log(flights)
        if(airlines.length){
            flights = flights.filter((el) => airlines.includes(el.flight.carrier.uid))
        }
//<=============================================================================================================================>
//фильтр по цене
        flights = flights.filter((el) => Number(el.flight.price.total.amount) >= Number(filters.price.from) && Number(el.flight.price.total.amount) <= Number(filters.price.to))
//<=============================================================================================================================>
//фильтр по пересадкам
        if(filters.transfers.none && filters.transfers.one){
            // setFilters({...filters, airlines: {...data.result.bestPrices.DIRECT.bestFlights.concat(data.result.bestPrices.ONE_CONNECTION.bestFlights)}})
            flights = flights.filter((el) => el.flight.legs[0].segments.length + el.flight.legs[1].segments.length == 2 || el.flight.legs[0].segments.length + el.flight.legs[1].segments.length == 3)
        }
        else if(filters.transfers.one){
            // setFilters({...filters, airlines: {...data.result.bestPrices.ONE_CONNECTION.bestFlights}})
            flights = flights.filter((el) => el.flight.legs[0].segments.length + el.flight.legs[1].segments.length == 3)
        }
        else if(filters.transfers.none){
            // setFilters({...filters, airlines: {...data.result.bestPrices.DIRECT.bestFlights}})
            flights = flights.filter((el) => el.flight.legs[0].segments.length + el.flight.legs[1].segments.length == 2)
        }
//<=============================================================================================================================>
//сортировка
        switch (filters.sorted) {
            case 0:
                flights = flights.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount)
                break;
            case 1:
                flights = flights.sort((a, b) => b.flight.price.total.amount - a.flight.price.total.amount)
                break;
            case 2:
                flights = flights.sort((a, b) => a.flight.legs[0].duration + a.flight.legs[1].duration - b.flight.legs[0].duration - b.flight.legs[1].duration)
                break;
        }
//<=============================================================================================================================>
        // console.log(flights)
        setFilteredData([...flights])
    }, [filters])
    return (
        <div className="container">
            <main>
                <Filters filters={filters} setFilters={setFilters} />
                <FlightList flights={filteredData} />
            </main>
        </div>
    )
}

export default App
