import React from 'react'
import './App.css'
//import leaf1 from './leaf1.png'

export default function Leaf() {

    const [leafs, setLeafs] = React.useState(randomLeafs())
    
    function randomLeafs() {
        return Math.floor(Math.random() * 4) + 1
    }

    React.useEffect(()=> {
        function changeLeaf() {
        let a = randomLeafs();  
        if (a===leafs) {
            a++;
            if (a > 4) { a = 1 }
        }    
        setLeafs(a)
        }

        const leafElement = document.querySelector(".fallen-leaf");
        
        leafElement.addEventListener("animationiteration", ()=> {
            changeLeaf()
        })

        return ()=> leafElement.removeEventListener("animationiteration", ()=> {
        changeLeaf()
        })
    }, [leafs])

    return (
      <img 
        src={`${process.env.PUBLIC_URL}/leafimages/leaf${leafs}.png`}
        className='fallen-leaf'
        alt='dried leaf'
        style={
          {
            zIndex: `${leafs}`,
            left: `${leafs*20}vw`,
            width: `${leafs*10+30}px`,
          }
        }
      />
    )

}