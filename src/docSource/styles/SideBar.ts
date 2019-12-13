import { css } from 'lit-element';

export const SideBar = css`
  .sidebarTopItems {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .sidebarTopItems::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  .sidebarTopItems::-webkit-scrollbar {
    width: 6px;
  }

  .sidebarTopItems::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--divider-color);
  }

  .sidebarBottomItems {
    bottom: 0;
    padding-bottom: 8px;
    width: 100%;
    position: absolute;
  }

  .menu {
    height: 48px;
    display: flex;
    white-space: nowrap;
    font-weight: 400;
    color: var(--text-color);
    background-color: var(--sidebar-secondary-background);
    font-size: 20px;
    align-items: center;
    border-bottom: 1px solid var(--divider-color);
  }

  .sidebarLinkItems {
    text-decoration: none !important;
  }

  paper-listbox .icon {
    margin-left: -5px !important;
  }

  paper-item {
    font-family: var(--primary-font-family);
    box-sizing: border-box;
    padding-left: 12px;
    cursor: pointer;
    --paper-item-min-height: 40px;
    width: 48px;
    margin: 4px 8px;
    border-radius: 4px;
    color: var(--text-color);
    white-space: nowrap;
  }

  .sidebar .icon {
    margin-right: 23px;
    margin-left: -5px;
    margin-top: -2px;
    width: 24px;
    height: 24px;
    min-width: 24px;
    color: var(--sidebar-icon-color);
  }

  .selected {
    color: var(--sidebar-selected-text-color);
    background: transparent !important;
    font-weight: 700;
  }

  iron-icon.selected {
    color: var(--sidebar-selected-icon-color) !important;
  }

  paper-item:focus:before {
    background: transparent !important;
  }

  .item-text {
    text-transform: uppercase;
    white-space: nowrap;
  }

  .divider {
    padding: 8px 0;
  }

  .divider::before {
    content: ' ';
    display: block;
    height: 1px;
    background-color: var(--divider-color);
  }

  .sidebar {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    margin: 0;
    background-color: var(--sidebar-background);
    border-right: 1px solid var(--divider-color);
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
    color: var(--sidebar-text-color);
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

  .footer {
    position: absolute;
    bottom: 12px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    border-top: 1px solid var(--divider-color);
    width: 100%;
    bottom: 0;
    padding: 5px 0;
    background: var(--sidebar-secondary-background);
    font-family: var(--primary-font-family);
  }

  .footer a,
  i {
    color: #939393;
    text-decoration: none;
    margin-left: 16px;
    opacity: 1;
    transition: all 0.4s ease-in-out;
  }
`;
