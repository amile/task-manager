import { formatDate } from './utils';
export const defaultState = {
    currentUser: '89',
    users: [
        {id: '88', login: 'dimon', passHash: '$2a$08$djyiemyHNqGRKUdinu7zPuGc0Lneo/YmjJ7eER7vXIpFSMqqKFK.e', firstName: 'Дмитрий', lastName: 'Иванов', foto: null},
        {id: '89', login: 'boris', passHash: '$2a$08$uCHWtGxv1AUd2x09dPLVAuJL7nggyuRCdPwLEhvNA2hsGnuM0k6F.', firstName: 'Борис', lastName: 'Волков', foto: null}
    ],
    showedGroup: null,
    projects: [
        {id: '34', label: 'НеРадио'},
        {id: '35', label: 'Inanomo'}
    ],
    groups: [
        {id: '1', parentId: '34', label: 'Мобильное приложение'},
        {id: '2', parentId: '35', label: 'Лендинг'},
        {id: '9', parentId: '35', label: 'Личный кабинет'},
        {id: '6', parentId: '1', label: 'Админка'},
        {id: '7', parentId: '6', label: 'Сервер'},
        {id: '8', parentId: '6', label: 'Клиент'},
        {id: '10', parentId: '7', label: 'Администрирование'},
        {id: '13', parentId: '10', label: 'Настройка сервера'},
        {id: '11', parentId: '10', label: 'Локальное тестирование'},
        {id: '12', parentId: '10', label: 'Боевое тестирование'},
    ],
    tasks: [
        {
            id: '3', parentId: '7', label: 'Баги в сервисе "новости/объявления"', 
            dateCreated: new Date(), user: '88', status: 'testing',
            assigned: [],
            tags: ['99'],
            comments: [],
            history: [{user: '88', label: 'создал задачу', date: new Date() }]
        }, 
        {
            id: '4', parentId: '7', label: 'Бальная оценка. Если полностью стереть значение модификатора и нажать клавишу Enter в консоли выводится ошибка 400, значение модификатора не изменяется', 
            dateCreated: new Date(), user: '89', status: 'done',
            assigned: [],
            tags: [],
            comments: [],
            history: [{user: '88', label: 'создал задачу', date: new Date() }]
        },
        {
            id: '5', parentId: '10', label: 'Баги в сервисе "новости/объявления"', 
            dateCreated: new Date(), user: '88', status: 'testing',
            assigned: ['89'],
            tags: ['96'],
            comments: [],
            history: [{user: '88', label: 'создал задачу', date: new Date() }]
        },
        {
            id: '7',
            parentId: '2',
            label: 'Иерархия пользователей. При удалении пользователя в консоли выводится сообщение об ошибке 500. Пользователь не удаляется',
            dateCreated: new Date(2019, 11, 10),
            user: '88',
            status: 'testing',
            assigned: ['89', '88', '89', '89'],
            tags: ['99', '98'],
            comments: ['25', '26'],
        },
        {
            id: '8',
            parentId: '2',
            label: 'Иерархия пользователей',
            dateCreated: new Date(2019, 11, 11, 6, 4),
            user: '88',
            status: 'done',
            assigned: ['89', '88'],
            tags: ['99', '98'],
            comments: [],
        },
        {
            id: '9',
            parentId: '2',
            label: 'Бальная оценка. Если полностью стереть значение модификатора и нажать клавишу Enter в консоли выводится ошибка 400, значение модификатора не изменяется',
            dateCreated: new Date(2019, 11, 7, 15, 1),
            user: '89',
            status: 'done',
            assigned: ['89'],
            tags: ['96'],
            comments: [],
        },
        {
            id: '30', parentId: '13', label: 'Ошибка сервера', 
            dateCreated: new Date(), user: '88', status: 'testing',
            assigned: [],
            tags: ['99'],
            comments: [],
            history: [{user: '88', label: 'создал задачу', date: new Date() }]
        },
    ],
    tags: [
        {id: '99',label: 'Баги', color: 'violet'}, 
        {id: '98', label: 'В работу', color: 'green'},
        {id: '97', label: 'Срочно', color: 'red'},
        {id: '96', label: 'Важно', color: 'yellow'}
    ],
    comments: [
        { id: '25',
            parentId: '7',
            label: `{
            "blocks": 
            [
                {
                    "key": "8q3pe",
                    "data": {},
                    "depth": 0,
                    "entityRanges": [],
                    "inlineStyleRanges": [],
                    "text": "Иерархия пользователей. При удалении пользователя в консоли выводится сообщение об ошибке 500.",
                    "type": "unstyled"
                }
            ], 
            "entityMap": {}
        }`,
            user: '89',
            date: new Date()
        },
        { id: '26',
            parentId: '7',
            label: `{
            "blocks": 
            [
                {
                    "key": "8q3pe",
                    "data": {},
                    "depth": 0,
                    "entityRanges": [],
                    "inlineStyleRanges": [],
                    "text": "Есть пара вопросов, смотри во вложении..",
                    "type": "unstyled"
                }
            ], 
            "entityMap": {}
        }`,
            user: '89',
            date: new Date()
        }
    ],
};

const initialState = {
    currentUser: null,
    users: [],
    showedGroup: null,
    projects: [],
    groups: [],
    tasks: [],
    comments: [],
};

export default initialState;

