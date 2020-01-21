import bcript from 'bcryptjs';

import * as moment from 'moment';
import 'moment/locale/ru';

moment.updateLocale('ru', {
    calendar : {
        lastDay : '[Вчера]',
        sameDay : '[Сегодня]',
        nextDay : '[Завтра]',
        lastWeek : 'D MMM',
        nextWeek : 'D MMM',
        sameElse : 'D MMM'
    }
});

export const getCalendarDate = (date) => {
    return moment(date).calendar();
}

export const getDate = (date) => {
    return moment(date).format('D MMM');
}

export const getTime = (date) => {
    return moment(date).format('H:mm');
}

export const genHash = (text) => {
    const hash = bcript.hashSync(text, 8);
    return hash;
}

export const compareHash = (text, hash) => {
    return bcript.compare(text, hash);
}

// const passHashDimon = genPasswordHash('1qa2ws3ed');
// const passHashBoris = genPasswordHash('qweasdzxc');

let idx = 100;

export const createNewIndex = () => {
    return (++idx).toString()
}

export const findItemInList = (itemId, itemsList, callback) => {
    return itemsList.map((item) => {
        if (item.id === itemId) {
            return callback(item);
        }
        return item
    });
}

/* const findGroup = (id, items) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i];
        }
        else if (items[i].groups && (items[i].groups.length > 0)) {
            findGroup(id, items[i].groups);
        }
    }
} */

export const formatDate = (date) => {
    const monthNames = ['января', 'февраля', 'марта', 'апреля', 
        'майа', 'июня', 'июля', 'августа', 'сентября', 'октября', 
        'ноября', 'декабря'];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day} ${monthNames[month]} ${year}, ${hours}:${minutes}`;
}

export const stateDataList = ['projects', 'groups', 'tasks', 'users', 'tags', 'comments', 'files'];

export const statusList = {
    'acceptance': 'Приемка', 
    'process': 'В работе', 
    'testing': 'Тестирование',
    'done': 'Выполнено'
};

export const formatStatus = (status) => {
    switch(status) {
        case('acceptance'):
            return 'Приемка'
        case('process'):
            return 'В работе'
        case('testing'):
            return 'Тестирование'
        case('done'):
            return 'Выполнено'
        default:
            return ''
    }
}