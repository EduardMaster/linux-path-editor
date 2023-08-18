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
  return <div className="flex justify-center w-full p-1  bg-slate-100 flex-row">
    <textarea placeholder="Digite o Path com 'echo $PATH'"
      value={originalPath} className="w-1/4 p-2 "
      onChange={(e) => { setOriginalPath(e.target.value ?? '') }} />
    <div className="w-1/2 h-full overflow-y-auto">
      {pathSplitted.map(item => {
        newItemIndex++;
        return <div key={item + newItemIndex} className="p-1 flex flex-row w-full justify-between">
          <p className="w-auto">
            ({newItemIndex}) {item}
          </p>
          <button onClick={() => handleRemoveItem(item)} className="w-auto">Remover</button>
        </div>
      })}
    </div>
    <div className="w-1/4 p-2">
      <p className="w-full">
        Path Alterado
      </p>
      <p className="flex overflow-x-auto">export PATH='{allPath}'</p>
    </div>
  </div>
}