"use client"
import { useEffect, useState } from "react"

export default function PathEditor() {
  const [originalPath, setOriginalPath] = useState('')
  const [allPath, setAllPath] = useState('')
  const pathSplitted = allPath.includes(":") ? allPath.split(":") ?? [] : []
  const handleRemoveItem = (item: string) => {
    const newPath = pathSplitted.filter(loopItem => loopItem != item)
      .join(":")
    setAllPath(newPath)
  }
  let newItemIndex = 0;
  useEffect(() => {
    setAllPath(originalPath)
  }, [originalPath])
  return <div className="flex justify-center p-1 bg-red-50 w-1/2 flex-col">
    <textarea placeholder="Digite o Path com 'echo $PATH'" value={originalPath} className="w-full p-1 mb-5"
      onChange={(e) => { setOriginalPath(e.target.value ?? '') }} />
    {pathSplitted.map(item => {
      newItemIndex++;
      return <div key={item + newItemIndex} className="p-1 flex flex-row w-full justify-between">
        <p className="w-auto">
          ({newItemIndex}) {item}
        </p>
        <button onClick={() => handleRemoveItem(item)} className="w-auto">Remover</button>
      </div>
    })}
    {allPath.length != 0 &&
      <p className="w-full p-2">
        Path Alterado
        <p className="flex overflow-x-auto">export PATH='{allPath}'</p>
      </p>
    }
  </div>
}