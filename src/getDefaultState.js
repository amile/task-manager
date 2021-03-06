
const list = [ ...Array(22).keys() ];
let levelId = 38;
const levelList = list.map((item) => {
  const parentId = levelId;
  levelId++;
  return { id: levelId.toString(), parentId: parentId.toString(), label: `Level ${ item + 2 }`, done: false};
});

export const defaultState = {
  currentUser: '89',
  users: [
    {id: '88', login: 'dimon', passHash: '$2a$08$djyiemyHNqGRKUdinu7zPuGc0Lneo/YmjJ7eER7vXIpFSMqqKFK.e', firstName: 'Дмитрий', lastName: 'Иванов', foto: null},
    {id: '89', login: 'boris', passHash: '$2a$08$uCHWtGxv1AUd2x09dPLVAuJL7nggyuRCdPwLEhvNA2hsGnuM0k6F.', firstName: 'Борис', lastName: 'Волков', foto: null},
    {id: '87', login: 'yana', passHash: '', firstName: 'Яна', lastName: 'Иванова', foto: null},
    {id: '86', login: 'ksyusha', passHash: '', firstName: 'Ксения', lastName: 'Петрова', foto: null},
  ],
  showedGroup: null,
  projects: [
    {id: '34', parentId: null, label: 'НеРадио'},
    {id: '35', parentId: null, label: 'Inanomo'},
  ],
  groups: [
    {id: '1', parentId: '34', label: 'Мобильное приложение', done: false}, 
    {id: '2', parentId: '35', label: 'Лендинг', done: false},
    {id: '9', parentId: '35', label: 'Личный кабинет', done: false},
    {id: '6', parentId: '1', label: 'Админка', done: false},
    {id: '5', parentId: '6', label: 'Сервер', done: false},
    {id: '8', parentId: '6', label: 'Клиент', done: false},
    {id: '10', parentId: '5', label: 'Администрирование', done: false},
    {id: '13', parentId: '10', label: 'Настройка сервера', done: false},
    {id: '11', parentId: '10', label: 'Локальное тестирование', done: false},
    {id: '12', parentId: '10', label: 'Боевое тестирование', done: false},
    {id: '38', parentId: '9', label: 'Level 1', done: false},
    ...levelList,
  ],
  tasks: [
    {
      id: '3', parentId: '5', label: 'Баги в сервисе "новости/объявления"', 
      dateCreated: new Date(), user: '88', status: 'testing',
      dateDue: new Date(2020, 0, 20, 0, 0),
      done: false,
      assigned: ['88', '89', '87', '86'],
      tags: ['99'],
      comments: [],
      history: [{user: 'Дмитрий И.', label: 'создал задачу', date: new Date() }],
      files: [],
    }, 
    {
      id: '4', parentId: '5', label: 'Бальная оценка. Если полностью стереть значение модификатора и нажать клавишу Enter в консоли выводится ошибка 400, значение модификатора не изменяется', 
      dateCreated: new Date(), user: '89', status: 'done',
      dateDue: new Date(2020, 0, 21, 12, 30),
      done: true,
      assigned: [],
      tags: [],
      comments: ['25'],
      history: [{user: 'Борис В.', label: 'создал задачу', date: new Date() }],
      files: [],
    },
    {
      id: '5', parentId: '10', label: 'Баги в сервисе "новости/объявления"', 
      dateCreated: new Date(), user: '88', status: 'testing',
      dateDue: null,
      done: false,
      assigned: ['89'],
      tags: ['96'],
      comments: [],
      history: [{user: 'Дмитрий И.', label: 'создал задачу', date: new Date() }],
      files: [],
    },
    {
      id: '6', parentId: '5', label: 'Страница сервиса заявок(не админка). При попытке сохранить запись, созданную другим пользователем в консоли выводится сообщение об ошибке 500', 
      dateCreated: new Date(), user: '88', status: 'done',
      dateDue: new Date(2020, 0, 24, 12, 30),
      done: false,
      assigned: ['89'],
      tags: [],
      comments: [],
      history: [{user: 'Дмитрий И.', label: 'создал задачу', date: new Date() }],
      files: [],
    },
    {
      id: '19', parentId: '5', label: 'Баги в сервисе "новости/объявления"', 
      dateCreated: new Date(), user: '88', status: 'testing',
      dateDue: new Date(2020, 0, 27),
      done: false,
      assigned: ['88', '89', '87'],
      tags: ['99', '95'],
      comments: ['25', '26'],
      history: [{user: 'Дмитрий И.', label: 'создал задачу', date: new Date() }],
      files: [],
    },
    {
      id: '7',
      parentId: '2',
      label: 'Иерархия пользователей. При удалении пользователя в консоли выводится сообщение об ошибке 500, пользователь пользователь не удаляется',
      dateCreated: new Date(2019, 11, 10),
      user: '88',
      status: 'testing',
      done: false,
      dateDue: null,
      assigned: ['89', '88', '87', '86'],
      tags: ['99', '98'],
      comments: ['25', '26'],
      history: [{user: 'Дмитрий И.', label: 'создал задачу', date: new Date(2019, 11, 10) }],
      files: [],
    },
    {
      id: '8',
      parentId: '2',
      label: 'Иерархия пользователей',
      dateCreated: new Date(2019, 11, 11, 6, 4),
      user: '88',
      status: 'done',
      done: true,
      dateDue: new Date(2019, 11, 11),
      assigned: ['89', '88'],
      tags: ['99', '98'],
      comments: [],
      history: [{user: 'Дмитрий И.', label: 'создал задачу', date: new Date(2019, 11, 11, 6, 4) }],
      files: [],
    },
    {
      id: '9',
      parentId: '2',
      label: 'Бальная оценка. Если полностью стереть значение модификатора и нажать клавишу Enter в консоли выводится ошибка 400, значение модификатора не изменяется',
      dateCreated: new Date(2019, 11, 7, 15, 1),
      user: '89',
      status: 'done',
      done: true,
      dateDue: null,
      assigned: ['89'],
      tags: ['96'],
      comments: [],
      history: [{user: 'Борис В.', label: 'создал задачу', date: new Date(2019, 11, 7, 15, 1) }],
      files: [],
    },
    {
      id: '30', parentId: '13', label: 'Ошибка сервера', 
      dateCreated: new Date(), user: '88', status: 'testing',
      done: false,
      dateDue: null,
      assigned: [],
      tags: ['99'],
      comments: [],
      history: [{user: 'Дмитрий И.', label: 'создал задачу', date: new Date() }],
      files: [],
    },
  ],
  tags: [
    {id: '99',label: 'Баги', color: 'violet'}, 
    {id: '98', label: 'В работу', color: 'green'},
    {id: '97', label: 'Срочно', color: 'red'},
    {id: '96', label: 'Важно', color: 'yellow'},
    {id: '95', label: 'от Заказчика', color: 'blue'},
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
      date: new Date(),
      files: [],
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
      date: new Date(),
      files: [],
    },
  ],
  files: [],
};

const initialState = {
  currentUser: null,
  users: [],
  projects: [],
  groups: [],
  tasks: [],
  tags: [],
  comments: [],
  files: [],
};

export default initialState;

