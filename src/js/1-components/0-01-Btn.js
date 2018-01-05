import React from 'react'
import Ink from 'react-ink'
import { WrapLink } from '@components'

export default ({
  ver, hor, ink, btnClass, path, icoClass, con, ...rest
}) => (
  <WrapLink
    path={path}
    className={`${btnClass ? btnClass : ''} relative ${(ver || hor) ? 'flex jc-center ai-center' : ''} ${ver ? 'column' : ''}`} // eslint-disable-line
    {...rest}
  >
    {icoClass && <i className={icoClass} />}
    {con}
    {ink && <Ink />}
  </WrapLink>
)


/*
* 使用范例
<Btn
    ver
    ink
    btnClass="bg-input r6 h60 equal"
    path="/search"
    icoClass="i-search font30 mr10"
    con={<span class="c999">123</span>}
    onClick={balabala}
/>
*/
