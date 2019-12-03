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
    height: 48.5px !important;
  }

  app-toolbar .iconify {
    width: 24px;
    height: 24px;
    z-index: 2;
  }

  .main-title {
    margin-left: 48px;
    white-space: nowrap;
  }

  app-header,
  app-toolbar {
    background-color: var(--primary-color);
    font-weight: 400;
    color: var(--text-primary-color);
  }

  app-header {
    transition: margin-top 0s !important;
    transition: margin-left 0.4s ease-in-out !important;
  }

  paper-tabs {
    --paper-tabs-selection-bar-color: var(--primary-background-color);
    text-transform: uppercase;
  }
`;
