
import React from 'react'
import GoogleAuth from './GoogleAuth'

export default function Googledrive({clientId}) {
  return (
    <div>
      <GoogleAuth clientId={clientId} />
    </div>
  )
}
