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
  removeCard,
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
  const savedBoard = board._id
    ? storageService.put(KEY, board)
    : storageService.post(KEY, board);
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

function getEmptyBoard(title) {
  return {
    _id: '',
    title,
    createdAt: '',
    createdBy: 'user',
    style: {
      imgUrl: '/img/background1.jpg',
    },
    labels: [
      { id: utilService.makeId(), txt: 'test1', colorClass: 'label-green' },
      { id: utilService.makeId(), txt: 'test2', colorClass: 'label-yellow' },
      { id: utilService.makeId(), txt: 'test3', colorClass: 'label-orange' },
      { id: utilService.makeId(), txt: 'test4', colorClass: 'label-red' },
      { id: utilService.makeId(), txt: 'test5', colorClass: 'label-purple' },
      { id: utilService.makeId(), txt: 'test6', colorClass: 'label-blue' },
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
      imgUrl:
        'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
    },
    activities: [],
    imgUrl: '',
    attachments: [],
    isComplete:false
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
    boards = [
      _createBoard('My First Board', '/img/background1.jpg'),
      _createBoard('Work', '/img/background2.jpg'),
      _createBoard('Personal', '/img/background3.jpg'),
      _createBoard('Tinto', '/img/background4.jpg'),
      travelBoard(),
    ];
    localStorage.setItem(KEY, JSON.stringify(boards));
  }
  return boards;
}

function _createBoard(title, url) {
  var board = getEmptyBoard(title);
  board.style.imgUrl = url;
  board._id = utilService.makeId();
  return board;
}

function travelBoard() {
  var board = {
    _id: utilService.makeId(),
    title: 'Travel Inspiration board',
    createdAt: Date.now(),
    createdBy: 'Oshra',
    style: {
      imgUrl: '/img/camera-background.jpg',
    },
    labels: [
      { id: utilService.makeId(), txt: 'Flights', colorClass: 'label-green' },
      {
        id: utilService.makeId(),
        txt: 'Accommodations',
        colorClass: 'label-yellow',
      },
      {
        id: utilService.makeId(),
        txt: 'Public Transportation',
        colorClass: 'label-orange',
      },
      {
        id: utilService.makeId(),
        txt: 'Food & Drink',
        colorClass: 'label-red',
      },
      {
        id: utilService.makeId(),
        txt: 'Sightseeing',
        colorClass: 'label-purple',
      },
      { id: utilService.makeId(), txt: 'Souvenirs', colorClass: 'label-blue' },
    ],
    members: [],
    lists: [],
  };
  // list 0
  var bucketList = {
    id: '',
    title: 'Bucket List',
    cards: [],
  };
  // cards
  bucketList.cards[0] = getEmptyCard(
    'What inspires you most about your chosen destination? Pictures, clips, reviews…add ‘em, tag ‘em and share ‘em here.'
  );

  bucketList.cards[1] = getEmptyCard('Eiffel tower');
  bucketList.cards[1].attachments.push('demo');
  bucketList.cards[1].labelIds.push(board.labels[4].id);

  bucketList.cards[2] = getEmptyCard('Pastry @ Karamel Paris');
  bucketList.cards[2].attachments.push('demo');
  bucketList.cards[2].labelIds.push(board.labels[3].id);

  bucketList.cards[3] = getEmptyCard('Matisse Museum');
  bucketList.cards[3].attachments.push('demo');
  bucketList.cards[3].labelIds.push(board.labels[4].id);

  bucketList.cards[4] = getEmptyCard('Must-Eat Foods');
  bucketList.cards[4].checklists.push({
    id: 'CL' + utilService.makeId(),
    title: 'French Food Crawl Checklist',
    todos: [
      _getEmptyTodo('Macaron'),
      _getEmptyTodo('Pain Au Chocolat'),
      _getEmptyTodo('Coq Au Vin'),
      _getEmptyTodo("Soupe à L'oignon"),
      _getEmptyTodo('Nicoise Salad'),
    ],
  });
  bucketList.cards[4].labelIds.push(board.labels[3].id);

  board.lists.push(bucketList);

  // list 1
  var think = {
    id: '',
    title: 'Things to think about',
    cards: [],
  };
  // cards
  think.cards[0] = getEmptyCard(
    'Want to travel? Where to start? Here’s everything you need to get going.'
  );

  think.cards[1] = getEmptyCard('Travel Needs');
  think.cards[1].checklists.push({
    id: 'CL' + utilService.makeId(),
    title: 'Travel Needs Checklist',
    todos: [
      _getEmptyTodo('Adapter'),
      _getEmptyTodo('International Phone Plan'),
      _getEmptyTodo('Passport'),
    ],
  });

  think.cards[2] = getEmptyCard('When To Travel');

  think.cards[3] = getEmptyCard('Language');
  think.cards[3].description = 'English to French Translation: ';

  think.cards[4] = getEmptyCard('Budget');
  // delete think.cards[4].labelIds
  think.cards[4].labelIds = [
    board.labels[0].id,
    board.labels[1].id,
    board.labels[2].id,
    board.labels[3].id,
    board.labels[4].id,
    board.labels[5].id,
  ];

  think.cards[5] = getEmptyCard('Daily Itineraries');
  think.cards[5].description = 'How much can we fit into one day? Have we taken travel times into account?';
  
  think.cards[6] = getEmptyCard('Accommodations');
  think.cards[6].labelIds.push(board.labels[2].id)
  
  think.cards[5] = getEmptyCard('Local Currency');
  think.cards[5].description = 'Euro (1 USD = .90 EUR)';

  board.lists.push(think);


  // list 2
  var check = {
    id: '',
    title: 'Travel checklist',
    cards: [],
  };
  // cards
  check.cards[0] = getEmptyCard(
    'A goal without a plan is just a wish. Wish you were there? Start planning here. Add your restaurant and hotel reservations, attraction bookings and other big-ticket items below.'
  );

  check.cards[1] = getEmptyCard('Must-Do\'s Before Booking');
  check.cards[1].checklists.push({
    id: 'CL' + utilService.makeId(),
    title: 'Must-Do\'s Before Booking',
    todos: [
      _getEmptyTodo('Determine Travel Dates'),
      _getEmptyTodo('Estimate Total Budget'),
      _getEmptyTodo('Prioritize Top Sights'),
    ],
  });
  check.cards[1].checklists[0].todos[0].isDone = true;
  check.cards[1].dueDate = new Date()
  check.cards[1].isComplete = true

  board.lists.push(check);

  // list 3
  var go = {
    id: '',
    title: 'Countdown',
    cards: [],
  };
  // cards
  go.cards[0] = getEmptyCard(
    'Things you’ll need to be thinking about weeks, days and hours before you head off.'
  );
  const today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getHours() + 5);
  go.cards[0].dueDate = tomorrow

  board.lists.push(go);

  // list 4
  var done = {
    id: '',
    title: 'And done!',
    cards: [],
  };
  // cards
  done.cards[0] = getEmptyCard(
    'As you complete your checklist, move cards into this list to keep track of them.'
  );


  board.lists.push(done);

  console.log('lists', board.lists);
  board.lists.forEach((list) => {
    list.id = 'L' + utilService.makeId();
  });
  console.log(board);
  return board;
}

function _getEmptyTodo(title) {
  return {
    isDone: false,
    title,
    id: 'TD' + utilService.makeId(),
  };
}
// card
//   id: 'C' + utilService.makeId(),
//   title,
//   description: '',
//   comments: [],
//   checklists: [],
//   members: [],
//   labelIds: [],
//   createdAt: Date.now(),
//   dueDate: '',
//   activities: [],
//   imgUrl: ''
// };
// }
