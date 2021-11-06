import { createStore } from 'vuex'

// https://cn.vitejs.dev/guide/features.html#glob-import
const modulesFiles = import.meta.globEager('./modules/*.js')
const modules = {}
for (const key in modulesFiles) {
  if (Object.hasOwnProperty.call(modulesFiles, key)) {
    // set './modules/user.js' => 'user'
    const fileName = key.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')

    const value = modulesFiles[key]
    modules[fileName] = value.default
  }
}

const store = createStore({
  modules,
  state() {
    return {
      token: ''
    }
  }
})

export default store
