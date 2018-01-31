import React from 'react';
import { renderRoutes } from 'react-router-config';
import Proptypes from 'prop-types';
import cx from 'classnames';
import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import AnchorNav from 'components/anchor-nav';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import { NDC_CONTENT } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';

import layout from 'styles/layout.scss';
import styles from './ndcs-styles.scss';

const NDC = ({ anchorLinks, query, route }) => (
  <div>
    <MetaDescription descriptionContext={NDC_CONTENT} subtitle="NDC CONTENT" />
    <SocialMetadata descriptionContext={NDC_CONTENT} href={location.href} />
    <Header size="medium" route={route}>
      <div className={cx(styles.cols, layout.content)}>
        <Intro title="NDC Content" />
        <AutocompleteSearch />
      </div>
      <AnchorNav
        useRoutes
        links={anchorLinks}
        query={query}
        theme={anchorNavRegularTheme}
      />
    </Header>
    <div className={styles.wrapper}>
      <div className={layout.content}>{renderRoutes(route.routes)}</div>
    </div>
  </div>
);

NDC.propTypes = {
  query: Proptypes.string,
  route: Proptypes.object.isRequired,
  anchorLinks: Proptypes.array.isRequired
};

export default NDC;
