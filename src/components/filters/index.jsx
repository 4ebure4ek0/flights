import styles from './index.module.scss'

const Filters = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.filter_item}>
                <h4>Сортировать</h4>
                <div>
                    <p>
                        <input type="radio" name="sort" value={0} checked={props.filters.sorted == 0? true : false} onChange={() => props.setFilters({ ...props.filters, sorted: 0 })} /> - по возрастанию цены
                    </p>
                    <p>
                        <input type="radio" name="sort" value={1} checked={props.filters.sorted == 1? true : false} onChange={() => props.setFilters({ ...props.filters, sorted: 1 })} /> - по убыванию цены
                    </p>
                    <p>
                        <input type="radio" name="sort" value={2} checked={props.filters.sorted == 2? true : false} onChange={() => props.setFilters({ ...props.filters, sorted: 2 })} /> - по времени в пути
                    </p>
                </div>
            </div>
            <div className={styles.filter_item}>
                <h4>Фильтровать</h4>
                <div>
                    <p>
                        <input type="checkbox" checked={props.filters.transfers.one} onChange={() => props.setFilters({ ...props.filters, transfers: { ...props.filters.transfers, one: !props.filters.transfers.one } })} /> - 1 пересадка
                    </p>
                    <p>
                        <input type="checkbox" checked={props.filters.transfers.none} onChange={() => props.setFilters({ ...props.filters, transfers: { ...props.filters.transfers, none: !props.filters.transfers.none } })} /> - без пересадок
                    </p>
                </div>
            </div>
            <div className={styles.filter_item}>
                <h4>Цена</h4>
                <div className={styles.filter_item}>
                    <p className={styles.price}>
                        От <input className={styles.price_input} type="number" min="0" max="999999" value={props.filters.price.from} onInput={(e) => props.setFilters({ ...props.filters, price: { ...props.filters.price, from: e.target.value } })} />
                    </p>
                    <p className={styles.price}>
                        До <input className={styles.price_input} type="number" min="1" max="1000000" value={props.filters.price.to} onInput={(e) => props.setFilters({ ...props.filters, price: { ...props.filters.price, to: e.target.value } })} />
                    </p>
                </div>
            </div>
            <div className={styles.filter_item}>
                <h4>Авиакомпании</h4>
                <div>
                    {Object.entries(props.filters.airlines).map((airline, n) => (
                        <div className={styles.filter_airline} key={n}>
                            <input type="checkbox" checked={props.filters.airlines[n].checked} onChange={() => props.setFilters({ ...props.filters, airlines: { ...props.filters.airlines, [n]: { ...props.filters.airlines[n], checked: !props.filters.airlines[n].checked } } })} />
                            <p className={styles.airline_caption}> - {airline[1].carrier.caption}</p>
                            <p> от {[airline[1].price.amount, airline[1].price.currency].join(' ')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Filters