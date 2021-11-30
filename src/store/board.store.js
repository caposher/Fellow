import { boardService } from '../services/board.service.js';

export const boardStore = {
  state: {
    currBoard: null,
    boards: null,
  },

  getters: {
    board(state) {
      return JSON.parse(JSON.stringify(state.currBoard));
    },
    boards(state) {
      return JSON.parse(JSON.stringify(state.boards));
    },
    boardId(state){
      return state.currBoard._id
    }
  },

  mutations: {
    setBoard(state, { board }) {
      state.currBoard = board;
      console.log('state.currBoard', state.currBoard);
    },
    setBoards(state, { boards }) {
      state.boards = boards;
    },
  },

  actions: {
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query();
        console.log('boards', boards);
        commit({ type: 'setBoards', boards });
        return boards;
      } catch (err) {
        console.log('cant load boards:', err);
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
        console.log('cant creat board', err);
      }
    },
    async addList({ commit }, { boardId, title }) {
      const list = boardService.getEmptyList(title);
      try {
        const updatedBoard = await boardService.saveList(list, boardId);
        commit({ type: 'setBoard', board: updatedBoard });
        return updatedBoard;
      } catch (err) {
        console.log('cant addList', err);
      }
    },
    async addCard({ commit }, { boardId,list, title }) {
      const card = boardService.getEmptyCard(title);
      console.log('card',card);
      const updatedList = list.cards.unshift(card)
      console.log('updatedList',updatedList);
      try {
        const updatedBoard = await boardService.saveList(updatedList, boardId);
        commit({ type: 'setBoard', board: updatedBoard });
        return updatedBoard;
      } catch (err) {
        console.log('cant add card', err);
      }
    },
  },
};
