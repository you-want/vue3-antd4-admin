// cdn加载 monaco-editor，挂在到 window 上，使用 window.monaco 即可
export function importMonaco() {
  // Credit to https://github.com/matt-oconnell/vue-monaco-editor/blob/master/src/MonacoLoader.js
  let loaderPending = false
  const loaderCallbacks: any[] = []

  function onAmdLoaderLoad() {
    let currentCallback = loaderCallbacks.shift()
    while (currentCallback) {
      window.clearTimeout(currentCallback.timeout)
      currentCallback.resolve()
      currentCallback = loaderCallbacks.shift()
    }
  }

  function onAmdLoaderError(err: any) {
    let currentCallback = loaderCallbacks.shift()
    while (currentCallback) {
      window.clearTimeout(currentCallback.timeout)
      currentCallback.reject(err)
      currentCallback = loaderCallbacks.shift()
    }
  }

  function ensureMonacoIsLoaded(srcPath: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.monaco) {
        resolve()
        return
      }
      const config = {
        paths: {
          vs: srcPath + '/vs'
        }
      }
      const loaderUrl = `${config.paths.vs}/loader.js`

      const timeout = window.setTimeout(() => {
        reject(new Error("Couldn't load monaco editor after 60s"))
      }, 60000)

      loaderCallbacks.push({
        resolve: () => {
          if (loaderPending) {
            window.require.config(config)
            loaderPending = false
          }

          // Cross domain workaround - https://github.com/Microsoft/monaco-editor/blob/master/docs/integrate-amd-cross.md
          window.MonacoEnvironment = {
            getWorkerUrl() {
              return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
                  self.MonacoEnvironment = {
                    baseUrl: '${srcPath}'
                  };
                  importScripts('${srcPath}/vs/base/worker/workerMain.js');`)}`
            }
          }

          window.require(['vs/editor/editor.main'], resolve)
        },
        timeout,
        reject
      })

      if (!loaderPending) {
        if (window.require) {
          onAmdLoaderLoad()
        } else {
          const loaderScript = window.document.createElement('script')
          loaderScript.type = 'text/javascript'
          loaderScript.src = loaderUrl
          loaderScript.addEventListener('load', onAmdLoaderLoad)
          loaderScript.addEventListener('error', onAmdLoaderError)
          document.body.appendChild(loaderScript)
          loaderPending = true
        }
      }
    })
  }

  async function init() {
    try {
      await ensureMonacoIsLoaded(
        'https://talcloud.oss-cn-beijing-internal.aliyuncs.com/k8s-fe/monaco-editor/min'
      )
      console.warn('monaco-editor 加载完成')
    } catch (e) {
      console.error('Failure during loading monaco editor:', e)
    }
  }
  init()
}
