import Wrapper from '../../assets/wrappers/travelersWrappers/guide'
import getTokenfromHeaders from '../../components/getTokenFromHeader'
import axios from 'axios'
const Guide = () => {
  try {
    const res = axios.get('/api/v1/travelers/', getTokenfromHeaders())
    res.then((test) => console.log(test.data[0].city))
  } catch (error) {
    console.log(error)
  }

  return (
    <Wrapper>
      <div className="guideContainer">
        <div className="planThumbnail">
          <h1>To Jaffna</h1>
          <h3>3 days trip</h3>
        </div>
      </div>

      <div className="guideContainer">
        <div className="planThumbnail">
          <h1>To Jaffna</h1>
          <h3>3 days trip</h3>
        </div>
      </div>
    </Wrapper>
  )
}
export default Guide
