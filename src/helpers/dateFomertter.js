import moment from 'moment';

export const formatDate = (dateTimeString) => {
    const formattedDateTime = moment(dateTimeString).fromNow();
    return formattedDateTime;
  }