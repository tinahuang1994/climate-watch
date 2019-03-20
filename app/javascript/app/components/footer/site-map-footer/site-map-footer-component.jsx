import React from 'react';
import { Icon } from 'cw-components';
import cwLogo from 'assets/icons/cw-logo.svg';
import { NavLink } from 'react-router-dom';

import { siteMapData } from './site-map-footer-data';
import styles from './site-map-footer-styles';

const Component = () => {
  // eslint-disable-next-line react/prop-types
  const siteMapLink = ({ title, href }) =>
    (href.startsWith('/') ? (
      <NavLink to={href} className={styles.link}>
        {title}
      </NavLink>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {title}
      </a>
    ));

  return (
    <section className={styles.siteMapContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.link}>
          <Icon theme={{ icon: styles.logo }} icon={cwLogo} />
        </div>
        <div>
          <div className={styles.sectionsContainer}>
            {siteMapData.map(section => (
              <div key={section.title} className={styles.sectionWrapper}>
                <h4 className={styles.sectionHeader}>{section.title}</h4>
                <ul className={styles.linksList}>
                  {section.links.map(l => (
                    <li key={l.href}>{siteMapLink(l)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Component;
