import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from './index.module.scss'
import dayjs from 'dayjs';

const SegmentItem = (props) => {
    // console.log(props.segments)
    return (
        <div className={styles.container}>
            <div className={styles.cities}>
                <div className={styles.departure}>
                    {
                        props.segments[0].departureCity?
                        [props.segments[0].departureCity.caption, props.segments[0].departureAirport.caption].join(', ')
                        :
                        props.segments[0].departureAirport.caption
                    }
                    <span className={styles.airport}>&nbsp;({props.segments[0].departureAirport.uid})</span>
                </div>
                <ArrowRightAltIcon />
                <div className={styles.arrival}>
                    {
                        props.segments[props.segments.length - 1].arrivalCity?
                        [props.segments[props.segments.length - 1].arrivalCity.caption, props.segments[props.segments.length - 1].arrivalAirport.caption].join(', ')
                        :
                        props.segments[props.segments.length - 1].arrivalAirport.caption
                    }
                    <span className={styles.airport}>&nbsp;({props.segments[props.segments.length - 1].arrivalAirport.uid})</span>
                </div>
            </div>
            <hr />
            <div className={styles.dates}>
                <div className={styles.date_and_time}>
                    <div>{dayjs(props.segments[0].departureDate).format('HH:mm')}</div>
                    <div className={styles.date}>{dayjs(props.segments[0].departureDate).format('DD MMM')}</div>
                </div>
                <div className={styles.duration}>
                    <AccessTimeIcon />
                    {Math.floor(props.duration / 60)} ч {props.duration % 60} мин
                </div>
                <div className={styles.date_and_time}>
                    <div className={styles.date}>{dayjs(props.segments[props.segments.length - 1].arrivalDate).format('DD MMM')}</div>
                    <div>{dayjs(props.segments[props.segments.length - 1].arrivalDate).format('HH:mm')}</div>
                </div>
            </div>
            <div className={styles.transfer_container}>
                <div className={styles.transfer_block}>
                    {props.segments.length > 1 && <span className={styles.transfer}>{props.segments.length - 1} {props.segments.length - 1 == 1? 'пересадка': 'пересадки'}</span>}
                </div>
            </div>
            <p>Рейс выполняет: {props.segments[0].airline.caption}</p>
        </div>
    )
}

export default SegmentItem