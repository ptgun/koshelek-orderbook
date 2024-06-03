import { computed, onMounted, onUnmounted, ref } from "vue"


const MOBILE_WIDTH = 840;

export const useWindowWidth = () => {
  let windowWidth = ref(window.innerWidth)

  const onWidthChange = () => windowWidth.value = window.innerWidth
  onMounted(() => window.addEventListener('resize', onWidthChange))
  onUnmounted(() => window.removeEventListener('resize', onWidthChange))
  
  const isMobile = computed(() => windowWidth.value <= MOBILE_WIDTH)

  const width = computed(() => windowWidth.value)

  return { width, isMobile }
}
