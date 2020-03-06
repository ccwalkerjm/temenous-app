import Vue from "vue";
import Vuex from "vuex";
import bookNames from "@/bible-data/Books.json";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    bookNames,
    book: null
  },
  getters: {
    book: state => state.book,
    bookNames: state => state.bookNames
  },
  mutations: {
    setBook(state, book) {
      console.log("mutation: book", book);
      state.book = book;
    }
  },
  actions: {
    loadBook(context, book_idx) {
      const bookName = bookNames[book_idx];
      const fileName = bookName.replace(/\s/g, "") + ".json";
      import("@/bible-data/" + fileName).then(book => {
        console.log("action: book", book);
        context.commit("setBook", book);
      });
    }
  }
});
