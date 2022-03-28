import '../styles/LaunchElement.css';
import PropTypes from 'prop-types';

const LaunchElement = ({ name, rocket }) => {
  return (
    <div className='launchElement'>
      <h3>Mission's name: {name}</h3>
      <h4>Rocket: {rocket}</h4>
    </div>
  );
};

LaunchElement.propTypes = {
  name: PropTypes.string.isRequired,
  rocket: PropTypes.string.isRequired,
};

export default LaunchElement;
