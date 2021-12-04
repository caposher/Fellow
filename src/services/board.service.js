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
    isComplete: false
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
      companyBoard()
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

function companyBoard() {
  var company = {
    "_id": "uaUog",
    "title": "Company Overview",
    "createdAt": "",
    "createdBy": "user",
    "style": {
      "imgUrl": "/img/company.jpg"
    },
    "labels": [
      {
        "id": "8g0M9",
        "txt": "Product",
        "colorClass": "label-green"
      },
      {
        "id": "QwhBE",
        "txt": "Marketing",
        "colorClass": "label-yellow"
      },
      {
        "id": "0mE9J",
        "txt": "Sales",
        "colorClass": "label-orange"
      },
      {
        "id": "DY6t4",
        "txt": "Support",
        "colorClass": "label-red"
      },
      {
        "id": "YJDoq",
        "txt": "People",
        "colorClass": "label-purple"
      },
      {
        "id": "lkGyP",
        "txt": "IT",
        "colorClass": "label-blue"
      }
    ],
    "members": [],
    "lists": [
      {
        "id": "LSAgms",
        "title": "Teams",
        "cards": [
          {
            "id": "CeFMWv",
            "title": "Product",
            "description": "March 20, 2015:\n\n- New design & bug fixes for iOS app.\n- Updated for Kit Kat on Android\n- Updated landing page\n\nMarch 13, 2015:\n\n- Changed logo to flatter look\n- Fixed bonus points bugs\n\nMarch 6, 2015:\n\n- Strings translated for localization",
            "comments": [],
            "checklists": [
              {
                "title": "Checklist",
                "id": "CLW4elM",
                "todos": [
                  {
                    "title": "Alot of this",
                    "isDone": true,
                    "id": "TDMp7zl"
                  },
                  {
                    "title": "And some more!",
                    "isDone": true,
                    "id": "TDEEm1I"
                  }
                ]
              }
            ],
            "members": [],
            "labelIds": [
              "8g0M9"
            ],
            "createdAt": 1638655401916,
            "dueDate": "2021-12-03 12:00:00",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": [],
            "isComplete": true
          },
          {
            "id": "C02Nb8",
            "title": "Marketing",
            "description": "March 20, 2015:\n\n- Boosted new signups by 21%\n- Launched \"New You\" campaign\n\nMarch 13, 2015:\n\n- Blog redesign\n\nMarch 6, 2015:\n\n- Email drip campaign\n- Newsletter redesign",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [
              "QwhBE"
            ],
            "createdAt": 1638655420588,
            "dueDate": "",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": []
          },
          {
            "id": "CApjad",
            "title": "Sales",
            "description": "March 20, 2020:\n\n- 10 new Enterprise clients\n- 14 new Business Pro accounts\n\nMarch 13, 2020:\n\n- 13 new Enterprise clients\n- 6 new Business Pro accounts\n",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [
              "0mE9J"
            ],
            "createdAt": 1638655426996,
            "dueDate": "",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": []
          },
          {
            "id": "CTUmss",
            "title": "Support",
            "description": "March 20, 2015:\n\n- 485 new conversations this past week. 6 week moving average is 444. \n- All hands on deck Wednesday 3/18 AM due to login issue.\n- We now have an Enterprise User Guide in the help docs.\n",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [
              "DY6t4"
            ],
            "createdAt": 1638655431716,
            "dueDate": "",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": []
          },
          {
            "id": "C3C45n",
            "title": "People",
            "description": "March 20, 2020:\n\n- Hired Kathy Carter as our new node.js dev. She will start April 15, 2015.\n- Posted opening for a Windows mobile dev.",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [
              "YJDoq"
            ],
            "createdAt": 1638655441421,
            "dueDate": "",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": []
          },
          {
            "id": "CYPUzs",
            "title": "IT",
            "description": "March 20, 2015:\n\n- Moved base.html to the client, improving deployments.\n- Fixed an issue that was causing android app to not load.\n- Worked on security inbox and admin tools for support and marketing",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [
              "lkGyP"
            ],
            "createdAt": 1638655445277,
            "dueDate": "",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": []
          }
        ]
      },
      {
        "id": "LB66HG",
        "title": "Up Next",
        "cards": [
          {
            "id": "CNVARC",
            "title": "Increase sales revenue by 30% in Q3",
            "description": "The sales team is working to increase the pipeline in Q2 to see\nmeasurable differences in Q3 revenue reports.",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [
              "0mE9J"
            ],
            "createdAt": 1638655498991,
            "dueDate": "",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": []
          },
          {
            "id": "Cwiwtw",
            "title": "Ship iOS app",
            "description": "The mobile team has released an Android app and is now working on v2 of the iOS app.",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [
              "8g0M9"
            ],
            "createdAt": 1638655501907,
            "dueDate": "",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": []
          },
          {
            "id": "Cc7Prr",
            "title": "Increase conversion rate by 20% by Q3",
            "description": "We'll be working on the conversion funnel, A/B testing landing pages to get to a template \nwe can use in future campaigns.\n",
            "comments": [],
            "checklists": [
              {
                "title": "Checklist",
                "id": "CLe60Bq",
                "todos": [
                  {
                    "title": "Do this",
                    "isDone": true,
                    "id": "TDKaAdr"
                  },
                  {
                    "title": "Do that",
                    "isDone": false,
                    "id": "TDJHbav"
                  },
                  {
                    "title": "And more",
                    "isDone": false,
                    "id": "TD1Oz1J"
                  }
                ]
              }
            ],
            "members": [],
            "labelIds": [
              "QwhBE"
            ],
            "createdAt": 1638655511477,
            "dueDate": "",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": []
          }
        ]
      },
      {
        "id": "LqvnOh",
        "title": "Current Projects",
        "cards": [
          {
            "id": "CVJhuP",
            "title": "Analytics Data",
            "description": "Creating monthly marketing report showcasing campaign info and marketing data.\n\n*Week ending 3/20*",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [
              "QwhBE"
            ],
            "createdAt": 1638655525067,
            "dueDate": "2021-12-05 20:00:00",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": []
          },
          {
            "id": "CXqezJ",
            "title": "Develop Engineering Blog",
            "description": "Blog for recruiting purposes where developers can post about what they're working on. ",
            "comments": [],
            "checklists": [
              {
                "title": "Checklist",
                "id": "CL4Gj7M",
                "todos": [
                  {
                    "title": "To some of it",
                    "isDone": false,
                    "id": "TDlkCmD"
                  },
                  {
                    "title": "And some of that",
                    "isDone": true,
                    "id": "TDjBTbj"
                  }
                ]
              }
            ],
            "members": [],
            "labelIds": [
              "lkGyP"
            ],
            "createdAt": 1638655546367,
            "dueDate": "2021-12-07 20:00:00",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": [],
            "isComplete": false
          },
          {
            "id": "C64HAd",
            "title": "Brand Guidelines",
            "description": "Designers on the product and marketing team are working on brand guidelines to ensure \nconsistency between designers.\n",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [
              "8g0M9",
              "QwhBE"
            ],
            "createdAt": 1638655548814,
            "dueDate": "",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": []
          }
        ]
      },
      {
        "id": "LINTWs",
        "title": "Completed Projects",
        "cards": [
          {
            "id": "CTvhWw",
            "title": "Social Media Campaign",
            "description": "We're launching our first campaigns on Twitter and Facebook \nthis year via sponsored posts and tweets. ",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [
              "QwhBE"
            ],
            "createdAt": 1638655562476,
            "dueDate": "2021-12-01 20:20:00",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": [],
            "isComplete": true
          },
          {
            "id": "CS7Vwa",
            "title": "Update Help Documentation",
            "description": "The current help docs contain screenshots and terminology that are out of date. \nThe Support team is updating these, as well as adding new content to reflect new \naspects of our product. \n",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [
              "DY6t4"
            ],
            "createdAt": 1638655577236,
            "dueDate": "2021-11-29 20:00:00",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": [],
            "isComplete": true
          },
          {
            "id": "CujCdQ",
            "title": "Website Redesign",
            "description": "Our brand & product have evolved over the past two years, and our website should be \nupdated to reflect this. The new site will be mobile-first, responsive and lightweight.\n",
            "comments": [],
            "checklists": [
              {
                "title": "Checklist",
                "id": "CLFNTNQ",
                "todos": [
                  {
                    "title": "Build wireframe mockup",
                    "isDone": true,
                    "id": "TDRez2Q"
                  },
                  {
                    "title": "Finalize design",
                    "isDone": true,
                    "id": "TD7azaM"
                  },
                  {
                    "title": "Implement design",
                    "isDone": true,
                    "id": "TDeMtHw"
                  },
                  {
                    "title": "A/B test new website vs. old website",
                    "isDone": true,
                    "id": "TDU2rhY"
                  },
                  {
                    "title": "Launch new website",
                    "isDone": true,
                    "id": "TDwUgf0"
                  }
                ]
              }
            ],
            "members": [],
            "labelIds": [
              "8g0M9",
              "lkGyP"
            ],
            "createdAt": 1638655586748,
            "dueDate": "2021-12-07 21:00:00",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": [],
            "isComplete": true
          }
        ]
      },
      {
        "id": "LgtO82",
        "title": "Bravos",
        "cards": [
          {
            "id": "CACpWK",
            "title": "Bravo to Tom for answering the most Customer Support emails ever received in one day!",
            "description": "",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [],
            "createdAt": 1638655598882,
            "dueDate": "",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": []
          },
          {
            "id": "CJH0W9",
            "title": "Bravo to Lauren for taking the lead and finishing the new landing page design!",
            "description": "",
            "comments": [],
            "checklists": [],
            "members": [],
            "labelIds": [],
            "createdAt": 1638655619396,
            "dueDate": "",
            "style": null,
            "byMember": {
              "id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "activities": [],
            "imgUrl": "",
            "attachments": []
          }
        ]
      }
    ]
  }
  return company
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
