import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LogModule from '../modules/logModule/LogModule'


/**
 * デフォルトログイン(セッションが残っているときに、その情報を利用してログインする)を行うコンポーネント
 * デフォルトログインの状態によって以下に分岐する
 * 完了している => 子要素を表示する
 * 完了していない => 真っ白
 */
const DefaultLoginChecker = ({
  children
}) => {
  const dispatch = useDispatch()
  const defaultLoginFinished = useSelector(state=> state.logStatus.defaultLoginFinished)
  useEffect(() => {
      if(!defaultLoginFinished){
        dispatch(LogModule.actions.cookieLogin()) 
      }
    })
  return defaultLoginFinished ? <div>{children}</div> : <div></div>
}

export default DefaultLoginChecker