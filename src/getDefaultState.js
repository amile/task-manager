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
        {id: '1', parentId: '34', label: 'Learn React'},
        {id: '2', parentId: '35', label: 'Learn Redux'},
        {id: '6', parentId: '2', label: 'Learn Redux-saga'}
    ],
    tasks: [
        {id: '3', parentId: '6', label: 'React task1'}, 
        {id: '4', parentId: '6', label: 'React task2'},
        {id: '5', parentId: '2', label: 'Redux task2'},
        {
            id: '7',
            parentId: '1',
            label: 'Иерархия пользователей. При удалении пользователя в консоли выводится сообщение об ошибке 500. Пользователь не удаляется',
            dateCreated: formatDate(new Date()),
            user: '88',
            status: 'testing',
            assigned: ['89'],
            tags: ['99', '98'],
            comments: [
                { label: 'Иерархия пользователей. При удалении пользователя в консоли выводится сообщение об ошибке 500.',
                    user: '89',
                    date: new Date()
                },
                { label: 'Есть пара вопросов, смотри во вложении.',
                    user: '89',
                    date: new Date()
                }
            ],
            history: [{user: '88', label: 'создал задачу', date: new Date() }]
        }
    ],
    tags: [
        {id: '99',label: 'Баги', color: 'violet'}, 
        {id: '98', label: 'В работу', color: 'green'},
        {id: '97', label: 'Срочно', color: 'red'}
    ]
};

const initialState = {
    currentUser: null,
    users: [],
    showedGroup: null,
    projects: [],
    groups: [],
    tasks: []
};

export default initialState;

