import { css, CSSResultArray } from 'lit-element';

import { Header } from './Header';
import { SideBar } from './SideBar';

const Main = css`
  .sidebarBottomItems {
    bottom: 16px;
    margin-bottom: 24px;
    width: 100%;
    position: absolute;
    background: var(--sidebar-background);
  }

  .expanded {
    width: 254px !important;
  }

  .sidebar {
    transition: all 0.4s ease-in-out;
  }

  .view {
    display: flex;
    display: --webkit-flex;
    margin-left: 55px;
    padding-top: 24px;
    background: var(--content-container-background);
    height: auto;
    min-height: fit-content;
    transition: margin-left 0.4s ease-in-out;
  }

  .no-tabs {
    height: calc(100vh - 48px);
  }

  .content {
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 24px;
  }

  docs-search {
    display: contents;
  }
`;

export const MainStyle: CSSResultArray = [Main, Header, SideBar];
