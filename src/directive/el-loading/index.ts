//@ts-nocheck

import { App, createVNode, h, reactive, ref,nextTick, render, toRefs, Transition, VNode, vShow, withCtx, withDirectives } from 'vue'
import { removeClass,addClass,getStyle } from 'element-plus/es/utils/dom'
import isServer from 'element-plus/es/utils/isServer'

import type { ILoadingCreateComponentParams, ILoadingInstance } from './src/loading.type'


 function createLoadingComponent({
    options,
    globalLoadingOption,
  }: ILoadingCreateComponentParams): ILoadingInstance {
    let vm: VNode = null
    let afterLeaveTimer: Nullable<number> = null
    /* 创建data */
    const afterLeaveFlag = ref(false)
    const data = reactive({
      ...options,
      originalPosition: '',
      originalOverflow: '',
      visible: false,
    })
    /* 设置文本 */
    function setText(text: string) {
      data.text = text
    }
    /* 销毁 */
    function destroySelf() {
      const target = data.parent
      if (!target.vLoadingAddClassList) {
        let loadingNumber: number | string = target.getAttribute('loading-number')
        loadingNumber = Number.parseInt(loadingNumber) - 1
        if (!loadingNumber) {
          removeClass(target, 'el-loading-parent--relative')
          target.removeAttribute('loading-number')
        } else {
          target.setAttribute('loading-number', loadingNumber.toString())
        }
        removeClass(target, 'el-loading-parent--hidden')
      }
      if (vm.el && vm.el.parentNode) {
        vm.el.parentNode.removeChild(vm.el)
      }
    }
  /* 关闭 */
    function close() {
      const target = data.parent
      target.vLoadingAddClassList = null
      if (data.fullscreen) {
        globalLoadingOption.fullscreenLoading = undefined
      }
      afterLeaveFlag.value = true
      clearTimeout(afterLeaveTimer)
  
      afterLeaveTimer = window.setTimeout(() => {
        if (afterLeaveFlag.value) {
          afterLeaveFlag.value = false
          destroySelf()
        }
      }, 400)
      data.visible = false
    }
  /* 关闭之前的调用 */
    function handleAfterLeave() {
      if (!afterLeaveFlag.value) return
      afterLeaveFlag.value = false
      destroySelf()
    }
  /* v3的setup */
    const componentSetupConfig = {
      ...toRefs(data),
      setText,
      close,
      handleAfterLeave,
    }
    /* 生成组件 */
    const elLoadingComponent = {
      name: 'ElLoading',
      setup() {
        return componentSetupConfig
      },
      render() {
        /* 生成圆点 */
        const spinner = h('svg', {
          class: 'circular',
          viewBox: '25 25 50 50',
        }, [
          h('circle', { class: 'path', cx: '50', cy: '50', r: '20', fill: 'none' }),
        ])
        /* 自定义loading 部分 */
        const line = h("div", {
          class:"w-full flex justify-center"
        }, [
          h("div", { class: 'bar' }),
          h("div", { class: 'bar' }),
          h("div", { class: 'bar' }),
          h("div", { class: 'bar' }),
          h("div", { class: 'bar' }),
          h("div", {class:'bar'}),
          h("div", { class: 'bar' }),
          h("div", {class:'bar'}),
        ])
        const noSpinner = h('i', { class: this.spinner })
        /* 文字text */
        const spinnerText = h('p', { class: 'el-loading-text inline-block py-4 loading-text' }, [this.text])
        /* 渲染loading */
        return h(Transition, {
          name: 'el-loading-fade',
          onAfterLeave: this.handleAfterLeave,
        }, {
          default: withCtx(() => [withDirectives(createVNode('div', {
            style: {
              backgroundColor: this.background || '',
            },
            class: [
              'el-loading-mask',
              this.customClass,
              this.fullscreen ? 'is-fullscreen' : '',
            ],
          }, [
            h('div', {
              class: 'w-full flex-col h-full relative overflow-hidden flex items-center justify-center',
            }, [
              !this.spinner ? line : noSpinner,
              this.text ? spinnerText : null,
            ]),
          ]),
          [[vShow, this.visible]])]),
        })
      },
    }
    /* 创建vNode */
    vm = createVNode(elLoadingComponent)
  
    render(vm, document.createElement('div'))
  
    return {
      ...componentSetupConfig,
      vm,
      get $el() {
        return vm.el as HTMLElement
      },
    }
 }

const createInstance = (el, binding) => {
    const textExr = el.getAttribute("element-loading-text");
    const spinnerExr = el.getAttribute("element-loading-spinner");
    const backgroundExr = el.getAttribute("element-loading-background");
    const customClassExr = el.getAttribute("element-loading-custom-class");
    const vm = binding.instance;
    /*
     *   使用方式
     *  v-loading={[true, "", ["body", "fullscreen"]]}
     */
    el.instance = Loading({
      text: (vm && vm[textExr]) || textExr,
      spinner: (vm && vm[spinnerExr]) || spinnerExr,
      background: (vm && vm[backgroundExr]) || backgroundExr,
      customClass: (vm && vm[customClassExr]) || customClassExr,
      fullscreen: !!binding.modifiers.fullscreen,
      target: !!binding.modifiers.fullscreen ? null : el,
      body: !!binding.modifiers.body,
      visible: true,
      lock: !!binding.modifiers.lock,
    });
  };
const vLoading = {
    mounted(el, binding) {
      if (!!binding.value) {
        createInstance(el, binding);
      }
    },
    updated(el, binding) {
      const instance = el.instance;
      if (binding.oldValue !== binding.value)
       {
        if (binding.value) {
          createInstance(el, binding);
        } else {
          instance.close();
        }
      }
    },
    unmounted(el) {
      el?.instance?.close();
    },
  };
  const defaults: ILoadingOptions = {
    parent: null,
    background: '',
    spinner: false,
    text: null,
    fullscreen: true,
    body: false,
    lock: false,
    customClass: '',
  }
  const globalLoadingOption: ILoadingGlobalConfig = {
    fullscreenLoading: null,
  }
  
  const addStyle = async (options: ILoadingOptions, parent: HTMLElement, instance: ILoadingInstance) => {
    const maskStyle: Partial<CSSStyleDeclaration> = {}
    if (options.fullscreen) {
      instance.originalPosition.value = getStyle(document.body, 'position')
      instance.originalOverflow.value = getStyle(document.body, 'overflow')
      maskStyle.zIndex = String(PopupManager.nextZIndex())
    } else if (options.body) {
      instance.originalPosition.value = getStyle(document.body, 'position')
      /**
       * await dom render when visible is true in init,
       * because some component's height maybe 0.
       * e.g. el-table.
       */
      await nextTick();
      ['top', 'left'].forEach(property => {
        const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
        maskStyle[property] = (options.target as HTMLElement).getBoundingClientRect()[property] +
          document.body[scroll] +
          document.documentElement[scroll] -
          parseInt(getStyle(document.body, `margin-${ property }`), 10) +
          'px'
      });
      ['height', 'width'].forEach(property => {
        maskStyle[property] = (options.target as HTMLElement).getBoundingClientRect()[property] + 'px'
      })
    } else {
      instance.originalPosition.value = getStyle(parent, 'position')
    }
    Object.keys(maskStyle).forEach(property => {
      instance.$el.style[property] = maskStyle[property]
    })
  }
  
  const addClassList = (options: ILoadingOptions, parent: HTMLElement, instance: ILoadingInstance) => {
    if (instance.originalPosition.value !== 'absolute' && instance.originalPosition.value !== 'fixed') {
      addClass(parent, 'el-loading-parent--relative')
    } else {
      removeClass(parent, 'el-loading-parent--relative')
    }
    if (options.fullscreen && options.lock) {
      addClass(parent, 'el-loading-parent--hidden')
    } else {
      removeClass(parent, 'el-loading-parent--hidden')
    }
  }
  
  const Loading = function (options: ILoadingOptions = {}): ILoadingInstance {
    if (isServer) return
    options = {
      ...defaults,
      ...options,
    }
  
    if (typeof options.target === 'string') {
      options.target = document.querySelector(options.target) as HTMLElement
    }
    options.target = options.target || document.body
    if (options.target !== document.body) {
      options.fullscreen = false
    } else {
      options.body = true
    }
  
    if (options.fullscreen && globalLoadingOption.fullscreenLoading) {
      globalLoadingOption.fullscreenLoading.close()
    }
  
    const parent = options.body ? document.body : options.target
    options.parent = parent
  
    const instance = createLoadingComponent({
      options,
      globalLoadingOption,
    })
  
    addStyle(options, parent, instance)
    addClassList(options, parent, instance)
  
    options.parent.vLoadingAddClassList = () => {
      addClassList(options, parent, instance)
    }
  
    /**
     * add loading-number to parent.
     * because if a fullscreen loading is triggered when somewhere
     * a v-loading.body was triggered before and it's parent is
     * document.body which with a margin , the fullscreen loading's
     * destroySelf function will remove 'el-loading-parent--relative',
     * and then the position of v-loading.body will be error.
     */
    let loadingNumber: number | string = parent.getAttribute('loading-number')
    if (!loadingNumber) {
      loadingNumber = 1
    } else {
      loadingNumber = Number.parseInt(loadingNumber) + 1
    }
    parent.setAttribute('loading-number', loadingNumber.toString())
  
    parent.appendChild(instance.$el)
  
    // after instance render, then modify visible to trigger transition
    nextTick().then(() => {
      instance.visible.value = options.hasOwnProperty('visible') ? options.visible : true
    })
  
    if (options.fullscreen) {
      globalLoadingOption.fullscreenLoading = instance
    }
    return instance
  }
  export default {
    install(app:App) {
        app.directive('loading', vLoading);
        app.config.globalProperties.$loading = Loading;
    },
    directive: vLoading,
    service: Loading,
  }