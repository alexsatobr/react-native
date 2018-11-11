import moment from 'moment-timezone';

export default function MomentTz(dateToStore, timeZone) {
	return moment().tz(dateToStore, 'YYYY-MM-DD HH:mm', timeZone).utc();
}
