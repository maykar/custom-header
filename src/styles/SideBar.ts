import { css } from 'lit-element';

export const SideBar = css`
  .sidebarBottomItems {
    bottom: 0px;
    padding-bottom: 8px;
    width: 100%;
    position: absolute;
  }

  .menu {
    height: 48px;
    display: flex;
    white-space: nowrap;
    font-weight: 400;
    color: #212121;
    background-color: #fafafa;
    font-size: 20px;
    align-items: center;
    border-bottom: 1px solid var(--light-theme-divider-color);
  }

  paper-listbox a {
    text-decoration: none;
  }

  paper-listbox .iconify {
    margin-left: -5px !important;
  }

  paper-icon-item {
    box-sizing: border-box;
    padding-left: 12px;
    cursor: pointer;
    --paper-item-min-height: 40px;
    width: 48px;
    margin: 4px 8px;
    border-radius: 4px;
    color: var(--primary-text-color);
    white-space: nowrap;
  }

  paper-icon-item:focus:before {
    background: transparent !important;
  }

  .iron-selected ::before {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    pointer-events: none;
    content: '';
    opacity: 0.12;
    will-change: opacity;
    border-radius: 4px;
    transition: opacity 15ms linear 0s;
  }

  .item-text {
    text-transform: uppercase;
  }

  paper-listbox .iron-selected {
    color: var(--primary-color);
  }

  paper-listbox .iron-selected .iconify {
    color: var(--primary-color);
  }

  .divider {
    padding: 8px 0px;
  }

  .divider::before {
    content: ' ';
    display: block;
    height: 1px;
    background-color: var(--light-theme-divider-color);
  }

  .sidebar {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    margin: 0;
    background: var(--primary-background-color);
    width: 55px;
    height: 100%;
    text-align: left;
    box-sizing: border-box;
    overflow: hidden;
  }

  .sidebarExpanded {
    margin-left: 254px;
  }

  .sidebarText {
    color: var(--primary-text-color);
    padding-left: 3px;
    padding-bottom: -5px;
    text-align: left;
    margin-top: -37.7px;
    margin-left: 254px;
    margin-bottom: 3px;
    opacity: 0.4;
    cursor: pointer;
  }

  .sidebarBottom {
    margin: 0;
    margin-left: -4px;
  }

  .sidebar .iconify {
    margin-right: 23px;
    margin-left: -5px;
    margin-top: -2px;
    width: 24px;
    height: 24px;
    min-width: 24px;
    color: var(--primary-text-color);
  }
`;
