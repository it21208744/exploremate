import Wrapper from '../assets/wrappers/travelersWrappers/niceBtn'

const NiceBtn = ({ isSubmitting }) => {
  return (
    <Wrapper>
      <div className="container">
        <div className="center">
          <button type="submit" className="btn" disabled={isSubmitting}>
            <svg
              width="180px"
              height="60px"
              viewBox="0 0 180 60"
              className="border"
            >
              <polyline
                points="179,1 179,59 1,59 1,1 179,1"
                className="bg-line"
              />
              <polyline
                points="179,1 179,59 1,59 1,1 179,1"
                className="hl-line"
              />
            </svg>
            <span>{isSubmitting ? 'Creating a plan...' : 'Lets travel'}</span>
          </button>
        </div>
      </div>
    </Wrapper>
  )
}
export default NiceBtn
