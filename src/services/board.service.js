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
};

_createBoards();

// TODO: support paging and filtering and sorting
function query() {
  // return storageService.query(KEY)
  const boards = storageService.query(KEY);
  console.log(boards);
  return boards;
}

function getById(id) {
  return storageService.get(KEY, id);
}

function remove(id) {
  return storageService.remove(KEY, id);
}

function save(board) {
  const savedBoard = board._id
    ? storageService.put(KEY, board)
    : storageService.post(KEY, board);
  return savedBoard;
}

async function saveList(list, boardId) {
    try{
        var board = await getById(boardId);
        console.log('list.id', list.id);
        if (list.id) {
          const idx = board.lists.findIndex((currList) => currList.id === list.id);
          board.lists.splice(idx, 1 ,list);
        } else {
          list.id = 'L' + utilService.makeId();
          board.lists.push(list);
        }
        try{
            const savedBoard = await save(board);
            return savedBoard;
        }
        catch(err){
            console.log('cant save board', err);
        }
    }
    catch(err){
        console.log('cant save list'+list, err);
    }
}

function getEmptyBoard(title) {
  return {
    _id: '',
    title,
    createdAt: '',
    createdBy: 'user',
    style: null,
    labels: ['label1', 'label2', 'label3'],
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
      imgUrl:
        'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
    },
    activities: [],
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
