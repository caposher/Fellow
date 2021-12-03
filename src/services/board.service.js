import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';

const KEY = 'boardDB';

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
};

_createBoards();

function query() {
  // return storageService.query(KEY)
  const boards = storageService.query(KEY);
  return boards;
}

function getById(id) {
  return storageService.get(KEY, id);
}

async function getListAndCardById(boardId, cardId) {
  const board = await getById(boardId);
  const list = board.lists.find((list) => {
    return list.cards.find((card) => card.id === cardId);
  });
  const card = list.cards.find((card) => card.id === cardId);
  return { card, list };
}

function remove(id) {
  return storageService.remove(KEY, id);
}

function save(board) {
  const savedBoard = board._id ? storageService.put(KEY, board) : storageService.post(KEY, board);
  return savedBoard;
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

async function updateCard(cardToUpdate, listToUpdate, boardId) {
  try {
    var boardToUpdate = await getById(boardId);
    const listIdx = boardToUpdate.lists.findIndex((currList) => listToUpdate.id === currList.id);
    const cardIdx = listToUpdate.cards.findIndex((currCard) => currCard.id === cardToUpdate.id);
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

// async function updateList(list, boardId) {
//   try {
//     var board = await getById(boardId);
//     const idx = board.lists.findIndex((currList) => currList.id === list.id);
//   } catch (err) {
//     console.log('cant update list' + list, err);
//   }
// }

function getEmptyBoard(title) {
  return {
    _id: '',
    title,
    createdAt: '',
    createdBy: 'user',
    style: null,
    labels: [
      { id: utilService.makeId(), txt: 'test1', colorClass: 'label-green' },
      { id: utilService.makeId(), txt: 'test2', colorClass: 'label-yellow' },
      { id: utilService.makeId(), txt: 'test3', colorClass: 'label-orange' },
      { id: utilService.makeId(), txt: '', colorClass: 'label-red' },
      { id: utilService.makeId(), txt: '', colorClass: 'label-purple' },
      { id: utilService.makeId(), txt: '', colorClass: 'label-blue' },
    ],
    members: [],
    lists: [],
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
      imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
    },
    activities: [],
  };
}

function getEmptyLabel(txt = '', colorClass = '.label-green') {
  return {
    id: '',
    txt,
    colorClass,
  };
}

// Create Test Data:
function _createBoards() {
  var boards = JSON.parse(localStorage.getItem(KEY));
  if (!boards || !boards.length) {
    boards = [_createBoard('New Board')];
    localStorage.setItem(KEY, JSON.stringify(boards));
  }
  return boards;
}

function _createBoard(title) {
  const board = getEmptyBoard(title);
  // board._id = utilService.makeId()
  return board;
}
