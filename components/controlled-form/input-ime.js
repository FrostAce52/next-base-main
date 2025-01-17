//  refs: https://zhuanlan.zhihu.com/p/415365117
//        https://github.com/facebook/react/issues/3926
// https://eddychang.me/blog/react-chinese-ime-issue
import { useRef, useState, forwardRef } from 'react'

function InputIME(props, ref) {
  const { onChange, value, ...otherProps } = props

  // log if on composition
  const onComposition = useRef(false)
  // temp input
  const [inputValue, setInputValue] = useState('')

  const _onChange = (event) => {
    setInputValue(event.target.value)

    // IME method start
    if (event.type === 'compositionstart') {
      onComposition.current = true
      return
    }

    // IME method end
    if (event.type === 'compositionend') {
      onComposition.current = false
    }

    // handle parent onChange
    if (!onComposition.current) {
      onChange(event)
    }
  }

  return (
    <input
      {...otherProps}
      ref={ref}
      value={inputValue}
      onChange={_onChange}
      onCompositionEnd={_onChange}
      onCompositionStart={_onChange}
    />
  )
}

export default forwardRef(InputIME)
