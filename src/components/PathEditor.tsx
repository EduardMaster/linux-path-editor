"use client"
import { useEffect, useRef, useState } from "react"
import { Trash, Plus } from 'react-feather';
export default function PathEditor() {
  const [originalPath, setOriginalPath] = useState('')
  const [allPath, setAllPath] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const pathSplitted = allPath.includes(":") ? allPath.split(":") ?? [] : allPath.length > 0 ? [allPath] : []
  const handleRemoveItem = (item: string) => {
    const newPath = pathSplitted.filter(loopItem => loopItem != item)
      .join(":")
    setAllPath(newPath)
  }
  const handleAddNewPath = () => {
    const text = inputRef.current?.value ?? "";
    if (text.length == 0) {
      return;
    }
    pathSplitted.push(text)
    setAllPath(pathSplitted.join(":"))
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current?.focus()
    }

  }

  useEffect(() => {
    setAllPath(originalPath)
  }, [originalPath])
  let newItemIndex = 0;
  return <div className="flex justify-center w-full p-1  bg-slate-100 flex-row">
    <textarea placeholder="Digite o Path com 'echo $PATH'"
      value={originalPath} className="w-1/4 p-2 "
      onChange={(e) => { setOriginalPath(e.target.value ?? '') }} />
    <div className="w-1/2 h-full overflow-y-auto">
      <div key={"new-item-to-path"} className="p-1 flex flex-row w-full justify-between">
        <input ref={inputRef} type="text" className="w-full" />
        <Plus className="cursor-pointer mb-1" color="green" onClick={handleAddNewPath} />
      </div>

      {pathSplitted.map(item => {
        newItemIndex++;
        return <div key={item + newItemIndex} className="p-1 cursor-move flex flex-row w-full justify-between">
          <p className="w-auto">
            ({newItemIndex}) {item}
          </p>
          <Trash color="red" className="w-auto cursor-pointer mb-1" onClick={() => handleRemoveItem(item)} />
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