import { utilService } from '../services/util.service.js';

export const statisticsStore = {
  state: {
    showDashboard: false,
    statistics: {
      refresh: 5,
      updated: 12,
      removed: 32,
      created: 10,
      total: 59,
    },
  },
  getters: {
    getStatistics(state) {
      return JSON.parse(JSON.stringify(state.statistics));
    },
    showDashboard(state) {
      return state.showDashboard;
    },
  },
  mutations: {
    updateStat(state) {
      const fields = ['refresh', 'updated', 'removed', 'created'];
      const field = fields[utilService.getRandomInt(0, fields.length - 1)];
      const amount = utilService.getRandomInt(-20, 20);
      state.statistics[field] += amount;
      state.statistics.total += amount;
      if (state.statistics.total <= 0) state.statistics.total = 0;
      if (state.statistics[field] <= 0) state.statistics[field] = 0;
    },
    toggleDashboard(state) {
      state.showDashboard = !state.showDashboard;
    },
  },
  actions: {
    updateStat({ commit }) {
      commit({ type: 'updateStat' });
    },
  },
};
