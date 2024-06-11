import SegmentItem from '../segmentItem'
import styles from './index.module.scss'

const FlightItem = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>LOGO</span>
                <div className={styles.price_block}>
                    <p className={styles.price}>{[props.flight.flight.price.total.amount, props.flight.flight.price.total.currency].join(' ')}</p>
                    <p className={styles.price_desc}>Стоимость для одного взрослого пассажира</p>
                </div>
            </div>
            <div className={styles.info}>
                {/* {props.flight.flight.legs[0].segments.map((segment, n) => <SegmentItem segment={segment} key={n} />)} */}
                <SegmentItem segments={props.flight.flight.legs[0].segments} duration={props.flight.flight.legs[0].duration}/>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.info}>
                <SegmentItem segments={props.flight.flight.legs[1].segments} duration={props.flight.flight.legs[1].duration}/>
            </div>
            <button className={styles.choose_btn}>Выбрать</button>
        </div>
    )
}

export default FlightItem