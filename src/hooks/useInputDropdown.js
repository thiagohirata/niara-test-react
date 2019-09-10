import React, { useEffect, useState, useMemo, useRef } from 'react'
import usePopper from './usePopper'
import isDomParent from '../util/isDomParent'

const useInputDropdown = inputRef => {
    const dropdownRef = useRef()
    const setShow = v => {
        if(dropdownRef.current) {
            dropdownRef.current.classList[v ? 'add' : 'remove']('show')
        }
    }

    useEffect(() => {
        const onClick = e => {
            if(!isDomParent(inputRef.current, e.target) && !isDomParent(dropdownRef.current, e.target)) {
                setShow(false)
            } else if(!(inputRef.current && inputRef.current.disabled)) {
                setShow(true)
            }
        }
        global.document.addEventListener('click', onClick)
        global.document.addEventListener('focusin', onClick)
        return () => {
            global.document.removeEventListener('click', onClick)
            global.document.removeEventListener('focusin', onClick)
        }
    }, [inputRef])

    usePopper(inputRef, dropdownRef)


    const Dropdown = useMemo(
        () => props => {
            return (
                <div ref={dropdownRef} className="input-dropdown">
                    <div className="input-dropdown-contents">{props.children}</div>
                </div>
            )
        },
        []
    )
    return Dropdown
}

export default useInputDropdown
