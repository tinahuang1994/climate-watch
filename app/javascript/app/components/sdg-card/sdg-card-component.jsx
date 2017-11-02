import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from 'components/icon';
import styles from './sdg-card-styles.scss';

class SDGCard extends PureComponent {
  render() {
    const {
      selected,
      goal,
      targets,
      targetData,
      indicators,
      square,
      tooltipId,
      setTooltipData,
      className,
      activeSector,
      icons,
      hover,
      onClick,
      onMouseEnter
    } = this.props;
    const cardStyle = cx(
      styles.card,
      {
        [styles.selected]: selected,
        [styles[`selected${goal.number}`]]: selected,
        [styles.square]: square,
        [styles.cardHover]: hover,
        [styles[`hover${goal.number}`]]: hover
      },
      className
    );

    const title = square ? goal.title : `${goal.number}. ${goal.cw_title}`;

    const compare = (a, b) => {
      const aRegex = a.number.match(/(.*)\.(.*)/);
      const fullA = (aRegex && aRegex[1]) || a.number.match(/(.*)\.?/);
      const decimalA = aRegex && aRegex[2];
      const bRegex = b.number.match(/(.*)\.(.*)/);
      const fullB = (bRegex && bRegex[1]) || b.number.match(/(.*)\.?/);
      const decimalB = bRegex && bRegex[2];
      if (
        !decimalA ||
        !decimalB ||
        parseInt(fullA, 10) !== parseInt(fullB, 10) ||
        decimalA.match(/[^0-9.]/) ||
        decimalA.match(/[^0-9.]/)
      ) {
        return fullA < fullB ? 1 : -1;
      }
      return parseInt(decimalA, 10) - parseInt(decimalB, 10);
    };

    return (
      <div
        className={cardStyle}
        onClick={onClick}
        role="menuitem"
        tabIndex={0}
        onMouseEnter={onMouseEnter}
      >
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.dots}>
          {targets &&
            targets.sort(compare).map(target => {
              const isSmall =
                target.sectors &&
                activeSector &&
                target.sectors.indexOf(parseInt(activeSector.value, 10)) === -1;
              const hasSectors =
                targetData &&
                targetData.targets[target.number] &&
                targetData.targets[target.number].sectors;
              return (
                <span
                  key={target.number}
                  data-for={tooltipId}
                  data-tip
                  onMouseEnter={() => setTooltipData(target)}
                  className={cx(styles.dot, { [styles.small]: isSmall })}
                  style={{
                    backgroundColor: hasSectors ? goal.colour : ''
                  }}
                />
              );
            })}
        </div>
        {(!indicators || square) && (
          <div className={styles.number}>{goal.number}</div>
        )}
        {goal.id && (
          <Icon
            icon={icons[`sdg${goal.number}`]}
            className={cx(styles.icon, styles[`icon${goal.number}`])}
          />
        )}
      </div>
    );
  }
}

SDGCard.propTypes = {
  icons: PropTypes.object.isRequired,
  goal: PropTypes.object.isRequired,
  targets: PropTypes.array,
  targetData: PropTypes.object,
  selected: PropTypes.bool,
  hover: PropTypes.bool,
  indicators: PropTypes.bool,
  square: PropTypes.bool,
  tooltipId: PropTypes.string,
  setTooltipData: PropTypes.func,
  className: PropTypes.string,
  activeSector: PropTypes.object,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func
};

SDGCard.defaultProps = {
  square: false,
  hover: false,
  onClick: () => {},
  onMouseEnter: () => {}
};

export default SDGCard;
