import { handleActions } from 'redux-actions';

import { usersLoaded } from '../actions';

const initialState = [
  {id: '88', login: 'dimon', passHash: '$2a$08$djyiemyHNqGRKUdinu7zPuGc0Lneo/YmjJ7eER7vXIpFSMqqKFK.e', firstName: 'Дмитрий', lastName: 'Иванов', foto: null},
  {id: '89', login: 'boris', passHash: '$2a$08$uCHWtGxv1AUd2x09dPLVAuJL7nggyuRCdPwLEhvNA2hsGnuM0k6F.', firstName: 'Борис', lastName: 'Волков', foto: null},
  {id: '87', login: 'yana', passHash: '', firstName: 'Яна', lastName: 'Иванова', foto: null},
  {id: '86', login: 'ksyusha', passHash: '', firstName: 'Ксения', lastName: 'Петрова', foto: null},
];

const users = handleActions(
  {
    [usersLoaded]: (state, { payload: { data } }) => {
      return data;
    },
  },
  initialState,
);

export default users;
