import { boardService } from '../services/board.service.js';

export const boardStore = {
  state: {
    currBoard: null,
    boards: null
  },

  getters: {
    board(state) {
      return state.currBoard;
    },
    boards(state) {
      return state.boards;
    },
  },

  mutations: {
    setBoard(state, { board }) {
      state.currBoard = board;
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
        commit({type:'setBoards', boards})
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
    async createBoard({ commit },{title}){
      const board = boardService.getEmptyBoard(title);
      const savedBoard = boardService.save(board)
      commit({ type: 'setBoard',board: savedBoard });
      return savedBoard

    }
  },
};
