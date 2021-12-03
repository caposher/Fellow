import { boardService } from '../services/board.service.js';

export const boardStore = {
  state: {
    currBoard: null,
    boards: null,
    currCard: null,
    currList: null,
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
  },

  mutations: {
    setBoard(state, { board }) {
      state.currBoard = board;
      // console.log('state.currBoard', state.currBoard);
    },
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    setCard(state, { card }) {
      state.currCard = card;
      // console.log(state.currCard);
    },
    setList(state, { list }) {
      state.currList = list;
      // console.log(state.currList);
    },
  },

  actions: {
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query();
        console.log('boards', boards);
        commit({ type: 'setBoards', boards });
        // return boards;
      } catch (err) {
        console.log('cant load boards:', err);
      }
    },
    async loadBoard({ commit }, { boardId }) {
      try {
        const board = await boardService.getById(boardId);
        commit({ type: 'setBoard', board });
        // return board;
      } catch (err) {
        console.log('cant load boards:', err);
      }
    },
    async setListAndCard({ commit }, { boardId, cardId }) {
      try {
        if (cardId) {
          const data = await boardService.getListAndCardById(boardId, cardId);
          const card = data.card;
          const list = data.list;
          // console.log('list', list);
          // console.log('card', card);
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
    async loadAndWatchBoard({ commit }, { boardId }) {
      try {
        const board = await boardService.getById(boardId);
        commit({ type: 'setBoard', board });
        return board;
      } catch (err) {
        console.log('cant load board:' + id, err);
      }
    },
    async createBoard({ commit }, { title }) {
      try {
        const board = boardService.getEmptyBoard(title);
        const savedBoard = boardService.save(board);
        commit({ type: 'setBoard', board: savedBoard });
        return savedBoard;
      } catch (err) {
        console.log("can't create board", err);
      }
    },
    async addList({ commit }, { board, title }) {
      const list = boardService.getEmptyList(title);
      try {
        const updatedBoard = await boardService.saveList(list, board);
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
    async addCard({ commit }, { board, list, title }) {
      const card = boardService.getEmptyCard(title);
      console.log('card', card);
      list.cards.push(card);
      console.log('updatedList', list);
      try {
        const updatedBoard = await boardService.saveList(list, board);
        commit({ type: 'setBoard', board: updatedBoard });
        return updatedBoard;
      } catch (err) {
        console.log('cant add card', err);
      }
    },
    async updateCard({ commit }, { boardId, list, card }) {
      try {
        // console.log('card', card);
        const data = await boardService.updateCard(card, list, boardId);
        // console.log(data);
        commit({ type: 'setBoard', board: data.savedBoard });
        commit({ type: 'setList', list: data.savedList });
        commit({ type: 'setCard', card: data.savedCard });
      } catch (err) {
        console.log('cant add card', err);
      }
    },
  },
};
