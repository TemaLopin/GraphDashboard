import React, { useEffect, useState } from 'react'

function DynamicStyle(props: any) {
  console.log('*........ ## ROOT RENDER', props)

  let arr = new Array(24).fill(1).map((it, ind) => ind)
  let DELAY = 100
  console.log('*........ ## ROOT RENDER', arr)

  let styleText = `
    
    [data-animch] > * {
      opacity: 0;
      transform: translateY(0);
      animation: fadeInTT .4s ease forwards;
      animation-delay: ${(arr.length * DELAY) / 1000}s;
    }
    [data-fade], [data-fade] > *, [data-animch][data-fade] > * {
      animation-delay: 0s;
      animtion: fade .4s ease forwards;
    }
    
  ${arr
    .map((it, ind) => {
      return `
[data-animch] > *:nth-child(${ind + 1}) {
  animation-delay: ${ind * DELAY}ms;
}
[data-animch="10"] > *:nth-child(${ind + 1}) {
  animation-delay: ${(ind + 10) * DELAY}ms;
}
[data-animch="6"] > *:nth-child(${ind + 1}) {
  animation-delay: ${(ind + 6) * DELAY}ms;
}
[data-animch="3"] > *:nth-child(${ind + 1}) {
    animation-delay: ${(ind + 3) * DELAY}ms;
  }
`
    })
    .join('\n')}
    
    
   @keyframes fadeInTT {
      from {
        opacity: 0;
        transform: translateY(7px);
      }
      to {
        opacity: 1;
      }
    }
     
   @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
    `

  useEffect(() => {
    // Create a new style element
    const styleElement: any = document.createElement('style')
    styleElement.type = 'text/css'

    // Append the style text to the style element
    if ('textContent' in styleElement) {
      styleElement.textContent = styleText
    } else {
      styleElement.styleSheet.cssText = styleText
    }

    // Insert the style element into the head of the document
    document.head.appendChild(styleElement)

    // Cleanup function to remove the style element when the component unmounts
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [styleText])

  return null
}

export default DynamicStyle
