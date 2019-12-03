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

  .sidebar .iconify {
    margin-right: 23px;
    margin-left: -5px;
    margin-top: -2px;
    width: 24px;
    height: 24px;
    min-width: 24px;
    color: var(--sidebar-icon-color, var(--primary-text-color));
  }

  .selected {
    color: var(--sidebar-selected-text-color, var(--primary-color));
    background: transparent !important;
    font-weight: bold;
  }

  iron-icon.selected {
    color: var(--sidebar-selected-icon-color, var(--primary-color)) !important;
  }

  paper-item:focus:before {
    background: transparent !important;
  }

  .item-text {
    text-transform: uppercase;
    white-space: nowrap;
  }

  .divider {
    padding: 8px 0px;
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
    background-color: var(--paper-listbox-background-color);
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
    color: var(--sidebar-text-color, var(--primary-text-color));
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
    text-overflow: ellipsis;
    font-size: 14px;
    border-top: 1px solid var(--divider-color);
    width: 100%;
    bottom: 0;
    padding: 5px 0 5px 0;
    background: var(--primary-background-color);
  }
  .footer a,
  i {
    color: var(--secondary-text-color);
    text-decoration: none;
    margin-left: 16px;
  }
`;
