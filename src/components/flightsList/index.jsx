import styles from './index.module.scss'
import FlightItem from '../flightItem'

const FlightList = (props) => {
    return(
        <div className={styles.container}>
            {props.flights.map((flight, n) => <FlightItem flight={flight} key={n}/>)}
        </div>
    )
}

export default FlightList