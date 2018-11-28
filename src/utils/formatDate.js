import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD'

const formatDate = date => moment(date).format(DATE_FORMAT)

export default formatDate
