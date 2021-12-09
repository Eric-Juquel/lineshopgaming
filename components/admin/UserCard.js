import classes from './UserDetailsScreen.module.scss';
import Moment from 'react-moment';
import Image from 'next/image';

const UserCard = ({user}) => {
    return (
        <div className={classes.userCard}>
          <div className={classes.userInfo}>
            <div className={classes.raw}>
              <h6>First name:</h6>
              <p>{user.firstName}</p>
            </div>
            <div className={classes.raw}>
              <h6>last name:</h6>
              <p>{user.lastName}</p>
            </div>
            <div className={classes.raw}>
              <h6>Register:</h6>
              <p>
                <Moment format="DD/MM/YY">{user.createdAt}</Moment>
              </p>
            </div>
            <div className={classes.raw}>
              <h6>Email:</h6>
              <a href={`mailto:${user.email}`} title="send email">
                {user.email}
              </a>
            </div>
          </div>
          <div className={classes.avatar}>
            <Image src={user.avatar ? user.avatar.url : 'https://res.cloudinary.com/ericjuquel94/image/upload/v1639071260/LineShop/avatars/default_avatar_rmp4o9.jpg'} width={80} height={90} />
          </div>
        </div>
    )
}

export default UserCard
