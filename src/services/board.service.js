import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
const axios = require('axios');
import { httpService } from './http.service';
import { socketService, SOCKET_EVENT_BOARD_UPDATED } from './socket.service';

var gBoards = [
  {
    _id: 'SUV6b',
    title: 'Travel Inspiration board',
    createdAt: 1638986360388,
    createdBy: {
      _id: 'u101',
      fullname: 'Oshra Hartuv',
      username: 'oshraHartuv1',
      color: 'pink',
      imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865116/zlvylnqwvx8bcvp66lpn.jpg',
    },
    style: {
      imgUrl:
        'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODA4Mzl8MHwxfHNlYXJjaHwyNHx8dHJhdmVsfGVufDB8fHx8MTYzODk4NzYxMQ&ixlib=rb-1.2.1&q=80&w=1080',
      bgColor: 'rgba(129,112,97,1)',
      isDark: true,
    },
    labels: [
      {
        id: 'JrcwQ',
        txt: 'Flights',
        colorClass: 'label-green',
      },
      {
        id: 'tf0fy',
        txt: 'Accommodations',
        colorClass: 'label-yellow',
      },
      {
        id: 'ky1Sr',
        txt: 'Public Transportation',
        colorClass: 'label-orange',
      },
      {
        id: 'ejMef',
        txt: 'Food & Drink',
        colorClass: 'label-red',
      },
      {
        id: 'AVoTh',
        txt: 'Sightseeing',
        colorClass: 'label-purple',
      },
      {
        id: 'y0dhT',
        txt: 'Souvenirs',
        colorClass: 'label-blue',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Oshra Hartuv',
        username: 'oshraHartuv1',
        color: 'pink',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865116/zlvylnqwvx8bcvp66lpn.jpg',
      },
      {
        _id: 'u102',
        fullname: 'Osher Cappelli',
        username: 'osherCappelli',
        color: 'blue',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865093/fefzoaamkdnpvk9pt4sj.jpg',
      },
      {
        _id: 'u103',
        fullname: 'Adam Bercovich',
        username: 'adamBerco',
        color: 'green',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638867158/ohpwye1f7oidmqy7cujl.jpg',
      },
    ],
    lists: [
      {
        id: 'LHr6zU',
        title: 'Bucket List',
        cards: [
          {
            id: 'CJoALL',
            title:
              'What inspires you most about your chosen destination? Pictures, clips, reviews…add ‘em, tag ‘em and share ‘em here.',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638986360388,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
          {
            id: 'CP6f84',
            title: 'Eiffel Tower',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['AVoTh'],
            createdAt: 1638986360388,
            dueDate: '',
            style: {
              img: 'http://res.cloudinary.com/oshra/image/upload/v1638988388/ryngfdxfy0o0azrizccu.jpg',
              bgColor: 'rgba(108,131,171,1)',
              isDark: false,
            },
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [
              {
                createdAt: 1638988798646,
                file: null,
                href: 'http://res.cloudinary.com/oshra/image/upload/v1638988388/ryngfdxfy0o0azrizccu.jpg',
                id: 'SS2ZKb',
                name: 'Eiffel Tower',
                type: 'img',
              },
            ],
            isComplete: false,
          },
          {
            id: 'CNBbgR',
            title: 'Pastry @ Karamel Paris',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['ejMef'],
            createdAt: 1638986360388,
            dueDate: '',
            style: {
              img: 'http://res.cloudinary.com/oshra/image/upload/v1638988786/y7gh3mcy2ozijepgpuj2.jpg',
              bgColor: 'rgba(103,95,78,1)',
              isDark: true,
            },
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [
              {
                createdAt: 1638988798646,
                file: null,
                href: 'http://res.cloudinary.com/oshra/image/upload/v1638988786/y7gh3mcy2ozijepgpuj2.jpg',
                id: 'AS2ZKb',
                name: 'Pastery',
                type: 'img',
              },
            ],
            isComplete: false,
          },
          {
            id: 'COVkCH',
            title: 'Matisse Museum',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['AVoTh'],
            createdAt: 1638986360388,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
          {
            id: 'C9cXRM',
            title: 'Must-Eat Foods',
            description: '',
            comments: [],
            checklists: [
              {
                id: 'CLT94IM',
                title: 'French Food Crawl Checklist',
                todos: [
                  {
                    isDone: false,
                    title: 'Macaron',
                    id: 'TDCSHg0',
                  },
                  {
                    isDone: false,
                    title: 'Pain Au Chocolat',
                    id: 'TD6FLFj',
                  },
                  {
                    isDone: false,
                    title: 'Coq Au Vin',
                    id: 'TDVyqKn',
                  },
                  {
                    isDone: false,
                    title: "Soupe à L'oignon",
                    id: 'TDfsETh',
                  },
                  {
                    isDone: false,
                    title: 'Nicoise Salad',
                    id: 'TDnf2wZ',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['ejMef'],
            createdAt: 1638986360388,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
        ],
      },
      {
        id: 'LwGeNM',
        title: 'Things to think about',
        cards: [
          {
            id: 'CGpbR4',
            title: 'Want to travel? Where to start? Here’s everything you need to get going.',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638986360388,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
          {
            id: 'C8hiRu',
            title: 'Travel Needs',
            description: '',
            comments: [],
            checklists: [
              {
                id: 'CL741hJ',
                title: 'Travel Needs Checklist',
                todos: [
                  {
                    isDone: false,
                    title: 'Adapter',
                    id: 'TDpG9qm',
                  },
                  {
                    isDone: false,
                    title: 'International Phone Plan',
                    id: 'TDpFC1f',
                  },
                  {
                    isDone: false,
                    title: 'Passport',
                    id: 'TDn1oQB',
                  },
                ],
              },
            ],
            members: [],
            labelIds: [],
            createdAt: 1638986360388,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
          {
            id: 'CqLt22',
            title: 'When To Travel',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638986360388,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
          {
            id: 'CwwcGr',
            title: 'Language',
            description: 'English to French Translation: ',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638986360388,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
          {
            id: 'C2sR2e',
            title: 'Budget',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['JrcwQ', 'tf0fy', 'ky1Sr', 'ejMef', 'AVoTh', 'y0dhT'],
            createdAt: 1638986360388,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrlK: '',
            attachments: [],
            isComplete: false,
          },
          {
            id: 'CjNEya',
            title: 'Local Currency',
            description: 'Euro (1 USD = .90 EUR)',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638986360388,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
          {
            id: 'CG3qU8',
            title: 'Accommodations',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['ky1Sr'],
            createdAt: 1638986360388,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
        ],
      },
      {
        id: 'LBNaLC',
        title: 'Travel checklist',
        cards: [
          {
            id: 'CyiHBK',
            title:
              'A goal without a plan is just a wish. Wish you were there? Start planning here. Add your restaurant and hotel reservations, attraction bookings and other big-ticket items below.',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638986360388,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
          {
            id: 'CQiQC8',
            title: "Must-Do's Before Booking",
            description: '',
            comments: [],
            checklists: [
              {
                id: 'CL5Y0N7',
                title: "Must-Do's Before Booking",
                todos: [
                  {
                    isDone: true,
                    title: 'Determine Travel Dates',
                    id: 'TDVX03L',
                  },
                  {
                    isDone: true,
                    title: 'Estimate Total Budget',
                    id: 'TDS1eIJ',
                  },
                  {
                    isDone: false,
                    title: 'Prioritize Top Sights',
                    id: 'TDiz0kr',
                  },
                ],
              },
            ],
            members: [],
            labelIds: [],
            createdAt: 1638986360388,
            dueDate: '2021-12-08T17:59:20.388Z',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: true,
          },
        ],
      },
      {
        id: 'LmpNcf',
        title: 'Countdown',
        cards: [
          {
            id: 'CAOTCn',
            title: 'Things you’ll need to be thinking about weeks, days and hours before you head off.',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638986360388,
            dueDate: '2021-12-24T17:59:20.388Z',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
        ],
      },
      {
        id: 'LlRrPm',
        title: 'And done!',
        cards: [
          {
            id: 'CXsuTj',
            title: 'As you complete your checklist, move cards into this list to keep track of them.',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638986360388,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
        ],
      },
    ],
  },
  {
    _id: 'i9n9w',
    title: 'Meal Planning',
    createdAt: 1638986360388,
    createdBy: {
      _id: 'u102',
      fullname: 'Osher Cappelli',
      username: 'osherCappelli',
      color: 'blue',
      imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865093/fefzoaamkdnpvk9pt4sj.jpg',
    },
    style: {
      imgUrl:
        'https://images.unsplash.com/photo-1610725663727-08695a1ac3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODA4Mzl8MHwxfHNlYXJjaHwyOXx8bWVhbHxlbnwwfHx8fDE2Mzg5OTM3Njg&ixlib=rb-1.2.1&q=80&w=1080',
      bgColor: 'rgba(122,96,86,1)',
      isDark: true,
    },
    labels: [
      {
        id: 'b0JnY',
        txt: 'Vegetarian',
        colorClass: 'label-green',
      },
      {
        id: '1b2ET',
        txt: 'Vegan',
        colorClass: 'label-yellow',
      },
      {
        id: 'cVgzD',
        txt: 'Gluten Free',
        colorClass: 'label-orange',
      },
      {
        id: 'S1UkR',
        txt: 'Nut Free',
        colorClass: 'label-red',
      },
      {
        id: 'thr5F',
        txt: 'Egg Free',
        colorClass: 'label-purple',
      },
      {
        id: 'VvivO',
        txt: 'Dairy Free',
        colorClass: 'label-blue',
      },
    ],
    members: [
      {
        _id: 'u103',
        fullname: 'Adam Bercovich',
        username: 'adamBerco',
        color: 'green',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638867158/ohpwye1f7oidmqy7cujl.jpg',
      },
      {
        _id: 'u102',
        fullname: 'Osher Cappelli',
        username: 'osherCappelli',
        color: 'blue',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865093/fefzoaamkdnpvk9pt4sj.jpg',
      },
      {
        _id: 'u101',
        fullname: 'Oshra Hartuv',
        username: 'oshraHartuv1',
        color: 'pink',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865116/zlvylnqwvx8bcvp66lpn.jpg',
      },
    ],
    lists: [
      {
        id: 'LnRD7u',
        title: 'Shopping Lists',
        cards: [
          {
            id: 'CXmjOC',
            title: 'Kroger',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Produce',
                id: 'CLUGLFl',
                todos: [
                  {
                    title: 'New Potatoes',
                    isDone: false,
                    id: 'TDn2XSK',
                  },
                  {
                    title: 'Onions',
                    isDone: false,
                    id: 'TDIrLgz',
                  },
                  {
                    title: 'Strawberries',
                    isDone: false,
                    id: 'TD7omqq',
                  },
                  {
                    title: 'Blueberries',
                    isDone: false,
                    id: 'TDXFEMi',
                  },
                  {
                    title: 'Raspberries',
                    isDone: false,
                    id: 'TDauT9B',
                  },
                  {
                    title: 'Black berries',
                    isDone: false,
                    id: 'TDIHwNK',
                  },
                  {
                    title: 'Shallots',
                    isDone: false,
                    id: 'TDo5Zn6',
                  },
                  {
                    title: 'Avocado',
                    isDone: false,
                    id: 'TDn9qVA',
                  },
                  {
                    title: 'Bananas',
                    isDone: false,
                    id: 'TDEPenM',
                  },
                ],
              },
              {
                title: 'ChecklistMeat & SeaFood',
                id: 'CLz30Qz',
                todos: [
                  {
                    title: 'Hot dogs',
                    isDone: false,
                    id: 'TDDsEAN',
                  },
                  {
                    title: 'Brats',
                    isDone: false,
                    id: 'TDvhuvd',
                  },
                  {
                    title: 'Sausage x2',
                    isDone: false,
                    id: 'TD4HrfI',
                  },
                  {
                    title: 'Chuck x 1.5',
                    isDone: false,
                    id: 'TDXi4G0',
                  },
                  {
                    title: 'Chicken thighs x4',
                    isDone: false,
                    id: 'TDYw5Nx',
                  },
                  {
                    title: 'Lunchables',
                    isDone: false,
                    id: 'TDikw3j',
                  },
                ],
              },
            ],
            members: [],
            labelIds: [],
            createdAt: 1638653800702,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'Cl85fm',
            title: "Sam's",
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Office Supplies',
                id: 'CLtkjOr',
                todos: [
                  {
                    title: 'AA batteries',
                    isDone: false,
                    id: 'TDJTfiU',
                  },
                  {
                    title: 'AAA batteries',
                    isDone: false,
                    id: 'TDEZAtw',
                  },
                ],
              },
              {
                title: 'Refrigerated Food',
                id: 'CLgruMf',
                todos: [
                  {
                    title: 'Mushrooms',
                    isDone: false,
                    id: 'TDwiuYa',
                  },
                  {
                    title: 'Mozzarella',
                    isDone: false,
                    id: 'TDzkVgT',
                  },
                  {
                    title: 'Ball mozzarella',
                    isDone: false,
                    id: 'TDYEMTy',
                  },
                  {
                    title: 'Prosciutto',
                    isDone: false,
                    id: 'TDLoHdL',
                  },
                ],
              },
            ],
            members: [],
            labelIds: [],
            createdAt: 1638654521558,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CRCmUx',
            title: 'Target',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Checklist',
                id: 'CLnFUoZ',
                todos: [
                  {
                    title: 'IPA',
                    isDone: false,
                    id: 'TDCi0eP',
                  },
                  {
                    title: 'Hot pads',
                    isDone: false,
                    id: 'TDrxFss',
                  },
                  {
                    title: 'Dish towels',
                    isDone: false,
                    id: 'TDAyxhH',
                  },
                  {
                    title: 'Tissues',
                    isDone: false,
                    id: 'TDTli2M',
                  },
                  {
                    title: 'Composition books x3',
                    isDone: false,
                    id: 'TDtX22B',
                  },
                  {
                    title: 'Colored pencils',
                    isDone: false,
                    id: 'TDz4XD3',
                  },
                  {
                    title: 'Markers',
                    isDone: false,
                    id: 'TDro7pQ',
                  },
                  {
                    title: 'Expo markers (thin)',
                    isDone: false,
                    id: 'TDaYVyn',
                  },
                  {
                    title: 'Cups',
                    isDone: false,
                    id: 'TDKxM8y',
                  },
                  {
                    title: 'Toilet paper',
                    isDone: false,
                    id: 'TDVoNiZ',
                  },
                  {
                    title: 'Tissues',
                    isDone: false,
                    id: 'TDV1fKI',
                  },
                  {
                    title: 'Paper Leotard (lg)towels',
                    isDone: false,
                    id: 'TDaKEJu',
                  },
                  {
                    title: 'Leotard (lg)',
                    isDone: false,
                    id: 'TDiFJIM',
                  },
                  {
                    title: 'Footless tights',
                    isDone: false,
                    id: 'TDE3q4s',
                  },
                  {
                    title: 'Ballet slippers (1)',
                    isDone: false,
                    id: 'TDpHJZM',
                  },
                  {
                    title: 'Mouth wash',
                    isDone: false,
                    id: 'TD5YSv7',
                  },
                  {
                    title: 'Hydro bandaids',
                    isDone: false,
                    id: 'TDLms1x',
                  },
                  {
                    title: 'Oxy clean',
                    isDone: false,
                    id: 'TDDDbjp',
                  },
                  {
                    title: 'Plastic drawer',
                    isDone: false,
                    id: 'TDaYl4x',
                  },
                ],
              },
            ],
            members: [],
            labelIds: [],
            createdAt: 1638654661052,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CMsio8',
            title: 'Walmart',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654785550,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
        ],
      },
      {
        id: 'L67yAR',
        title: '10/26-11/1 Meal Plan',
        cards: [
          {
            id: 'CKTTzF',
            title: 'Sunday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654873494,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CfWKcM',
            title: 'Monday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654833145,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CxYn2t',
            title: 'Tuesday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654846282,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CWG3OC',
            title: 'Wednesday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654849769,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'Cbushk',
            title: 'Thursday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654856358,
            dueDate: '',
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CyZe5g',
            title: 'Friday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654861787,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'Ci1P9x',
            title: 'Saturday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654867034,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
        ],
      },
      {
        id: 'Lepmn6',
        title: 'Freezes Well',
        cards: [
          {
            id: 'CpfARK',
            title: 'Vietnamese Style Meatball Lettuce Wraps',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLEwltl',
                todos: [
                  {
                    title: '1.5 lbs ground chuck',
                    isDone: false,
                    id: 'TDIC8uM',
                  },
                  {
                    title: 'garlic',
                    isDone: false,
                    id: 'TDvxj9M',
                  },
                  {
                    title: 'ginger',
                    isDone: false,
                    id: 'TDSIr66',
                  },
                  {
                    title: 'lettuce',
                    isDone: false,
                    id: 'TDJm5Wj',
                  },
                  {
                    title: 'scallions',
                    isDone: false,
                    id: 'TDJuZyK',
                  },
                  {
                    title: 'shredded carrots',
                    isDone: false,
                    id: 'TDbrw8E',
                  },
                  {
                    title: 'soy sauce or tamari',
                    isDone: false,
                    id: 'TDS5TyN',
                  },
                  {
                    title: 'hoisin sauce',
                    isDone: false,
                    id: 'TDdHTKP',
                  },
                  {
                    title: 'sesame oil',
                    isDone: false,
                    id: 'TDZftKq',
                  },
                  {
                    title: 'apricot jam',
                    isDone: false,
                    id: 'TDefRqy',
                  },
                  {
                    title: 'ramen noodles or rice noodles',
                    isDone: false,
                    id: 'TDRKGzb',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638654890198,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CHIjIa',
            title: 'Spaghetti Casserole',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLt4l1v',
                todos: [
                  {
                    title: '1 lb pasta',
                    isDone: false,
                    id: 'TDCkynj',
                  },
                  {
                    title: '1 jar tomato sauce',
                    isDone: false,
                    id: 'TDmtimh',
                  },
                  {
                    title: '8 oz cream cheese',
                    isDone: false,
                    id: 'TD4j7wu',
                  },
                  {
                    title: '8 oz sour cream',
                    isDone: false,
                    id: 'TDgFvpB',
                  },
                  {
                    title: '16 oz shredded mozzarella cheese',
                    isDone: false,
                    id: 'TDVUvaZ',
                  },
                  {
                    title: '6 oz pepperoni',
                    isDone: false,
                    id: 'TD1ZPla',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F'],
            createdAt: 1638655370923,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CFlY1Y',
            title: 'Pulled Pork',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLHrH1Y',
                todos: [
                  {
                    title: 'Pork shoulder/Boston Butt',
                    isDone: false,
                    id: 'TDkPsDJ',
                  },
                  {
                    title: '2 large onions',
                    isDone: false,
                    id: 'TDBlsez',
                  },
                  {
                    title: 'kosher salt',
                    isDone: false,
                    id: 'TDnJxBW',
                  },
                  {
                    title: 'pepper',
                    isDone: false,
                    id: 'TDxrD2q',
                  },
                  {
                    title: 'vegetable oil',
                    isDone: false,
                    id: 'TD5CxBs',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638655460332,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CtQiX4',
            title: "Alton Brown's Baby Back Ribs",
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLSZDvm',
                todos: [
                  {
                    title: '3 racks of pork baby back ribs',
                    isDone: false,
                    id: 'TDCK9yt',
                  },
                  {
                    title: 'light brown sugar',
                    isDone: false,
                    id: 'TDkLOiF',
                  },
                  {
                    title: 'kosher salt',
                    isDone: false,
                    id: 'TDkaMsh',
                  },
                  {
                    title: 'chili powder',
                    isDone: false,
                    id: 'TDRvfYu',
                  },
                  {
                    title: 'ground black pepper',
                    isDone: false,
                    id: 'TD4y51k',
                  },
                  {
                    title: 'cayenne pepper',
                    isDone: false,
                    id: 'TDX3AZm',
                  },
                  {
                    title: 'jalapeno seasoning',
                    isDone: false,
                    id: 'TD7VtOr',
                  },
                  {
                    title: 'Old Bay seasoning',
                    isDone: false,
                    id: 'TDscIoz',
                  },
                  {
                    title: 'thyme',
                    isDone: false,
                    id: 'TDIvj7k',
                  },
                  {
                    title: 'onion powder',
                    isDone: false,
                    id: 'TDAumlY',
                  },
                  {
                    title: 'white wine',
                    isDone: false,
                    id: 'TDe91w4',
                  },
                  {
                    title: 'white wine vinegar',
                    isDone: false,
                    id: 'TDMlKBJ',
                  },
                  {
                    title: 'Worchestershire sauce',
                    isDone: false,
                    id: 'TD4p6CS',
                  },
                  {
                    title: 'honey',
                    isDone: false,
                    id: 'TDepWZ8',
                  },
                  {
                    title: 'garlic',
                    isDone: false,
                    id: 'TDyyHCX',
                  },
                  {
                    title: 'extra-wide heavy-duty aluminium foil',
                    isDone: false,
                    id: 'TDixpUA',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638655509198,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CtQsOJ',
            title: 'Meatloaf Burgers',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLyQDaV',
                todos: [
                  {
                    title: '1 lb ground chuck',
                    isDone: false,
                    id: 'TDF8XLE',
                  },
                  {
                    title: '1 onion',
                    isDone: false,
                    id: 'TDuWhr4',
                  },
                  {
                    title: 'eggs',
                    isDone: false,
                    id: 'TDvBNeT',
                  },
                  {
                    title: 'French onion soup mix',
                    isDone: false,
                    id: 'TDcYOP7',
                  },
                  {
                    title: 'Worchestershire sauce',
                    isDone: false,
                    id: 'TDq2bBl',
                  },
                  {
                    title: 'plain bread crumbs',
                    isDone: false,
                    id: 'TD7QvBt',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['S1UkR'],
            createdAt: 1638655606164,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CxVmOE',
            title: 'Chicken Enchiladas',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLoTPkX',
                todos: [
                  {
                    title: 'avocado oil or olive oil',
                    isDone: false,
                    id: 'TDXkQTt',
                  },
                  {
                    title: 'onion',
                    isDone: false,
                    id: 'TDJySIM',
                  },
                  {
                    title: '1.5 lb boneless, skinless chicken breasts',
                    isDone: false,
                    id: 'TDHsxI7',
                  },
                  {
                    title: '4 oz can green chiles',
                    isDone: false,
                    id: 'TDr7oi1',
                  },
                  {
                    title: '15 oz can black beans',
                    isDone: false,
                    id: 'TDZQTbr',
                  },
                  {
                    title: 'large flour tortillas',
                    isDone: false,
                    id: 'TDa6A7k',
                  },
                  {
                    title: '3 c Mexican blend shredded cheese',
                    isDone: false,
                    id: 'TDgvXeg',
                  },
                  {
                    title: 'red enchilada sauce (if not making your own)',
                    isDone: false,
                    id: 'TD7GsGx',
                  },
                  {
                    title: 'all purpose flour (for homemade enchilada sauce)',
                    isDone: false,
                    id: 'TDw67II',
                  },
                  {
                    title: 'chili powder (for homemade enchilada sauce)',
                    isDone: false,
                    id: 'TDNXYmv',
                  },
                  {
                    title: 'garlic powder (for homemade enchilada sauce',
                    isDone: false,
                    id: 'TDFcauP',
                  },
                  {
                    title: 'ground cumin (for homemade enchilada sauce',
                    isDone: false,
                    id: 'TDbaDKX',
                  },
                  {
                    title: 'oregano (for homemade enchilada sauce)',
                    isDone: false,
                    id: 'TDeJEno',
                  },
                  {
                    title: '16 oz chicken or vegetable stock (for homemade enchilada sauce)',
                    isDone: false,
                    id: 'TDc3kjU',
                  },
                  {
                    title: 'cilantro (optional)',
                    isDone: false,
                    id: 'TDzfsjp',
                  },
                  {
                    title: 'red onion (optional)',
                    isDone: false,
                    id: 'TDUOtq0',
                  },
                  {
                    title: 'avocado (optional)',
                    isDone: false,
                    id: 'TDrIyvA',
                  },
                  {
                    title: 'sour cream (optional)',
                    isDone: false,
                    id: 'TD7V75C',
                  },
                  {
                    title: 'cotija cheese (optional)',
                    isDone: false,
                    id: 'TDM9hyA',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['S1UkR', 'thr5F'],
            createdAt: 1638655668992,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
        ],
      },
      {
        id: 'LeA20O',
        title: 'Quick And Easy ',
        cards: [
          {
            id: 'CHECUA',
            title: 'Customized Frozen Pizza',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLX7fnI',
                todos: [
                  {
                    title: 'Frozen cheese pizza',
                    isDone: false,
                    id: 'TDXyZH1',
                  },
                  {
                    title: 'Shredded mozzarella',
                    isDone: false,
                    id: 'TDPpeTL',
                  },
                  {
                    title: 'Sausage',
                    isDone: false,
                    id: 'TD2f7xz',
                  },
                  {
                    title: 'Pepperoni',
                    isDone: false,
                    id: 'TDEvcTE',
                  },
                  {
                    title: 'Shallots',
                    isDone: false,
                    id: 'TDLKOU8',
                  },
                  {
                    title: 'Canned mushrooms',
                    isDone: false,
                    id: 'TDBGqXV',
                  },
                  {
                    title: 'Black olives',
                    isDone: false,
                    id: 'TDaSkdY',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['b0JnY', '1b2ET', 'cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638655805444,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'C9JsAY',
            title: 'Marinated Chicken (Grilled or Sheet Pan)',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLiShzQ',
                todos: [
                  {
                    title: '1 lb chicken',
                    isDone: false,
                    id: 'TDKLu5g',
                  },
                  {
                    title: 'Marinade',
                    isDone: false,
                    id: 'TDjap5L',
                  },
                  {
                    title: 'Oil',
                    isDone: false,
                    id: 'TDIBIUr',
                  },
                  {
                    title: 'Vinegar or lemon juice',
                    isDone: false,
                    id: 'TDc22Ic',
                  },
                  {
                    title: 'Salt, boullion cubes, soy sauce, or Worchestershire sauce',
                    isDone: false,
                    id: 'TDR3jJ2',
                  },
                  {
                    title: 'Sugar',
                    isDone: false,
                    id: 'TDUx3m4',
                  },
                  {
                    title: 'Herbs, spices and seasonings',
                    isDone: false,
                    id: 'TDaa7IK',
                  },
                  {
                    title: 'Gallon zip-top bags',
                    isDone: false,
                    id: 'TDuftbt',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638655854854,
            dueDate: '',
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'C5TThO',
            title: 'Easy Creamy Pasta with Sausage and Tomatoes',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CL3RVQb',
                todos: [
                  {
                    title: 'Pasta',
                    isDone: false,
                    id: 'TDw4Z55',
                  },
                  {
                    title: 'Onion',
                    isDone: false,
                    id: 'TDj3nVH',
                  },
                  {
                    title: '1 pound sweet Italian sausage',
                    isDone: false,
                    id: 'TDwqZi5',
                  },
                  {
                    title: '14.5 oz can diced tomatoes',
                    isDone: false,
                    id: 'TDYyjAE',
                  },
                  {
                    title: 'Heavy cream',
                    isDone: false,
                    id: 'TDLcpWT',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F'],
            createdAt: 1638655933523,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
        ],
      },
      {
        id: 'LJik8O',
        title: 'Slow Cooker',
        cards: [
          {
            id: 'CqthQf',
            title: 'Sherried Beef',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLk57OF',
                todos: [
                  {
                    title: '3 lb chuck roast',
                    isDone: false,
                    id: 'TDHmFFU',
                  },
                  {
                    title: 'French onion soup mix',
                    isDone: false,
                    id: 'TDdIrwJ',
                  },
                  {
                    title: 'cream of mushroom soup',
                    isDone: false,
                    id: 'TDjN74Y',
                  },
                  {
                    title: 'Dry sherry',
                    isDone: false,
                    id: 'TDSoNkf',
                  },
                  {
                    title: 'Rice (optional)',
                    isDone: false,
                    id: 'TDjVf3w',
                  },
                  {
                    title: 'Egg noodles (optional)',
                    isDone: false,
                    id: 'TD7NPww',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['S1UkR', 'thr5F'],
            createdAt: 1638655982910,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CKF9Z0',
            title: 'Versatile Mexican Crockpot',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLhipqW',
                todos: [
                  {
                    title: '3 lb chuck roast or 3 lbs chicken breast or thighs',
                    isDone: false,
                    id: 'TDbOD6r',
                  },
                  {
                    title: 'Salsa',
                    isDone: false,
                    id: 'TDY0qIi',
                  },
                  {
                    title: 'Chopped green chiles (4 oz can)',
                    isDone: false,
                    id: 'TDLBrfo',
                  },
                  {
                    title: 'Tomato paste (6 oz can)',
                    isDone: false,
                    id: 'TDlqvPK',
                  },
                  {
                    title: 'Taco seasoning packet',
                    isDone: false,
                    id: 'TDn3yAW',
                  },
                  {
                    title: 'Shredded cheese (optional)',
                    isDone: false,
                    id: 'TDEt5cV',
                  },
                  {
                    title: 'Sour cream (optional)',
                    isDone: false,
                    id: 'TDUiCeX',
                  },
                  {
                    title: 'Tortillas or taco shells (optional)',
                    isDone: false,
                    id: 'TDQ5Q4I',
                  },
                  {
                    title: 'Rice (optional)',
                    isDone: false,
                    id: 'TD2LyM9',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638656035926,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
        ],
      },
      {
        id: 'La87h8',
        title: 'Instant Pot',
        cards: [
          {
            id: 'Ck61qv',
            title: 'Chicken Tikka Masala',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLk9vOh',
                todos: [
                  {
                    title: '1.5 lbs boneless skinless chicken thighs',
                    isDone: false,
                    id: 'TD72Eyu',
                  },
                  {
                    title: 'ghee, butter or cocunut oil',
                    isDone: false,
                    id: 'TDBQF7k',
                  },
                  {
                    title: 'kosher salt',
                    isDone: false,
                    id: 'TDlo9k1',
                  },
                  {
                    title: 'garlic',
                    isDone: false,
                    id: 'TDpti8F',
                  },
                  {
                    title: 'gingner',
                    isDone: false,
                    id: 'TD4kwPC',
                  },
                  {
                    title: 'coriander',
                    isDone: false,
                    id: 'TDUW4YJ',
                  },
                  {
                    title: 'turmeric',
                    isDone: false,
                    id: 'TD7qb5I',
                  },
                  {
                    title: 'garam masala',
                    isDone: false,
                    id: 'TDYhWb4',
                  },
                  {
                    title: 'cayenne pepper',
                    isDone: false,
                    id: 'TDCUq6j',
                  },
                  {
                    title: 'cardamom',
                    isDone: false,
                    id: 'TD21eCQ',
                  },
                  {
                    title: '14 oz can diced tomatoes',
                    isDone: false,
                    id: 'TDzwjFP',
                  },
                  {
                    title: 'cauliflower',
                    isDone: false,
                    id: 'TDLiSxG',
                  },
                  {
                    title: 'frozen peas',
                    isDone: false,
                    id: 'TDlecFQ',
                  },
                  {
                    title: 'full fat canned coconut milk',
                    isDone: false,
                    id: 'TDVMbcz',
                  },
                  {
                    title: 'cilantro',
                    isDone: false,
                    id: 'TDctvlZ',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638656116443,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
        ],
      },
      {
        id: 'LLoaLJ',
        title: 'Family Favorites',
        cards: [
          {
            id: 'CrobxA',
            title: 'Curry Pork Burgers',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLLV96D',
                todos: [
                  {
                    title: '1 lb ground pork',
                    isDone: false,
                    id: 'TDsNZA6',
                  },
                  {
                    title: 'curry powder',
                    isDone: false,
                    id: 'TD0upoL',
                  },
                  {
                    title: 'ground coriander',
                    isDone: false,
                    id: 'TDUHorE',
                  },
                  {
                    title: 'ground cardamom',
                    isDone: false,
                    id: 'TDQC0HW',
                  },
                  {
                    title: 'Worchestershire sauce',
                    isDone: false,
                    id: 'TDxQp7G',
                  },
                  {
                    title: 'green onions',
                    isDone: false,
                    id: 'TDNlzXI',
                  },
                  {
                    title: 'garlic',
                    isDone: false,
                    id: 'TDUn8CO',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638656253750,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CgIOHC',
            title: 'Rosemary Pork Burgers',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLX215D',
                todos: [
                  {
                    title: '1 lb ground pork',
                    isDone: false,
                    id: 'TD6lUiB',
                  },
                  {
                    title: 'onion',
                    isDone: false,
                    id: 'TDeDnZU',
                  },
                  {
                    title: 'garlic',
                    isDone: false,
                    id: 'TDu4F9A',
                  },
                  {
                    title: 'fresh rosemary or dried rosemary',
                    isDone: false,
                    id: 'TDd3HIr',
                  },
                  {
                    title: 'Worchestershire sauce',
                    isDone: false,
                    id: 'TDG0Kl6',
                  },
                  {
                    title: 'Dijon mustard',
                    isDone: false,
                    id: 'TDDSk5K',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638656302417,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'C9dQ9D',
            title: 'Chicken Salad',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLckZfo',
                todos: [
                  {
                    title: '1 lb chicken',
                    isDone: false,
                    id: 'TDTaUjL',
                  },
                  {
                    title: 'Mayonnaise',
                    isDone: false,
                    id: 'TD81Oww',
                  },
                  {
                    title: 'Dijon mustard',
                    isDone: false,
                    id: 'TDL1jt0',
                  },
                  {
                    title: 'Dried dill',
                    isDone: false,
                    id: 'TDOxFFE',
                  },
                  {
                    title: 'onion powder',
                    isDone: false,
                    id: 'TDDy2gW',
                  },
                  {
                    title: 'garlic powder',
                    isDone: false,
                    id: 'TDPpqcV',
                  },
                  {
                    title: '1 cucumber',
                    isDone: false,
                    id: 'TDEKHeA',
                  },
                  {
                    title: 'eggs',
                    isDone: false,
                    id: 'TD01LYE',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD'],
            createdAt: 1638656349532,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'Cr2c1N',
            title: 'Meatloaf',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLiSWQz',
                todos: [
                  {
                    title: '3 lbs ground chuck',
                    isDone: false,
                    id: 'TDWsHEy',
                  },
                  {
                    title: '1 onion',
                    isDone: false,
                    id: 'TDkX0Uo',
                  },
                  {
                    title: 'eggs',
                    isDone: false,
                    id: 'TDI7RYJ',
                  },
                  {
                    title: 'French onion soup mix',
                    isDone: false,
                    id: 'TDQ3XIP',
                  },
                  {
                    title: 'Worchestershire sauce',
                    isDone: false,
                    id: 'TDoEDZ9',
                  },
                  {
                    title: 'plain bread crumbs',
                    isDone: false,
                    id: 'TD6p8SJ',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['S1UkR'],
            createdAt: 1638656401126,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CeRxk0',
            title: 'Meatloaf Burgers',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLumh8t',
                todos: [
                  {
                    title: '1 lb ground chuck',
                    isDone: false,
                    id: 'TDzBJP7',
                  },
                  {
                    title: '1 onion',
                    isDone: false,
                    id: 'TDDWr9s',
                  },
                  {
                    title: 'eggs',
                    isDone: false,
                    id: 'TD82XjP',
                  },
                  {
                    title: 'French onion soup mix',
                    isDone: false,
                    id: 'TD1Lt0A',
                  },
                  {
                    title: 'Worchestershire sauce',
                    isDone: false,
                    id: 'TDkNxBr',
                  },
                  {
                    title: 'plain bread crumbs',
                    isDone: false,
                    id: 'TDTN15h',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['S1UkR'],
            createdAt: 1638656447176,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CiRjX4',
            title: 'Low Country Nachos',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['b0JnY', '1b2ET', 'cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638656485672,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CkZffd',
            title: 'Chicken Enchiladas',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['S1UkR', 'thr5F'],
            createdAt: 1638657192802,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
        ],
      },
      {
        id: 'LLWrTZ',
        title: 'Crowd Pleasers',
        cards: [
          {
            id: 'CMPWy5',
            title: "Alton Brown's Baby Back Ribs",
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLmn4Nl',
                todos: [
                  {
                    title: '3 racks of pork baby back ribs',
                    isDone: false,
                    id: 'TDMLntE',
                  },
                  {
                    title: 'light brown sugar',
                    isDone: false,
                    id: 'TDYkC4I',
                  },
                  {
                    title: 'kosher salt',
                    isDone: false,
                    id: 'TDQn8iq',
                  },
                  {
                    title: 'chili powder',
                    isDone: false,
                    id: 'TDsSzcC',
                  },
                  {
                    title: 'ground black pepper',
                    isDone: false,
                    id: 'TD3yMSR',
                  },
                  {
                    title: 'cayenne pepper',
                    isDone: false,
                    id: 'TDfZRAp',
                  },
                  {
                    title: 'jalapeno seasoning',
                    isDone: false,
                    id: 'TDTsEtF',
                  },
                  {
                    title: 'Old Bay seasoning',
                    isDone: false,
                    id: 'TDnnIrJ',
                  },
                  {
                    title: 'thyme',
                    isDone: false,
                    id: 'TDQk73V',
                  },
                  {
                    title: 'onion powder',
                    isDone: false,
                    id: 'TDAeNXc',
                  },
                  {
                    title: 'white wine',
                    isDone: false,
                    id: 'TDIFkTo',
                  },
                  {
                    title: 'white wine vinegar',
                    isDone: false,
                    id: 'TDVKyk8',
                  },
                  {
                    title: 'Worchestershire sauce',
                    isDone: false,
                    id: 'TDisj2n',
                  },
                  {
                    title: 'honey',
                    isDone: false,
                    id: 'TDxDFva',
                  },
                  {
                    title: 'garlic',
                    isDone: false,
                    id: 'TD9oHKd',
                  },
                  {
                    title: 'extra-wide heavy-duty aluminium foil',
                    isDone: false,
                    id: 'TD4IsJB',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638656516115,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CIVY7j',
            title: 'Pulled Pork',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLK4UdB',
                todos: [
                  {
                    title: 'Pork shoulder/Boston Butt',
                    isDone: false,
                    id: 'TDDPTTr',
                  },
                  {
                    title: '2 large onions',
                    isDone: false,
                    id: 'TD25nmR',
                  },
                  {
                    title: 'kosher salt',
                    isDone: false,
                    id: 'TDXKQaH',
                  },
                  {
                    title: 'pepper',
                    isDone: false,
                    id: 'TDcyXig',
                  },
                  {
                    title: 'vegetable oil',
                    isDone: false,
                    id: 'TDPMGah',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['S1UkR', 'cVgzD', 'VvivO', 'thr5F'],
            createdAt: 1638656588883,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
        ],
      },
    ],
  },
  {
    _id: 'uaUog',
    title: 'Company Overview',
    createdAt: 1638986360388,
    createdBy: {
      _id: 'u103',
      fullname: 'Adam Bercovich',
      username: 'adamBerco',
      color: 'green',
      imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638867158/ohpwye1f7oidmqy7cujl.jpg',
    },
    style: {
      imgUrl:
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODA4Mzl8MHwxfHNlYXJjaHwxMXx8Y29tcGFueXxlbnwwfHx8fDE2Mzg5OTAyODY&ixlib=rb-1.2.1&q=80&w=1080',
      bgColor: 'rgba(168,152,142,1)',
      isDark: false,
    },
    labels: [
      {
        id: '8g0M9',
        txt: 'Product',
        colorClass: 'label-green',
      },
      {
        id: 'QwhBE',
        txt: 'Marketing',
        colorClass: 'label-yellow',
      },
      {
        id: '0mE9J',
        txt: 'Sales',
        colorClass: 'label-orange',
      },
      {
        id: 'DY6t4',
        txt: 'Support',
        colorClass: 'label-red',
      },
      {
        id: 'YJDoq',
        txt: 'People',
        colorClass: 'label-purple',
      },
      {
        id: 'lkGyP',
        txt: 'IT',
        colorClass: 'label-blue',
      },
    ],
    members: [
      {
        _id: 'u103',
        fullname: 'Adam Bercovich',
        username: 'adamBerco',
        color: 'green',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638867158/ohpwye1f7oidmqy7cujl.jpg',
      },
      {
        _id: 'u102',
        fullname: 'Osher Cappelli',
        username: 'osherCappelli',
        color: 'blue',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865093/fefzoaamkdnpvk9pt4sj.jpg',
      },
      {
        _id: 'u101',
        fullname: 'Oshra Hartuv',
        username: 'oshraHartuv1',
        color: 'pink',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865116/zlvylnqwvx8bcvp66lpn.jpg',
      },
    ],
    lists: [
      {
        id: 'LSAgms',
        title: 'Teams',
        cards: [
          {
            id: 'CeFMWv',
            title: 'Product',
            description:
              'March 20, 2015:\n\n- New design & bug fixes for iOS app.\n- Updated for Kit Kat on Android\n- Updated landing page\n\nMarch 13, 2015:\n\n- Changed logo to flatter look\n- Fixed bonus points bugs\n\nMarch 6, 2015:\n\n- Strings translated for localization',
            comments: [],
            checklists: [
              {
                title: 'Checklist',
                id: 'CLW4elM',
                todos: [
                  {
                    title: 'Alot of this',
                    isDone: true,
                    id: 'TDMp7zl',
                  },
                  {
                    title: 'And some more!',
                    isDone: true,
                    id: 'TDEEm1I',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['8g0M9'],
            createdAt: 1638655401916,
            dueDate: '2021-12-03 12:00:00',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: true,
          },
          {
            id: 'C02Nb8',
            title: 'Marketing',
            description:
              'March 20, 2015:\n\n- Boosted new signups by 21%\n- Launched "New You" campaign\n\nMarch 13, 2015:\n\n- Blog redesign\n\nMarch 6, 2015:\n\n- Email drip campaign\n- Newsletter redesign',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['QwhBE'],
            createdAt: 1638655420588,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CApjad',
            title: 'Sales',
            description:
              'March 20, 2020:\n\n- 10 new Enterprise clients\n- 14 new Business Pro accounts\n\nMarch 13, 2020:\n\n- 13 new Enterprise clients\n- 6 new Business Pro accounts\n',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['0mE9J'],
            createdAt: 1638655426996,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CTUmss',
            title: 'Support',
            description:
              'March 20, 2015:\n\n- 485 new conversations this past week. 6 week moving average is 444. \n- All hands on deck Wednesday 3/18 AM due to login issue.\n- We now have an Enterprise User Guide in the help docs.\n',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['DY6t4'],
            createdAt: 1638655431716,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'C3C45n',
            title: 'People',
            description:
              'March 20, 2020:\n\n- Hired Kathy Carter as our new node.js dev. She will start April 15, 2015.\n- Posted opening for a Windows mobile dev.',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['YJDoq'],
            createdAt: 1638655441421,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CYPUzs',
            title: 'IT',
            description:
              'March 20, 2015:\n\n- Moved base.html to the client, improving deployments.\n- Fixed an issue that was causing android app to not load.\n- Worked on security inbox and admin tools for support and marketing',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['lkGyP'],
            createdAt: 1638655445277,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
        ],
      },
      {
        id: 'LB66HG',
        title: 'Up Next',
        cards: [
          {
            id: 'CNVARC',
            title: 'Increase sales revenue by 30% in Q3',
            description:
              'The sales team is working to increase the pipeline in Q2 to see\nmeasurable differences in Q3 revenue reports.',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['0mE9J'],
            createdAt: 1638655498991,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'Cwiwtw',
            title: 'Ship iOS app',
            description: 'The mobile team has released an Android app and is now working on v2 of the iOS app.',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['8g0M9'],
            createdAt: 1638655501907,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'Cc7Prr',
            title: 'Increase conversion rate by 20% by Q3',
            description:
              "We'll be working on the conversion funnel, A/B testing landing pages to get to a template \nwe can use in future campaigns.\n",
            comments: [],
            checklists: [
              {
                title: 'Checklist',
                id: 'CLe60Bq',
                todos: [
                  {
                    title: 'Do this',
                    isDone: true,
                    id: 'TDKaAdr',
                  },
                  {
                    title: 'Do that',
                    isDone: false,
                    id: 'TDJHbav',
                  },
                  {
                    title: 'And more',
                    isDone: false,
                    id: 'TD1Oz1J',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['QwhBE'],
            createdAt: 1638655511477,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
        ],
      },
      {
        id: 'LqvnOh',
        title: 'Current Projects',
        cards: [
          {
            id: 'CVJhuP',
            title: 'Analytics Data',
            description:
              'Creating monthly marketing report showcasing campaign info and marketing data.\n\n*Week ending 3/20*',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['QwhBE'],
            createdAt: 1638655525067,
            dueDate: '2021-12-05 20:00:00',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CXqezJ',
            title: 'Develop Engineering Blog',
            description: "Blog for recruiting purposes where developers can post about what they're working on. ",
            comments: [],
            checklists: [
              {
                title: 'Checklist',
                id: 'CL4Gj7M',
                todos: [
                  {
                    title: 'To some of it',
                    isDone: false,
                    id: 'TDlkCmD',
                  },
                  {
                    title: 'And some of that',
                    isDone: true,
                    id: 'TDjBTbj',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['lkGyP'],
            createdAt: 1638655546367,
            dueDate: '2021-12-07 20:00:00',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: false,
          },
          {
            id: 'C64HAd',
            title: 'Brand Guidelines',
            description:
              'Designers on the product and marketing team are working on brand guidelines to ensure \nconsistency between designers.\n',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['8g0M9', 'QwhBE'],
            createdAt: 1638655548814,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
        ],
      },
      {
        id: 'LINTWs',
        title: 'Completed Projects',
        cards: [
          {
            id: 'CTvhWw',
            title: 'Social Media Campaign',
            description:
              "We're launching our first campaigns on Twitter and Facebook \nthis year via sponsored posts and tweets. ",
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['QwhBE'],
            createdAt: 1638655562476,
            dueDate: '2021-12-01 20:20:00',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: true,
          },
          {
            id: 'CS7Vwa',
            title: 'Update Help Documentation',
            description:
              'The current help docs contain screenshots and terminology that are out of date. \nThe Support team is updating these, as well as adding new content to reflect new \naspects of our product. \n',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['DY6t4'],
            createdAt: 1638655577236,
            dueDate: '2021-11-29 20:00:00',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: true,
          },
          {
            id: 'CujCdQ',
            title: 'Website Redesign',
            description:
              'Our brand & product have evolved over the past two years, and our website should be \nupdated to reflect this. The new site will be mobile-first, responsive and lightweight.\n',
            comments: [],
            checklists: [
              {
                title: 'Checklist',
                id: 'CLFNTNQ',
                todos: [
                  {
                    title: 'Build wireframe mockup',
                    isDone: true,
                    id: 'TDRez2Q',
                  },
                  {
                    title: 'Finalize design',
                    isDone: true,
                    id: 'TD7azaM',
                  },
                  {
                    title: 'Implement design',
                    isDone: true,
                    id: 'TDeMtHw',
                  },
                  {
                    title: 'A/B test new website vs. old website',
                    isDone: true,
                    id: 'TDU2rhY',
                  },
                  {
                    title: 'Launch new website',
                    isDone: true,
                    id: 'TDwUgf0',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['8g0M9', 'lkGyP'],
            createdAt: 1638655586748,
            dueDate: '2021-12-07 21:00:00',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
            isComplete: true,
          },
        ],
      },
      {
        id: 'LgtO82',
        title: 'Bravos',
        cards: [
          {
            id: 'CACpWK',
            title: 'Bravo to Tom for answering the most Customer Support emails ever received in one day!',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638655598882,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
          {
            id: 'CJH0W9',
            title: 'Bravo to Lauren for taking the lead and finishing the new landing page design!',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638655619396,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            attachments: [],
          },
        ],
      },
    ],
  },
];

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
  getBgImgs,
  setBackground,
};

// _createBoards();

// function query() {
//   return storageService.query(KEY);
// }

// function getById(id) {
//   return storageService.get(KEY, id);
// }

// function remove(id) {
//   return storageService.remove(KEY, id);
// }

// function save(board) {
//   const savedBoard = board._id ? storageService.put(KEY, board) : storageService.post(KEY, board);
//   return savedBoard;
// }

async function query(filterBy) {
  try {
    return httpService.get('board/', filterBy)
  } catch (err) {
    console.log('error:', err)
  }
}

async function getById(id) {
  try {
    return httpService.get('board/' + id)
  } catch (err) {
    console.log('error:', err)
  }
}

async function save(board) {
  try {
    if (board._id) {
      socketService.emit(SOCKET_EVENT_BOARD_UPDATED, board)
      return httpService.put('board/' + board._id, board)

    } else {
      return httpService.post('board/', board)
    }
  } catch (err) {
    console.log('err', err)
  }
}

async function remove(id) {
  try {
    return httpService.delete('board/' + id)
  } catch (err) {
    console.log('error:', err)
  }
}

async function getListAndCardById(boardId, cardId) {
  const board = await getById(boardId);
  const list = board.lists.find((list) => {
    return list.cards.find((card) => card.id === cardId);
  });
  const card = list.cards.find((card) => card.id === cardId);
  return { card, list };
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
async function removeCard(cardId, listToUpdate, boardId) {
  try {
    var boardToUpdate = await getById(boardId);
    const listIdx = boardToUpdate.lists.findIndex((currList) => listToUpdate.id === currList.id);
    const cardIdx = listToUpdate.cards.findIndex((currCard) => currCard.id === cardId);
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
    // _id: '',
    title,
    createdAt: '',
    createdBy: 'user',
    style: {
      imgUrl:
        'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/e1b4d655b33c1ef09b9aea6c6360f70c/photo-1637928114342-05b15ee4034e.jpg',
      isDark: true,
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
      imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
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
    const search = `https://api.unsplash.com/search/photos/?query=${searchKey ? searchKey : 'wallpapers'}&per_page=${
      imgNum ? imgNum : 50
    }&${page ? `page=${page}&` : ''}client_id=9xScnkiVqupizQUOywM06WUClEpMUbRg0wri1zPyIDo`;
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

// Create Test Data:
function _createBoards() {
  var boards = JSON.parse(localStorage.getItem(KEY));
  if (!boards || !boards.length) {
    boards = [];
    boards = gBoards;
    // boards = [
    // travelBoard(),
    // mealPlanner(),
    // companyBoard(),
    // _createBoard(
    //   'Work',
    //   'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1280x1920/e33d2a27fb80f83f54d82ffeb4f9e838/photo-1629221892514-7abb71a803f7.jpg'
    // ),
    // _createBoard(
    //   'Personal',
    //   'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2134x1600/02bb168d57905b1b5df6342f71ee94da/photo-1638130419943-1242ff0300bf.jpg'
    // ),
    // _createBoard(
    //   'Tinto',
    //   'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/5adf43e7129c68d8452213d9399c02cd/photo-1632758995926-17bbf7fad399.jpg'
    // ),
    // _createBoard(
    //   'My First Board',
    //   'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/e1b4d655b33c1ef09b9aea6c6360f70c/photo-1637928114342-05b15ee4034e.jpg'
    // ),
    // ];
    console.log('boards', boards);
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

function _getEmptyTodo(title) {
  return {
    isDone: false,
    title,
    id: 'TD' + utilService.makeId(),
  };
}

function travelBoard() {
  var board = {
    _id: utilService.makeId(),
    title: 'Travel Inspiration board',
    createdAt: Date.now(),
    createdBy: 'Oshra',
    style: {
      imgUrl:
        'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2133x1600/5e42c28aa28ba97ebe02ca239ca3ee4a/photo-1452421822248-d4c2b47f0c81.jpg',
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
  think.cards[0] = getEmptyCard('Want to travel? Where to start? Here’s everything you need to get going.');

  think.cards[1] = getEmptyCard('Travel Needs');
  think.cards[1].checklists.push({
    id: 'CL' + utilService.makeId(),
    title: 'Travel Needs Checklist',
    todos: [_getEmptyTodo('Adapter'), _getEmptyTodo('International Phone Plan'), _getEmptyTodo('Passport')],
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
  think.cards[6].labelIds.push(board.labels[2].id);

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

  check.cards[1] = getEmptyCard("Must-Do's Before Booking");
  check.cards[1].checklists.push({
    id: 'CL' + utilService.makeId(),
    title: "Must-Do's Before Booking",
    todos: [
      _getEmptyTodo('Determine Travel Dates'),
      _getEmptyTodo('Estimate Total Budget'),
      _getEmptyTodo('Prioritize Top Sights'),
    ],
  });
  check.cards[1].checklists[0].todos[0].isDone = true;
  check.cards[1].dueDate = new Date();
  check.cards[1].isComplete = true;

  board.lists.push(check);

  // list 3
  var go = {
    id: '',
    title: 'Countdown',
    cards: [],
  };
  // cards
  go.cards[0] = getEmptyCard('Things you’ll need to be thinking about weeks, days and hours before you head off.');
  const today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getHours() + 5);
  go.cards[0].dueDate = tomorrow;

  board.lists.push(go);

  // list 4
  var done = {
    id: '',
    title: 'And done!',
    cards: [],
  };
  // cards
  done.cards[0] = getEmptyCard('As you complete your checklist, move cards into this list to keep track of them.');

  board.lists.push(done);

  // console.log('lists', board.lists);
  board.lists.forEach((list) => {
    list.id = 'L' + utilService.makeId();
  });
  // console.log(board);
  board.createdBy = {
    _id: 'u101',
    fullname: 'Oshra Hartuv',
    username: 'oshraHartuv1',
    color: 'pink',
    imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865116/zlvylnqwvx8bcvp66lpn.jpg',
  };
  board.members = [
    {
      _id: 'u103',
      fullname: 'Adam Bercovich',
      username: 'adamBerco',
      color: 'green',
      imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638867158/ohpwye1f7oidmqy7cujl.jpg',
    },
    {
      _id: 'u102',
      fullname: 'Osher Cappelli',
      username: 'osherCappelli',
      color: 'blue',
      imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865093/fefzoaamkdnpvk9pt4sj.jpg',
    },
    {
      _id: 'u101',
      fullname: 'Oshra Hartuv',
      username: 'oshraHartuv1',
      color: 'pink',
      imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865116/zlvylnqwvx8bcvp66lpn.jpg',
    },
  ];
  return board;
}

function mealPlanner() {
  var proj = {
    _id: 'i9n9w',
    title: 'Meal Planning',
    createdAt: '',
    createdBy: {
      _id: 'u102',
      fullname: 'Osher Cappelli',
      username: 'osherCappelli',
      color: 'blue',
      imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865093/fefzoaamkdnpvk9pt4sj.jpg',
    },
    style: {
      imgUrl:
        'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2398x1600/6a5ac82565edf3fa43b6b3b00cb25322/photo-1591189863430-ab87e120f312.jpg',
    },
    labels: [
      { id: 'b0JnY', txt: 'Vegetarian', colorClass: 'label-green' },
      { id: '1b2ET', txt: 'Vegan', colorClass: 'label-yellow' },
      { id: 'cVgzD', txt: 'Gluten Free', colorClass: 'label-orange' },
      { id: 'S1UkR', txt: 'Nut Free', colorClass: 'label-red' },
      { id: 'thr5F', txt: 'Egg Free', colorClass: 'label-purple' },
      { id: 'VvivO', txt: 'Dairy Free', colorClass: 'label-blue' },
    ],
    members: [
      {
        _id: 'u103',
        fullname: 'Adam Bercovich',
        username: 'adamBerco',
        color: 'green',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638867158/ohpwye1f7oidmqy7cujl.jpg',
      },
      {
        _id: 'u102',
        fullname: 'Osher Cappelli',
        username: 'osherCappelli',
        color: 'blue',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865093/fefzoaamkdnpvk9pt4sj.jpg',
      },
      {
        _id: 'u101',
        fullname: 'Oshra Hartuv',
        username: 'oshraHartuv1',
        color: 'pink',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865116/zlvylnqwvx8bcvp66lpn.jpg',
      },
    ],
    lists: [
      {
        id: 'LnRD7u',
        title: 'Shopping Lists',
        cards: [
          {
            id: 'CXmjOC',
            title: 'Kroger',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Produce',
                id: 'CLUGLFl',
                todos: [
                  { title: 'New Potatoes', isDone: false, id: 'TDn2XSK' },
                  { title: 'Onions', isDone: false, id: 'TDIrLgz' },
                  { title: 'Strawberries', isDone: false, id: 'TD7omqq' },
                  { title: 'Blueberries', isDone: false, id: 'TDXFEMi' },
                  { title: 'Raspberries', isDone: false, id: 'TDauT9B' },
                  { title: 'Black berries', isDone: false, id: 'TDIHwNK' },
                  { title: 'Shallots', isDone: false, id: 'TDo5Zn6' },
                  { title: 'Avocado', isDone: false, id: 'TDn9qVA' },
                  { title: 'Bananas', isDone: false, id: 'TDEPenM' },
                ],
              },
              {
                title: 'ChecklistMeat & SeaFood',
                id: 'CLz30Qz',
                todos: [
                  { title: 'Hot dogs', isDone: false, id: 'TDDsEAN' },
                  { title: 'Brats', isDone: false, id: 'TDvhuvd' },
                  { title: 'Sausage x2', isDone: false, id: 'TD4HrfI' },
                  { title: 'Chuck x 1.5', isDone: false, id: 'TDXi4G0' },
                  { title: 'Chicken thighs x4', isDone: false, id: 'TDYw5Nx' },
                  { title: 'Lunchables', isDone: false, id: 'TDikw3j' },
                ],
              },
            ],
            members: [],
            labelIds: [],
            createdAt: 1638653800702,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'Cl85fm',
            title: "Sam's",
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Office Supplies',
                id: 'CLtkjOr',
                todos: [
                  { title: 'AA batteries', isDone: false, id: 'TDJTfiU' },
                  { title: 'AAA batteries', isDone: false, id: 'TDEZAtw' },
                ],
              },
              {
                title: 'Refrigerated Food',
                id: 'CLgruMf',
                todos: [
                  { title: 'Mushrooms', isDone: false, id: 'TDwiuYa' },
                  { title: 'Mozzarella', isDone: false, id: 'TDzkVgT' },
                  { title: 'Ball mozzarella', isDone: false, id: 'TDYEMTy' },
                  { title: 'Prosciutto', isDone: false, id: 'TDLoHdL' },
                ],
              },
            ],
            members: [],
            labelIds: [],
            createdAt: 1638654521558,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CRCmUx',
            title: 'Target',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Checklist',
                id: 'CLnFUoZ',
                todos: [
                  { title: 'IPA', isDone: false, id: 'TDCi0eP' },
                  { title: 'Hot pads', isDone: false, id: 'TDrxFss' },
                  { title: 'Dish towels', isDone: false, id: 'TDAyxhH' },
                  { title: 'Tissues', isDone: false, id: 'TDTli2M' },
                  { title: 'Composition books x3', isDone: false, id: 'TDtX22B' },
                  { title: 'Colored pencils', isDone: false, id: 'TDz4XD3' },
                  { title: 'Markers', isDone: false, id: 'TDro7pQ' },
                  { title: 'Expo markers (thin)', isDone: false, id: 'TDaYVyn' },
                  { title: 'Cups', isDone: false, id: 'TDKxM8y' },
                  { title: 'Toilet paper', isDone: false, id: 'TDVoNiZ' },
                  { title: 'Tissues', isDone: false, id: 'TDV1fKI' },
                  { title: 'Paper Leotard (lg)towels', isDone: false, id: 'TDaKEJu' },
                  { title: 'Leotard (lg)', isDone: false, id: 'TDiFJIM' },
                  { title: 'Footless tights', isDone: false, id: 'TDE3q4s' },
                  { title: 'Ballet slippers (1)', isDone: false, id: 'TDpHJZM' },
                  { title: 'Mouth wash', isDone: false, id: 'TD5YSv7' },
                  { title: 'Hydro bandaids', isDone: false, id: 'TDLms1x' },
                  { title: 'Oxy clean', isDone: false, id: 'TDDDbjp' },
                  { title: 'Plastic drawer', isDone: false, id: 'TDaYl4x' },
                ],
              },
            ],
            members: [],
            labelIds: [],
            createdAt: 1638654661052,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CMsio8',
            title: 'Walmart',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654785550,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
        ],
      },
      {
        id: 'L67yAR',
        title: '10/26-11/1 Meal Plan',
        cards: [
          {
            id: 'CKTTzF',
            title: 'Sunday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654873494,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CfWKcM',
            title: 'Monday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654833145,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CxYn2t',
            title: 'Tuesday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654846282,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CWG3OC',
            title: 'Wednesday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654849769,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'Cbushk',
            title: 'Thursday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654856358,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CyZe5g',
            title: 'Friday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654861787,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'Ci1P9x',
            title: 'Saturday:',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638654867034,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
        ],
      },
      {
        id: 'Lepmn6',
        title: 'Freezes Well',
        cards: [
          {
            id: 'CpfARK',
            title: 'Vietnamese Style Meatball Lettuce Wraps',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLEwltl',
                todos: [
                  { title: '1.5 lbs ground chuck', isDone: false, id: 'TDIC8uM' },
                  { title: 'garlic', isDone: false, id: 'TDvxj9M' },
                  { title: 'ginger', isDone: false, id: 'TDSIr66' },
                  { title: 'lettuce', isDone: false, id: 'TDJm5Wj' },
                  { title: 'scallions', isDone: false, id: 'TDJuZyK' },
                  { title: 'shredded carrots', isDone: false, id: 'TDbrw8E' },
                  { title: 'soy sauce or tamari', isDone: false, id: 'TDS5TyN' },
                  { title: 'hoisin sauce', isDone: false, id: 'TDdHTKP' },
                  { title: 'sesame oil', isDone: false, id: 'TDZftKq' },
                  { title: 'apricot jam', isDone: false, id: 'TDefRqy' },
                  { title: 'ramen noodles or rice noodles', isDone: false, id: 'TDRKGzb' },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638654890198,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CHIjIa',
            title: 'Spaghetti Casserole',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLt4l1v',
                todos: [
                  { title: '1 lb pasta', isDone: false, id: 'TDCkynj' },
                  { title: '1 jar tomato sauce', isDone: false, id: 'TDmtimh' },
                  { title: '8 oz cream cheese', isDone: false, id: 'TD4j7wu' },
                  { title: '8 oz sour cream', isDone: false, id: 'TDgFvpB' },
                  { title: '16 oz shredded mozzarella cheese', isDone: false, id: 'TDVUvaZ' },
                  { title: '6 oz pepperoni', isDone: false, id: 'TD1ZPla' },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F'],
            createdAt: 1638655370923,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CFlY1Y',
            title: 'Pulled Pork',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLHrH1Y',
                todos: [
                  { title: 'Pork shoulder/Boston Butt', isDone: false, id: 'TDkPsDJ' },
                  { title: '2 large onions', isDone: false, id: 'TDBlsez' },
                  { title: 'kosher salt', isDone: false, id: 'TDnJxBW' },
                  { title: 'pepper', isDone: false, id: 'TDxrD2q' },
                  { title: 'vegetable oil', isDone: false, id: 'TD5CxBs' },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638655460332,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CtQiX4',
            title: "Alton Brown's Baby Back Ribs",
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLSZDvm',
                todos: [
                  { title: '3 racks of pork baby back ribs', isDone: false, id: 'TDCK9yt' },
                  { title: 'light brown sugar', isDone: false, id: 'TDkLOiF' },
                  { title: 'kosher salt', isDone: false, id: 'TDkaMsh' },
                  { title: 'chili powder', isDone: false, id: 'TDRvfYu' },
                  { title: 'ground black pepper', isDone: false, id: 'TD4y51k' },
                  { title: 'cayenne pepper', isDone: false, id: 'TDX3AZm' },
                  { title: 'jalapeno seasoning', isDone: false, id: 'TD7VtOr' },
                  { title: 'Old Bay seasoning', isDone: false, id: 'TDscIoz' },
                  { title: 'thyme', isDone: false, id: 'TDIvj7k' },
                  { title: 'onion powder', isDone: false, id: 'TDAumlY' },
                  { title: 'white wine', isDone: false, id: 'TDe91w4' },
                  { title: 'white wine vinegar', isDone: false, id: 'TDMlKBJ' },
                  { title: 'Worchestershire sauce', isDone: false, id: 'TD4p6CS' },
                  { title: 'honey', isDone: false, id: 'TDepWZ8' },
                  { title: 'garlic', isDone: false, id: 'TDyyHCX' },
                  { title: 'extra-wide heavy-duty aluminium foil', isDone: false, id: 'TDixpUA' },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638655509198,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CtQsOJ',
            title: 'Meatloaf Burgers',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLyQDaV',
                todos: [
                  { title: '1 lb ground chuck', isDone: false, id: 'TDF8XLE' },
                  { title: '1 onion', isDone: false, id: 'TDuWhr4' },
                  { title: 'eggs', isDone: false, id: 'TDvBNeT' },
                  { title: 'French onion soup mix', isDone: false, id: 'TDcYOP7' },
                  { title: 'Worchestershire sauce', isDone: false, id: 'TDq2bBl' },
                  { title: 'plain bread crumbs', isDone: false, id: 'TD7QvBt' },
                ],
              },
            ],
            members: [],
            labelIds: ['S1UkR'],
            createdAt: 1638655606164,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CxVmOE',
            title: 'Chicken Enchiladas',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLoTPkX',
                todos: [
                  { title: 'avocado oil or olive oil', isDone: false, id: 'TDXkQTt' },
                  { title: 'onion', isDone: false, id: 'TDJySIM' },
                  { title: '1.5 lb boneless, skinless chicken breasts', isDone: false, id: 'TDHsxI7' },
                  { title: '4 oz can green chiles', isDone: false, id: 'TDr7oi1' },
                  { title: '15 oz can black beans', isDone: false, id: 'TDZQTbr' },
                  { title: 'large flour tortillas', isDone: false, id: 'TDa6A7k' },
                  { title: '3 c Mexican blend shredded cheese', isDone: false, id: 'TDgvXeg' },
                  { title: 'red enchilada sauce (if not making your own)', isDone: false, id: 'TD7GsGx' },
                  { title: 'all purpose flour (for homemade enchilada sauce)', isDone: false, id: 'TDw67II' },
                  { title: 'chili powder (for homemade enchilada sauce)', isDone: false, id: 'TDNXYmv' },
                  { title: 'garlic powder (for homemade enchilada sauce', isDone: false, id: 'TDFcauP' },
                  { title: 'ground cumin (for homemade enchilada sauce', isDone: false, id: 'TDbaDKX' },
                  { title: 'oregano (for homemade enchilada sauce)', isDone: false, id: 'TDeJEno' },
                  {
                    title: '16 oz chicken or vegetable stock (for homemade enchilada sauce)',
                    isDone: false,
                    id: 'TDc3kjU',
                  },
                  { title: 'cilantro (optional)', isDone: false, id: 'TDzfsjp' },
                  { title: 'red onion (optional)', isDone: false, id: 'TDUOtq0' },
                  { title: 'avocado (optional)', isDone: false, id: 'TDrIyvA' },
                  { title: 'sour cream (optional)', isDone: false, id: 'TD7V75C' },
                  { title: 'cotija cheese (optional)', isDone: false, id: 'TDM9hyA' },
                ],
              },
            ],
            members: [],
            labelIds: ['S1UkR', 'thr5F'],
            createdAt: 1638655668992,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
        ],
      },
      {
        id: 'LeA20O',
        title: 'Quick And Easy ',
        cards: [
          {
            id: 'CHECUA',
            title: 'Customized Frozen Pizza',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLX7fnI',
                todos: [
                  { title: 'Frozen cheese pizza', isDone: false, id: 'TDXyZH1' },
                  { title: 'Shredded mozzarella', isDone: false, id: 'TDPpeTL' },
                  { title: 'Sausage', isDone: false, id: 'TD2f7xz' },
                  { title: 'Pepperoni', isDone: false, id: 'TDEvcTE' },
                  { title: 'Shallots', isDone: false, id: 'TDLKOU8' },
                  { title: 'Canned mushrooms', isDone: false, id: 'TDBGqXV' },
                  { title: 'Black olives', isDone: false, id: 'TDaSkdY' },
                ],
              },
            ],
            members: [],
            labelIds: ['b0JnY', '1b2ET', 'cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638655805444,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'C9JsAY',
            title: 'Marinated Chicken (Grilled or Sheet Pan)',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLiShzQ',
                todos: [
                  { title: '1 lb chicken', isDone: false, id: 'TDKLu5g' },
                  { title: 'Marinade', isDone: false, id: 'TDjap5L' },
                  { title: 'Oil', isDone: false, id: 'TDIBIUr' },
                  { title: 'Vinegar or lemon juice', isDone: false, id: 'TDc22Ic' },
                  {
                    title: 'Salt, boullion cubes, soy sauce, or Worchestershire sauce',
                    isDone: false,
                    id: 'TDR3jJ2',
                  },
                  { title: 'Sugar', isDone: false, id: 'TDUx3m4' },
                  { title: 'Herbs, spices and seasonings', isDone: false, id: 'TDaa7IK' },
                  { title: 'Gallon zip-top bags', isDone: false, id: 'TDuftbt' },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638655854854,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'C5TThO',
            title: 'Easy Creamy Pasta with Sausage and Tomatoes',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CL3RVQb',
                todos: [
                  { title: 'Pasta', isDone: false, id: 'TDw4Z55' },
                  { title: 'Onion', isDone: false, id: 'TDj3nVH' },
                  { title: '1 pound sweet Italian sausage', isDone: false, id: 'TDwqZi5' },
                  { title: '14.5 oz can diced tomatoes', isDone: false, id: 'TDYyjAE' },
                  { title: 'Heavy cream', isDone: false, id: 'TDLcpWT' },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F'],
            createdAt: 1638655933523,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
        ],
      },
      {
        id: 'LJik8O',
        title: 'Slow Cooker',
        cards: [
          {
            id: 'CqthQf',
            title: 'Sherried Beef',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLk57OF',
                todos: [
                  { title: '3 lb chuck roast', isDone: false, id: 'TDHmFFU' },
                  { title: 'French onion soup mix', isDone: false, id: 'TDdIrwJ' },
                  { title: 'cream of mushroom soup', isDone: false, id: 'TDjN74Y' },
                  { title: 'Dry sherry', isDone: false, id: 'TDSoNkf' },
                  { title: 'Rice (optional)', isDone: false, id: 'TDjVf3w' },
                  { title: 'Egg noodles (optional)', isDone: false, id: 'TD7NPww' },
                ],
              },
            ],
            members: [],
            labelIds: ['S1UkR', 'thr5F'],
            createdAt: 1638655982910,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CKF9Z0',
            title: 'Versatile Mexican Crockpot',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLhipqW',
                todos: [
                  { title: '3 lb chuck roast or 3 lbs chicken breast or thighs', isDone: false, id: 'TDbOD6r' },
                  { title: 'Salsa', isDone: false, id: 'TDY0qIi' },
                  { title: 'Chopped green chiles (4 oz can)', isDone: false, id: 'TDLBrfo' },
                  { title: 'Tomato paste (6 oz can)', isDone: false, id: 'TDlqvPK' },
                  { title: 'Taco seasoning packet', isDone: false, id: 'TDn3yAW' },
                  { title: 'Shredded cheese (optional)', isDone: false, id: 'TDEt5cV' },
                  { title: 'Sour cream (optional)', isDone: false, id: 'TDUiCeX' },
                  { title: 'Tortillas or taco shells (optional)', isDone: false, id: 'TDQ5Q4I' },
                  { title: 'Rice (optional)', isDone: false, id: 'TD2LyM9' },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638656035926,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
        ],
      },
      {
        id: 'La87h8',
        title: 'Instant Pot',
        cards: [
          {
            id: 'Ck61qv',
            title: 'Chicken Tikka Masala',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLk9vOh',
                todos: [
                  { title: '1.5 lbs boneless skinless chicken thighs', isDone: false, id: 'TD72Eyu' },
                  { title: 'ghee, butter or cocunut oil', isDone: false, id: 'TDBQF7k' },
                  { title: 'kosher salt', isDone: false, id: 'TDlo9k1' },
                  { title: 'garlic', isDone: false, id: 'TDpti8F' },
                  { title: 'gingner', isDone: false, id: 'TD4kwPC' },
                  { title: 'coriander', isDone: false, id: 'TDUW4YJ' },
                  { title: 'turmeric', isDone: false, id: 'TD7qb5I' },
                  { title: 'garam masala', isDone: false, id: 'TDYhWb4' },
                  { title: 'cayenne pepper', isDone: false, id: 'TDCUq6j' },
                  { title: 'cardamom', isDone: false, id: 'TD21eCQ' },
                  { title: '14 oz can diced tomatoes', isDone: false, id: 'TDzwjFP' },
                  { title: 'cauliflower', isDone: false, id: 'TDLiSxG' },
                  { title: 'frozen peas', isDone: false, id: 'TDlecFQ' },
                  { title: 'full fat canned coconut milk', isDone: false, id: 'TDVMbcz' },
                  { title: 'cilantro', isDone: false, id: 'TDctvlZ' },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638656116443,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
        ],
      },
      {
        id: 'LLoaLJ',
        title: 'Family Favorites',
        cards: [
          {
            id: 'CrobxA',
            title: 'Curry Pork Burgers',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLLV96D',
                todos: [
                  { title: '1 lb ground pork', isDone: false, id: 'TDsNZA6' },
                  { title: 'curry powder', isDone: false, id: 'TD0upoL' },
                  { title: 'ground coriander', isDone: false, id: 'TDUHorE' },
                  { title: 'ground cardamom', isDone: false, id: 'TDQC0HW' },
                  { title: 'Worchestershire sauce', isDone: false, id: 'TDxQp7G' },
                  { title: 'green onions', isDone: false, id: 'TDNlzXI' },
                  { title: 'garlic', isDone: false, id: 'TDUn8CO' },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638656253750,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CgIOHC',
            title: 'Rosemary Pork Burgers',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLX215D',
                todos: [
                  { title: '1 lb ground pork', isDone: false, id: 'TD6lUiB' },
                  { title: 'onion', isDone: false, id: 'TDeDnZU' },
                  { title: 'garlic', isDone: false, id: 'TDu4F9A' },
                  { title: 'fresh rosemary or dried rosemary', isDone: false, id: 'TDd3HIr' },
                  { title: 'Worchestershire sauce', isDone: false, id: 'TDG0Kl6' },
                  { title: 'Dijon mustard', isDone: false, id: 'TDDSk5K' },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638656302417,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'C9dQ9D',
            title: 'Chicken Salad',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLckZfo',
                todos: [
                  { title: '1 lb chicken', isDone: false, id: 'TDTaUjL' },
                  { title: 'Mayonnaise', isDone: false, id: 'TD81Oww' },
                  { title: 'Dijon mustard', isDone: false, id: 'TDL1jt0' },
                  { title: 'Dried dill', isDone: false, id: 'TDOxFFE' },
                  { title: 'onion powder', isDone: false, id: 'TDDy2gW' },
                  { title: 'garlic powder', isDone: false, id: 'TDPpqcV' },
                  { title: '1 cucumber', isDone: false, id: 'TDEKHeA' },
                  { title: 'eggs', isDone: false, id: 'TD01LYE' },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD'],
            createdAt: 1638656349532,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'Cr2c1N',
            title: 'Meatloaf',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLiSWQz',
                todos: [
                  { title: '3 lbs ground chuck', isDone: false, id: 'TDWsHEy' },
                  { title: '1 onion', isDone: false, id: 'TDkX0Uo' },
                  { title: 'eggs', isDone: false, id: 'TDI7RYJ' },
                  { title: 'French onion soup mix', isDone: false, id: 'TDQ3XIP' },
                  { title: 'Worchestershire sauce', isDone: false, id: 'TDoEDZ9' },
                  { title: 'plain bread crumbs', isDone: false, id: 'TD6p8SJ' },
                ],
              },
            ],
            members: [],
            labelIds: ['S1UkR'],
            createdAt: 1638656401126,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CeRxk0',
            title: 'Meatloaf Burgers',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLumh8t',
                todos: [
                  { title: '1 lb ground chuck', isDone: false, id: 'TDzBJP7' },
                  { title: '1 onion', isDone: false, id: 'TDDWr9s' },
                  { title: 'eggs', isDone: false, id: 'TD82XjP' },
                  { title: 'French onion soup mix', isDone: false, id: 'TD1Lt0A' },
                  { title: 'Worchestershire sauce', isDone: false, id: 'TDkNxBr' },
                  { title: 'plain bread crumbs', isDone: false, id: 'TDTN15h' },
                ],
              },
            ],
            members: [],
            labelIds: ['S1UkR'],
            createdAt: 1638656447176,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CiRjX4',
            title: 'Low Country Nachos',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['b0JnY', '1b2ET', 'cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638656485672,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CkZffd',
            title: 'Chicken Enchiladas',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['S1UkR', 'thr5F'],
            createdAt: 1638657192802,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
            isComplete: false,
          },
        ],
      },
      {
        id: 'LLWrTZ',
        title: 'Crowd Pleasers',
        cards: [
          {
            id: 'CMPWy5',
            title: "Alton Brown's Baby Back Ribs",
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLmn4Nl',
                todos: [
                  { title: '3 racks of pork baby back ribs', isDone: false, id: 'TDMLntE' },
                  { title: 'light brown sugar', isDone: false, id: 'TDYkC4I' },
                  { title: 'kosher salt', isDone: false, id: 'TDQn8iq' },
                  { title: 'chili powder', isDone: false, id: 'TDsSzcC' },
                  { title: 'ground black pepper', isDone: false, id: 'TD3yMSR' },
                  { title: 'cayenne pepper', isDone: false, id: 'TDfZRAp' },
                  { title: 'jalapeno seasoning', isDone: false, id: 'TDTsEtF' },
                  { title: 'Old Bay seasoning', isDone: false, id: 'TDnnIrJ' },
                  { title: 'thyme', isDone: false, id: 'TDQk73V' },
                  { title: 'onion powder', isDone: false, id: 'TDAeNXc' },
                  { title: 'white wine', isDone: false, id: 'TDIFkTo' },
                  { title: 'white wine vinegar', isDone: false, id: 'TDVKyk8' },
                  { title: 'Worchestershire sauce', isDone: false, id: 'TDisj2n' },
                  { title: 'honey', isDone: false, id: 'TDxDFva' },
                  { title: 'garlic', isDone: false, id: 'TD9oHKd' },
                  { title: 'extra-wide heavy-duty aluminium foil', isDone: false, id: 'TD4IsJB' },
                ],
              },
            ],
            members: [],
            labelIds: ['cVgzD', 'S1UkR', 'thr5F', 'VvivO'],
            createdAt: 1638656516115,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CIVY7j',
            title: 'Pulled Pork',
            description: '',
            comments: [],
            checklists: [
              {
                title: 'Shopping List',
                id: 'CLK4UdB',
                todos: [
                  { title: 'Pork shoulder/Boston Butt', isDone: false, id: 'TDDPTTr' },
                  { title: '2 large onions', isDone: false, id: 'TD25nmR' },
                  { title: 'kosher salt', isDone: false, id: 'TDXKQaH' },
                  { title: 'pepper', isDone: false, id: 'TDcyXig' },
                  { title: 'vegetable oil', isDone: false, id: 'TDPMGah' },
                ],
              },
            ],
            members: [],
            labelIds: ['S1UkR', 'cVgzD', 'VvivO', 'thr5F'],
            createdAt: 1638656588883,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
        ],
      },
    ],
  };
  return proj;
}

function companyBoard() {
  var company = {
    _id: 'uaUog',
    title: 'Company Overview',
    createdAt: '',
    createdBy: {
      _id: 'u103',
      fullname: 'Adam Bercovich',
      username: 'adamBerco',
      color: 'green',
      imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638867158/ohpwye1f7oidmqy7cujl.jpg',
    },
    style: {
      imgUrl:
        'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/2c7f3ad5d8130dc15eae5305a6071253/photo-1572025442646-866d16c84a54.jpg',
    },
    labels: [
      {
        id: '8g0M9',
        txt: 'Product',
        colorClass: 'label-green',
      },
      {
        id: 'QwhBE',
        txt: 'Marketing',
        colorClass: 'label-yellow',
      },
      {
        id: '0mE9J',
        txt: 'Sales',
        colorClass: 'label-orange',
      },
      {
        id: 'DY6t4',
        txt: 'Support',
        colorClass: 'label-red',
      },
      {
        id: 'YJDoq',
        txt: 'People',
        colorClass: 'label-purple',
      },
      {
        id: 'lkGyP',
        txt: 'IT',
        colorClass: 'label-blue',
      },
    ],

    members: [
      {
        _id: 'u103',
        fullname: 'Adam Bercovich',
        username: 'adamBerco',
        color: 'green',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638867158/ohpwye1f7oidmqy7cujl.jpg',
      },
      {
        _id: 'u102',
        fullname: 'Osher Cappelli',
        username: 'osherCappelli',
        color: 'blue',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865093/fefzoaamkdnpvk9pt4sj.jpg',
      },
      {
        _id: 'u101',
        fullname: 'Oshra Hartuv',
        username: 'oshraHartuv1',
        color: 'pink',
        imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638865116/zlvylnqwvx8bcvp66lpn.jpg',
      },
    ],
    lists: [
      {
        id: 'LSAgms',
        title: 'Teams',
        cards: [
          {
            id: 'CeFMWv',
            title: 'Product',
            description:
              'March 20, 2015:\n\n- New design & bug fixes for iOS app.\n- Updated for Kit Kat on Android\n- Updated landing page\n\nMarch 13, 2015:\n\n- Changed logo to flatter look\n- Fixed bonus points bugs\n\nMarch 6, 2015:\n\n- Strings translated for localization',
            comments: [],
            checklists: [
              {
                title: 'Checklist',
                id: 'CLW4elM',
                todos: [
                  {
                    title: 'Alot of this',
                    isDone: true,
                    id: 'TDMp7zl',
                  },
                  {
                    title: 'And some more!',
                    isDone: true,
                    id: 'TDEEm1I',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['8g0M9'],
            createdAt: 1638655401916,
            dueDate: '2021-12-03 12:00:00',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
            isComplete: true,
          },
          {
            id: 'C02Nb8',
            title: 'Marketing',
            description:
              'March 20, 2015:\n\n- Boosted new signups by 21%\n- Launched "New You" campaign\n\nMarch 13, 2015:\n\n- Blog redesign\n\nMarch 6, 2015:\n\n- Email drip campaign\n- Newsletter redesign',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['QwhBE'],
            createdAt: 1638655420588,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CApjad',
            title: 'Sales',
            description:
              'March 20, 2020:\n\n- 10 new Enterprise clients\n- 14 new Business Pro accounts\n\nMarch 13, 2020:\n\n- 13 new Enterprise clients\n- 6 new Business Pro accounts\n',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['0mE9J'],
            createdAt: 1638655426996,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CTUmss',
            title: 'Support',
            description:
              'March 20, 2015:\n\n- 485 new conversations this past week. 6 week moving average is 444. \n- All hands on deck Wednesday 3/18 AM due to login issue.\n- We now have an Enterprise User Guide in the help docs.\n',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['DY6t4'],
            createdAt: 1638655431716,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'C3C45n',
            title: 'People',
            description:
              'March 20, 2020:\n\n- Hired Kathy Carter as our new node.js dev. She will start April 15, 2015.\n- Posted opening for a Windows mobile dev.',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['YJDoq'],
            createdAt: 1638655441421,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CYPUzs',
            title: 'IT',
            description:
              'March 20, 2015:\n\n- Moved base.html to the client, improving deployments.\n- Fixed an issue that was causing android app to not load.\n- Worked on security inbox and admin tools for support and marketing',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['lkGyP'],
            createdAt: 1638655445277,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
        ],
      },
      {
        id: 'LB66HG',
        title: 'Up Next',
        cards: [
          {
            id: 'CNVARC',
            title: 'Increase sales revenue by 30% in Q3',
            description:
              'The sales team is working to increase the pipeline in Q2 to see\nmeasurable differences in Q3 revenue reports.',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['0mE9J'],
            createdAt: 1638655498991,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'Cwiwtw',
            title: 'Ship iOS app',
            description: 'The mobile team has released an Android app and is now working on v2 of the iOS app.',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['8g0M9'],
            createdAt: 1638655501907,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'Cc7Prr',
            title: 'Increase conversion rate by 20% by Q3',
            description:
              "We'll be working on the conversion funnel, A/B testing landing pages to get to a template \nwe can use in future campaigns.\n",
            comments: [],
            checklists: [
              {
                title: 'Checklist',
                id: 'CLe60Bq',
                todos: [
                  {
                    title: 'Do this',
                    isDone: true,
                    id: 'TDKaAdr',
                  },
                  {
                    title: 'Do that',
                    isDone: false,
                    id: 'TDJHbav',
                  },
                  {
                    title: 'And more',
                    isDone: false,
                    id: 'TD1Oz1J',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['QwhBE'],
            createdAt: 1638655511477,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
        ],
      },
      {
        id: 'LqvnOh',
        title: 'Current Projects',
        cards: [
          {
            id: 'CVJhuP',
            title: 'Analytics Data',
            description:
              'Creating monthly marketing report showcasing campaign info and marketing data.\n\n*Week ending 3/20*',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['QwhBE'],
            createdAt: 1638655525067,
            dueDate: '2021-12-05 20:00:00',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CXqezJ',
            title: 'Develop Engineering Blog',
            description: "Blog for recruiting purposes where developers can post about what they're working on. ",
            comments: [],
            checklists: [
              {
                title: 'Checklist',
                id: 'CL4Gj7M',
                todos: [
                  {
                    title: 'To some of it',
                    isDone: false,
                    id: 'TDlkCmD',
                  },
                  {
                    title: 'And some of that',
                    isDone: true,
                    id: 'TDjBTbj',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['lkGyP'],
            createdAt: 1638655546367,
            dueDate: '2021-12-07 20:00:00',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
            isComplete: false,
          },
          {
            id: 'C64HAd',
            title: 'Brand Guidelines',
            description:
              'Designers on the product and marketing team are working on brand guidelines to ensure \nconsistency between designers.\n',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['8g0M9', 'QwhBE'],
            createdAt: 1638655548814,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
        ],
      },
      {
        id: 'LINTWs',
        title: 'Completed Projects',
        cards: [
          {
            id: 'CTvhWw',
            title: 'Social Media Campaign',
            description:
              "We're launching our first campaigns on Twitter and Facebook \nthis year via sponsored posts and tweets. ",
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['QwhBE'],
            createdAt: 1638655562476,
            dueDate: '2021-12-01 20:20:00',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
            isComplete: true,
          },
          {
            id: 'CS7Vwa',
            title: 'Update Help Documentation',
            description:
              'The current help docs contain screenshots and terminology that are out of date. \nThe Support team is updating these, as well as adding new content to reflect new \naspects of our product. \n',
            comments: [],
            checklists: [],
            members: [],
            labelIds: ['DY6t4'],
            createdAt: 1638655577236,
            dueDate: '2021-11-29 20:00:00',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
            isComplete: true,
          },
          {
            id: 'CujCdQ',
            title: 'Website Redesign',
            description:
              'Our brand & product have evolved over the past two years, and our website should be \nupdated to reflect this. The new site will be mobile-first, responsive and lightweight.\n',
            comments: [],
            checklists: [
              {
                title: 'Checklist',
                id: 'CLFNTNQ',
                todos: [
                  {
                    title: 'Build wireframe mockup',
                    isDone: true,
                    id: 'TDRez2Q',
                  },
                  {
                    title: 'Finalize design',
                    isDone: true,
                    id: 'TD7azaM',
                  },
                  {
                    title: 'Implement design',
                    isDone: true,
                    id: 'TDeMtHw',
                  },
                  {
                    title: 'A/B test new website vs. old website',
                    isDone: true,
                    id: 'TDU2rhY',
                  },
                  {
                    title: 'Launch new website',
                    isDone: true,
                    id: 'TDwUgf0',
                  },
                ],
              },
            ],
            members: [],
            labelIds: ['8g0M9', 'lkGyP'],
            createdAt: 1638655586748,
            dueDate: '2021-12-07 21:00:00',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
            isComplete: true,
          },
        ],
      },
      {
        id: 'LgtO82',
        title: 'Bravos',
        cards: [
          {
            id: 'CACpWK',
            title: 'Bravo to Tom for answering the most Customer Support emails ever received in one day!',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638655598882,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
          {
            id: 'CJH0W9',
            title: 'Bravo to Lauren for taking the lead and finishing the new landing page design!',
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: 1638655619396,
            dueDate: '',
            style: null,
            byMember: {
              id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            activities: [],
            imgUrl: '',
            attachments: [],
          },
        ],
      },
    ],
  };
  return company;
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
