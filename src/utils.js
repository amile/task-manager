import bcript from 'bcryptjs';

export const genPasswordHash = (pass) => {
    const hash = bcript.hashSync(pass, 8);
    return hash;
}
const passHashDimon = genPasswordHash('1qa2ws3ed');
const passHashBoris = genPasswordHash('qweasdzxc');

export const comparePasswordHash = (pass, hash) => {
    return bcript.compare(pass, hash);
}


let idx = 100;

export const createNewIndex = () => {
    return (++idx).toString()
}

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