import HomeCardInfo from "./HomeCardInfo";

const HomeCard = (props) => {
  return (
    <div className="home-card">
      <h3>{props.name}</h3>
      <img className="home-card-image" src={props.img} alt={props.alt} />
      <HomeCardInfo link={props.link} alt={props.alt}/>
    </div>
  )
}

export default HomeCard;