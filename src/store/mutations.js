/* eslint-disable */

import * as types from "./mutation-types";

const matutations = {
  [types.SET_REFRESH_BTN](state, flag) {
    state.refreshBtn = flag;
  },

  updateDirection(state, payload) {
    const { direction } = payload;
    state.direction = direction;
  }
};

export default matutations;
