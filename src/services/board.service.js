import { utilService } from './util.service.js';
const axios = require('axios');
import { httpService } from './http.service';
import { socketService, SOCKET_EVENT_BOARD_UPDATED } from './socket.service';
import { userService } from '../services/user.service.js';




export const boardService = {
  query,
  getById,
  remove,
  save,
  getEmptyBoard,
  getEmptyList,
  getEmptyCard,
  saveList,
  getListAndCardById,
  updateCard,
  getEmptyLabel,
  removeCard,
  getBgImgs,
  setBackground,
  getActivity,
};



async function query(filterBy) {
  try {
    return httpService.get('board/', filterBy);
  } catch (err) {
    console.log('error:', err);
  }
}

async function getById(id) {
  try {
    return httpService.get('board/' + id);
  } catch (err) {
    console.log('error:', err);
  }
}

async function save(board) {
  try {
    if (board._id) {
      socketService.emit(SOCKET_EVENT_BOARD_UPDATED, board);
      return httpService.put('board/' + board._id, board);
    } else {
      return httpService.post('board/', board);
    }
  } catch (err) {
    console.log('err', err);
  }
}

async function remove(id) {
  try {
    return httpService.delete('board/' + id);
  } catch (err) {
    console.log('error:', err);
  }
}

async function getListAndCardById(boardId, cardId) {
  try{

    const board = await getById(boardId);
    const list = board.lists.find((list) => {
      return list.cards.find((card) => card.id === cardId);
    });
    const card = list.cards.find((card) => card.id === cardId);
    return { card, list };
  }
  catch(err){
    console.log('cant get list and card by id', err);
  }
}

async function saveList(list, board) {
  try {
    if (list.id) {
      const idx = board.lists.findIndex((currList) => currList.id === list.id);
      board.lists.splice(idx, 1, list);
    } else {
      list.id = 'L' + utilService.makeId();
      board.lists.push(list);
    }
    try {
      const savedBoard = await save(board);
      return savedBoard;
    } catch (err) {
      console.log('cant save board', err);
    }
  } catch (err) {
    console.log('cant save list' + list, err);
  }
}

async function updateCard(cardToUpdate, listToUpdate, boardId, activity) {
  try {
    var boardToUpdate = await getById(boardId);
    activity['listTitle'] = listToUpdate.title;
    if (boardToUpdate.activities) boardToUpdate.activities.unshift(activity);
    else boardToUpdate.activities = [activity];

    if (boardToUpdate.activities.length >= 400) boardToUpdate.activities.pop();

    const listIdx = boardToUpdate.lists.findIndex(
      (currList) => listToUpdate.id === currList.id
    );
    const cardIdx = listToUpdate.cards.findIndex(
      (currCard) => currCard.id === cardToUpdate.id
    );
    listToUpdate.cards.splice(cardIdx, 1, cardToUpdate);
    boardToUpdate.lists.splice(listIdx, 1, listToUpdate);
    try {
      const savedBoard = await save(boardToUpdate);
      const savedList = savedBoard.lists[listIdx];
      const savedCard = savedList.cards[cardIdx];
      return { savedBoard, savedList, savedCard };
    } catch (err) {
      console.log('cant save board', err);
    }
  } catch (err) {
    console.log('cant save list' + listToUpdate, err);
  }
}

async function removeCard(cardId, listToUpdate, boardId) {
  try {
    var boardToUpdate = await getById(boardId);
    const listIdx = boardToUpdate.lists.findIndex(
      (currList) => listToUpdate.id === currList.id
    );
    const cardIdx = listToUpdate.cards.findIndex(
      (currCard) => currCard.id === cardId
    );
    listToUpdate.cards.splice(cardIdx, 1);
    boardToUpdate.lists.splice(listIdx, 1, listToUpdate);
    try {
      const savedBoard = await save(boardToUpdate);
      const savedList = savedBoard.lists[listIdx];
      const savedCard = savedList.cards[cardIdx];
      return { savedBoard, savedList, savedCard };
    } catch (err) {
      console.log('cant save board', err);
    }
  } catch (err) {
    console.log('cant save list' + listToUpdate, err);
  }
}

// async function updateList(list, boardId) {
//   try {
//     var board = await getById(boardId);
//     const idx = board.lists.findIndex((currList) => currList.id === list.id);
//   } catch (err) {
//     console.log('cant update list' + list, err);
//   }
// }

function getEmptyBoard(title, user) {
  return {
    // _id: '',
    title,
    createdAt: '',
    createdBy: user,
    style: {
      imgUrl:
        'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/e1b4d655b33c1ef09b9aea6c6360f70c/photo-1637928114342-05b15ee4034e.jpg',
      isDark: true,
    },
    labels: [
      { id: utilService.makeId(), txt: '', colorClass: 'label-green' },
      { id: utilService.makeId(), txt: '', colorClass: 'label-yellow' },
      { id: utilService.makeId(), txt: '', colorClass: 'label-orange' },
      { id: utilService.makeId(), txt: '', colorClass: 'label-red' },
      { id: utilService.makeId(), txt: '', colorClass: 'label-purple' },
      { id: utilService.makeId(), txt: '', colorClass: 'label-blue' },
    ],
    members: [user],
    lists: [],
    activities: [],
  };
}

function getEmptyList(title) {
  return {
    id: '',
    title,
    cards: [],
  };
}

function getEmptyCard(title) {
  return {
    id: 'C' + utilService.makeId(),
    title,
    description: '',
    comments: [],
    checklists: [],
    members: [],
    labelIds: [],
    createdAt: Date.now(),
    dueDate: '',
    style: null,
    byMember: {
      id: 'u101',
      username: 'Tal',
      fullname: 'Tal Tarablus',
      imgUrl:
        'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
    },
    activities: [],
    attachments: [],
    isComplete: false,
  };
}

function getEmptyLabel(txt = '', colorClass = '.label-green') {
  return {
    id: 'L' + utilService.makeId(),
    txt,
    colorClass,
  };
}

async function getBgImgs(searchKey, imgNum, page) {
  try {
    const search = `https://api.unsplash.com/search/photos/?query=${
      searchKey ? searchKey : 'wallpapers'
    }&per_page=${imgNum ? imgNum : 50}&${
      page ? `page=${page}&` : ''
    }client_id=9xScnkiVqupizQUOywM06WUClEpMUbRg0wri1zPyIDo`;
    let res = await axios.get(search);
    return res.data.results.map((obj) => obj.urls);
  } catch (err) {
    console.log('cant receive images from unsplash', err);
  }
}

async function setBackground(boardId, style) {
  try {
    const board = await getById(boardId);
    board.style = style;
    return await save(board);
  } catch (err) {
    console.log('Failed to set background', err);
  }
}

function getActivity(txt, type, card = null) {
  const user = userService.getLoggedInUser();
  const activity = {
    id: 'act' + utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: {
      imgUrl: user.imgUrl ? user.imgUrl : '',
      fullname: user.fullname,
      _id: user.id,
    },
    card: card
      ? {
          id: card.id,
          title: card.title,
        }
      : null,
    type,
  };
  return activity;
}
