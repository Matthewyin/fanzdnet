/**
 * 滚动动画 Composable
 * 元素进入视口时触发动画效果
 */

export function useScrollAnimation() {
  const observerRef = ref<IntersectionObserver | null>(null);

  /**
   * 初始化观察器
   * @param options - IntersectionObserver 配置选项
   */
  const initObserver = (options: IntersectionObserverInit = {}) => {
    if (typeof window === 'undefined') return;

    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
      ...options
    };

    observerRef.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // 可选：只触发一次
          observerRef.value?.unobserve(entry.target);
        }
      });
    }, defaultOptions);
  };

  /**
   * 观察单个元素
   * @param el - 要观察的 DOM 元素
   */
  const observe = (el: Element | null) => {
    if (!el || !observerRef.value) return;
    observerRef.value.observe(el);
  };

  /**
   * 观察多个元素
   * @param selector - CSS 选择器
   * @param container - 容器元素，默认为 document
   */
  const observeAll = (selector: string, container: Element | Document = document) => {
    if (typeof window === 'undefined' || !observerRef.value) return;
    
    const elements = container.querySelectorAll(selector);
    elements.forEach((el) => {
      observerRef.value?.observe(el);
    });
  };

  /**
   * 停止观察元素
   * @param el - 要停止观察的 DOM 元素
   */
  const unobserve = (el: Element | null) => {
    if (!el || !observerRef.value) return;
    observerRef.value.unobserve(el);
  };

  /**
   * 断开观察器连接
   */
  const disconnect = () => {
    observerRef.value?.disconnect();
    observerRef.value = null;
  };

  // 组件卸载时清理
  onUnmounted(() => {
    disconnect();
  });

  return {
    initObserver,
    observe,
    observeAll,
    unobserve,
    disconnect
  };
}

/**
 * 滚动动画指令
 * 使用方式: v-scroll-animate 或 v-scroll-animate="'fade-up'"
 */
export const vScrollAnimate = {
  mounted(el: HTMLElement, binding: { value?: string }) {
    const animationType = binding.value || 'fade-up';
    el.classList.add('animate-on-scroll', animationType);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      }
    );

    observer.observe(el);

    // 存储 observer 以便清理
    (el as any)._scrollObserver = observer;
  },
  unmounted(el: HTMLElement) {
    const observer = (el as any)._scrollObserver;
    if (observer) {
      observer.disconnect();
    }
  }
};

