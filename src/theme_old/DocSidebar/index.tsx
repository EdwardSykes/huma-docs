/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState} from 'react';
import clsx from 'clsx';
import {
  useThemeConfig,
  useAnnouncementBar,
  MobileSecondaryMenuFiller,
  type MobileSecondaryMenuComponent,
  ThemeClassNames,
  useScrollPosition,
  useWindowSize,
  useLocalPathname
} from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import IconArrow from '@theme/IconArrow';
import {translate} from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';
import type {Props} from '@theme/DocSidebar';
import NavbarItem from '@theme/NavbarItem';

import styles from './styles.module.css';

function useShowAnnouncementBar() {
  const {isActive} = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({scrollY}) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

function HideableSidebarButton({onClick}: {onClick: React.MouseEventHandler}) {
  return (
    <button
      type="button"
      title={translate({
        id: 'theme.docs.sidebar.collapseButtonTitle',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      aria-label={translate({
        id: 'theme.docs.sidebar.collapseButtonAriaLabel',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      className={clsx(
        'button button--secondary button--outline',
        styles.collapseSidebarButton,
      )}
      onClick={onClick}>
      <IconArrow className={styles.collapseSidebarButtonIcon} />
    </button>
  );
}

function DocSidebarDesktop({path, sidebar, onCollapse, isHidden}: Props) {
  const showAnnouncementBar = useShowAnnouncementBar();
  const {
    navbar: {hideOnScroll, items},
    hideableSidebar,
  } = useThemeConfig();

  const localPathname = useLocalPathname();

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.sidebarWithHideableNavbar]: hideOnScroll,
        [styles.sidebarHidden]: isHidden,
      })}>
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      {items.map((item, i) => (
        item.type == "docsVersionDropdown" && (localPathname.includes(`/${item.docsPluginId}`) && <div className={styles.sidebarVersion}><NavbarItem {...item} key={i} /></div>)
      ))}
      <nav
        className={clsx('menu thin-scrollbar', styles.menu, {
          [styles.menuWithAnnouncementBar]: showAnnouncementBar,
        })}>
        <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
          <DocSidebarItems items={sidebar} activePath={path} level={1} />
        </ul>
      </nav>
      {hideableSidebar && <HideableSidebarButton onClick={onCollapse} />}
    </div>
  );
}

// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu: MobileSecondaryMenuComponent<Props> = ({
  toggleSidebar,
  sidebar,
  path,
}) => (
  <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
    <DocSidebarItems
      items={sidebar}
      activePath={path}
      onItemClick={(item) => {
        // Mobile sidebar should only be closed if the category has a link
        if (item.type === 'category' && item.href) {
          toggleSidebar();
        }
        if (item.type === 'link') {
          toggleSidebar();
        }
      }}
      level={1}
    />
  </ul>
);

function DocSidebarMobile(props: Props) {
  return (
    <MobileSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

const DocSidebarDesktopMemo = React.memo(DocSidebarDesktop);
const DocSidebarMobileMemo = React.memo(DocSidebarMobile);

export default function DocSidebar(props: Props): JSX.Element {
  const windowSize = useWindowSize();

  // Desktop sidebar visible on hydration: need SSR rendering
  const shouldRenderSidebarDesktop =
    windowSize === 'desktop' || windowSize === 'ssr';

  // Mobile sidebar not visible on hydration: can avoid SSR rendering
  const shouldRenderSidebarMobile = windowSize === 'mobile';

  return (
    <>
      {shouldRenderSidebarDesktop && <DocSidebarDesktopMemo {...props} />}
      {shouldRenderSidebarMobile && <DocSidebarMobileMemo {...props} />}
    </>
  );
}
