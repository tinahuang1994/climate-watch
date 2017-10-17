import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import closeIcon from 'assets/icons/legend-close.svg';
import styles from './ndc-sdg-linkages-list-styles.scss';

class NdcSdgLinkagesList extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { goal, onCloseClick } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <span className={styles.number}>{goal.number}</span>
            <span className={styles.title}>{goal.title}</span>
          </div>
          <button className={styles.closeButton} onClick={onCloseClick}>
            <Icon icon={closeIcon} className={styles.icon} />
          </button>
        </div>
        {goal.targets.map(target => <div key={target.id}>{target.title}</div>)}
      </div>
    );
  }
}

NdcSdgLinkagesList.propTypes = {
  goal: PropTypes.object.isRequired,
  onCloseClick: PropTypes.func.isRequired
};

export default NdcSdgLinkagesList;
