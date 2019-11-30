import { css } from 'lit-element';

export const Header = css`
  app-header {
    position: fixed !important;
    top: 0;
    margin-left: 55px;
    display: block;
    transition-timing-function: linear;
    z-index: 1;
    width: -webkit-fill-available;
    width: -moz-available;
    width: stretch;
  }

  app-toolbar {
    height: 48px !important;
  }

  app-toolbar .iconify {
    margin-left: 16px;
    width: 24px;
    height: 24px;
    z-index: 2;
  }

  app-header,
  app-toolbar {
    background-color: var(--primary-color);
    font-weight: 400;
    color: var(--light-theme-background-color);
  }

  app-header {
    transition: margin-top 0s !important;
    transition: margin-left 0.4s ease-in-out !important;
  }

  paper-tabs {
    --paper-tabs-selection-bar-color: var(--primary-background-color);
    margin-left: 12px;
    text-transform: uppercase;
  }
`;
