import VueJsonp from 'vue-jsonp'
import Vue from 'vue'
Vue.use(VueJsonp, 5000);

class DataService {

  search(request_url,random_callback_handler) {
      return Vue.jsonp(request_url, {
          name: 'SpreadsheetQuery',
          age: 20,
          callbackQuery: 'not-important',
          // the name of the function that is called from the answer
          callbackName: random_callback_handler
      });

  }
}

export default new DataService();
