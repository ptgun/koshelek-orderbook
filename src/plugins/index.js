/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'

export function registerPlugins (app) {
  app.use(vuetify)
  // app.use(windowResize)
}

// const MOBILE_WIDTH = 840

// const windowResize = {
//   install(app, options) {
//     onResize(app)

//     window.addEventListener('resize', () => {
//       app.config.globalProperties.$width = window.innerWidth
//       app.config.globalProperties.$isMobile = window.innerWidth <= MOBILE_WIDTH
//     });
//   }
// }

