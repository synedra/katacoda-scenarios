import React from 'react'

const MiniCard = () => {
  return (
    <div className="section minicard">
      <div className="section">
        <img className="user-profile"  src={''} width={'100%'} />
        <div>
          <h3 className="bold">username</h3>
          <p>name</p>
      </div>
    </div>
     <div className="is_followed">Followed</div>
    </div>
  )
}
    
export default MiniCard