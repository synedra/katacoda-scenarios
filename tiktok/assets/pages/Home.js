import FollowersColumn from '../components/FollowersColumn'

const Home = () => {

  return (
    <>
      <div className='container'>
        <FollowersColumn />
        <div className='feed'>
  
        </div>
        <div className="suggested-box">
          <div className="section">
            <div className="suggested">
              <h2 className="bold">Suggested accounts</h2>
              <div className="break" />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home