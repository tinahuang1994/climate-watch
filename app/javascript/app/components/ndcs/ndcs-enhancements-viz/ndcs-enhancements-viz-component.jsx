import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import ButtonGroup from 'components/button-group';
import Icon from 'components/icon';
import accordionArrow from 'assets/icons/accordion-arrow.svg';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';
import CircularChart from 'components/circular-chart';

import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import styles from './ndcs-enhancements-viz-styles.scss';

const getTooltip = (country, tooltipTxt) => (
  <Link className={tooltipTheme.container} to={`/ndcs/country/${country.id}`}>
    <div className={tooltipTheme.info}>
      <div className={tooltipTheme.countryName}>{country.name}</div>
      <p className={tooltipTheme.text}>{tooltipTxt}</p>
    </div>
    <Icon icon={accordionArrow} className={tooltipTheme.icon} />
  </Link>
);

const renderButtonGroup = (clickHandler, downloadLink) => (
  <div className={styles.containerControls}>
    <div>
      <p>
        <em>
          Explore the data to track which countries have signaled they will
          submit or enhance their national climate commitments (NDCs) by 2020. To
          request changes or additions, please contact &nbsp;<a
            href="mailto:Rhys.Gerholdt@wri.org?subject=2020 NDC Tracker Update"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rhys Gerholdt
          </a>.
        </em>
      </p>
    </div>
    <div>
      <ButtonGroup
        className={styles.buttonGroup}
        buttonsConfig={[
          {
            type: 'info',
            onClick: clickHandler
          },
          {
            type: 'share',
            shareUrl: '/embed/ndcs-enhancements',
            analyticsGraphName: 'Ndcs',
            positionRight: true
          },
          {
            type: 'download',
            section: 'ndcs-content',
            link: downloadLink
          },
          {
            type: 'addToUser'
          }
        ]}
      />
    </div>
  </div>
);

const renderCircular = datum => (
  <div className={styles.circularChartContainer}>
    <div>
      <CircularChart
        index={0.1}
        value={Math.round(datum.value / datum.max * 100 * 10) / 10}
        color={datum.opts.color}
      />
      <div className={styles.circularChartValues}>
        <div
          style={{
            color: datum.opts.color
          }}
        >
          {datum.opts.prefix}
          {datum.value}
          {datum.opts.suffix}
        </div>
      </div>
    </div>
    <div className={styles.circularChartLabels}><div dangerouslySetInnerHTML={{ __html: datum.opts.label }}></div></div>
  </div>
);

const NDCSEnhancementsViz = ({
  loading,
  indicator,
  paths,
  tooltipTxt,
  downloadLink,
  countryData,
  summaryData,
  handleInfoClick,
  handleCountryClick,
  handleCountryEnter,
  mapColors
}) => (
  <div>
    <TabletLandscape>
      {isTablet => (
        <div className={styles.wrapper}>
          <div className={styles.filtersLayout}>
            {isTablet && renderButtonGroup(handleInfoClick, downloadLink)}
          </div>

          <div className={styles.containerUpper}>
            <div className={styles.containerCharts}>
              {!loading &&
              summaryData && (
              <div>
                    {renderCircular(summaryData.intend_2020.countries)}
                    {renderCircular(summaryData.enhance_2020.countries)}
                  </div>
                )}
            </div>
            <div className={styles.containerMap}>
              {loading && <Loading light className={styles.loader} />}
              {!isTablet && renderButtonGroup(handleInfoClick, downloadLink)}
              <Map
                paths={paths}
                tooltipId="ndcs-map-tooltip"
                onCountryClick={handleCountryClick}
                onCountryEnter={handleCountryEnter}
                onCountryFocus={handleCountryEnter}
                dragEnable={false}
                customCenter={!isTablet ? [10, -10] : null}
              />
              {countryData &&
              tooltipTxt.length > 0 && (
              <ReactTooltip
                    className={styles.tooltipContainer}
                    id="ndcs-map-tooltip"
                    delayHide={isTablet ? 0 : 3000}
                  >
                    {getTooltip(countryData, tooltipTxt)}
                  </ReactTooltip>
                )}
              {indicator && (
                <MapLegend
                  className={styles.legend}
                  title={indicator.legend}
                  buckets={indicator.legendBuckets}
                  mapColors={mapColors}
                />
              )}
              <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
                <defs>
                  <pattern id="pattern_gJ2H6" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                    <rect width="8" height="8" fill="rgb(204,204,204)"></rect>
                    <line x1="0" y="0" x2="0" y2="8" stroke="#bbb" strokeWidth="8" />
                  </pattern>
                </defs>
              </svg>
            </div>
          </div>
          <ModalMetadata />
        </div>
      )}
    </TabletLandscape>
  </div>
);

NDCSEnhancementsViz.propTypes = {
  loading: PropTypes.bool,
  indicator: PropTypes.object,
  paths: PropTypes.array.isRequired,
  tooltipTxt: PropTypes.string,
  downloadLink: PropTypes.string,
  countryData: PropTypes.object,
  summaryData: PropTypes.object,
  handleCountryClick: PropTypes.func.isRequired,
  handleCountryEnter: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  mapColors: PropTypes.array
};

export default NDCSEnhancementsViz;