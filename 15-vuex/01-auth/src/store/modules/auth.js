import { loginWithApi } from '@/api';

// state - реактивный объект с состоянием хранилища
const state = () => ({
  user: null,
  error: null,
  state: 'idle',
});

// Геттеры, подобно вычисляемым свойствам в компоненте, позволяют вычислять новые значения
// на основе реактивного состояния хранилища и других геттеров
const getters = {
  // GETTER_TYPE(state, getters, rootState, rootGetters)
  // Возвращает новое значение
  // (!) не изменяет state (!)
  IS_AUTHENTICATED(state) {
    return !!state.user;
  },
};

// Мутации - простые функции изменения (мутирования) состояния
const mutations = {
  // MUTATION_TYPE(state, payload)
  // применяется через commit
  // (!) ничего не возвращает (!)
  SET_USER(state, user) {
    state.user = user;
  },

  LOADING(state) {
    state.state = 'loading';
    state.error = null;
    state.user = null;
  },

  SUCCESS(state, user) {
    state.state = 'success';
    state.user = user;
    state.error = null;
  },

  ERROR(state, error) {
    state.state = 'error';
    state.user = null;
    state.error = error;
  },
};

const actions = {
  // ACTION_TYPE(context, payload)
  // context = { state, getters, commit, dispatch, rootState, rootGetters }
  // Вызывается через dispatch
  // Результатом работы может быть только изменение состояния
  // Результат не должен возвращаться через return (хотя технически может)
  // Всегда возвращает Promise (даже для синхронного действия без return)
  LOGIN({ state, commit, dispatch }, { email, password }) {
    // Если уже логинимся - ничего не делаем
    if (state.state === 'loading') {
      return;
    }
    commit('LOADING');
    // Возвращаем Promise, так удобнее дожидаться окончания действия
    // Но только для обработки завершения. Результат - через commit
    return loginWithApi(email, password)
      .then((user) => {
        commit('SUCCESS', user);
      })
      .catch((e) => {
        commit('ERROR', e.message);
      });
  },
};

export const auth = {
  // namespaced - выделяет модуль в отдельное пространство имён
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
