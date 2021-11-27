/**
 * 获取loaclStorage
 */
export const getStorage = name => {
  if (!name) return
  return JSON.parse(localStorage.getItem(name))
}

/**
 * 设置loaclStorage
 */
export const setStorage = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  return localStorage.setItem(name, content)
}

/**
 * 移除loaclStorage
 */
export const removeStorage = name => {
  if (!name) return
  return localStorage.removeItem(name)
}
