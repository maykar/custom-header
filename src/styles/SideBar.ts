import { css } from 'lit-element';

export const SideBar = css`
  .sidebarBottomItems {
    bottom: 0px;
    padding-bottom: 8px;
    width: 100%;
    position: absolute;
  }

  .sidebarLinkItems {
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

  .sidebarLinkItems {
    text-decoration: none !important;
  }

  paper-listbox .iconify {
    margin-left: -5px !important;
  }

  paper-item {
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

  .selected {
    color: var(--primary-color) !important;
    background: transparent !important;
    font-weight: bold;
  }

  paper-item:focus:before {
    background: transparent !important;
  }

  .item-text {
    text-transform: uppercase;
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
