import React from 'react'

function Error({ statusCode }) {
  return (
    <div style={
      {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }
    }>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error