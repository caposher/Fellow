import { boardService } from '../services/board.service.js';
import { userService } from '../services/user.service.js';
import { utilService } from '../services/util.service.js';

export const boardStore = {
  state: {
    currBoard: null,
    boards: null,
    currCard: null,
    currList: null,
    labelsState: false,
    bgPhotos: [],
    notification: { lastUpdate: Date.now(), updatesCount: 0 },
  },

  getters: {
    board(state) {
      return JSON.parse(JSON.stringify(state.currBoard));
    },
    boards(state) {
      return JSON.parse(JSON.stringify(state.boards));
    },
    boardId(state) {
      return state.currBoard._id;
    },
    card(state) {
      return JSON.parse(JSON.stringify(state.currCard));
    },
    list(state) {
      return JSON.parse(JSON.stringify(state.currList));
    },
    labels(state) {
      return JSON.parse(JSON.stringify(state.currBoard.labels));
    },
    labelsState(state) {
      return JSON.parse(JSON.stringify(state.labelsState));
    },
    getBgPhotos(state) {
      return JSON.parse(JSON.stringify(state.bgPhotos));
    },
    getLastUpdateTime(state) {
      return state.notification.lastUpdate;
    },
    getNotificationCnt(state) {
      return state.notification.updatesCount;
    },
    getActivities(state) {
      return state.currBoard.activities;
    },
  },

  mutations: {
    setBoard(state, { board }) {
      state.currBoard = board;
      // ++state.statistic.boardUpdate;
    },
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    setCard(state, { card }) {
      state.currCard = card;
    },
    setList(state, { list }) {
      state.currList = list;
    },
    toggleLabel(state, { labelsState }) {
      state.labelsState = !labelsState; //switch state
    },
    setPhotos(state, { photos }) {
      state.bgPhotos = photos;
    },
    addNotificationCnt(state) {
      state.notification.updatesCount++;
      state.notification.lastUpdate = Date.now();

      console.log('new update:', state.notification);
    },
    resetNotification(state) {
      state.notification.updatesCount = 0;
      state.notification.lastUpdate = Date.now();
      console.log('notification reset');
    },
  },

  actions: {
    pushedBoard({ commit }, { board, haveUpdate }) {
      commit({ type: 'setBoard', board });
      if (haveUpdate) commit({ type: 'addNotificationCnt' });
    },
    async loadBoards({ commit}) {
      try {
        const filterBy = {user: await userService.getLoggedInUser()}
        console.log(filterBy);
        const boards = await boardService.query(filterBy);
        console.log('boards', boards);
        commit({ type: 'setBoards', boards });
      } catch (err) {
        console.log('cant load boards:', err);
      }
    },
    async loadBoard({ commit }, { boardId }) {
      if (!boardId) {
        commit({ type: 'setBoard', board: null });
        return;
      }
      try {
        const board = await boardService.getById(boardId);
        commit({ type: 'setBoard', board });
      } catch (err) {
        console.log('cant load boards:', err);
      }
    },
    async updateBoard({ commit }, { board }) {
      const boardId = board._id;
      try {
        const filterBy = {user: await userService.getLoggedInUser()}
        commit({ type: 'setBoard', board: board });
        await boardService.save(board);
        const updatedBoards = await boardService.query(filterBy);
        commit({ type: 'setBoards', boards: updatedBoards });
      } catch (err) {
        const board = await boardService.getById(boardId);
        const filterBy = {user: await userService.getLoggedInUser()}
        const updatedBoards = await boardService.query(filterBy);
        commit({ type: 'setBoards', boards: updatedBoards });
        commit({ type: 'setBoard', board });
        console.log('failed to update board');
      }
    },
    async deleteBoard({ commit }, { boardId }) {
      try {
        await boardService.remove(boardId);
        const filterBy = {user: await userService.getLoggedInUser()}
        const boards = await boardService.query(filterBy);
        commit({ type: 'setBoards', boards });
        commit({ type: 'setBoard', board: null });
      } catch (err) {
        console.log('cant delete Board', err);
      }
    },
    async setListAndCard({ commit }, { boardId, cardId }) {
      try {
        if (cardId) {
          const data = await boardService.getListAndCardById(boardId, cardId);
          const card = data.card;
          const list = data.list;
          commit({ type: 'setCard', card });
          commit({ type: 'setList', list });
        } else {
          commit({ type: 'setCard', card: null });
          commit({ type: 'setList', list: null });
        }
      } catch (err) {
        console.log('cant load card:', err);
      }
    },
    async createBoard({ commit }, { title }) {
      try {
        const user = await userService.getLoggedInUser()
        const board = boardService.getEmptyBoard(title,user);
        const savedBoard = await boardService.save(board);
        const filterBy = {user: await userService.getLoggedInUser()}
        const boards = await boardService.query(filterBy);
        commit({ type: 'setBoard', board: savedBoard });
        commit({ type: 'setBoards', boards });
        return savedBoard;
      } catch (err) {
        console.log("can't create board", err);
      }
    },
    async addList({ commit }, { board, title }) {
      console.log('board', board);
      const list = boardService.getEmptyList(title);
      const activityText = `added list ${list.title}`;
      const activity = boardService.getActivity(activityText);
      board.activities.push(activity);
      try {
        const updatedBoard = await boardService.saveList(list, board, activity);
        commit({ type: 'setBoard', board: updatedBoard });
        return updatedBoard;
      } catch (err) {
        console.log('cant addList', err);
      }
    },
    async updateList({ commit }, { board, list }) {
      try {
        const updatedBoard = await boardService.saveList(list, board);
        commit({ type: 'setBoard', board: updatedBoard });
        return updatedBoard;
      } catch (err) {
        console.log('cant update list', err);
      }
    },
    async deleteList({ commit }, { board, list }) {
      const activityText = `deleted list ${list.title}`;
      const activity = boardService.getActivity(activityText);
      board.activities.push(activity);
      const listIdx = board.lists.findIndex((currList) => currList.id === list.id);
      board.lists.splice(listIdx, 1);
      try {
        const updatedBoard = await boardService.save(board);
        commit({ type: 'setBoard', board: updatedBoard });
        console.log('activity', updatedBoard.activities);

        return updatedBoard;
      } catch (err) {
        console.log('cant delete list', err);
      }
    },
    async addCard({ commit }, { board, list, title }) {
      const card = boardService.getEmptyCard(title);
      const activityText = `added ${card.title} to ${list.title}`;
      const activity = boardService.getActivity(activityText, card);
      board.activities.push(activity);
      list.cards.push(card);
      try {
        const updatedBoard = await boardService.saveList(list, board);
        commit({ type: 'setBoard', board: updatedBoard });
        return updatedBoard;
      } catch (err) {
        console.log('cant add card', err);
      }
    },
    // async updateCard({ commit }, { boardId, list, card }) {
    //   try {

    //     const data = await boardService.updateCard(card, list, boardId);
    //     commit({ type: 'setBoard', board: data.savedBoard });
    //     commit({ type: 'setList', list: data.savedList });
    //     commit({ type: 'setCard', card: data.savedCard });
    //   } catch (err) {
    //     console.log('cant add card', err);
    //   }
    // },
    async updateCard({ commit }, { boardId, list, card, activity }) {
      try {
        const data = await boardService.updateCard(card, list, boardId, activity);
        commit({ type: 'setBoard', board: data.savedBoard });
        commit({ type: 'setList', list: data.savedList });
        commit({ type: 'setCard', card: data.savedCard });
      } catch (err) {
        console.log('cant add card', err);
      }
    },
    async removeCard({ commit }, { boardId, list, cardId }) {
      try {
        const data = await boardService.removeCard(cardId, list, boardId);
        commit({ type: 'setBoard', board: data.savedBoard });
        commit({ type: 'setList', list: data.savedList });
        commit({ type: 'setCard', card: data.savedCard });
      } catch (err) {
        console.log('cant remove card', err);
      }
    },
    async createLabel({ commit }, { board, label }) {
      try {
        let newLabel = boardService.getEmptyLabel();
        newLabel.txt = label.txt;
        newLabel.colorClass = label.colorClass;
        board.labels.push(newLabel);
        const newBoard = await boardService.save(board);
        commit({ type: 'setBoard', board: newBoard });
      } catch (err) {
        console.log('failed to create new label');
      }
    },
    async requestPhotos({ commit }, { searchKey, imgNum, page }) {
      // console.log('next', next);
      try {
        const photos = await boardService.getBgImgs(searchKey, imgNum, page);
        commit({ type: 'setPhotos', photos });
      } catch (err) {
        console.log('failed to get photos', err);
      }
    },
    async setBackground({ commit, dispatch }, { boardId, style }) {
      try {
        const board = await boardService.setBackground(boardId, style);
        commit({ type: 'setBoard', board });
        // dispatch({ type: 'loadBoards' });
      } catch (err) {
        console.log('failed to set background', err);
      }
    },
  },
};
