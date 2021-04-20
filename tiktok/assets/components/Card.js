import React from 'react'

const Card = () => {

  return (
    <div className="card">
      <div className="break" />
        <div className="section">
          <div className="user-info">
            <img className="user-profile"  src={''} width={'100%'} />
            <div>
            <div className="section">
              <h3 className="bold">username</h3>
              <p className="username">name</p>
              <p>{user.timestamp}</p>
            </div> 
            <p>{user.caption}</p>
            </div>
          </div>
            <div className="is_followed">Followed</div>
        </div>
        <video className="video" controls>
          <source src={user.video} type="video/mp4" />
        </video>
        <div className="section socials">
           <i class="far fa-heart"></i>
          <div className="social-tag">likes</div>
          <i class="far fa-comment-dots"></i>
          <div className="social-tag">comments</div>
          <i class="far fa-share-square"></i>
        </div>
    </div>
  )
}

export default Card