import { boardService } from '../services/board.service.js';

export const boardStore = {
  state: {
    currBoard: null,
  },

  getters: {
    board(state) {
      return state.currBoard;
    },
  },

  mutations: {
    setBoard(state, { board }) {
      state.currBoard = board;
    },
  },

  actions: {
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query();
        commit({type:'setBoards', boards})
        return boards;
      } catch (err) {
        console.log('cant load boards:', err);
      }
    },
    async loadAndWatchBoard({ commit }, { id }) {
      try {
        const board = await boardService.getById(id);
        commit({ type: 'setBoard', board });
        return board;
      } catch (err) {
        console.log('cant load board:' + id, err);
      }
    },
  },
};
