import { message } from 'ant-design-vue'

export function copyText(text: string) {
  /* 创建一个textarea元素，并将要被复制的文本设置为其值 */
  const textarea = document.createElement('textarea')
  textarea.value = text

  /* 将创建的textarea添加到HTML文档中 */
  document.body.appendChild(textarea)

  /* 将新创建的textarea元素内容选中 */
  textarea.select()

  try {
    /* 调用浏览器内置的复制命令，将选定内容放入剪贴板*/
    const successful = document.execCommand('copy')

    if (successful) message.success('文本已复制到剪贴板！')
    else message.error('无法复制文本')
  } catch (err) {
    message.error('浏览器不支持！')
  }

  /* 删除刚才添加到HTML文档中的textarea元素 */
  document.body.removeChild(textarea)
}
