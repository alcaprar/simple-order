import './index.css'

import VueLogger from 'vuejs3-logger'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import type { ILoggerOptions } from 'vuejs3-logger/dist/interfaces/logger-options'
import { LogLevels } from 'vuejs3-logger/dist/enum/log-levels'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { CoPencil } from 'oh-vue-icons/icons'

const options: ILoggerOptions = {
  isEnabled: true,
  logLevel: LogLevels.DEBUG,
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
}

addIcons(CoPencil)

const app = createApp(App)
  .use(VueLogger, options)
  .use(router)
  .component('v-icon', OhVueIcon)
  .mount('#app')
