import { css, CSSResultArray } from 'lit-element';

import { Header } from './Header';
import { SideBar } from './SideBar';

const Main = css`
  .sidebarBottomItems {
    bottom: 0px;
    width: 100%;
    position: absolute;
  }

  .menu {
    height: 48px;
    display: flex;
    white-space: nowrap;
    font-weight: 400;
    color: var(--primary-text-color);
    background-color: var(--primary-background-color);
    font-size: 20px;
    align-items: center;
    border-bottom: 1px solid var(--divider-color);
  }

  .expanded {
    width: 254px !important;
  }

  .sidebar,
  .view {
    transition: all 0.4s ease-in-out;
  }

  .view {
    display: flex;
    margin-left: 55px;
    padding-top: 24px;
    background: var(--lovelace-background, var(--primary-background-color));
    height: calc(100vh - 96px);
  }

  .content {
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 24px;
  }

  .search {
    width: 25%;
    max-width: 250px;
    background: white;
    z-index: 2;
    border-radius: 20px;
    margin-right: 10px;
    height: 25px;
    opacity: 1;
    overflow: hidden;
    transition: all 0.4s ease-in-out;
  }

  .searchbox {
    width: 90%;
    margin: -2px 5px 5px 10px;
    border-width: 0;
    outline: none;
    opacity: 1;
    transition-delay: 0.4s;
  }

  .searchClosed {
    width: 0px !important;
    opacity: 0;
  }
`;

export const MainStyle: CSSResultArray = [Main, Header, SideBar];
