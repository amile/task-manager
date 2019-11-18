
export const defaultState = {
    currentUser: '989',
    users: [
        {id: '988', login: 'dimon', passHash: '$2a$08$djyiemyHNqGRKUdinu7zPuGc0Lneo/YmjJ7eER7vXIpFSMqqKFK.e', firstName: 'Дмитрий', lastName: 'Иванов', foto: null},
        {id: '989', login: 'boris', passHash: '$2a$08$uCHWtGxv1AUd2x09dPLVAuJL7nggyuRCdPwLEhvNA2hsGnuM0k6F.', firstName: 'Борис', lastName: 'Волков', foto: null}
    ],
    showedGroup: '345',
    projects: [
        {   id: '345', 
            label: 'НеРадио', 
            groups: [
                {id: '1', label: 'Learn React', groups:[], 
            tasks: [{id: '3', label: 'React task1'}, {id: '4', label: 'React task2'}],
            active: false}, 
                {id: '2', label: 'Learn Redux', 
                groups:[
                    {id: '6', label: 'Learn Redux-saga', groups:[], tasks: [], active: false}], 
                tasks: [], 
                active: false}]
        },
        {id: '346', label: 'Inanomo', groups: []}
    ]
};

const initialState = {
    currentUser: null,
    users: [],
    showedGroup: null,
    projects: []
};

export default initialState;

